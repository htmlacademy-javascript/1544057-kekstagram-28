import { IMG_SCALE_CHANGE_STEP, IMG_MIN_SCALE, IMG_MAX_SCALE } from '../../constants.js';

const formWrapper = document.querySelector('.img-upload__overlay');
const decreaseButton = formWrapper.querySelector('.scale__control--smaller');
const increaseButton = formWrapper.querySelector('.scale__control--bigger');
const scaleValue = formWrapper.querySelector('.scale__control--value');
const previewImg = formWrapper.querySelector('.img-upload__preview img');

export const resetImgScale = () => {
  scaleValue.value = `${IMG_MAX_SCALE}%`;
  previewImg.style.transform = 'scale(1)';
};

scaleValue.value = `${IMG_MAX_SCALE}%`;

const extractNumbers = (param) => {
  const result = param.toString().replace(/\D/g, '');
  return result ? Number(result) : NaN;
};

const onDecreaseScaleButtonClick = () => {
  const currentScale = extractNumbers(scaleValue.value);
  if (currentScale === IMG_MIN_SCALE) {
    return;
  }

  const newScaleValue = currentScale - IMG_SCALE_CHANGE_STEP;
  previewImg.style.transform = `scale(0.${newScaleValue})`;
  scaleValue.value = `${newScaleValue}%`;
};

const onIncreaseScaleButtonClick = () => {
  const currentScale = extractNumbers(scaleValue.value);
  const MAX_SCALE = 100;
  if (currentScale === IMG_MAX_SCALE) {
    return;
  }

  const newScaleValue = currentScale + IMG_SCALE_CHANGE_STEP;
  previewImg.style.transform = (newScaleValue === MAX_SCALE) ? 'scale(1)' : `scale(0.${newScaleValue})`;
  scaleValue.value = `${newScaleValue}%`;
};

decreaseButton.addEventListener('click', onDecreaseScaleButtonClick);
increaseButton.addEventListener('click', onIncreaseScaleButtonClick);
