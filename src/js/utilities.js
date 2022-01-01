module.exports.calculate = (solution, input) => {
  const result = [];

  input.split('').forEach((letter, index) => {
    const formattedLetter = letter.toLowerCase();
    let status = -1;

    if (solution.indexOf(formattedLetter) > -1) {
      if (solution[index] === formattedLetter) {
        status = 2;
      } else {
        status = 1;
      }
    }

    result.push({
      letter,
      status,
    });
  });

  return result;
};
