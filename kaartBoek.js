'use strict';

(function () {    
    const SOORT = ['H', 'K', 'R', 'S'];
    const WAARDE = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'B', 'D', 'H', 'A']
    
    class KaartBoek {
        constructor(kaarten = nieuwDeck()) {
            this.kaarten = kaarten;
            kaarten.forEach(element => {
                kaarten.push(element);
            });
        }
    }
 
    class Kaart {
        constructor(kaartSoort, kaartWaarde) {
            this.kaartSoort = kaartSoort;
            this.kaartWaarde = kaartWaarde;
        }
    }

    function nieuwDeck() {
        return SOORT.flatMap(soort => {
            return WAARDE.map(waarde => {
                return new Kaart(soort, waarde)
            })
        })
    }

    const deck = new KaartBoek();

    console.log(deck);
})();
  