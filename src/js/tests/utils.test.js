const { calculate } = require('../utilities');

describe('Calculate', () => {
  test('all caps', () => {
    const solution = ['s', 'e', 'g', 'o', 'n'];
    const result = calculate(solution, 'PEDRA');
    const match = [
      { letter: 'P', status: -1 },
      { letter: 'E', status: 2 },
      { letter: 'D', status: -1 },
      { letter: 'R', status: -1 },
      { letter: 'A', status: -1 },
    ];

    expect(result).toEqual(match);
  });

  test('all lower', () => {
    const solution = ['s', 'e', 'g', 'o', 'n'];
    const result = calculate(solution, 'pedra');
    const match = [
      { letter: 'p', status: -1 },
      { letter: 'e', status: 2 },
      { letter: 'd', status: -1 },
      { letter: 'r', status: -1 },
      { letter: 'a', status: -1 },
    ];

    expect(result).toEqual(match);
  });

  test('mixed', () => {
    const solution = ['s', 'e', 'g', 'o', 'n'];
    const result = calculate(solution, 'SeNra');
    const match = [
      { letter: 'S', status: 2 },
      { letter: 'e', status: 2 },
      { letter: 'N', status: 1 },
      { letter: 'r', status: -1 },
      { letter: 'a', status: -1 },
    ];

    expect(result).toEqual(match);
  });
});
