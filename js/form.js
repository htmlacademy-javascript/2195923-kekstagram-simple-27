const photoUploadButton = document.querySelector('#upload-file');
const photoEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelFormButton = document.querySelector('#upload-cancel');


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
  photoUploadButton.value = '';
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


