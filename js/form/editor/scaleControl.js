import { IMG_SCALE_CHANGE_STEP, IMG_MIN_SCALE, IMG_MAX_SCALE } from '../../constants.mjs';

const formWrapper = document.querySelector('.img-upload__overlay');
const decreaseBtn = formWrapper.querySelector('.scale__control--smaller');
const increaseBtn = formWrapper.querySelector('.scale__control--bigger');
const scaleValue = formWrapper.querySelector('.scale__control--value');
const previewImg = formWrapper.querySelector('.img-upload__preview img');

scaleValue.value = `${IMG_MAX_SCALE}%`;

const extractNumbers = (param) => {
  const result = param.toString().replace(/\D/g, '');
  return result ? Number(result) : NaN;
};

const decreaseScale = () => {
  const currentScale = extractNumbers(scaleValue.value);
  if (currentScale === IMG_MIN_SCALE) {
    return;
  }

  const newScaleValue = currentScale - IMG_SCALE_CHANGE_STEP;
  previewImg.style.transform = `scale(0.${newScaleValue})`;
  scaleValue.value = `${newScaleValue}%`;
};

const increaseScale = () => {
  const currentScale = extractNumbers(scaleValue.value);

  if (currentScale === IMG_MAX_SCALE) {
    return;
  }

  const newScaleValue = currentScale + IMG_SCALE_CHANGE_STEP;
  previewImg.style.transform = (newScaleValue === 100) ? 'scale(1)' : `scale(0.${newScaleValue})`;
  scaleValue.value = `${newScaleValue}%`;
};

decreaseBtn.addEventListener('click', decreaseScale);
increaseBtn.addEventListener('click', increaseScale);
