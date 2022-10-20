const generateRandomInteger = (from, to) => {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return NaN;
  }

  if (from < 0 || to < 0) {
    return NaN;
  }

  return Math.round(Math.random() * Math.abs(to - from) + from);
};

const checkMaxStringLength = (string, maxLength) => {
  if (typeof string !== 'string' || typeof maxLength !== 'number' || maxLength < 0) {
    return null;
  }
  return string.length <= maxLength;
};

const shuffleArray = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  return items;
};

const generateString = (strings) => strings[generateRandomInteger(0, strings.length - 1)];

export { generateRandomInteger, checkMaxStringLength, generateString, shuffleArray };
