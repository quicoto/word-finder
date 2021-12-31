(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // src/js/CLASSES.js
  var require_CLASSES = __commonJS({
    "src/js/CLASSES.js"(exports, module) {
      var CLASSES5 = {
        isValid: "bg-success",
        isSemiValid: "bg-warning",
        isInvalid: "is-invalid",
        letterInput: "letter-input",
        word: "word",
        wordDisabled: "word--disabled"
      };
      module.exports.CLASSES = CLASSES5;
    }
  });

  // src/js/main.js
  var import_CLASSES4 = __toESM(require_CLASSES());

  // src/js/SELECTORS.js
  var import_CLASSES = __toESM(require_CLASSES());
  var SELECTORS = {
    letterInput: `.${import_CLASSES.CLASSES.letterInput}`,
    letterInputInvalid: `.${import_CLASSES.CLASSES.letterInput}.${import_CLASSES.CLASSES.isInvalid}`,
    rows: "#rows",
    word: `.${import_CLASSES.CLASSES.word}`,
    wordDisabled: `.${import_CLASSES.CLASSES.wordDisabled}`
  };

  // src/js/templates.js
  var import_CLASSES2 = __toESM(require_CLASSES());
  function input(config) {
    const {
      name,
      value,
      disabled
    } = config;
    const classes = `${import_CLASSES2.CLASSES.letterInput} form-control form-control-lg text-center text-uppercase`;
    return `<input ${disabled ? "disabled" : ""} class="${classes}" type="text" maxlength="1" name="${name}" aria-label="${name}" ${value ? `value=${value}` : ""} required="required">`;
  }
  function row(columns) {
    let html = "";
    columns.forEach((column) => {
      const {
        name,
        value,
        disabled
      } = column;
      html += `<div class="letter-wrapper">${input({
        name,
        value,
        disabled
      })}</div>`;
    });
    return html;
  }
  function game(config) {
    const { initialValue } = config;
    let html = "";
    for (let i = 0; i < 6; i += 1) {
      const columns = [];
      let disabled = true;
      if (initialValue[i]?.disabled === false)
        disabled = false;
      for (let j = 0; j < 5; j += 1) {
        let value = "";
        if (initialValue[i]?.letters[j]) {
          value = initialValue[i].letters[j].letter;
        }
        columns.push({
          name: `${i}-${j}`,
          value,
          disabled
        });
      }
      html += `<div data-row="${i}" class="word d-flex justify-content-center ${disabled ? "word--disabled" : ""}">${row(columns)}</div>`;
    }
    return html;
  }

  // src/js/utils.js
  var import_CLASSES3 = __toESM(require_CLASSES());
  function enableNextRow(row2) {
    const $row = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}[data-row="${row2}"]`);
    $row.classList.remove(import_CLASSES3.CLASSES.wordDisabled);
    const $inputs = $row.querySelectorAll(SELECTORS.letterInput);
    $inputs.forEach(($input, index) => {
      $input.disabled = false;
      if (index === 0)
        $input.focus();
    });
  }
  function disableRow($row) {
    const $inputs = $row.querySelectorAll(SELECTORS.letterInput);
    $inputs.forEach(($input) => {
      $input.disabled = true;
    });
    $row.classList.add(import_CLASSES3.CLASSES.wordDisabled);
  }
  function calculate(solution, input2) {
    const result = [];
    input2.split("").forEach((letter, index) => {
      let status = -1;
      if (solution.indexOf(letter) > -1) {
        if (solution[index] === letter) {
          status = 2;
        } else {
          status = 1;
        }
      }
      result.push({
        letter,
        status
      });
    });
    return result;
  }
  function processResults(data) {
    data.forEach((row2, i) => {
      row2.forEach((input2, j) => {
        const { status } = input2;
        const $input = document.querySelector(`${SELECTORS.letterInput}[name="${i}-${j}"]`);
        if (status === 1) {
          $input.classList.add(import_CLASSES3.CLASSES.isSemiValid);
        }
        if (status === 2) {
          $input.classList.add(import_CLASSES3.CLASSES.isValid);
        }
      });
    });
  }

  // src/js/main.js
  var _$ = {};
  var initialData = [
    {
      letters: [
        { letter: "", status: 0 },
        { letter: "", status: 0 },
        { letter: "", status: 0 },
        { letter: "", status: 0 },
        { letter: "", status: 0 }
      ],
      disabled: false
    }
  ];
  function _getLanguage() {
    let language = "english";
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.lang === "ca")
      language = "catala";
    return language;
  }
  var _ = {
    database: [],
    language: _getLanguage(),
    data: initialData
  };
  function _setElements() {
    _$.rows = document.getElementById("rows");
    _$.form = document.querySelector("form");
    _$.submitButton = document.getElementById("submit");
    _$.reloadButton = document.getElementById("reload");
    _$.solution = document.getElementById("solution");
  }
  function _fireworks() {
    const fireworksWrapper = document.getElementById("fireworks_wrapper");
    fireworksWrapper.querySelector(".fireworks").classList.add("pyro");
    setTimeout(() => {
      fireworksWrapper.querySelector(".fireworks").classList.remove("pyro");
    }, 1e4);
  }
  function _checkIfRoundIsSolved(results) {
    const isDone = results.findIndex((i) => i.status < 2) === -1;
    if (isDone) {
      const $currentRow = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}:not(${SELECTORS.wordDisabled})`);
      _$.submitButton.hidden = true;
      _$.reloadButton.hidden = false;
      disableRow($currentRow);
      _fireworks();
    }
    return isDone;
  }
  function _showSolution() {
    _$.solution.innerText = _.solution.join("");
    _$.solution.hidden = false;
    _$.submitButton.hidden = true;
    _$.reloadButton.hidden = false;
  }
  function _onSubmit(DOMEvent) {
    DOMEvent.preventDefault();
    let wordToValidate = "";
    const $currentRow = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}:not(${SELECTORS.wordDisabled})`);
    const $invalidInputs = $currentRow.querySelectorAll(SELECTORS.letterInputInvalid);
    if ($invalidInputs.length > 0)
      return;
    const $inputs = $currentRow.querySelectorAll(SELECTORS.letterInput);
    $inputs.forEach(($input) => {
      wordToValidate += $input.value;
    });
    disableRow($currentRow);
    const nextRow = +$currentRow.dataset.row + 1;
    if (nextRow < 6) {
      enableNextRow(nextRow);
    }
    const results = calculate(_.solution, wordToValidate);
    _.data[+$currentRow.dataset.row] = results;
    processResults(_.data);
    const isSolved = _checkIfRoundIsSolved(results);
    if (!isSolved && nextRow === 6) {
      _showSolution();
    }
  }
  function _onKeyUp(DOMEvent) {
    const { target } = DOMEvent;
    if (target.classList.contains(import_CLASSES4.CLASSES.letterInput)) {
      const { value, name } = target;
      const regex = /[a-zA-Z]/g;
      const found = value.match(regex);
      const letterPosition = +name.split("-")[1];
      if (letterPosition < 4) {
        const nextName = `${name.split("-")[0]}-${letterPosition + 1}`;
        const $nextLetterInput = document.querySelector(`${SELECTORS.letterInput}[name="${nextName}"]`);
        $nextLetterInput.focus();
      } else if (letterPosition === 4) {
        _$.submitButton.focus();
      }
      if (found) {
        target.classList.remove(import_CLASSES4.CLASSES.isInvalid);
      } else {
        target.classList.add(import_CLASSES4.CLASSES.isInvalid);
      }
    }
  }
  function _onReload() {
    window.location.reload();
  }
  function _randomWord() {
    const randomNumber = Math.floor(Math.random() * (_.database.length + 1));
    const word = _.database[randomNumber].split("");
    console.log(word);
    return word;
  }
  function _addEventListeners() {
    _$.form.addEventListener("submit", _onSubmit);
    document.addEventListener("keyup", _onKeyUp);
    _$.reloadButton.addEventListener("click", _onReload);
  }
  function _freshStart() {
    _addEventListeners();
    _.solution = _randomWord();
    _.data = initialData;
    _$.rows.innerHTML = game({
      initialValue: _.data
    });
  }
  function _setLanguageButtons() {
    const $selectedLangaugeButton = document.getElementById(`button-${_.language}`);
    $selectedLangaugeButton.classList.add("btn-outline-success");
    $selectedLangaugeButton.classList.remove("btn-outline-secondary");
  }
  function _init() {
    _setElements();
    _setLanguageButtons();
    fetch(`./database/${_.language}.json?${new Date().getTime()}`).then((response) => response.json()).then((data) => {
      _.database = data.words;
      _freshStart();
    });
  }
  _init();
})();
