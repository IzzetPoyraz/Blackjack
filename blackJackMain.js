'use strict';

import { deck, nieuwDeck } from "./kaartBoek.js";

// Init Variables

let playerHand = [], dealerHand = [], splitHand = [];
let playerHandValue = 0, dealerHandValue = 0, dealerFirstCardValue = 0, playerSplitHandValue = 0;
let playerCanSplit = false;
let playerTurn = true;
let splitTurn = false;
let gameDeck = deck.kaarten;
let isSplit = false;

let playerAce = 0;
let splitAce = 0;
let dealerAce = 0;

const challengesSFW = ["Do 15 push-ups" , "Do 20 jumping jacks", "Plank for 1 minute", "Do 20 sit-ups", "Do 25 calf-raises", "Do 15 squats"];
const challengesNSFW = ["Do 15 push-ups" , "Stand up and do jumping jacks until your next turn", "Plank for 1 minute", "Do 20 sit-ups", "Do 25 calf-raises", "Do 15 squats", "Take 2 sips of beer",
"Take 3 sips of beer", "Take 4 sips of beer" , "Take a shot", "Shotgun beer", "Spin around 10 times", "Let someone mix a random cocktail for you", "Call your mother and put her on speaker", "Call your crush", 
"Eat a raw egg", "Exchange shirts with the player to your right", "Do 10 burpees"
];

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
const splitCards = document.querySelector('.player1PlaceHolderSplit');
const playerCardsValue = document.querySelector('.playerCardsValue');
const splitCardsValue = document.querySelector('.playerCardsSplitValue');
const dealerCards = document.querySelector('.dealerCards');
const drawSound = new Audio('./assets/draw.mp3');
const shuffleSound = new Audio('./assets/shuffle.mp3');
const dealerCardsValue = document.querySelector('.dealerCardsValue');
const nextButton = document.getElementById('buttonNext');
const winOrLose = document.querySelector('.finished h2');
const discription = document.querySelector('.finished p');
const endRoundOverlay = document.querySelector('.finished');


playerCards.style.display='flex';
// Game Functions

function drawCardsPlayer() {
    if (gameDeck.length < 2) {
        gameDeck = nieuwDeck();
    }
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
    if (playerAce===2){
        playerAce-=1;
        playerHandValue-=10;
    }
    playerCardsValue.innerHTML = `${playerHandValue}`;
}

function drawCardsDealer() {
    if (gameDeck.length < 2) {
        gameDeck = nieuwDeck();
    }
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
    if (dealerAce===2){
        dealerAce-=1;
        dealerHandValue-=10;
    }
    dealerCardsValue.innerHTML = `${dealerFirstCardValue}?`;
    if (playerHandValue===21){
        dealerPlay();
        setTimeout(checkWinner, 2000);
    }
}

function drawCardPlayer() {
    if (gameDeck.length < 1) {
        gameDeck = nieuwDeck();
    }
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
        playerCards.style.display='none';
        splitCards.style.display='flex';
    }
    drawSound.play();
    playerCardsValue.innerHTML = `${playerHandValue}`;
}

function drawCardSplitPlayer() {
    if (gameDeck.length < 1) {
        gameDeck = nieuwDeck();
    }
    let randomkaart = gameDeck.shift();
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
    if (gameDeck.length < 1) {
        gameDeck = nieuwDeck();
    }
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
    dealerCardsValue.innerHTML = `${dealerHandValue}`;
    Array.from(dealerCards.children).forEach(element => {
        if (element.classList.contains('B2')) {
            element.classList.remove('B2');
            element.classList.add(`${dealerHand[1].kaartSoort}${dealerHand[1].kaartWaarde}`);
        }
    });
    drawSound.play();
    dealerCards.insertAdjacentHTML('beforeend', `<span class="card ir ${randomkaart.kaartSoort}${randomkaart.kaartWaarde}"></span>`);
    
}
function dealerWhenBusted() {
    setTimeout(checkWinner, 2000)
    dealerCardsValue.innerHTML = `${dealerHandValue}`
    Array.from(dealerCards.children).forEach(element => {
        if (element.classList.contains('B2')) {
            element.classList.remove('B2');
            element.classList.add(`${dealerHand[1].kaartSoort}${dealerHand[1].kaartWaarde}`);
        }
    });
}

function checkSplit() {
    if (playerHand[0].kaartWaarde === playerHand[1].kaartWaarde) {
        playerCanSplit = true;
    }
    return playerCanSplit;
}

function checkValue(){
    if(playerHandValue===21){
        if (!splitTurn){
            dealerPlay();
        } 
    }
}

function dealerPlay(){
    if (playerHandValue>21 && playerSplitHandValue>21){
        dealerWhenBusted();
    }
    if (dealerHandValue>16){
        dealerWhenBusted();
    } else {
        while((dealerHandValue<playerHandValue || dealerHandValue<playerSplitHandValue) && dealerHandValue<17 && (playerHandValue<=21 || playerSplitHandValue<=21)){
        drawCardDealer();
    }
    setTimeout(checkWinner, 2000);
    dealerWhenBusted();
    }
    setTimeout(checkWinner, 2000);
}



function checkWinner(){
    if (isSplit){
        if(playerHandValue > 21 && playerSplitHandValue>21){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent='You busted!';
            discription.textContent=challengesNSFW[Math.floor(Math.random()*(challengesNSFW.length-1))];
        }
        else if((playerHandValue < dealerHandValue && playerSplitHandValue < dealerHandValue && dealerHandValue <= 21) || ((playerSplitHandValue === dealerHandValue && splitHand.length>dealerHand.length) && (playerHandValue === dealerHandValue && playerHand.length>dealerHand.length))){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent='You lose!';
            discription.textContent=challengesNSFW[Math.floor(Math.random()*(challengesNSFW.length-1))];
        }
        else if((21>playerHandValue && playerHandValue > dealerHandValue) || (playerSplitHandValue === dealerHandValue && splitHand.length<dealerHand.length) || (playerHandValue === dealerHandValue && playerHand.length<dealerHand.length) || (21>playerSplitHandValue && playerHandValue > dealerHandValue) || dealerHandValue > 21){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent='You won!!!';
            discription.textContent='Pass the device to the next player';
        }
        else if(playerHandValue === dealerHandValue || dealerHandValue === playerSplitHandValue){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent="It's a draw!!";
            discription.textContent='let someone do this challenge: '+ challengesNSFW[Math.floor(Math.random()*(challengesNSFW.length-1))];
        }
    } else {
        if(playerHandValue > 21){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent='You busted!!!';
            discription.textContent=challengesNSFW[Math.floor(Math.random()*(challengesNSFW.length-1))];
        }
        else if((playerHandValue < dealerHandValue && dealerHandValue <= 21) || (playerHandValue === dealerHandValue && playerHand.length>dealerHand.length)){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent='You lose!!!';
            discription.textContent=challengesNSFW[Math.floor(Math.random()*(challengesNSFW.length-1))];
        }
        else if(( 21 >= playerHandValue && playerHandValue > dealerHandValue) || (playerHandValue === dealerHandValue && playerHand.length<dealerHand.length) || dealerHandValue > 21){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent='You won!!!';
            discription.textContent='Pass the device to the next player';
        }
        else if(playerHandValue === dealerHandValue){
            endRoundOverlay.style.display = "flex";
            winOrLose.textContent="It's a draw!!";
            discription.textContent='let someone do this challenge: '+ challengesNSFW[Math.floor(Math.random()*(challengesNSFW.length-1))];
        }
    }
}

const hitBtn = document.querySelector('#hit');
hitBtn.addEventListener('click', function () {
    checkValue();
    if (playerTurn && playerHandValue<21) {
        drawCardPlayer();
        checkValue();
        if(playerHandValue===21){
            playerTurn=false;
            if (!splitTurn){
                setTimeout(checkWinner, 2000);
                dealerPlay();
            }
        }
        if (playerHandValue>21){
            playerTurn =false;
            if (!splitTurn){
                dealerWhenBusted();
            } else{
                playerCards.style.display='none';
                splitCards.style.display='flex';
            }
        }
        if (playerCanSplit) {
            splitBtn.style.display = 'none';
        }
    } else if (splitTurn && playerSplitHandValue<21) {
        drawCardSplitPlayer();
        checkValue();
        if (playerSplitHandValue===21){
            dealerPlay();
        }
        if (playerSplitHandValue>21){
            dealerPlay();
        }
    }
});

const standBtn = document.querySelector('#stand');
standBtn.addEventListener('click', function () {
    if (playerTurn){
        playerTurn = false;
        if (!splitTurn){
            dealerPlay();
            setTimeout(checkWinner, 2000);
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
}

function split() {
    splitCards.insertAdjacentHTML('beforeend', `<span class="card ir ${playerHand[1].kaartSoort}${playerHand[1].kaartWaarde}"></span>`);
    playerCards.removeChild(playerCards.children[1]);
    if (playerHand[1].spelWaarde===11){
        playerAce -= 1;
        splitAce += 1;
    }
    playerHandValue -= playerHand[1].spelWaarde;
    playerSplitHandValue += playerHand[1].spelWaarde;
    splitHand.push(playerHand[1]);
    playerHand.pop();
    playerCardsValue.innerHTML = `${playerHandValue}`;
    splitCardsValue.innerHTML = `${playerSplitHandValue}`;
}


splitBtn.addEventListener('click', function () {
    splitBtn.style.display='none';
    splitWaarde.style.display='block';
    splitTurn = true;
    isSplit = true;
    split();
})

function stopGame() {
    
}

// Game

startGame();

const removeCards = function (){
    splitBtn.style.display='none';
    splitWaarde.style.display='none';
    splitCards.innerHTML = "";
    playerCards.innerHTML = "";
    dealerCards.innerHTML = "";
    playerHand=[];
    splitHand=[];
    dealerHand=[];
    playerHandValue=0;
    playerSplitHandValue=0;
    dealerHandValue=0;
    playerAce = 0;
    splitAce = 0;
    dealerAce = 0;
    playerCanSplit = false;
    playerTurn = true;
    splitTurn = false;
    isSplit = false;
}

const next = function () {
    startGame();
    overlay.style.display = 'none';
    coloredOverlay.style.display = 'none';
    shuffleSound.play();
    playerCards.style.display = null;
    playingFieldBox.style.display = null;
}

nextButton.addEventListener('click', function(){
    endRoundOverlay.style.display = "none";
    removeCards();
    next();
});
