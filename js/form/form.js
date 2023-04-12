import { onEscKeyDown } from '../utils.mjs';

const pageBody = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview');
const imgEffestsPreview = document.querySelectorAll('.effects__preview');
const cancelUpload = document.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) => {
  if (onEscKeyDown(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal() {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFile.value = '';
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
});

uploadFile.addEventListener('change', () => {
  openUserModal();
  const file = uploadFile.files[0];
  displayImage(file);
});
