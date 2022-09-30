function getRandomInteger(from, to) {
  if (from < 0 || to < 0) {
    return NaN;
  }

  return Math.round(Math.random() * Math.abs(to - from) + from);
}

function checkMaxStringLength(string, maxLength) {
  if (typeof string === 'string' && typeof maxLength === 'number' && maxLength >= 0) {
    return string.length <= maxLength;
  }
  return null;
}


getRandomInteger(5, 10);
checkMaxStringLength('test', 5);
