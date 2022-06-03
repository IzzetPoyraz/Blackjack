'use strict';

//const p1Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(${kaartIncex})`);
// hit.addEventListener('click', drawCards());
// stand.addEventListener('click', stand())


// spilt('click', blackJack.split());

// const split = document.querySelector("#split");
// const hit = document.querySelector("#hit");
// const stand = document.querySelector("#stand");
// const double = document.querySelector("#double");

const p1Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(1)`);
const p2Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(2)`);
const p3Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(3)`);
const p4Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(4)`);
const p5Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(5)`);
const p6Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(6)`);

const d2Kaart = document.querySelector(`.dealerPlaceHolder > span:nth-child(2)`);
const d3Kaart = document.querySelector(`.dealerPlaceHolder > span:nth-child(3)`);
const d1Kaart = document.querySelector(`.dealerPlaceHolder > span:nth-child(1)`);
const d4Kaart = document.querySelector(`.dealerPlaceHolder > span:nth-child(4)`);
const d5Kaart = document.querySelector(`.dealerPlaceHolder > span:nth-child(5)`);
const d6Kaart = document.querySelector(`.dealerPlaceHolder > span:nth-child(6)`);

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
    startGame() {
        let dealer = new Dealer();
        let player = new Player();
    
    }
    // neem kaarten van het geshuffelde deck
    drawCards() {
        let hand = [];
        
        for (let i = 0 ; i < 2 ; i++) {
            let randomkaart = this.deck.shift();
            hand.push(randomkaart);
        }
        for (let i = 0 ; i < hand.length ; i++) {
            const item = hand[i];
            switch(i){
                case 0 : p1Kaart.className = '';
                p1Kaart.style.display = 'block';
                p1Kaart.classList.add('ir');
                p1Kaart.classList.add(`${item.kaartSoort}${item.kaartWaarde}`);
                console.log(`${item.kaartSoort}${item.kaartWaarde}`)
                break;
                case 1 : p2Kaart.className = '';
                p2Kaart.style.display = 'block';
                p2Kaart.classList.add('ir');
                p2Kaart.classList.add(`${item.kaartSoort}${item.kaartWaarde}`);
                break;
                case 2 : p3Kaart.className = '';
                p3Kaart.classList.add(`${item.kaartSoort}${item.kaartWaarde}`);
                p3Kaart.classList.add('ir');
                break;
                case 3 : p4Kaart.className = ''; 
                p4Kaart.classList.add(`${item.kaartSoort}${item.kaartWaarde}`);
                p4Kaart.classList.add('ir');
                break;
                case 4 : p5Kaart.className = '';
                p5Kaart.classList.add(`${item.kaartSoort}${item.kaartWaarde}`);
                p5Kaart.classList.add('ir');
                break;
                case 5 : p6Kaart.className = '';
                p6Kaart.classList.add(`${item.kaartSoort}${item.kaartWaarde}`);
                p1Kaart.classList.add('ir');
                break;
            }
            
        }
        return hand;
    }

    drawCard(hand) {
        let randomkaart = this.deck.shift();
        hand.push(randomkaart);

        return hand;
    }

    checkSplit() {
        if(player.hand[0].spelWaarde === player.hand[1].spelWaarde){
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


class Person extends blackJack {
    hand = [];
    totaleKaartWaarde;
    
    get cardValue() {
        this.totaleKaartWaarde = 0;
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
    canSplit = false;
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

console.log(speler.cardValue);

speler.drawCard(speler.hand);
console.log(speler.hand);
console.log(speler.cardValue);
