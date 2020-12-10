//this is the JS file to control the cards project

//async function to fetch data from a URL
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
//how many pokemon and starting from where?
let startPoint = 1;
let howMany = 60;

//change the start point and card nums based on user input? (NEED TO FIND OUT HOW TO DO THIS)
//let form = document.querySelector('form')

//function to update variables based on form input
//function updateVar(myvar, whichfield) {
//    myvar = document.getElementById(whichfield).value
//}

//update them when the submit button is clicked
//form.addEventListener('submit', () => {
//    updateVar(startPoint, 'startnum')
//    updateVar(howMany, 'howmany')
//    loadPage()
//})

//Page Loader Function
function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=${howMany}&offset=${startPoint - 1}`).then
        (async (data) => {
            for (const pokemon of data.results) {
                await getAPIData(pokemon.url).then((pokeData) => {
                    populatePokeCard(pokeData)
                })
            }
        })
}

//create a card grid
const cardGrid = document.querySelector(`.cardgrid`)

//function to populate an individual pokemon card
function populatePokeCard(pokemon) {
    //start with a scene
    let cardScene = document.createElement('div')
    //create card div to go inside the scene
    let card = document.createElement('div')
    //assign cardScene a class name
    cardScene.className = 'scene'
    //assign card a class name
    card.className = 'card'
    //event listener for clicks
    cardScene.addEventListener('click', () => {
        card.classList.toggle('is-flipped')
        console.log(startPoint)
        console.log(howMany)
    })
    //build the scene
    card.appendChild(populateFront(pokemon))
    card.appendChild(populateBack(pokemon))
    cardScene.appendChild(card)
    //add the scene to the grid
    cardGrid.appendChild(cardScene)
}
//function to populate the card front
function populateFront(pokemon) {
    //create elements
    let cardFront = document.createElement('div')
    let frontLabel = document.createElement('p')
    let frontImage = document.createElement('img')
    //assign values
    frontLabel.textContent = pokemon.name
    frontImage.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${getThreeDigitID(pokemon)}.png`
    //assign class names
    cardFront.className = 'cardface cardface--front'
    frontLabel.className = 'frontlabel'
    frontImage.className = 'frontimage'
    //append
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    return cardFront
}
//function to populate the card back
function populateBack(pokemon) {
    //create elements
    let cardBack = document.createElement('div')
    let backLabel = document.createElement('p')
    //assign values
    backLabel.textContent = pokemon.name
    //assign class names
    cardBack.className = 'cardface cardface--back'
    //append
    cardBack.appendChild(backLabel)
    return cardBack
}

//function to change the ID of a given pokemon to 3 digit format for use in the template URL
function getThreeDigitID(pokemon) {
    if (pokemon.id <10) {

        return `00${pokemon.id}`
    }
    else if (pokemon.id > 9 && pokemon.id < 100) {
        return `0${pokemon.id}`
    }
    else {
        return pokemon.id
    }
}
loadPage()

function Pokemon(name, type, strength, abilities) {
    this.name = name
    this.type = type
    this.strength = strength
    this.abilities = abilities
    this.id = 900
}
let Hitler = new Pokemon('Hitler', 'Nazi', 'Infinite', ['Genocide', 'Racism'])
console.log(Hitler)