(() =>{

'use strict'

const een = document.querySelector('#eenPunten')
const vijf = document.querySelector('#vijfPunten')
const vijventwintig = document.querySelector('#vijventwintigPunten')
const fijftig = document.querySelector('#fijftigPunten')
const honderd = document.querySelector('#honderdPunten')
const vijfhonderd = document.querySelector('#vijfhonderdPunten')
const duizend = document.querySelector('#duizendpunten')
const reset = document.querySelector('.reset')
const betIndicator = document.querySelector('#betamount')

let betAmount = 0;
let chipsTotaal = 10000;

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
        betIndicator.textContent=betAmount
    }
}

function resetBet (){
    chipsTotaal+=betAmount
    betAmount=0
    console.log(betAmount)
    console.log(chipsTotaal)
    betIndicator.textContent=betAmount
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
reset.addEventListener("click", () =>{
    if (chipsTotaal!==chipsTotaal+betAmount){
        resetBet()
    }
})
})()