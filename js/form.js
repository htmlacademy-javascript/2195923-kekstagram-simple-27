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

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const replaceClass = (newClass) => {
  previewPhotoImg.classList.remove(previewPhotoImg.classList.value);
  previewPhotoImg.classList.add(newClass);
};

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = '100%';
  previewPhotoImg.style.transform = 'scale(1)';
  replaceClass('effects__preview--none');
  descriptionPhotoText.textContent = '';
};

const onZoomOutPhotoButtonClick = () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger > 25) {
    scalePhotoText.value = `${scalePhotoInteger - 25}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger - 25) / 100})`;
  }
};

const onZoomInPhotoButtonClick = () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger < 100) {
    scalePhotoText.value = `${scalePhotoInteger + 25}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger + 25) / 100})`;
  }
};

const onModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onCancelFormButtonClick();
  }
};

function onUploadPhotoButtonChange() {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  cancelFormButton.addEventListener('click', onCancelFormButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  zoomOutPhotoButton.addEventListener('click', onZoomOutPhotoButtonClick);
  zoomInPhotoButton.addEventListener('click', onZoomInPhotoButtonClick);

  photoUploadButton.removeEventListener('change', onUploadPhotoButtonChange);
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

  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
}

effectsList.addEventListener('change', (evt) => {
  const idEffect = evt.target.id;
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
      previewPhotoImg.removeAttribute('style');
      break;
  }
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

const createEventFormHandlers = () => {
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
};

export {createEventFormHandlers};
