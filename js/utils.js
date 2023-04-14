import { MESSAGE_UPLOAD_SHOW_TIME } from './constants.js';

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    return true;
  }
  return false;
};

function showAlert() {
  const template = document.getElementById('error');
  const error = template.content.cloneNode(true);

  const handleButtonClick = () => {
    removeError();
  };

  const handleKeyPress = (event) => {
    if (onEscKeyDown(event)) {
      removeError();
    }
  };

  const handleClickOutside = (event) => {
    if (!error.contains(event.target)) {
      removeError();
    }
  };
  function removeError() {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('click', handleClickOutside);
  }

  const button = error.querySelector('.error__button');
  button.addEventListener('click', handleButtonClick);

  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('click', handleClickOutside);

  document.body.appendChild(error);

}


const showMessageUpload = () => {
  const messageTemplate = document.querySelector('#success').content.cloneNode(true);
  const messageContainer = messageTemplate.querySelector('.success');

  messageTemplate.querySelector('.success__button').addEventListener('click', () => {
    messageContainer.remove();
  });

  document.body.appendChild(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_UPLOAD_SHOW_TIME);
};

export { onEscKeyDown, showAlert, showMessageUpload };
