import { deck } from "./kaartBoek.js";

class blackJack {
    constructor() {
        this.deck = deck;
    }
    
    
    startGame() {
        let dealer = new Dealer();
        let player = new Player();
    
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


