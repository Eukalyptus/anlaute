const textCenters = [{x:60, y:100}, {x:340, y:100}, {x:60, y:270}, {x:340, y:270}];
const imagePositions = [{x:20, y:20}, {x:280, y:20}, {x:20, y:180}, {x:280, y:180}];

function drawSymbols(anlaut) {
    $symbols.textContent = '';

    const symbols = fisherYatesShuffle(data.dict[anlaut]);

    let $element;

    for (let i = 0; i < textCenters.length; ++i) {
        if (!symbols[i]) break;

        if (symbols[i].code)
            $element = createEmoji(symbols[i], textCenters[i]);
        if (symbols[i].width)
            $element = createImage(anlaut, symbols[i], imagePositions[i]);
        if (symbols[i].fill)
            $element = createColor(symbols[i], textCenters[i]);

        $element.dataset.audioSource = 'assets/'+ lang +"/"+ anlaut +'/'+ symbols[i].name +'.m4a';
        $symbols.appendChild($element);

        if (symbols[i].focus) {
            $element = createFocus(symbols[i].focus, textCenters[i]);
            $symbols.appendChild($element);
        }
    }
}

function fisherYatesShuffle(list) {
    for (let i = list.length - 1; i > 0; --i) {
        const randex = Math.floor(Math.random() * (i + 1));

        [list[i], list[randex]] = [list[randex], list[i]];
    }

    return list;
}

function createEmoji(symbol, position) {
    const $text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    const classes = ['audio-trigger'];
    if (symbol.classes) classes.push(symbol.classes.split(' '));
    
    $text.innerHTML = symbol.code;
    $text.setAttribute('x', position.x);
    $text.setAttribute('y', position.y);
    $text.classList.add(...classes);

    return $text;
}

function createImage(anlaut, symbol, position) {
    const $image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    
    $image.setAttribute('href', 'assets/'+ lang +"/"+ anlaut +'/'+ symbol.name +'.svg');
    $image.setAttribute('width', symbol.width);
    $image.setAttribute('x', position.x + symbol.offsets.x);
    $image.setAttribute('y', position.y + symbol.offsets.y);
    $image.classList.add('audio-trigger');

    return $image;
}

function createColor(symbol, position) {
    const $circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    $circle.setAttribute('r', 50);
    $circle.setAttribute('cx', position.x);
    $circle.setAttribute('cy', position.y - 30);
    $circle.setAttribute('fill', symbol.fill);
    $circle.classList.add('audio-trigger', 'color');

    return $circle;
}

function createFocus(focus, position) {
    const $circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    $circle.setAttribute('r', focus.r);
    $circle.setAttribute('cx', position.x + focus.dx);
    $circle.setAttribute('cy', position.y + focus.dy);
    $circle.classList.add('focus');

    return $circle;
}