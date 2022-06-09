'use strict';

const SOORT = ['H', 'K', 'R', 'S'];
const WAARDE = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'B', 'D', 'H', 'A'];
const SPELWAARDE = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
    
class KaartBoek {
    constructor(kaarten) {
        this.kaarten = kaarten;
    }
}
 
class Kaart {
    constructor(kaartSoort, kaartWaarde, spelWaarde) {
        this.kaartSoort = kaartSoort;
        this.kaartWaarde = kaartWaarde;
        this.spelWaarde = spelWaarde;
    }
}

// maak deck aan
export const nieuwDeck = function() {
        
    const kaarten = [];
        
    for (let i = 0 ; i < WAARDE.length ; i++) {
        for (let j = 0 ; j < SOORT.length ; j++) {
            kaarten.push(new Kaart(SOORT[j], WAARDE[i], SPELWAARDE[i]));
        }
    }
        
    kaarten.forEach(element => {
        kaarten.push(element);
    });
        
    return kaarten;
}
    
export const deck = new KaartBoek(nieuwDeck());



// shuffle deck
const shuffleDeck = function(kaarten) {
    for (let i = 0 ; i < kaarten.length ; i++) {
        let tempKaart = kaarten[i];
        let randomIndex = Math.floor(Math.random() * 104);
        kaarten[i] = kaarten[randomIndex];
        kaarten[randomIndex] = tempKaart;
    }

    return kaarten;
}

shuffleDeck(deck.kaarten);
console.log(deck);
