'use strict';

//const p1Kaart = document.querySelector(`.player1PlaceHolder > span:nth-child(${kaartIncex})`);
// hit.addEventListener('click', drawCards());
// stand.addEventListener('click', stand())


// spilt('click', blackJack.split());

// const split = document.querySelector("#split");
// const hit = document.querySelector("#hit");
// const stand = document.querySelector("#stand");
// const double = document.querySelector("#double");

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
let playerHandValue = 0, dealerHandValue = 0, dealerFirstCardValue = 0, playerSplitHandValue = 0;
let playerCanSplit = false;
let playerTurn = true;
let gameDeck = deck.kaarten;


// Set display none
const playingFieldBox = document.querySelector('section.playingField-box');
playingFieldBox.style.display = 'none';
const splitBtn = document.getElementById('split');
splitBtn.style.display = 'none';
const doubleBtn = document.getElementById('double');
doubleBtn.style.display = 'none';

//Select and control DOMelements

const startButton = document.getElementById('buttonPlay');
const overlay = document.querySelector('.overlayStart');
const coloredOverlay = document.querySelector('.overlay');
startButton.addEventListener('click', function () {
    overlay.style.display = 'none';
    coloredOverlay.style.display = 'none';
    shuffleSound.play();
    playingFieldBox.style.display = null;
});

const playerCards = document.querySelector('.playerCards');
const playerCardsValue = document.querySelector('.playerCardsValue')
const dealerCards = document.querySelector('.dealerCards');
const drawSound = new Audio('./assets/draw.mp3');
const shuffleSound = new Audio('./assets/shuffle.mp3');
const dealerCardsValue = document.querySelector('.dealerCardsValue')

// Game Functions

function drawCardsPlayer() {
    for (let i = 0 ; i < 2 ; i++) {
        let randomkaart = gameDeck.shift();
        playerHand.push(randomkaart);
    }
    playerHand.forEach(card => {
        playerHandValue += card.spelWaarde;
        playerCards.insertAdjacentHTML('beforeend', `<span class="card ir ${card.kaartSoort}${card.kaartWaarde}"></span>`);
    });
    playerCardsValue.innerHTML = `${playerHandValue}`
}

function drawCardsDealer() {
    for (let i = 0 ; i < 2 ; i++) {
        let randomkaart = gameDeck.shift();
        dealerHand.push(randomkaart);
    }

    dealerHand.forEach(card => {
        dealerHandValue += card.spelWaarde;
    });
    dealerFirstCardValue = dealerHand[0].spelWaarde;

    dealerCards.insertAdjacentHTML('beforeend', `<span class="card ir ${dealerHand[0].kaartSoort}${dealerHand[0].kaartWaarde}"></span>`);
    dealerCards.insertAdjacentHTML('beforeend', `<span class="card ir B2"></span>`);
    dealerCardsValue.innerHTML = `${dealerFirstCardValue}?`

}

function drawCardPlayer() {
    let randomkaart = gameDeck.shift();
    playerHand.push(randomkaart);
    playerCards.insertAdjacentHTML('beforeend', `<span class="card ir ${randomkaart.kaartSoort}${randomkaart.kaartWaarde}"></span>`);
    playerHandValue += randomkaart.spelWaarde;
    playerCardsValue.innerHTML = `${playerHandValue}`;
}

function drawCardDealer() {
    let randomkaart = gameDeck.shift();
    dealerHand.push(randomkaart);
}

function checkSplit() {
    if (playerHand[0].spelWaarde === playerHand[1].spelWaarde) {
        playerCanSplit = true;
    }
    console.log(playerCanSplit);
    return playerCanSplit;
}
function checkValue(){
    if(playerHandValue>21){
        checkWinner();
    }
    if(playerHandValue===21){
        dealerPlay();
    }
}
function dealerPlay(){
    while(dealerHandValue<playerHandValue && dealerHandValue<=21){
        drawCardDealer;
    }
    checkWinner();
}
function checkWinner(){
    if(playerHandValue>21){
        console.log('You busted')
    }
    if(playerHandValue<dealerHandValue){
        console.log("You lost")
    }
    if(playerHandValue>dealerHandValue){
        console.log("You won");
    }
    if(playerHandValue === 21 && dealerHandValue === 21){
            console.log('draw');
    }
}

const hitBtn = document.querySelector('#hit');
console.log(hitBtn)
hitBtn.addEventListener('click', function () {
    drawCardPlayer();
});

// Game

drawCardsPlayer();
if (checkSplit()) {
    splitBtn.style.display = null;
}
console.log(playerHandValue);
drawCardsDealer();
console.log(dealerHandValue)

console.log(playerHand);
console.log(dealerHand);
