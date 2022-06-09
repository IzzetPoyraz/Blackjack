'use strict';

import { deck } from "./kaartBoek.js";

//     spilt(){
//         player.splitHand = player.hand.pop;
//         split.classList.toggle('display');
//     }
// }

// Init Variables

let playerHand = [], dealerHand = [];
let playerHandValue = 0, dealerHandValue = 0, dealerFirstCardValue = 0, playerSplitHandValue = 0;
let playerCanSplit = false;
let playerTurn = true;
let gameDeck = deck.kaarten;

const challengesSFW = ["Ga 15 keer pompen" , "doe 20 jumping jacks", "plank 1 minuut", "doe 20 situps", "doe 25 calf raises", "doe 15 squats"];
const challengesNSFW = ["3 slokken bier" , "1 shotje", "at biertje", "draai 10 rondjes", "mix random cocktail", "bel je moeder", "2 slokken bier","4 slokken bier"];


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
    dealerHandValue += randomkaart.spelWaarde;
    dealerCardsValue.innerHTML = `${dealerHandValue}`
    Array.from(dealerCards.children).forEach(element => {
        if (element.classList.contains('B2')) {
            element.classList.remove('B2');
            element.classList.add(`${dealerHand[1].kaartSoort}${dealerHand[1].kaartWaarde}`)
        }
    });
    dealerCards.insertAdjacentHTML('beforeend', `<span class="card ir ${randomkaart.kaartSoort}${randomkaart.kaartWaarde}"></span>`);
    
}
function dealerWhenBusted() {
    dealerCardsValue.innerHTML = `${dealerHandValue}`
    Array.from(dealerCards.children).forEach(element => {
        if (element.classList.contains('B2')) {
            element.classList.remove('B2');
            element.classList.add(`${dealerHand[1].kaartSoort}${dealerHand[1].kaartWaarde}`)
        }
    });
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
    if (playerHandValue>21){
        console.log('busted')
        dealerWhenBusted()
    }
    if (dealerHandValue>16){
        console.log('heb al meer dan 16')
        dealerWhenBusted()
    } else {
        console.log(dealerCardsValue)
    while(dealerHandValue<playerHandValue && dealerHandValue<17 && playerHandValue<=21){
        console.log('hey')
        drawCardDealer();
}
}
    checkWinner();
}

function checkWinner(){
    dealerCardsValue.innerHTML = `${dealerHandValue}`
    if(playerHandValue > 21){
        console.log('You busted')
    }
    else if(playerHandValue < dealerHandValue && dealerHandValue <= 21){
        console.log("You lost");
        challengesNSFW[challengesNSFW.length-1];
    }
    else if(playerHandValue > dealerHandValue || dealerHandValue > 21){
        console.log("You won");
    }
    else if(playerHandValue === 21 && dealerHandValue === 21){
         console.log('draw');
    }
}

const hitBtn = document.querySelector('#hit');
console.log(hitBtn)
hitBtn.addEventListener('click', function () {
    checkValue();
    if (playerTurn && playerHandValue<21) {
        console.log(playerHandValue)
        drawCardPlayer();
        checkValue();
        if (playerHandValue>21){
            dealerWhenBusted()
        }
        if (playerCanSplit) {
            splitBtn.style.display = 'none';
        }
    }
});

const standBtn = document.querySelector('#stand');
standBtn.addEventListener('click', function () {
    dealerPlay();
    playerTurn === false;
});

function startGame() {
    drawCardsPlayer();
    if (playerHandValue === 21) {
        dealerPlay();
    }
    if (checkSplit()) {
        splitBtn.style.display = null;
    }
    console.log(playerHandValue);
    drawCardsDealer();
    console.log(dealerHandValue)
}

function stopGame() {
    
}

// Game

startGame();

console.log(playerHand);
console.log(dealerHand);