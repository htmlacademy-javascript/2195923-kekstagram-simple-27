const body = document.querySelector('body');
const photoUploadButton = document.querySelector('#upload-file');

const photoEditForm = document.querySelector('.img-upload__overlay');
const cancelFormButton = photoEditForm.querySelector('#upload-cancel');
const scalePhotoText = photoEditForm.querySelector('.scale__control--value');
const previewPhotoImg = photoEditForm.querySelector('.img-upload__preview img');
const descriptionPhotoText = photoEditForm.querySelector('.text__description');

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = '100%';
  previewPhotoImg.classList.replace(previewPhotoImg.classList.item[0], 'effects__preview--none');
  descriptionPhotoText.textContent = '';
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
  photoUploadButton.removeEventListener('change', onUploadPhotoButtonChange);
}

function onCancelFormButtonClick() {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFormData();
  cancelFormButton.removeEventListener('click', onCancelFormButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
}

const createEventFormHandlers = () => {
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
};

export {createEventFormHandlers};
