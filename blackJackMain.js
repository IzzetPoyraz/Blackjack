const split = document.querySelector("#split");
const hit = document.querySelector("#hit");
const stand = document.querySelector("#stand");
const double = document.querySelector("#double");

const p1Kaart = docuement.querySelector(`.player1PlaceHolder > span:nth-child(${kaartIncex})`);
hit.addEventListener('click', drawCards());
stand.addEventListener('click', stand())


spilt('click', blackJack.split());

import { deck } from "./kaartBoek.js";

class blackJack {
    constructor() {
        this.deck = deck;
    }
    startGame() {
        let dealer = new Dealer();
        let player = new Player();
    
    }
    checkSplit() {
        if(player.hand[0] === player.hand[1]){
            split.classList.toggle('display');
            return true;
        }
        else{
            false;
        }
    }
    spilt(){
        player.splitHand = player.hand.pop;
        split.classList.toggle('display');
    }
        



}

class Dealer {
    hand = [];
    totaleKaartWaarde;
}

class Player {
    hand = [];
    splitHand = [];
    totaleKaartWaarde;
}


function drawCards() {
    let hand = [];
}
