(() =>{
    const play = document.querySelector('.ButtonPlay')
    const overlayStart = document.querySelector('.overlayStart')
    const overlay = document.querySelector('.overlay')

    play.addEventListener('click', e =>{
    overlayStart.style.display='none'
    overlay.style.display='none'
})
})()