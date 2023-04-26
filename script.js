const classList = {
    HEADER: 'header',
    HEADLINE: 'h1',
    MAIN: 'main container',
    TEXTAREA: 'textarea',
    KEYBOARD: 'keyboard',
    ROW: 'row',
    TEXT: 'text',
};

const keyClassList = {
    ROW1: [
        'key paragraph Backquote',
        'key Digit1',
        'key Digit2',
        'key Digit3',
        'key Digit4',
        'key Digit5',
        'key Digit6',
        'key Digit7',
        'key Digit8',
        'key Digit9',
        'key Digit0',
        'key Minus',
        'key Equal',
        'key Backspace',
    ],
    ROW2: [
        'key Tab', 'key KeyQ', 'key KeyW', 'key KeyE', 'key KeyR', 'key KeyT', 'key KeyY', 'key KeyU', 'key KeyI', 'key KeyO', 'key KeyP', 'key BracketLeft', 'key BracketRight', 'key Enter',
    ],
    ROW3: [
        'key CapsLock', 'key KeyA ', 'key KeyS', 'key KeyD', 'key KeyF', 'key KeyG', 'key KeyH', 'key KeyJ', 'key KeyK', 'key KeyL', 'key Semicolon', 'key Quote', 'key Backslash',
    ],
    ROW4: [
        'key ShiftLeft Shift', 'key IntlBackslash', 'key KeyZ', 'key KeyX', 'key KeyC', 'key KeyV', 'key KeyB', 'key KeyN', 'key KeyM', 'key Comma', 'key Period', 'key Slash', 'key ShiftRight Shift',
    ],
    ROW5: [
        'key ControlLeft Control', 'key AltLeft  Alt', 'key MetaLeft Meta', 'key Space', 'key MetaRight Meta', 'key AltRight Alt', 'key arrow ArrowLeft', 'key arrow ArrowUp', 'key arrow ArrowDown', 'key arrow ArrowRight',
    ],

};

const characters = {
    ROW1_EN: '§±1!2@3#4$5%6^7&8*9(0)-_=+⌫⌫',
    ROW1_RU: '>\<1!2"3№4%5:6,7.8;9(0)-_=+⌫⌫',
    ROW1_EN_ALT: '§±¡⁄™€£‹¢›∞ﬁ§ﬂ¶‡•°ª·º‚–—≠±⌫⌫',
    ROW1_RU_ALT: '§±!|@"#£$€%∞^¬&¶*√{\'}`–—»«⌫⌫',
    ROW2_EN: '⇥⇥qQwWeErRtTyYuUiIoOpP[{]}⏎⏎',
    ROW2_RU: '⇥⇥йЙцЦуУкКеЕнНгГшШщЩзЗхХъЪ⏎⏎',
    ROW2_EN_ALT: '⇥⇥œŒ∑„´´®‰†ˇ¥Á¨¨ˆˆøØπ∏“”‘’⏎⏎',
    ROW2_RU_ALT: '⇥⇥јЈџЏќЌ®®††њЊѓЃѕЅўЎ‘’“”ъЪ⏎⏎',
    ROW3_EN: '⇪⇪aAsSdDfFgGhHjJkKlL;:\'"\\|',
    ROW3_RU: '⇪⇪фФыЫвВаАпПрРоОлЛдДжЖэЭёЁ',
    ROW3_EN_ALT: '⇪⇪åÅßÍ∂ÎƒÏ©˝˙Ó∆Ô˚¬Ò…ÚæÆ«»',
    ROW3_RU_ALT: '⇪⇪ƒƒыЫћЋ÷÷©©₽₽°•љЉ∆∆……эЭёЁ',
    ROW4_EN: '⇧⇧`~zZxXcCvVbBnNmM,\<.>/?⇧⇧',
    ROW4_RU: '⇧⇧][яЯчЧсСмМиИтТьЬбБюЮ/?⇧⇧',
    ROW4_EN_ALT: '⇧⇧``Ω¸≈˛çÇ√◊∫ı˜˜µÂ≤¯≥˘÷¿⇧⇧',
    ROW4_RU_ALT: '⇧⇧][ђЂ≈≈≠≠µµиИ™™~~≤<≥>“„⇧⇧',
    ROW5_EN: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
    ROW5_RU: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
    ROW5_EN_ALT: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
    ROW5_RU_ALT: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
};

const TITLE = 'RSS Virtual Keyboard';
const TIP = 'Keyboard was created using MacOS <br> Shortcut to switch language: ctrl + space';

const rows = [];
const keys = [];

function init() {
    const headerEl = createElement('header', classList.HEADER);
    const headlineEl = createElement('h1', classList.HEADLINE);
    headlineEl.innerHTML = TITLE;
    const mainEl = createElement('main', classList.MAIN);
    const textareaEl = createElement('textarea', classList.TEXTAREA);
    textareaEl.setAttribute('rows', '10');
    textareaEl.setAttribute('tabindex', '-1');

    const keyboardEl = createElement('div', classList.KEYBOARD);

    document.body.append(headerEl);
    document.body.append(mainEl);

    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    header.append(headlineEl);
    main.append(textareaEl);
    main.append(keyboardEl);

    const keyboard = document.querySelector('.keyboard');

    const rowsNumber = Object.keys(keyClassList).length;

    for (let i = 0; i < rowsNumber; i++) {
        const rowEl = createElement('div', classList.ROW);
        rowEl.classList.add(`row${i}`);
        keyboard.append(rowEl);
        rows.push(keyboard.lastElementChild);
        keys.push(Array());
    }

    for (let i = 0; i < keyClassList.ROW1.length; i++) {
        const keyRow1El = createElement('button', keyClassList.ROW1[i]);
        const keyRow2El = createElement('button', keyClassList.ROW2[i]);

        keyRow1El.setAttribute('tabindex', '-1');
        keyRow2El.setAttribute('tabindex', '-1');

        rows[0].append(keyRow1El);
        rows[1].append(keyRow2El);

        keys[0].push(keyRow1El);
        keys[1].push(keyRow2El);

        if (i < keyClassList.ROW3.length) {
            const keyRow3El = createElement('button', keyClassList.ROW3[i]);
            const keyRow4El = createElement('button', keyClassList.ROW4[i]);

            keyRow3El.setAttribute('tabindex', '-1');
            keyRow4El.setAttribute('tabindex', '-1');

            rows[2].append(keyRow3El);
            rows[3].append(keyRow4El);

            keys[2].push(keyRow3El);
            keys[3].push(keyRow4El);
        }
        if (i < keyClassList.ROW5.length) {
            const keyRow5El = createElement('button', keyClassList.ROW5[i]);
            keyRow5El.setAttribute('tabindex', '-1');
            rows[4].append(keyRow5El);
            keys[4].push(keyRow5El);
        }
    }

    for (let i = 1; i < rowsNumber + 1; i++) {
        insertInnerKey(i);
    }

    const textEl = createElement('p', classList.TEXT);
    textEl.innerHTML = TIP;

    main.append(textEl);
}

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = `${className}`;
    return element;
}

function getTemplate(row, i, isEN = true) {
    let className = 'en';
    let caseDown;
    let caseUp;
    let caps;
    let capsShift;
    let alt;
    let altShift;
    let altCaps;
    let altCapsShift;
    let rowLang;
    if (isEN) {
        rowLang = `ROW${row}_EN`;
    }
    if (!isEN) {
        rowLang = `ROW${row}_RU`;
        className = 'ru hidden';
    }
    caseDown = characters[rowLang][i];
    caseUp = characters[rowLang][i + 1];
    alt = characters[`${rowLang}_ALT`][i];
    altShift = characters[`${rowLang}_ALT`][i + 1];
    const capsExceptions = [[1], [2, 22], [2, 24], [3, 20], [3, 22], [3, 24], [4, 2], [4, 18], [4, 20], [4, 22]];
    const altCapsExceptions = [[2, 2], [2, 12], [2, 18], [2, 20], [4, 8], [4, 12], [4, 16]];
    const predicate = (pair) => {
        if (pair.length === 1 && pair[0] === row) return true;
        return row === pair[0] && i === pair[1];
    }
    if (capsExceptions.some(predicate)) {
        caps = caseDown;
    } else {
        caps = caseUp;
    }
    if (row === 3) {
        if (i === 10 || i === 16 || i === 20) {
            altCaps = alt;
        }
        else {
            altCaps = altShift;
        }
    } else if (altCapsExceptions.some(predicate)) {
        altCaps = altShift;
    } else {
        altCaps = alt;
    }

    altCapsShift = altShift;
    capsShift = caseUp;

    return `<span class="${className}">
              <span class="caseDown">${caseDown}</span>
              <span class="caseUp hidden">${caseUp}</span>
              <span class="caps hidden">${caps}</span>
              <span class="capsShift hidden">${capsShift}</span>
              <span class="alt hidden">${alt}</span>
              <span class="altShift hidden">${altShift}</span>
              <span class="altCaps hidden">${altCaps}</span>
              <span class="altCapsShift hidden">${altCapsShift}</span>
            </span>`;
}

function insertInnerKey(row) {
    let j = 0;
    let template = null;
    for (let i = 0; i < keys[row - 1].length; i++) {
        template = getTemplate(row, j);
        template += getTemplate(row, j, false);
        keys[row - 1][i].insertAdjacentHTML('beforeend', template);
        j += 2;
    }
}

init();
