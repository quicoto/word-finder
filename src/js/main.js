import { CLASSES } from './CLASSES';
import { SELECTORS } from './SELECTORS';
import * as templates from './templates';
import * as utils from './utils';

const _$ = {};
const _ = {
  database: [], // Store the language words
  language: 'english',
  data: [
    {
      letters: [
        { letter: '', status: 0 },
        { letter: '', status: 0 },
        { letter: '', status: 0 },
        { letter: '', status: 0 },
        { letter: '', status: 0 },
      ],
      disabled: false,
    },
  ],
};

function _setElements() {
  _$.rows = document.getElementById('rows');
  _$.form = document.querySelector('form');
  _$.submitButton = document.getElementById('submit');
}

function _fireworks() {
  const fireworksWrapper = document.getElementById('fireworks_wrapper');
  fireworksWrapper.querySelector('.fireworks').classList.add('pyro');

  setTimeout(() => {
    fireworksWrapper.querySelector('.fireworks').classList.remove('pyro');
  }, 10000);
}

function _checkIfRoundIsDone(results) {
  const isDone = results.findIndex((i) => i.status < 2) === -1;

  if (isDone) {
    const $currentRow = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}:not(${SELECTORS.wordDisabled})`);

    _$.submitButton.disabled = true;
    utils.disableRow($currentRow);
    _fireworks();
  }

  return isDone;
}

function _onSubmit(DOMEvent) {
  DOMEvent.preventDefault();

  let wordToValidate = '';
  const $currentRow = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}:not(${SELECTORS.wordDisabled})`);

  // Is there any invalid input?
  const $invalidInputs = $currentRow.querySelectorAll(SELECTORS.letterInputInvalid);

  if ($invalidInputs.length > 0) return;

  const $inputs = $currentRow.querySelectorAll(SELECTORS.letterInput);

  $inputs.forEach(($input) => {
    wordToValidate += $input.value;
  });

  utils.disableRow($currentRow);
  utils.enableNextRow(+$currentRow.dataset.row + 1);

  // Store the results
  const results = utils.calculate(_.solution, wordToValidate);
  _.data[+$currentRow.dataset.row] = results;
  utils.processResults(_.data);
  _checkIfRoundIsDone(results);
}

function _onKeyUp(DOMEvent) {
  const { target } = DOMEvent;

  if (target.classList.contains(CLASSES.letterInput)) {
    const { value, name } = target;
    const regex = /[a-zA-Z]/g;
    const found = value.match(regex);
    const letterPosition = +name.split('-')[1];

    // If not last letter
    if (letterPosition < 4) {
      const nextName = `${name.split('-')[0]}-${letterPosition + 1}`;
      const $nextLetterInput = document.querySelector(`${SELECTORS.letterInput}[name="${nextName}"]`);

      $nextLetterInput.focus();
    } else if (letterPosition === 4) {
      // Focus on Validate button
      _$.submitButton.focus();
    }

    if (found) {
      target.classList.remove(CLASSES.isInvalid);
    } else {
      // Wrong value, paint it red
      target.classList.add(CLASSES.isInvalid);
    }
  }
}

function _addEventListeners() {
  _$.form.addEventListener('submit', _onSubmit);
  document.addEventListener('keyup', _onKeyUp);
}

function _init() {
  _setElements();
  _addEventListeners();

  fetch(`./database/${_.language}.json?${new Date().getTime()}`)
    .then((response) => response.json())
    .then((data) => {
      const random = Math.floor(Math.random() * (data.words.length + 1));
      _.database = data.words;
      _.solution = data.words[random].split('');
      // eslint-disable-next-line no-console
      console.log(_.solution);
      _$.rows.innerHTML = templates.game({
        initialValue: _.data,
      });
    });
}

_init();
