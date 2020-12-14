//this is the control file for the senators page
//this code contains: map, reduce
//import/export statements

//import export here
//import data
import {senators} from '../DATA/senatorsfile.js'

//import child remover function (which was exported from utils)
import {killYounglings} from '../UTILS/index.js'

//define the senategrid
const senateGrid = document.querySelector('.senategrid')

//button logic
const senButton = document.querySelector('#senioritybutton')
const birButton = document.querySelector('#bdaybutton')
const truButton = document.querySelector('#truthbutton')

//event listener for seniority button
//sort from low to high
senButton.addEventListener('click', () => {
    seniorSort ()
})

//event listener for birthday button
birButton.addEventListener('click', () => {
    bdaySort ()
})

//let the truth be revealed
truButton.addEventListener('click', () => {
    theSenate ()
})

//function to populate an individual senator card
function populateSenateGrid(sendata) {
    //clear the grid
    killYounglings(senateGrid)
    sendata.forEach(senator => {
        //**DEFINE ELEMENTS**
    //start with a scene
    let cardScene = document.createElement('div')
    //create card fig to go inside the scene
    let cardFig = document.createElement('figure')
    //card image
    let cardImg = document.createElement('img')
    //card caption
    let cardCap = document.createElement('figcaption')
    //create icon
    let cardIcon = document.createElement('i')
    //create seniority tag
    let cardSen = document.createElement('p')
    //create age tag
    let cardDOB = document.createElement('p')
    //**ASSIGN CLASS NAMES**
    //assign cardScene a class name
    cardScene.className = 'cardscene'
    //assign cardfig a class name
    cardFig.className = 'cardfig'
    //assign cardimg a class name
    cardImg.className  = 'cardimg'
    //assign cardcap a class name
    cardCap.className = 'cardcap'
    //assign cardicon a class name based on party
    if (senator.party === 'R') cardIcon.className = 'fas fa-republican'
    if (senator.party === 'D') cardIcon.className = 'fas fa-democrat'
    if (senator.party === 'ID') cardIcon.className = 'fas fa-flag-usa'
    //assign seniority tag a class name
    cardSen.className = 'cardsen'
    //assign age tag a class name
    cardDOB.className = 'carddob'
    //**FILL CONTENT**
    cardImg.src = senator.imgURL
    cardCap.textContent = senator.name
    cardSen.textContent = `Seniority: ${senator.seniority}`
    cardDOB.textContent = `Born: ${senator.birthday}`
    //build the scene
    cardCap.appendChild(cardIcon)
    cardFig.appendChild(cardImg)
    cardFig.appendChild(cardCap)
    cardScene.appendChild(cardFig)
    cardScene.appendChild(cardSen)
    cardScene.appendChild(cardDOB)
    //add the scene to the grid
    senateGrid.appendChild(cardScene)
    })
}

//map here
//function to get a simpler senator object with only the properties we need via map
function simplifySenators(senArray) {
    return senArray.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name} `,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: parseInt(senator.seniority, 10),
            missedVotes: senator.missed_votes_pct,
            party: senator.party,
            loyalty: senator.votes_with_party_pct,
            birthday: senator.date_of_birth
        }
    })
}

//reduce here
//find most seniority
const mostSenior = simplifySenators(senators).reduce((acc, senator) => acc.seniority >senator.seniority ? acc: senator)

//missed votes function
const missedVoting = simplifySenators(senators).reduce((acc, senator) => acc.missedVotes >senator.missedVotes ? acc: senator)

//find the most loyal senators
//create an array for them
let loyalArr = []

//push 100% loyalty members into it
const theLoyals = simplifySenators(senators).reduce((acc, senator) => {
    if (senator.loyalty === 100) {
        loyalArr.push(senator)
    }
    return acc.loyalty > senator.loyalty ? acc : senator
})

//sort by seniority
function seniorSort () {
    populateSenateGrid(simplifySenators(senators).sort((a, b) => {
        return parseInt(a.seniority) - parseInt(b.seniority)
    }))
}

//sort by birthday
function bdaySort () {
    populateSenateGrid(simplifySenators(senators).sort((a, b) => {
        return parseInt(a.birthday) - parseInt(b.birthday)
    }))
}

//the truth can be disturbing
function theSenate () {
    //clear the way for the truth
    killYounglings(senateGrid)
    //create elements to show the truth
    let sheevDiv = document.createElement('div')
    let sheevCard = document.createElement('div')
    let sheevFig = document.createElement('figure')
    let sheev = document.createElement('img')
    let sheevcap = document.createElement('figcaption')
    //class names
    sheevDiv.className = 'sheevdiv'
    sheevCard.className = 'sheevcard'
    sheevFig.className = 'sheevfig'
    sheev.className = 'sheev'
    sheevcap.className = 'sheevcap'
    //assign values
    sheev.src = '../DATA/truthimage.png'
    sheevcap.textContent = 'Sheev Palpatine'
    //let it be shown to all
    sheevFig.appendChild(sheev)
    sheevFig.appendChild(sheevcap)
    sheevCard.appendChild(sheevFig)
    sheevDiv.appendChild(sheevCard)
    senateGrid.appendChild(sheevDiv)
}

//show all senators
populateSenateGrid(simplifySenators(senators))



