import { MESSAGE_UPLOAD_SHOW_TIME } from './constants.js';

const onEscKeyDown = (event, callback) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};

function showAlert(msg, callback) {
  const template = document.querySelector('#error');
  const error = template.content.cloneNode(true);
  const button = error.querySelector('.error__button');
  const errorMessage = error.querySelector('.error__title');
  errorMessage.textContent = msg;

  const onCloseButtonClick = () => {
    removeError();
    if (callback) {
      callback();
    }
  };

  const onEscKeyAlertDown = (event) => {
    event.stopPropagation();
    onEscKeyDown(event, removeError);

  };

  const onOutsideClick = (event) => {
    if (!error.contains(event.target)) {
      removeError();
    }
  };

  function removeError() {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onEscKeyAlertDown, true);
    document.removeEventListener('click', onOutsideClick);
  }

  button.addEventListener('click', onCloseButtonClick);

  document.addEventListener('keydown', onEscKeyAlertDown, true);
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(error);
}

const showMessageUpload = () => {
  const messageTemplate = document.querySelector('#success').content.cloneNode(true);
  const messageContainer = messageTemplate.querySelector('.success');

  messageTemplate.querySelector('.success__button').addEventListener('click', () => messageContainer.remove());

  document.body.appendChild(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_UPLOAD_SHOW_TIME);
};

function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);

export { onEscKeyDown, showAlert, showMessageUpload, debounce, shuffleArr };
