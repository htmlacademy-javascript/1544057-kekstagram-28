import { CHROME_FILTER, SEPIA_FILTER, MARVIN_FILTER, PHOBOS_FILTER, HEAT_FILTER } from '../constants.js';
import { clearLastFilter, applyFilter } from './editor/filter-control.js';
import './editor/scale-control.js';

const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const effectLevelSliderWrapperElement = imageUploadOverlayElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = effectLevelSliderWrapperElement.querySelector('.effect-level__slider');
const effectButtonsElements = imageUploadOverlayElement.querySelectorAll('.effects__list input');

const sliderConfig = {
  chrome: CHROME_FILTER,
  sepia: SEPIA_FILTER,
  marvin: MARVIN_FILTER,
  phobos: PHOBOS_FILTER,
  heat: HEAT_FILTER
};

effectLevelSliderWrapperElement.classList.add('hidden');

let slider = null;

export const destroySlider = () => {
  if (slider) {
    slider.destroy();
  }
  effectLevelSliderWrapperElement.classList.add('hidden');
};

const createSlider = (currentFilter) => {
  effectLevelSliderWrapperElement.classList.remove('hidden');
  if (slider) {
    slider.destroy();
  }

  slider = noUiSlider.create(effectLevelSliderElement, sliderConfig[currentFilter]);
};


effectButtonsElements.forEach((effectButton) => {
  effectButton.addEventListener('click', (event) => {
    const currentFilter = event.target.id.split('-')[1];
    clearLastFilter();

    if (currentFilter === 'none') {
      destroySlider();
      return;
    }

    createSlider(currentFilter);
    applyFilter(currentFilter);

  });
});
