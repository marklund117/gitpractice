//import data
//stored in a different folder
//random comment lol
import { vehicles } from '../DATA/vehicles.js'
import { planets } from '../DATA/planets.js'

//log a message to the console to confirm we are working with HTML
console.log("main.js has logged to the console")

//define main with queryselector
const main = document.querySelector('main')

//load stuff up
planetGrid(planets)

//create a header
const mainHeader = document.createElement('header')
//give it a class
mainHeader.className = 'swheader'
//add it to the main
document.body.insertBefore(mainHeader, main)

//button time
const sortPop = document.createElement('button')
sortPop.textContent = 'High Population Planets'
mainHeader.appendChild(sortPop)

//make one for small pops
const sortPopLow = document.createElement('button')
sortPopLow.textContent = 'Low Population Planets'
mainHeader.appendChild(sortPopLow)

//unknown planets
const sortPopUnk = document.createElement('button')
sortPopUnk.textContent = 'Unknown Population Planets'
mainHeader.appendChild(sortPopUnk)

//and one to link to vehicles
const vButton = document.createElement('button')
vButton.textContent = 'Vehicles'
mainHeader.appendChild(vButton)

//presorting
const bigPlanets = planets.filter(planet => planet.population >= 1000000)
//console.log(bigPlanets)

const smallPlanets = planets.filter(planet => planet.population < 1000000)

const unkPlanets = planets.filter(planet => planet.population === 'unknown')

//what should big planet button do if clicked
sortPop.addEventListener('click', event => {
    planetGrid(bigPlanets)
})

//what should small planet button do if clicked
sortPopLow.addEventListener('click', event => {
    planetGrid(smallPlanets)
})

//what should unknown planet button do if clicked
sortPopUnk.addEventListener('click', event => {
    planetGrid(unkPlanets)
})

//func to populate planets
function planetGrid(planets) {
    killYounglings(main)
    planets.forEach((element) => {
        //make a figure
        const displayplanet = document.createElement('figure')
        //make img
        const planetPic = document.createElement('img')
        //assign value to img
        planetPic.src = `https://starwars-visualguide.com/assets/img/planets/${element.url.split('/')[5]}.jpg`
        //make caption
        const planetCaption = document.createElement('figcaption')
        //assign value to caption
        planetCaption.textContent = element.name
        //listen for error
        planetPic.addEventListener('error', event => {
            console.log(event)
            console.log(`image not found for item #${element.url.split('/')[5]}`)
            planetPic.hidden = true
            //genius level
        })

        //append
        displayplanet.appendChild(planetPic)
        displayplanet.appendChild(planetCaption)

        main.appendChild(displayplanet)
    })
}

//loop to display a figure of each vehicle in vehicles.js
vButton.addEventListener('click', event => {
    killYounglings(main)
    for (const vehicle of vehicles) {
        //create a figure
        let figure = document.createElement('figure')
        //create an img
        let figImg = document.createElement('img')
        //use split to extract the vehicles ID number from the URL in the data and display the correct image
        figImg.src = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.split('/')[5]}.jpg`
        //create the caption
        let figCaption = document.createElement('figcaption')
        //give the caption the value of the vehicles name
        figCaption.textContent = vehicle.name

        figImg.addEventListener('error', event => {
            console.log(event)
            console.log(`image not found for item #${vehicle.url.split('/')[5]}`)
            figImg.hidden = true
            //genius level
        })

        //add the image and caption to the figure
        figure.appendChild(figImg)
        figure.appendChild(figCaption)
        //append the figure to the main page
        main.appendChild(figure)

        //(old) testing getting the vehicle number from split
        console.log(vehicle.url.split('/')[5]);
    }

})

//anakin time
function killYounglings(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
