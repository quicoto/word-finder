import { CLASSES } from './CLASSES';
import { SELECTORS } from './SELECTORS';
import * as templates from './templates';
import * as utils from './utils';
import * as utilities from './utilities';

const _$ = {};
const initialData = [
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
];

function _getLanguage() {
  let language = 'english';
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.lang === 'ca') language = 'catala';

  return language;
}

const _ = {
  projectKey: 'word-finder',
  database: [], // Store the language words
  language: _getLanguage(),
  data: initialData,
  sortedData: {
    english: [],
    catala: [],
  }, // from LocalStorage
};

function _setElements() {
  _$.rows = document.getElementById('rows');
  _$.form = document.querySelector('form');
  _$.submitButton = document.getElementById('submit');
  _$.reloadButton = document.getElementById('reload');
  _$.solution = document.getElementById('solution');
  _$.playedWords = document.getElementById('played-words');
  _$.wordCount = document.getElementById('word-count');
}

function _fireworks() {
  const fireworksWrapper = document.getElementById('fireworks_wrapper');
  fireworksWrapper.querySelector('.fireworks').classList.add('pyro');

  setTimeout(() => {
    fireworksWrapper.querySelector('.fireworks').classList.remove('pyro');
  }, 10000);
}

function _initStorage() {
  const localData = localStorage.getItem(_.projectKey);

  if (localData) {
    _.sortedData = JSON.parse(localData);
    _.sortedData.english = _.sortedData.english.sort();
    _.sortedData.catala = _.sortedData.catala.sort();

    _$.playedWords.innerText = _.sortedData[_.language].join(', ');
    _$.wordCount.innerText = `(${_.sortedData[_.language].length} / ${_.database.length})`;
  } else {
    localStorage.setItem(_.projectKey, JSON.stringify(_.sortedData));

    _initStorage();
  }
}

function _storeWord() {
  _.sortedData[_.language].push(_.solution.join(''));
  localStorage.setItem(_.projectKey, JSON.stringify(_.sortedData));

  _initStorage();
}

function _checkIfRoundIsSolved(results) {
  const isDone = results.findIndex((i) => i.status < 2) === -1;

  if (isDone) {
    const $currentRow = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}:not(${SELECTORS.wordDisabled})`);

    _$.submitButton.hidden = true;
    _$.reloadButton.hidden = false;
    utils.disableRow($currentRow);
    _fireworks();
    _storeWord();
  }

  return isDone;
}

function _showSolution() {
  _$.solution.innerText = _.solution.join('');
  _$.solution.hidden = false;
  _$.submitButton.hidden = true;
  _$.reloadButton.hidden = false;
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

  const nextRow = +$currentRow.dataset.row + 1;

  if (nextRow < 6) {
    utils.enableNextRow(nextRow);
  }

  // Store the results
  const results = utilities.calculate(_.solution, wordToValidate);
  _.data[+$currentRow.dataset.row] = results;
  utils.processResults(_.data);
  const isSolved = _checkIfRoundIsSolved(results);

  if (!isSolved && nextRow === 6) {
    _showSolution();
  }
}

function _onKeyUp(DOMEvent) {
  const { target } = DOMEvent;
  const { value, name } = target;

  if (value !== '' && target.classList.contains(CLASSES.letterInput)) {
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

function _onReload() {
  window.location.reload();
}

function _randomWord() {
  const randomNumber = Math.floor(Math.random() * (_.database.length));
  const word = _.database[randomNumber].split('');

  // eslint-disable-next-line no-console
  console.log(word);

  return word;
}

function _addEventListeners() {
  _$.form.addEventListener('submit', _onSubmit);
  document.addEventListener('keyup', _onKeyUp);
  _$.reloadButton.addEventListener('click', _onReload);
}

function _freshStart() {
  _addEventListeners();

  _.solution = _randomWord();

  if (_.sortedData[_.language].length === _.database.length) {
    _$.rows.innerHTML = '🎉 Congratulations, you have completed all words! 👏';
    _$.submitButton.hidden = true;

    return;
  }

  while (_.sortedData[_.language].indexOf(_.solution.join('')) > -1) {
    _.solution = _randomWord();
  }
  _.data = initialData;
  _$.rows.innerHTML = templates.game({
    initialValue: _.data,
  });
}

function _setLanguageButtons() {
  const $selectedLangaugeButton = document.getElementById(`button-${_.language}`);

  $selectedLangaugeButton.classList.add('btn-outline-success');
  $selectedLangaugeButton.classList.remove('btn-outline-secondary');
}

function _init() {
  _setElements();
  _setLanguageButtons();

  fetch(`./database/${_.language}.json?${new Date().getTime()}`)
    .then((response) => response.json())
    .then((data) => {
      _.database = data.words;
      _initStorage();
      _freshStart();
    });
}

_init();
