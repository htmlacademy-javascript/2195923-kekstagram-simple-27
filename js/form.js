const photoUploadButton = document.querySelector('#upload-file');
const photoEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelFormButton = document.querySelector('#upload-cancel');
const scalePhotoText = document.querySelector('.scale__control--value');
const previewPhotoImg = document.querySelector('.img-upload__preview img');
const descriptionPhotoText = document.querySelector('.text__description');

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = '100%';
  previewPhotoImg.classList.replace('effects__preview--none');
  descriptionPhotoText.textContent = '';
};

const openModal = () => {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  cancelFormButton.addEventListener('click', onCancelFormButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  photoUploadButton.removeEventListener('change', onUploadPhotoButtonChange);
};

const closeModal = () => {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFormData();
  cancelFormButton.removeEventListener('click', onCancelFormButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
};

function onModalEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function onUploadPhotoButtonChange() {
  openModal();
}

function onCancelFormButtonClick() {
  closeModal();
}

photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);


