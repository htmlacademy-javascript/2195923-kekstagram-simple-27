function generateRandomInteger(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return NaN;
  }

  if (from < 0 || to < 0) {
    return NaN;
  }

  return Math.round(Math.random() * Math.abs(to - from) + from);
}

function checkMaxStringLength(string, maxLength) {
  if (typeof string !== 'string' || typeof maxLength !== 'number' || maxLength < 0) {
    return null;
  }
  return string.length <= maxLength;
}

generateRandomInteger(5, 10);
checkMaxStringLength('test', 5);
