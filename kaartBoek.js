'use strict';

(function () {    
    const SOORT = ['H', 'K', 'R', 'S'];
    const WAARDE = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'B', 'D', 'H', 'A']
    
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

})();
  