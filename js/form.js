import { sendData } from './network.js';

const body = document.querySelector('body');
const photoUploadButton = document.querySelector('#upload-file');

const photoEditForm = document.querySelector('.img-upload__overlay');
const cancelFormButton = photoEditForm.querySelector('#upload-cancel');
const scalePhotoText = photoEditForm.querySelector('.scale__control--value');
const previewPhotoImg = photoEditForm.querySelector('.img-upload__preview img');
const descriptionPhotoText = photoEditForm.querySelector('.text__description');

const zoomOutPhotoButton = photoEditForm.querySelector('.scale__control--smaller');
const zoomInPhotoButton = photoEditForm.querySelector('.scale__control--bigger');

const effectsList = photoEditForm.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const sliderFieldset = document.querySelector('.img-upload__effect-level');

const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadSubmit = imgUploadForm.querySelector('#upload-submit');

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
//const effectNoneRadioInput = effectsList.querySelector('#effect-none');

const ScaleParameter = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const replaceClass = (newClass) => {
  previewPhotoImg.classList.remove(previewPhotoImg.classList.value);
  previewPhotoImg.classList.add(newClass);
};

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = '100%';
  previewPhotoImg.removeAttribute('style');
  replaceClass('effects__preview--none');
  descriptionPhotoText.value = '';
};

const onZoomOutPhotoButtonClick = () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger > ScaleParameter.MIN) {
    scalePhotoText.value = `${scalePhotoInteger - ScaleParameter.STEP}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger - ScaleParameter.STEP) / 100})`;
  }
};

const onZoomInPhotoButtonClick = () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger < ScaleParameter.MAX) {
    scalePhotoText.value = `${scalePhotoInteger + ScaleParameter.STEP}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger + ScaleParameter.STEP) / 100})`;
  }
};

const onModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onCancelFormButtonClick();
  }
};

const onEffectsListChange = (evt) => {
  const idEffect = evt.target.id;
  sliderFieldset.classList.remove('visually-hidden');
  switch(idEffect) {
    case 'effect-chrome':
      replaceClass('effects__preview--chrome');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'effect-sepia':
      replaceClass('effects__preview--sepia');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'effect-marvin':
      replaceClass('effects__preview--marvin');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      break;
    case 'effect-phobos':
      replaceClass('effects__preview--phobos');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'effect-heat':
      replaceClass('effects__preview--heat');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'effect-none':
      replaceClass('effects__preview--none');
      previewPhotoImg.style.filter = 'none';
      sliderFieldset.classList.add('visually-hidden');
      break;
  }
};

const onSuccessModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onSuccessModalButtonClick();
  }
};

const onOutsideSuccessModalClick = (evt) => {
  const successInnerModal = document.querySelector('.success__inner');
  if (!(evt.target === successInnerModal) && !successInnerModal.contains(evt.target)) {
    onSuccessModalButtonClick();
  }
};

function onSuccessModalButtonClick() {
  const successModal = document.querySelector('.success');
  const successModalButton = successModal.querySelector('.success__button');
  successModalButton.removeEventListener('click', onSuccessModalButtonClick);
  successModal.remove();
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
  document.removeEventListener('click', onOutsideSuccessModalClick);
  document.addEventListener('keydown', onModalEscKeydown);
  onCancelFormButtonClick();
}

const onErrorModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onErrorModalButtonClick();
  }
};

const onOutsideErrorModalClick = (evt) => {
  const errorInnerModal = document.querySelector('.error__inner');
  if (!(evt.target === errorInnerModal) && !errorInnerModal.contains(evt.target)) {
    onErrorModalButtonClick();
  }
};

function onErrorModalButtonClick() {
  const errorModal = document.querySelector('.error');
  const errorModalButton = errorModal.querySelector('.error__button');
  errorModalButton.removeEventListener('click', onErrorModalButtonClick);
  errorModal.remove();
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  document.removeEventListener('click', onOutsideErrorModalClick);
  document.addEventListener('keydown', onModalEscKeydown);
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  imgUploadSubmit.setAttribute('disabled', '');
  sendData(
    () => {
      imgUploadSubmit.removeAttribute('disabled', '');
      const successModal = successModalTemplate.cloneNode(true);
      const successModalButton = successModal.querySelector('.success__button');
      successModalButton.addEventListener('click', onSuccessModalButtonClick);
      document.addEventListener('keydown', onSuccessModalEscKeydown);
      document.addEventListener('click', onOutsideSuccessModalClick);
      document.removeEventListener('keydown', onModalEscKeydown);
      body.append(successModal);
    },
    () => {
      imgUploadSubmit.removeAttribute('disabled', '');
      const errorModal = errorModalTemplate.cloneNode(true);
      const errorModalButton = errorModal.querySelector('.error__button');
      errorModalButton.addEventListener('click', onErrorModalButtonClick);
      document.addEventListener('keydown', onErrorModalEscKeydown);
      document.addEventListener('click', onOutsideErrorModalClick);
      document.removeEventListener('keydown', onModalEscKeydown);
      body.append(errorModal);
    },
    new FormData(evt.target));
};

function onUploadPhotoButtonChange() {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  sliderFieldset.classList.add('visually-hidden');

  cancelFormButton.addEventListener('click', onCancelFormButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  zoomOutPhotoButton.addEventListener('click', onZoomOutPhotoButtonClick);
  zoomInPhotoButton.addEventListener('click', onZoomInPhotoButtonClick);
  effectsList.addEventListener('change', onEffectsListChange);
  imgUploadForm.addEventListener('submit', onFormSubmit);

  photoUploadButton.removeEventListener('change', onUploadPhotoButtonChange);

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    effectLevelInput.value = sliderElement.noUiSlider.get();
    const classEffect = previewPhotoImg.classList.value;
    switch(classEffect) {
      case 'effects__preview--none':
        break;
      case 'effects__preview--chrome':
        previewPhotoImg.style.filter = `grayscale(${effectLevelInput.value})`;
        break;
      case 'effects__preview--sepia':
        previewPhotoImg.style.filter = `sepia(${effectLevelInput.value})`;
        break;
      case 'effects__preview--marvin':
        previewPhotoImg.style.filter = `invert(${effectLevelInput.value}%)`;
        break;
      case 'effects__preview--phobos':
        previewPhotoImg.style.filter = `blur(${effectLevelInput.value}px)`;
        break;
      case 'effects__preview--heat':
        previewPhotoImg.style.filter = `brightness(${effectLevelInput.value})`;
        break;
    }
  });
}

function onCancelFormButtonClick() {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFormData();
  sliderElement.noUiSlider.destroy();
  cancelFormButton.removeEventListener('click', onCancelFormButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  zoomOutPhotoButton.removeEventListener('click', onZoomOutPhotoButtonClick);
  zoomInPhotoButton.removeEventListener('click', onZoomInPhotoButtonClick);
  effectsList.removeEventListener('change', onEffectsListChange);

  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
}

const createEventFormHandlers = () => {
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
};

export {createEventFormHandlers};
