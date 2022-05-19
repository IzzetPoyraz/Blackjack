'use strict';

import "KaartBoek.js"

let playerTotal = 0;
let playerSTotal = 0;
let dealerTotal = 0;
let acePlayer = 0;
let acePlayerS = 0;
let aceDealer = 0;
let player = [d,1];
let playerStand = 0;
let playerSStand = 0;
let dealerStand = 0;

function selectCard () {
    return deck.kaarten.shift();
}

function waardeGroter (totaal, ace) {
    if (totaal>21){
        if (ace>0){
            totaal-=10
            return totaal
        } else {
            return totaal
        }
    } else {
        return totaal
    }
}

function aceTeller (card){
    if (card.SPELWAARDE===11){
        return 1
    } else {return 0}
}

function pickCard (player) {
    if (player===0){
        let pickedCard = selectCard()
        dealerTotal+=pickedCard.SPELWAARDE
        aceDealer+=aceTeller(pickedCard)
        if (waardeGroter(playerTotal, aceDealer)>21){
            // afhandeling na bust
        }

    } else if (player === 1 || player === "1s"){
        pickedCard = selectCard()
        playerTotal+=pickedCard.SPELWAARDE
        acePlayer+=aceTeller(pickedCard)
        if (waardeGroter(playerTotal, acePlayer)>21){
            // afhandeling na bust
        }
    }
}

function split(player){

}

function play () {
    if (playerStand){
        pickCard(player)
    } else{
        player=0
        while (dealerStand){
            pickCard(player)
        }
    }
}
