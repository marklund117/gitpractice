//this is the JS file to control the cards project
//some incomplete functionality is commented
//this code contains:
//variables and scope
//custom objects
//let and const
//arrow functions
//template literals
//object declaration
//key-value pairs
//dot notation used to access constructors and objects, objects using constructors
//async function to fetch data from a URL
async function getAPIData(url) {
    try {
        //example of using const
        //also variables with scope
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
//how many pokemon and starting from where?
//example of using let
let startPoint = 1;
let howMany = 40;

//change the start point and card nums based on user input??? (NEED TO FIND OUT HOW TO DO THIS)
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
    //template literal here
    //more async here
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=${howMany}&offset=${startPoint - 1}`).then
        (async (data) => {
            //key-value pairs here
            for (const pokemon of data.results) {
                await getAPIData(pokemon.url).then((pokeData) => {
                    populatePokeCard(pokeData)
                })
            }
        })
}

//page clear Function
function delPage(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

//new pokemon adder button
const adderButton = document.querySelector('#adderbutton')

//event listener for adder button
//arrow function here (one of several)
adderButton.addEventListener('click', () => {
    let promptforname = prompt("What would you like to name the new card?")
    populateCustomCard(createNewCard(promptforname))
})

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
    let frontButtons = document.createElement('h1')
    //assign values
    frontLabel.textContent = pokemon.name
    frontImage.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${getThreeDigitID(pokemon)}.png`
    frontButtons.textContent = `+ O`
    //assign class names
    cardFront.className = 'cardface cardface--front'
    frontLabel.className = 'frontlabel'
    frontImage.className = 'frontimage'
    frontButtons.className = 'frontbuttons'
    //append
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    cardFront.appendChild(frontButtons)
    return cardFront
}
//function to populate the card back
function populateBack(pokemon) {
    //***create elements***
    //cardback itself
    let cardBack = document.createElement('div')
    let backLabel = document.createElement('p')
    //ability label and list
    let abilityLabel = document.createElement('h1')
    let abilityList = document.createElement('ul')
    //move label and list
    let statsLabel = document.createElement('h1')
    let pokeWeight = document.createElement('h1')
    let pokeHeight = document.createElement('h1')
    //***assign values***
    backLabel.textContent = pokemon.name
    //abilities
    abilityLabel.textContent = 'Abilities:'
    pokemon.abilities.forEach(ability =>{
        let abilityName = document.createElement('li')
        abilityName.textContent = ability.ability.name
        abilityList.appendChild(abilityName)
    })
    //moves
    statsLabel.textContent = 'Other Stats:'
    pokeHeight.textContent = `Height: ${pokemon.height}`
    pokeWeight.textContent = `Weight: ${pokemon.weight}`
    //***assign class names***
    //back label
    backLabel.className = 'backlabel'
    //abilities
    abilityLabel.className = 'abilitylabel'
    abilityList.className = 'abilitylist'
    //moves
    statsLabel.className = 'abilitylabel'
    pokeWeight.className = 'mostpow'
    pokeHeight.className = 'mostpow'
    //card back overall
    cardBack.className = 'cardface cardface--back'
    //***append***
    //back label
    cardBack.appendChild(backLabel)
    //abilities
    cardBack.appendChild(abilityLabel)
    cardBack.appendChild(abilityList)
    //moves
    cardBack.appendChild(statsLabel)
    cardBack.appendChild(pokeHeight)
    cardBack.appendChild(pokeWeight)
    //and finally, return the whole cardback
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



function addAbility(abname) {
    this.name = abname;
}
//custom object code here
function Pokemon(name, type, height, weight, abilities, moves) {
    this.name = name
    this.type = type
    this.height = height
    this.weight = weight
    this.abilities = abilities;
    this.id = 100
    this.moves = moves
}
//new card creator function
function createNewCard(name) {
    return new Pokemon(name, 'Student', '6 foot', '120', 'juggling', ['Overwork', 'Eat Burrito'])
}

//new CUSTOM card displayer function (we should probably make a single displaycard function)
//(but this is faster than error fixes for now)
//dot notation used to access constructors/objects here, and earlier too
function populateCustomCard(pokemon) {
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
    })
    //build the scene
    card.appendChild(CpopulateFront(pokemon))
    card.appendChild(CpopulateBack(pokemon))
    cardScene.appendChild(card)
    //add the scene to the grid
    cardGrid.appendChild(cardScene)
}
//function to populate the card front
function CpopulateFront(pokemon) {
    //create elements
    let cardFront = document.createElement('div')
    let frontLabel = document.createElement('p')
    let frontImage = document.createElement('img')
    let frontButtons = document.createElement('h1')
    //assign values
    frontLabel.textContent = pokemon.name
    frontButtons.textContent = `+ O`
    frontImage.src = `https://static-cdn.jtvnw.net/emoticons/v1/1038939/3.0`
    //assign class names
    cardFront.className = 'cardface cardface--front'
    frontLabel.className = 'frontlabel'
    frontButtons.className = 'frontbuttons'
    frontImage.className = 'frontimage'
    //append
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    cardFront.appendChild(frontButtons)
    return cardFront
}
//function to populate the card back
function CpopulateBack(pokemon) {
    //***create elements***
    //cardback itself
    let cardBack = document.createElement('div')
    let backLabel = document.createElement('p')
    //ability label and list
    let abilityLabel = document.createElement('h1')
    let abilityList = document.createElement('ul')
    //move label and list
    let statsLabel = document.createElement('h1')
    let pokeWeight = document.createElement('h1')
    let pokeHeight = document.createElement('h1')
    //***assign values***
    backLabel.textContent = pokemon.name
    //abilities
    abilityLabel.textContent = 'Abilities:'
    abilityList.textContent = pokemon.abilities
    //moves
    statsLabel.textContent = 'Other Stats:'
    pokeHeight.textContent = `Height: ${pokemon.height}`
    pokeWeight.textContent = `Weight: ${pokemon.weight}`
    //***assign class names***
    //back label
    backLabel.className = 'backlabel'
    //abilities
    abilityLabel.className = 'abilitylabel'
    abilityList.className = 'abilitylist'
    //moves
    statsLabel.className = 'abilitylabel'
    pokeWeight.className = 'mostpow'
    pokeHeight.className = 'mostpow'
    //card back overall
    cardBack.className = 'cardface cardface--back'
    //***append***
    //back label
    cardBack.appendChild(backLabel)
    //abilities
    cardBack.appendChild(abilityLabel)
    cardBack.appendChild(abilityList)
    //moves
    cardBack.appendChild(statsLabel)
    cardBack.appendChild(pokeHeight)
    cardBack.appendChild(pokeWeight)
    //and finally, return the whole cardback
    return cardBack
}