addEventListener('hashchange', update);
document.addEventListener('click', playVoice);

const urlParams = new URLSearchParams(location.search);
const lang = !urlParams.has('lang') ? 'de' : urlParams.get('lang');

const data = {};

fetch('assets/'+ lang +'.json')
    .then(response => response.json())
    .then(init)
    .then(update);

function init(json) {
    data.anlaute = new Anlaute(json.anlaute);
    data.dict = json.dict;

    document.querySelector('#prev').textContent = json.prevButtonLabel;
    document.querySelector('#next').textContent = json.nextButtonLabel;
}

const $links = document.querySelectorAll('a');
const $capitalLetter = document.querySelector('#capital-letter');
const $smallLetter = document.querySelector('#small-letter');
const $symbols = document.querySelector('#symbols');

function update() {
    const urlFragment = decodeURIComponent(location.hash);
    const currentAnlaut = urlFragment === '' ? 'a' : urlFragment.slice(1).toLowerCase(); // cutting of #

    $links[0].href = '#' + data.anlaute.prev(currentAnlaut);
    $links[1].href = '#' + data.anlaute.next(currentAnlaut);

    $capitalLetter.textContent = currentAnlaut.replace(currentAnlaut[0], currentAnlaut[0].toUpperCase()); // capitalize only first letter
    $smallLetter.textContent = currentAnlaut;

    drawSymbols(currentAnlaut);
}

function playVoice(event) {
    if (!event.target.classList.contains('audio-trigger')) return;

    new Audio(event.target.dataset.audioSource).play()
}

class Anlaute {
    #values;

    constructor(values) {
        this.#values = values;
    }

    #get(letter, offset) {
        let index = this.#values.indexOf(letter) + offset;

        index = index < 0 ? this.#values.length - 1 : index % this.#values.length;

        return this.#values[index];
    }

    next(letter) {
        return this.#get(letter, 1);
    }

    prev(letter) {
        return this.#get(letter, -1);
    }
}