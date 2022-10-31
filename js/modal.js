import { onCancelFormButtonClick, onModalEscKeydown } from './form.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

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

const openSuccessModal = () => {
  const successModal = successModalTemplate.cloneNode(true);
  const successModalButton = successModal.querySelector('.success__button');
  successModalButton.addEventListener('click', onSuccessModalButtonClick);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onOutsideSuccessModalClick);
  body.append(successModal);
};

const openErrorModal = () => {
  const errorModal = errorModalTemplate.cloneNode(true);
  const errorModalButton = errorModal.querySelector('.error__button');
  errorModalButton.addEventListener('click', onErrorModalButtonClick);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onOutsideErrorModalClick);
  body.append(errorModal);
};

export {openSuccessModal, openErrorModal};
