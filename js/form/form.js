import { onEscKeyDown } from '../utils.js';
import { post } from '../api.js';
import { showModal } from '../utils.js';
import { clearLastFilter } from './editor/filter-control.js';
import { resetImgScale } from './editor/scale-control.js';
import { FILE_FORMATS } from '../constants.js';
import { destroySlider } from './form-editor.js';
import './form-editor.js';
import './form-validate.js';

const pageBodyElement = document.querySelector('body');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = document.querySelector('#upload-file');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const imgEffestsPreviewElements = document.querySelectorAll('.effects__preview');
const cancelUploadElement = document.querySelector('.img-upload__cancel');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const hastagFormElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFromElement = uploadFormElement.querySelector('.text__description');


const clearInputs = () => {
  clearLastFilter();
  resetImgScale();
  uploadFormElement.reset();
  destroySlider();
  hastagFormElement.value = '';
  descriptionFromElement.value = '';
};

const onDocumentKeydown = (event) => {
  onEscKeyDown(event, closeUserModal);
};

const openUserModal = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  pageBodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal() {
  imgUploadOverlayElement.classList.add('hidden');
  pageBodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearInputs();
}

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewElement.children[0].src = img;
  imgEffestsPreviewElements.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

cancelUploadElement.addEventListener('click', () => {
  closeUserModal();
  clearInputs();
});

uploadFileElement.addEventListener('change', () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_FORMATS.some((it) => fileName.endsWith(it));
  if (matches) {
    displayImage(file);
    openUserModal();
  }
});

uploadFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  submitButtonElement.setAttribute('disabled', '');

  post(new FormData(event.target))
    .then(() => {
      closeUserModal();
      showModal('success');
      clearInputs();
    })
    .catch(
      (err) => {
        if (err) {
          showModal('error');
        }
      }
    )
    .finally(submitButtonElement.removeAttribute('disabled'));

});

