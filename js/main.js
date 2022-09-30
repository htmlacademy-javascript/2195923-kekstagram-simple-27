function getRandomInteger(from, to) {
  if (from < 0 || to < 0) {
    return NaN;
  }

  return Math.round(Math.random() * Math.abs(to - from) + from);
}

getRandomInteger(5, 10);
