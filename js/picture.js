import { createPhotos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const createPhotoCard = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureListFragment.append(pictureElement);
};

const renderPhotoCards = () => {
  const photos = createPhotos();
  photos.forEach(createPhotoCard);
  picturesContainer.append(pictureListFragment);
};

export {renderPhotoCards};
