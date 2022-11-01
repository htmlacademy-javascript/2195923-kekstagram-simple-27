import { sendData } from './network.js';
import { classEffectToIdEffect, idEffectToClassEffect, replaceClass } from './util.js';
import { openSuccessModal, openErrorModal } from './modal.js';
import { getScaleParameters, getEffectSettings} from './constants.js';

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

const effectNoneRadioInput = effectsList.querySelector('#effect-none');

const scaleParameters = getScaleParameters();
const effectSettings = getEffectSettings();

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = DEFAULT_SCALE_PHOTO;
  previewPhotoImg.removeAttribute('style');
  replaceClass(previewPhotoImg, idEffectToClassEffect('effect-none'));
  descriptionPhotoText.value = '';
  effectNoneRadioInput.checked = true;
};

const onZoomOutPhotoButtonClick = () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger > scaleParameters.MIN) {
    scalePhotoText.value = `${scalePhotoInteger - scaleParameters.STEP}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger - scaleParameters.STEP) / 100})`;
  }
};

const onZoomInPhotoButtonClick = () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger < scaleParameters.MAX) {
    scalePhotoText.value = `${scalePhotoInteger + scaleParameters.STEP}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger + scaleParameters.STEP) / 100})`;
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
  replaceClass(previewPhotoImg, idEffectToClassEffect(idEffect));
  if (idEffect === 'effect-none') {
    previewPhotoImg.style.filter = effectSettings[idEffect].effect[0];
    sliderFieldset.classList.add('visually-hidden');
  } else {
    sliderElement.noUiSlider.updateOptions(effectSettings[idEffect]);
  }
};

const onSuccessSendData = () => {
  imgUploadSubmit.removeAttribute('disabled', '');
  document.removeEventListener('keydown', onModalEscKeydown);
  openSuccessModal();
};

const onErrorSendData = () => {
  imgUploadSubmit.removeAttribute('disabled', '');
  document.removeEventListener('keydown', onModalEscKeydown);
  openErrorModal();
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
      previewPhotoImg.style.filter = `${effectSettings[idEffect].effect[0]}(${effectLevelInput.value}${effectSettings[idEffect].effect[1]})`;
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

export {createEventFormHandlers, onCancelFormButtonClick, onModalEscKeydown};
