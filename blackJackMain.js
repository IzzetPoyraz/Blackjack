'use strict';

//const p1Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(${kaartIncex})`);
// hit.addEventListener('click', drawCards());
// stand.addEventListener('click', stand())


// spilt('click', blackJack.split());

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

// class blackJack {
//     firstDraw = true;
//     constructor() {
//         this.deck = deck.kaarten;
//     }
//     startGame() {
//         const overlay = document.querySelector('.overlayStart');
//         overlay.style.display = 'none';
//     }
//     // neem kaarten van het geshuffelde deck
//     drawCards() {
//         let hand = [];
        
//         for (let i = 0 ; i < 2 ; i++) {
//             let randomkaart = this.deck.shift();
//             hand.push(randomkaart);
//         }
        
//         return hand;
//     }

//     drawCard(hand) {
//         let randomkaart = this.deck.shift();
//         hand.push(randomkaart);

//         return hand;
//     }

//     checkSplit() {
//         if(player.hand[0].spelWaarde === player.hand[1].spelWaarde){
//             split.classList.toggle('display');
//             return true;
//         }
//         else{
//             false;
//         }
//     }
//     spilt(){
//         player.splitHand = player.hand.pop;
//         split.classList.toggle('display');
//     }
// }


// class Person extends blackJack {
//     hand = [];
//     totaleKaartWaarde;
    
//     get cardValue() {
//         this.totaleKaartWaarde = 0;
//         for (let i = 0 ; i < this.hand.length ; i++) {
//             this.totaleKaartWaarde += this.hand[i].spelWaarde;
//         }
//         return this.totaleKaartWaarde;
//     }

//     stand() {

//     }

// }

// class Dealer extends Person{

// }

// class Player extends Person{
//     splitHand = [];
//     canSplit = false;
// }

// const game = new blackJack();
// const player = new Player();
// const dealer = new Dealer();
// const overlay = document.querySelector('.overlayStart');
// console.log(overlay);
// const startButton = document.getElementById('buttonPlay');
// startButton.addEventListener('click', game.startGame());

// Start game
// Maak objecten aan

// console.log(game.deck);
// console.log(player.hand);
// console.log(dealer.hand);

// console.log(player.cardValue);

// player.drawCard(player.hand);
// console.log(player.hand);
// console.log(player.cardValue);








// Init Variables

let playerHand = [], dealerHand = [];
let playerHandValue = 0, dealerHandValue = 0, playerSplitHandValue = 0;
let playerCanSplit = false;
let gameDeck = deck.kaarten;

//Select and control DOMelements

const startButton = document.getElementById('buttonPlay');
const overlay = document.querySelector('.overlayStart');
const coloredOverlay = document.querySelector('.overlay');
console.log(overlay)
startButton.addEventListener('click', function () {
    overlay.style.display = 'none';
    coloredOverlay.style.display = 'none';
});

// Game Functions

function drawCards(hand, handValue) {
            
    for (let i = 0 ; i < 2 ; i++) {
        let randomkaart = gameDeck.shift();
        hand.push(randomkaart);
    }

    handValue = hand.forEach(card => {
        handValue += card.spelWaarde;
    });

    placehholder.innerHTML = ""
    for (let i = 0 ; i < hand.length ; i++) {
        const item = hand[i];
        placeholderPlayer.innerHTML += `<span class="ir ${item.kaartSoort}${item.kaartWaarde}"></span>`
    }
}

function drawCard(hand) {
    let randomkaart = this.deck.shift();
    hand.push(randomkaart);

    placeholderPlayer.innerHTML += `<span class="ir ${item.kaartSoort}${item.kaartWaarde}"></span>`
}

function checkSplit() {
    if (player.hand[0].spelWaarde === player.hand[1].spelWaarde) {
        playerCanSplit = true;

    }
}

// Game

console.log(gameDeck)

drawCards(playerHand, playerHandValue);
console.log(playerHandValue);
drawCards(dealerHand, dealerHandValue);
console.log(dealerHandValue)


console.log(playerHand);
console.log(dealerHand);





