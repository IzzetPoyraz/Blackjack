(() =>{

'use strict'

const een = document.querySelector('#eenPunten')
const vijf = document.querySelector('#vijfPunten')
const vijventwintig = document.querySelector('#vijventwintigPunten')
const fijftig = document.querySelector('#fijftigPunten')
const honderd = document.querySelector('honderdPunten')
const vijfhonderd = document.querySelector('vijfhonderdPunten')
const duizend = document.querySelector('duizendPunten')

let betAmount = 0;
let chipsTotaal = 1000;

function check (value){
    if (value>chipsTotaal){
        return false
    } else {
        return true
    }
}

function bet (value){
    if (check(value)){
        betAmount+=value
        chipsTotaal-=value
        console.log(betAmount)
        console.log(chipsTotaal)
    }
}

een.addEventListener("click", () =>{
    bet(1)
})
vijf.addEventListener("click", () =>{
    bet(5)
})
vijventwintig.addEventListener("click", () =>{
    bet(25)
})
fijftig.addEventListener("click", () =>{
    bet(50)
})
honderd.addEventListener("click", () =>{
    bet(100)
})
vijfhonderd.addEventListener("click", () =>{
    bet(500)
})
duizend.addEventListener("click", () =>{
    bet(1000)
})
})()