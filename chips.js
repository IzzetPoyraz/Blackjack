'use strict';

const een = document.querySelector('#1punten')
const vijf = document.querySelector('#5punten')
const vijventwintig = document.querySelector('#25punten')
const fijftig = document.querySelector('#50punten')
const honderd = document.querySelector('100punten')
const vijfhonderd = document.querySelector('500punten')
const duizend = document.querySelector('1000punten')

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