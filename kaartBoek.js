'use strict';

const SOORT = ['H', 'K', 'R', 'S'];
const WAARDE = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'B', 'D', 'H', 'A']
const SPELWAARDE = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '10', '10', '10', '11']
    
    class KaartBoek {
        constructor(kaarten = nieuwDeck()) {
            this.kaarten = kaarten;
        }
    }
    
    class Kaart {
        constructor(kaartSoort, kaartWaarde) {
            this.kaartSoort = soort;
            this.kaartWaarde = waarde;
        }
    }
    
    function nieuwDeck() {
        return SOORT.flatMap(soort => {
            return WAARDE.map(waarde => {
                return new Kaart(soort, waarde)
            })
        })
    }
export const deck = new KaartBoek(nieuwDeck());

// shuffle deck
function shuffleDeck(kaarten) {
    for (let i = 0 ; i < kaarten.length ; i++) {
        let tempKaart = kaarten[i];
        let randomIndex = Math.floor(Math.random() * 104);
        kaarten[i] = kaarten[randomIndex];
        kaarten[randomIndex] = tempKaart;
    }

};