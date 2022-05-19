'use strict';

import "KaartBoek.js"

let playerTotal = 0;
let delerTotal = 0;
let acePlayer = 0;
let aceDeler = 0;
let player = 0;
let playerStand = 0;
let delerStand = 0;

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
        delerTotal+=pickedCard.SPELWAARDE
        aceDeler+=aceTeller(pickedCard)
        if (waardeGroter(playerTotal, aceDeler)>21){
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
function play () {
    if (playerStand){
        pickCard(player)
    } else{
        player=0
        while (delerStand){
            pickCard(player)
        }
    }
}