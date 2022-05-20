'use strict';

// const split = document.querySelector("#split");
// const hit = document.querySelector("#hit");
// const stand = document.querySelector("#stand");
// const double = document.querySelector("#double");

//const p1Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(${kaartIndex})`);
// hit.addEventListener('click', play);
// stand.addEventListener('click', () => {
//     playerStand = 1;
//     play();
// });

// spilt('click', split());
import { deck } from "./kaartBoek.js";

class blackJack {
    firstDraw = true;
    constructor() {
        this.deck = deck.kaarten;
    }
    
    // neem kaarten van het geshuffelde deck
    drawCards() {
        let hand = [];
        
        for (let i = 0 ; i < 2 ; i++) {
            let randomkaart = this.deck.shift();
            hand.push(randomkaart);
        }
        
        return hand;
    }

}

class Person extends blackJack {
    hand = [];
    totaleKaartWaarde = 0;
    
    get cardValue() {
        for (let i = 0 ; i < this.hand.length ; i++) {
            this.totaleKaartWaarde += this.hand[i].spelWaarde;
        }
        return this.totaleKaartWaarde;
    }

    stand() {

    }

}

class Dealer extends Person{

}

class Player extends Person{
    splitHand = [];
}

// Maak objecten aan
const game = new blackJack();
const dealer = new Dealer();
const speler = new Player();

// Deal elke speler en dealer eerste twee kaarten
speler.hand = speler.drawCards();
dealer.hand = dealer.drawCards();

console.log(game.deck);
console.log(speler.hand);
console.log(dealer.hand);

console.log(speler.cardValue)