'use strict';

import { deck } from "./kaartBoek.js";

//     spilt(){
//         player.splitHand = player.hand.pop;
//         split.classList.toggle('display');
//     }
// }

// Init Variables

let playerHand = [], dealerHand = [], splitHand = [];
let playerHandValue = 0, dealerHandValue = 0, dealerFirstCardValue = 0, playerSplitHandValue = 0;
let playerCanSplit = false;
let playerTurn = true;
let splitTurn = false;
let gameDeck = deck.kaarten;

let playerAce = 0;
let splitAce = 0;
let dealerAce = 0;

const challengesSFW = ["Ga 15 keer pompen" , "doe 20 jumping jacks", "plank 1 minuut", "doe 20 situps", "doe 25 calf raises", "doe 15 squats"];
const challengesNSFW = ["3 slokken bier" , "1 shotje", "at biertje", "draai 10 rondjes", "mix random cocktail", "bel je moeder", "2 slokken bier","4 slokken bier"];

// Set display none
const playingFieldBox = document.querySelector('section.playingField-box');
playingFieldBox.style.display = 'none';
const splitBtn = document.getElementById('split');
splitBtn.style.display = 'none';
const doubleBtn = document.getElementById('double');
doubleBtn.style.display = 'none';
const splitWaarde = document.querySelector('.splitWaarde');
splitWaarde.style.display = 'none';

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
const splitCards = document.querySelector('.player1PlaceHolderSplit')
const playerCardsValue = document.querySelector('.playerCardsValue')
const splitCardsValue = document.querySelector('.playerCardsSplitValue')
const dealerCards = document.querySelector('.dealerCards');
const drawSound = new Audio('./assets/draw.mp3');
const shuffleSound = new Audio('./assets/shuffle.mp3');
const dealerCardsValue = document.querySelector('.dealerCardsValue');

playerCards.style.display='flex';
// Game Functions

function drawCardsPlayer() {
    for (let i = 0 ; i < 2 ; i++) {
        let randomkaart = gameDeck.shift();
        playerHand.push(randomkaart);
    }
    playerHand.forEach(card => {
        playerHandValue += card.spelWaarde;
        if (card.spelWaarde===11){
            playerAce+=1;
        }
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
        if (card.spelWaarde===11){
            dealerAce+=1;
        }
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
    if (randomkaart.spelWaarde===11){
        playerAce+=1;
    }
    if (playerAce>0){
        if (playerHandValue>21){
            playerHandValue-=10;
            playerAce-=1;
        }
    }
    if (playerHandValue===21 && splitTurn){
        playerCards.style.display='none'
        splitCards.style.display='flex'
    }
    playerCardsValue.innerHTML = `${playerHandValue}`;
}

function drawCardSplitPlayer() {
    let randomkaart = gameDeck.shift();
    console.log(splitHand)
    splitHand.push(randomkaart);
    splitCards.insertAdjacentHTML('beforeend', `<span class="card ir ${randomkaart.kaartSoort}${randomkaart.kaartWaarde}"></span>`);
    playerSplitHandValue += randomkaart.spelWaarde;
    if (randomkaart.spelWaarde===11){
        splitAce+=1;
    }
    if (splitAce>0){
        if (playerSplitHandValue>21){
            playerSplitHandValue-=10;
            splitAce-=1;
        }
    }
    splitCardsValue.innerHTML = `${playerSplitHandValue}`;
}

function drawCardDealer() {
    let randomkaart = gameDeck.shift();
    dealerHand.push(randomkaart);
    dealerHandValue += randomkaart.spelWaarde;
    if (randomkaart.spelWaarde===11){
        dealerAce+=1;
    }
    if (dealerAce>1){
        if (dealerHandValue>21){
            dealerAce-=1;
            dealerHandValue-=10;
        }
    }
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
        if (!splitTurn){
            dealerPlay();
        } 
    }
}

function dealerPlay(){
    if (playerHandValue>21 && playerSplitHandValue>21){
        console.log('busted')
        dealerWhenBusted()
    }
    if (dealerHandValue>16){
        console.log('heb al meer dan 16')
        dealerWhenBusted()
    } else {
        console.log(dealerCardsValue)
    while((dealerHandValue<playerHandValue || dealerHandValue<playerSplitHandValue) && dealerHandValue<17 && (playerHandValue<=21 || playerSplitHandValue<=21)){
        console.log('hey')
        drawCardDealer();
}
dealerWhenBusted()
}
    checkWinner();
}

function checkWinner(){
    if(playerHandValue > 21 && playerSplitHandValue>21){
        console.log('You busted')
    }
    else if(playerHandValue < dealerHandValue && playerSplitHandValue < dealerHandValue && dealerHandValue <= 21){
        console.log("You lost");
        challengesNSFW[challengesNSFW.length-1];
    }
    else if(21>playerHandValue > dealerHandValue || 21>playerSplitHandValue > dealerHandValue || dealerHandValue > 21){
        console.log("You won");
    }
    else if(playerHandValue === dealerHandValue || dealerHandValue === playerSplitHandValue){
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
        console.log(splitTurn)
        if(playerHandValue===21){
            playerTurn=false;
        }
        if (playerHandValue>21){
            playerTurn =false;
            console.log(splitTurn)
            if (!splitTurn){
                dealerWhenBusted()
            } else{
                playerCards.style.display='none'
            splitCards.style.display='flex'
            }
        }
        if (playerCanSplit) {
            splitBtn.style.display = 'none';
        }
    } else if (splitTurn && playerSplitHandValue<21) {
        drawCardSplitPlayer();
        checkValue();
        if (playerSplitHandValue===21){
            dealerPlay()
        }
        if (playerSplitHandValue>21){
            dealerPlay()
        }
    }
});

const standBtn = document.querySelector('#stand');
standBtn.addEventListener('click', function () {
    if (playerTurn){
        playerTurn = false;
        if (!splitTurn){
            dealerPlay();
        } else{
            playerCards.style.display='none';
            splitCards.style.display='flex';
        }
    } else {
        splitTurn = false;
        dealerPlay();
    }
});

function startGame() {
    drawCardsPlayer();
    drawCardsDealer();
    if (playerHandValue === 21) {
        dealerPlay();
    }
    if (checkSplit()) {
        splitBtn.style.display = null;
    }
    console.log(playerHandValue);
    console.log(dealerHandValue)
}

function split() {
    splitCards.insertAdjacentHTML('beforeend', `<span class="card ir ${playerHand[1].kaartSoort}${playerHand[1].kaartWaarde}"></span>`);
    playerCards.removeChild(playerCards.children[1])
    if (playerHand[1].spelWaarde===11){
        playerAce -= 1;
        splitAce += 1;
    }
    playerHandValue -= playerHand[1].spelWaarde;
    playerSplitHandValue += playerHand[1].spelWaarde;
    splitHand.push(playerHand[1])
    playerHand.pop();
    playerCardsValue.innerHTML = `${playerHandValue}`;
    splitCardsValue.innerHTML = `${playerSplitHandValue}`;
}


splitBtn.addEventListener('click', function () {
    splitBtn.style.display='none'
    splitWaarde.style.display='block'
    splitTurn = true;
    split()
})

function stopGame() {
    
}

// Game

startGame();

console.log(playerHand);
console.log(dealerHand);