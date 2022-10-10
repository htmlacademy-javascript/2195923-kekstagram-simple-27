import {generateRandomInteger, generateString, shuffleArray} from './util.js';

const orderedArrayNumbers = Array.from({length: 25}, (element, index) => ++index);
const idPhotos = shuffleArray(orderedArrayNumbers.slice());
const urlPhotos = shuffleArray(orderedArrayNumbers.slice());

function createPhoto(photo, index) {
  return {
    id: idPhotos[index],
    url: `photos/${urlPhotos[index]}.jpg`,
    description: generateString(),
    likes: generateRandomInteger(15, 200),
    comments: generateRandomInteger(0, 200),
  };
}

const createPhotos = () => Array.from({length: 25}, createPhoto);

export {createPhotos};
