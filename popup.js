const open = document.getElementById('open');
const close = document.getElementById('sluiten');
const popup_container = document.getElementById('popup_container');

open.addEventlistener('click', ()=>{
    popup_container.classList.add('show');
});
close.addEventlistener('click', ()=>{
    popup_container.classList.remove('show');
});