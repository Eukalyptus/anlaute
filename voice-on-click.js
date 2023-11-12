document.addEventListener('click', event => {
    if (!event.target.classList.contains('audio-trigger')) return;

    event.target.querySelector('audio').play();
});