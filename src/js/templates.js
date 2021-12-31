import { CLASSES } from './CLASSES';

export function input(config) {
  const {
    name, value, disabled,
  } = config;
  const classes = `${CLASSES.letterInput} form-control form-control-lg text-center text-uppercase`;

  return `<input ${disabled ? 'disabled' : ''} class="${classes}" type="text" maxlength="1" name="${name}" aria-label="${name}" ${value ? `value=${value}` : ''} required="required">`;
}

export function row(columns) {
  let html = '';

  columns.forEach((column) => {
    const {
      name, value, disabled,
    } = column;

    html += `<div class="letter-wrapper">${input({
      name,
      value,
      disabled,
    })}</div>`;
  });

  return html;
}

export function game(config) {
  const { initialValue } = config;
  let html = '';

  for (let i = 0; i < 6; i += 1) {
    const columns = [];
    let disabled = true;

    if (initialValue[i]?.disabled === false) disabled = false;

    for (let j = 0; j < 5; j += 1) {
      let value = '';

      if (initialValue[i]?.letters[j]) {
        value = initialValue[i].letters[j].letter;
      }

      columns.push(
        {
          name: `${i}-${j}`, value, disabled,
        },
      );
    }

    html += `<div data-row="${i}" class="word d-flex justify-content-center ${disabled ? 'word--disabled' : ''}">${row(columns)}</div>`;
  }

  return html;
}
