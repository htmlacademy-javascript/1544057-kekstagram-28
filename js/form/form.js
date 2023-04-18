import { onEscKeyDown } from '../utils.js';
import { post } from '../api.js';
import { showModal } from '../utils.js';
import { clearLastFilter } from './editor/filter-control.js';
import { resetImgScale } from './editor/scale-control.js';
import { FILE_FORMATS } from '../constants.js';
import { destroySlider } from './form-editor.js';
import './form-editor.js';
import './form-validate.js';

const pageBody = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileFrom = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview');
const imgEffestsPreview = document.querySelectorAll('.effects__preview');
const cancelUpload = document.querySelector('#upload-cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hastagForm = uploadForm.querySelector('.text__hashtags');
const descriptionFrom = uploadForm.querySelector('.text__description');


const clearInputs = () => {
  clearLastFilter();
  resetImgScale();
  uploadFileFrom.reset();
  destroySlider();
  hastagForm.value = '';
  descriptionFrom.value = '';
};

const onDocumentKeydown = (event) => {
  onEscKeyDown(event, closeUserModal);
};

const openUserModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal() {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearInputs();
}

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreview.children[0].src = img;
  imgEffestsPreview.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

cancelUpload.addEventListener('click', () => {
  closeUserModal();
  clearInputs();
});

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_FORMATS.some((it) => fileName.endsWith(it));
  if (matches) {
    displayImage(file);
    openUserModal();
  }
});

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  submitButton.setAttribute('disabled', '');

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
    .finally(submitButton.removeAttribute('disabled'));

});

