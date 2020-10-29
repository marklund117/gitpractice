//This is the main control file for the SWAPI project
import { starships } from './DATA/starships.js'

//log a message to the console to confirm we are working with HTML
console.log("main.js has logged to the console")

//console.log(starships.length)
//console.log(starships[0])

//const main_title = document.querySelector('.maintitle')

//main_title.textContent = 'bepis meme gamer'

//starships.forEach(element => console.log(element))

//const shipList = document.querySelector('.shipList')

//const newPara = document.createElement("p")

starships.forEach (starship => {
    let newPara = document.body.appendChild(document.createElement("p"))
    newPara.textContent = starship.name
})

