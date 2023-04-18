import { MESSAGE_UPLOAD_SHOW_TIME } from './constants.js';

const onEscKeyDown = (event, callback) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};

const showModal = (messageClass, msg = null, callback = null) => {
  const messageTemplate = document.querySelector(`#${messageClass}`).content.cloneNode(true);
  const messageContainer = messageTemplate.querySelector(`.${messageClass}`);
  const messageInner = messageTemplate.querySelector(`.${messageClass}__inner`);
  const button = messageTemplate.querySelector(`.${messageClass}__button`);
  const messageTitle = messageTemplate.querySelector(`.${messageClass}__title`);
  if (msg) {
    messageTitle.textContent = msg;
  }

  const onCloseButtonClick = () => {
    removeMessageModal();
    if (callback) {
      callback();
    }
  };

  const onEscKeyModalDown = (event) => {
    event.stopPropagation();
    onEscKeyDown(event, removeMessageModal);
  };

  const onOutsideClick = (event) => {
    if (!messageInner.contains(event.target)) {
      removeMessageModal();
    }
  };


  function removeMessageModal() {
    messageContainer.remove();
    document.removeEventListener('keydown', onEscKeyModalDown, true);
    document.removeEventListener('click', onOutsideClick);
  }

  button.addEventListener('click', onCloseButtonClick);

  document.addEventListener('keydown', onEscKeyModalDown, true);
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(messageContainer);

  setTimeout(() => {
    removeMessageModal();
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

export { onEscKeyDown, showModal, debounce, shuffleArr };
