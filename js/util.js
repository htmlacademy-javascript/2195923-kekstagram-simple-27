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

function shuffleArray(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  return items;
}

function generateString() {
  return DESCRIPTIONS_PHOTO[generateRandomInteger(0, DESCRIPTIONS_PHOTO.length - 1)];
}

export {generateRandomInteger, checkMaxStringLength, generateString, shuffleArray};
