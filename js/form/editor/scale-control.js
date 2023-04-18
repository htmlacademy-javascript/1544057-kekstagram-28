import { IMG_SCALE_CHANGE_STEP, IMG_MIN_SCALE, IMG_MAX_SCALE } from '../../constants.js';

const formElement = document.querySelector('.img-upload__overlay');
const decreaseButtonElement = formElement.querySelector('.scale__control--smaller');
const increaseButtonElement = formElement.querySelector('.scale__control--bigger');
const scaleValueElement = formElement.querySelector('.scale__control--value');
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');

export const resetImgScale = () => {
  scaleValueElement.value = `${IMG_MAX_SCALE}%`;
  imgPreviewElement.style.transform = 'scale(1)';
};

scaleValueElement.value = `${IMG_MAX_SCALE}%`;

const extractNumbers = (param) => {
  const result = param.toString().replace(/\D/g, '');
  return result ? Number(result) : NaN;
};

const onDecreaseScaleButtonClick = () => {
  const currentScale = extractNumbers(scaleValueElement.value);
  if (currentScale === IMG_MIN_SCALE) {
    return;
  }

  const newScaleValue = currentScale - IMG_SCALE_CHANGE_STEP;
  imgPreviewElement.style.transform = `scale(0.${newScaleValue})`;
  scaleValueElement.value = `${newScaleValue}%`;
};

const onIncreaseScaleButtonClick = () => {
  const currentScale = extractNumbers(scaleValueElement.value);
  const MAX_SCALE = 100;
  if (currentScale === IMG_MAX_SCALE) {
    return;
  }

  const newScaleValue = currentScale + IMG_SCALE_CHANGE_STEP;
  imgPreviewElement.style.transform = (newScaleValue === MAX_SCALE) ? 'scale(1)' : `scale(0.${newScaleValue})`;
  scaleValueElement.value = `${newScaleValue}%`;
};

decreaseButtonElement.addEventListener('click', onDecreaseScaleButtonClick);
increaseButtonElement.addEventListener('click', onIncreaseScaleButtonClick);
