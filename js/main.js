const ALPHABET = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ');

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

function sattoloCycle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  return items;
}

function generateString(minLength, maxLength) {
  const descriptionLength = generateRandomInteger(minLength, maxLength);
  let description = '';
  for (let i = 0; i < descriptionLength; i++) {
    description += ALPHABET[generateRandomInteger(0, ALPHABET.length - 1)];
  }
  return description;
}

const orderedArrayNumbers = Array.from({length: 25}, (element, index) => ++index);
const idPhotos = sattoloCycle(orderedArrayNumbers.slice());
const urlPhotos = sattoloCycle(orderedArrayNumbers.slice());

function createPhoto(photo, index) {
  return {
    id: idPhotos[index],
    url: `photos/${urlPhotos[index]}.jpg`,
    description: generateString(0, 100),
    likes: generateRandomInteger(15, 200),
    comments: generateRandomInteger(0, 200),
  };
}

const photos = Array.from({length: 25}, createPhoto);

checkMaxStringLength(photos[0].description, 5); //вызов функции, чтобы не было ошибки линтера.
