import { CLASSES } from './CLASSES';

// eslint-disable-next-line import/prefer-default-export
export const SELECTORS = {
  letterInput: `.${CLASSES.letterInput}`,
  letterInputInvalid: `.${CLASSES.letterInput}.${CLASSES.isInvalid}`,
  rows: '#rows',
  word: `.${CLASSES.word}`,
  wordDisabled: `.${CLASSES.wordDisabled}`,
};
