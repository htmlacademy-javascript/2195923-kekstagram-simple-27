import { sendData } from './network.js';
import { classEffectToIdEffect, idEffectToClassEffect } from './util.js';

const DEFAULT_SCALE_PHOTO = '100%';

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
const effectNoneRadioInput = effectsList.querySelector('#effect-none');

const ScaleParameter = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const EffectSettings = {
  'effect-none': {
    effect: ['none', '']
  },
  'effect-chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    effect: ['grayscale', ''],
  },
  'effect-sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    effect: ['sepia', '']
  },
  'effect-marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    effect: ['invert', '%']
  },
  'effect-phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    effect: ['blur', 'px']
  },
  'effect-heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    effect: ['brightness', '']
  },
};

const replaceClass = (newClass) => {
  previewPhotoImg.classList.remove(previewPhotoImg.classList.value);
  previewPhotoImg.classList.add(newClass);
};

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = DEFAULT_SCALE_PHOTO;
  previewPhotoImg.removeAttribute('style');
  replaceClass(idEffectToClassEffect('effect-none'));
  descriptionPhotoText.value = '';
  effectNoneRadioInput.checked = true;
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
  replaceClass(idEffectToClassEffect(idEffect));
  if (idEffect === 'effect-none') {
    previewPhotoImg.style.filter = EffectSettings[idEffect].effect[0];
    sliderFieldset.classList.add('visually-hidden');
  } else {
    sliderElement.noUiSlider.updateOptions(EffectSettings[idEffect]);
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

const onSuccessSendData = () => {
  imgUploadSubmit.removeAttribute('disabled', '');
  const successModal = successModalTemplate.cloneNode(true);
  const successModalButton = successModal.querySelector('.success__button');
  successModalButton.addEventListener('click', onSuccessModalButtonClick);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onOutsideSuccessModalClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  body.append(successModal);
};

const onErrorSendData = () => {
  imgUploadSubmit.removeAttribute('disabled', '');
  const errorModal = errorModalTemplate.cloneNode(true);
  const errorModalButton = errorModal.querySelector('.error__button');
  errorModalButton.addEventListener('click', onErrorModalButtonClick);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onOutsideErrorModalClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  body.append(errorModal);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  imgUploadSubmit.setAttribute('disabled', '');
  sendData(onSuccessSendData, onErrorSendData, new FormData(evt.target));
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
    start: 0,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    effectLevelInput.value = sliderElement.noUiSlider.get();
    const classEffect = previewPhotoImg.classList.value;
    const idEffect = classEffectToIdEffect(classEffect);
    if (idEffect !== 'effect-none') {
      previewPhotoImg.style.filter = `${EffectSettings[idEffect].effect[0]}(${effectLevelInput.value}${EffectSettings[idEffect].effect[1]})`;
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
