import { generateRandomInteger, generateString, shuffleArray } from './util.js';

const DESCRIPTIONS_PHOTO = [
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / I\'ve bought some potatoes.',
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Вот это тачка! #wow #car #carwow #drive',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  '#fun #party #cool #young',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Отдыхаем... #chill #relax #group #photo',
  'Will you still love me when I\'m no longer young and beautiful? (c) Ленин',
];

const orderedArrayNumbers = Array.from({ length: 25 }, (element, index) => ++index);
const idPhotos = shuffleArray(orderedArrayNumbers.slice());
const urlPhotos = shuffleArray(orderedArrayNumbers.slice());

function createPhoto(photo, index) {
  return {
    id: idPhotos[index],
    url: `photos/${urlPhotos[index]}.jpg`,
    description: generateString(DESCRIPTIONS_PHOTO),
    likes: generateRandomInteger(15, 200),
    comments: generateRandomInteger(0, 200),
  };
}

const createPhotos = () => Array.from({ length: 25 }, createPhoto);

export { createPhotos };
