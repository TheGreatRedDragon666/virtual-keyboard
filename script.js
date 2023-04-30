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
    'key Backquote paragraph',
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
    'key ControlLeft Control', 'key AltLeft  Alt', 'key MetaLeft Meta', 'key Space', 'key MetaRight Meta', 'key AltRight Alt', 'key ArrowLeft arrow', 'key ArrowUp arrow', 'key ArrowDown arrow', 'key ArrowRight arrow',
  ],

};

const characters = {
  ROW1_EN: '§±1!2@3#4$5%6^7&8*9(0)-_=+⌫⌫',
  ROW1_RU: '><1!2"3№4%5:6,7.8;9(0)-_=+⌫⌫',
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
  ROW4_EN: '⇧⇧`~zZxXcCvVbBnNmM,<.>/?⇧⇧',
  ROW4_RU: '⇧⇧][яЯчЧсСмМиИтТьЬбБюЮ/?⇧⇧',
  ROW4_EN_ALT: '⇧⇧``Ω¸≈˛çÇ√◊∫ı˜˜µÂ≤¯≥˘÷¿⇧⇧',
  ROW4_RU_ALT: '⇧⇧][ђЂ≈≈≠≠µµиИ™™~~≤<≥>“„⇧⇧',
  ROW5_EN: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
  ROW5_RU: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
  ROW5_EN_ALT: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
  ROW5_RU_ALT: '^^⌥⌥⌘⌘⎵⎵⌘⌘⌥⌥◄◄▲▲▼▼►►',
};

const TITLE = 'RSS Virtual Keyboard';
const TIP = 'Keyboard was created using MacOS <br> Shortcut to switch language: ctrl(^) + cmd(⌘)';

const rows = [];
const keys = [];

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = `${className}`;
  return element;
}

function getTemplate(row, i, isEN = true) {
  const currentLang = sessionStorage.getItem('lang');
  let className = isEN ? 'en' : 'ru';
  const rowLang = `ROW${row}_${className.toUpperCase()}`;
  if (currentLang && ((isEN && currentLang === 'ru') || (!isEN && currentLang === 'en'))) {
    className += ' hidden';
  }
  if (!currentLang && !isEN) {
    className += ' hidden';
  }
  let altCaps;
  let caps;
  const caseDown = characters[rowLang][i];
  const caseUp = characters[rowLang][i + 1];
  const alt = characters[`${rowLang}_ALT`][i];
  const altShift = characters[`${rowLang}_ALT`][i + 1];
  const capsExceptionsEn = [[1], [2, 22], [2, 24], [3, 20], [3, 22], [3, 24],
    [4, 2], [4, 18], [4, 20], [4, 22]];
  const capsExceptionsRu = [[1], [4, 2], [4, 22]];
  const altCapsExceptionsEn = [[2, 2], [2, 12], [2, 18], [2, 20], [4, 8],
    [4, 12], [4, 16]];
  const altCapsExceptionsRu = [[1], [2, 8], [2, 10], [2, 20], [2, 22], [3, 14]];
  const predicate = (pair) => (pair.length === 1
    ? row === pair[0]
    : row === pair[0] && i === pair[1]);
  if (isEN) {
    caps = capsExceptionsEn.some(predicate) ? caseDown : caseUp;
    if (row === 3) {
      if (i === 10 || i === 16 || i === 20 || i === 24) {
        altCaps = alt;
      } else {
        altCaps = altShift;
      }
    } else {
      altCaps = altCapsExceptionsEn.some(predicate) ? altShift : alt;
    }
  } else {
    caps = capsExceptionsRu.some(predicate) ? caseDown : caseUp;
    if (row === 4) {
      if (i === 4 || i === 12) {
        altCaps = altShift;
      } else {
        altCaps = alt;
      }
    } else {
      altCaps = altCapsExceptionsRu.some(predicate) ? alt : altShift;
    }
  }
  return `<span class="${className}">
              <span class="caseDown">${caseDown}</span>
              <span class="caseUp hidden">${caseUp}</span>
              <span class="caps hidden">${caps}</span>
              <span class="capsShift hidden">${caseUp}</span>
              <span class="alt hidden">${alt}</span>
              <span class="altShift hidden">${altShift}</span>
              <span class="altCaps hidden">${altCaps}</span>
              <span class="altCapsShift hidden">${altShift}</span>
            </span>`;
}

function insertInnerKey(row) {
  let j = 0;
  let template = null;
  for (let i = 0; i < keys[row - 1].length; i += 1) {
    template = getTemplate(row, j);
    template += getTemplate(row, j, false);
    keys[row - 1][i].insertAdjacentHTML('beforeend', template);
    j += 2;
  }
}

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

  for (let i = 0; i < rowsNumber; i += 1) {
    const rowEl = createElement('div', classList.ROW);
    rowEl.classList.add(`row${i}`);
    keyboard.append(rowEl);
    rows.push(keyboard.lastElementChild);
    keys.push([]);
  }

  for (let i = 0; i < keyClassList.ROW1.length; i += 1) {
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

  for (let i = 1; i < rowsNumber + 1; i += 1) {
    insertInnerKey(i);
  }

  const textEl = createElement('p', classList.TEXT);
  textEl.innerHTML = TIP;

  main.append(textEl);
}

init();

const textarea = document.querySelector('.textarea');
const keyboard = document.querySelector('.keyboard');
keyboard.onmousedown = (event) => event.preventDefault();
keyboard.onmouseup = (event) => event.preventDefault();

textarea.onkeydown = (event) => event.preventDefault();
textarea.oninput = function cutInput() {
  textarea.value = textarea.value.slice(0, textarea.value.length - 1);
};

let mouseDown = null;
let mouseDownBtn = null;

function getLang() {
  return !document.querySelector('.en').classList.contains('hidden') ? 'en' : 'ru';
}

function typeChar(key, keyEl) {
  let pos = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const { value } = textarea;
  const part1 = value.slice(0, pos);
  const part2 = value.slice(pos);
  if (pos === end) {
    if (key === 'Tab') {
      textarea.value = `${part1}\t${part2}`;
    } else if (key === 'Enter') {
      textarea.value = `${part1}\n${part2}`;
    } else if (key === 'Backspace') {
      textarea.value = part1.slice(0, part1.length - 1) + part2;
      pos -= 2;
    } else if (key === 'Space') {
      textarea.value = `${part1} ${part2}`;
    } else {
      const lang = getLang();
      const curChar = keyEl.querySelector(`.${lang} > span:not(.hidden)`);
      textarea.value = part1 + curChar.innerText + part2;
    }
    textarea.selectionStart = pos + 1;
    textarea.selectionEnd = pos + 1;
  } else {
    textarea.value = value.slice(0, pos) + value.slice(end);
    textarea.selectionStart = pos;
    textarea.selectionEnd = pos;
    if (key === 'Backspace') {
      return;
    }
    typeChar(key, keyEl);
  }
}

function toggleHidden(className1, className2 = null) {
  const lang = getLang();
  let i = 1;
  while (i <= arguments.length) {
    const className = i === 1 ? className1 : className2;
    const cn = keyboard.querySelectorAll(`.${lang} > .${className}`);
    Array.from(cn).forEach((el) => {
      el.classList.toggle('hidden');
    });
    i += 1;
  }
}

function toggleLang() {
  const enKeys = Array.from(document.querySelectorAll('.en'));
  const ruKeys = Array.from(document.querySelectorAll('.ru'));
  if (getLang() === 'en') {
    enKeys.forEach((key) => key.classList.add('hidden'));
    ruKeys.forEach((key) => key.classList.remove('hidden'));
    sessionStorage.setItem('lang', 'ru');
  } else if (getLang() === 'ru') {
    ruKeys.forEach((key) => key.classList.add('hidden'));
    enKeys.forEach((key) => key.classList.remove('hidden'));
    sessionStorage.setItem('lang', 'en');
  }
}

function isShiftActive() {
  return document.querySelector('.Shift.active') !== null;
}

function isCapsActive() {
  return document.querySelector('.CapsLock.active') !== null;
}

function isAltActive() {
  return document.querySelector('.Alt.active') !== null;
}

function isCtrlActive() {
  return document.querySelector('.Control.active') !== null;
}

function isMetaActive() {
  return document.querySelector('.Meta.active') !== null;
}

function handleKeyEvent(event) {
  if (document.activeElement !== textarea) {
    textarea.focus();
  }
  let key = event.code;
  let keyEl = document.querySelector(`.${key}`);
  if (!key) {
    if (event.type === 'mouseup' && mouseDown && mouseDownBtn) {
      key = mouseDown;
      keyEl = mouseDownBtn;
      mouseDown = null;
      mouseDownBtn = null;
    } else if (!event.target.closest('.key')) {
      return;
    }
    if (event.type === 'mousedown') {
      if (event.target.matches('.key')) {
        [, key] = event.target.classList;
        keyEl = event.target;
      } else if (event.target.parentElement.parentElement.matches('.key')) {
        [, key] = event.target.parentElement.parentElement.classList;
        keyEl = event.target.parentElement.parentElement;
      } else {
        return;
      }
      mouseDown = key;
      mouseDownBtn = keyEl;
    }
  }
  if (!keyEl) return;
  if (key === 'CapsLock' && event.type !== 'mouseup') {
    keyEl.classList.toggle('active');
  } else if (!((key === 'ShiftLeft' || key === 'ShiftRight') && event.type === 'mouseup' && event.shiftKey) && !((key === 'AltLeft' || key === 'AltRight') && event.type === 'mouseup' && event.altKey)) {
    if (event.type === 'keydown' || event.type === 'mousedown') {
      keyEl.classList.add('active');
    } else if (event.type === 'keyup' || (event.type === 'mouseup' && key !== 'CapsLock')) {
      keyEl.classList.remove('active');
    }
  }

  if (key === 'ShiftLeft' || key === 'ShiftRight') {
    if (isAltActive()) {
      if (isCapsActive()) {
        toggleHidden('altCaps', 'altCapsShift');
      } else {
        toggleHidden('alt', 'altShift');
      }
    } else if (isCapsActive()) {
      toggleHidden('caps', 'capsShift');
    } else {
      toggleHidden('caseDown', 'caseUp');
    }
  } else if (key === 'CapsLock' && event.type !== 'mouseup') {
    if (isShiftActive()) {
      if (isAltActive()) {
        toggleHidden('altShift', 'altCapsShift');
      } else {
        toggleHidden('caseUp', 'capsShift');
      }
    } else if (isAltActive()) {
      toggleHidden('alt', 'altCaps');
    } else {
      toggleHidden('caseDown', 'caps');
    }
  } else if (key === 'AltRight' || key === 'AltLeft') {
    if (isShiftActive()) {
      if (isCapsActive()) {
        toggleHidden('capsShift', 'altCapsShift');
      } else {
        toggleHidden('caseUp', 'altShift');
      }
    } else if (isCapsActive()) {
      toggleHidden('caps', 'altCaps');
    } else {
      toggleHidden('caseDown', 'alt');
    }
  } else if (isCtrlActive() && isMetaActive()) {
    toggleLang();
  } else if ((event.type === 'keydown' || event.type === 'mousedown') && key !== 'ControlLeft' && key !== 'MetaLeft' && key !== 'MetaRight') {
    typeChar(key, keyEl);
  }
}

keyboard.addEventListener('mousedown', handleKeyEvent);
document.addEventListener('mouseup', handleKeyEvent);
document.addEventListener('keydown', handleKeyEvent);
document.addEventListener('keyup', handleKeyEvent);
