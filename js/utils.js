import { MESSAGE_UPLOAD_SHOW_TIME } from './constants.js';

const checkEscKeyDown = (event, callback) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};

const showModal = (messageClass, msg = null, callback = null) => {
  const messageTemplateElement = document.querySelector(`#${messageClass}`).content.cloneNode(true);
  const messageContainerElement = messageTemplateElement.querySelector(`.${messageClass}`);
  const messageInnerElement = messageTemplateElement.querySelector(`.${messageClass}__inner`);
  const messageButtonElement = messageTemplateElement.querySelector(`.${messageClass}__button`);
  const messageTitleElement = messageTemplateElement.querySelector(`.${messageClass}__title`);
  if (msg) {
    messageTitleElement.textContent = msg;
  }

  const onCloseButtonClick = () => {
    removeMessageModal();
    if (callback) {
      callback();
    }
  };

  const onEscKeyModalDown = (event) => {
    event.stopPropagation();
    checkEscKeyDown(event, removeMessageModal);
  };

  const onOutsideClick = (event) => {
    if (!messageInnerElement.contains(event.target)) {
      removeMessageModal();
    }
  };


  function removeMessageModal() {
    messageContainerElement.remove();
    document.removeEventListener('keydown', onEscKeyModalDown, true);
    document.removeEventListener('click', onOutsideClick);
  }

  messageButtonElement.addEventListener('click', onCloseButtonClick);

  document.addEventListener('keydown', onEscKeyModalDown, true);
  document.addEventListener('click', onOutsideClick);

  document.body.appendChild(messageContainerElement);

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

export { checkEscKeyDown, showModal, debounce, shuffleArr };
