import { CLASSES } from './CLASSES';
import { SELECTORS } from './SELECTORS';

export function enableNextRow(row) {
  const $row = document.querySelector(`${SELECTORS.rows} ${SELECTORS.word}[data-row="${row}"]`);

  $row.classList.remove(CLASSES.wordDisabled);

  const $inputs = $row.querySelectorAll(SELECTORS.letterInput);

  $inputs.forEach(($input, index) => {
    // eslint-disable-next-line no-param-reassign
    $input.disabled = false;

    if (index === 0) $input.focus();
  });
}

export function disableRow($row) {
  const $inputs = $row.querySelectorAll(SELECTORS.letterInput);

  $inputs.forEach(($input) => {
    // eslint-disable-next-line no-param-reassign
    $input.disabled = true;
  });

  $row.classList.add(CLASSES.wordDisabled);
}

export function processResults(data) {
  data.forEach((row, i) => {
    row.forEach((input, j) => {
      const { status } = input;
      const $input = document.querySelector(`${SELECTORS.letterInput}[name="${i}-${j}"]`);

      if (status === 1) {
        $input.classList.add(CLASSES.isSemiValid);
      }

      if (status === 2) {
        $input.classList.add(CLASSES.isValid);
      }
    });
  });
}
