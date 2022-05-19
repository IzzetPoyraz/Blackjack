const split = document.querySelector("#split");
const hit = document.querySelector("#hit");
const stand = document.querySelector("#stand");
const double = document.querySelector("#double");

const p1Kaart = docuement.querySelector(`.player1PlaceHolder > span:nth-child(${kaartIncex})`);
hit.addEventListener('click', play);
stand.addEventListener('click', () => {
    playerStand = 1;
    play();
});
spilt('click', split());

