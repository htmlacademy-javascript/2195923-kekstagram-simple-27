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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 4000);
};

export { generateRandomInteger, checkMaxStringLength, generateString, shuffleArray, showAlert };
