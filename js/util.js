const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 4000);
};

const classEffectToIdEffect = (classEffect) => classEffect.replace('s__preview-', '');

const idEffectToClassEffect = (idEffect) => {
  const separateStringIdEffect = idEffect.split('-');
  return `${separateStringIdEffect[0]}s__preview--${separateStringIdEffect[1]}`;
};

const replaceClass = (object, newClass) => {
  object.classList.remove(object.classList.value);
  object.classList.add(newClass);
};

export { showAlert, classEffectToIdEffect, idEffectToClassEffect, replaceClass };
