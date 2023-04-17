const form = document.querySelector('.img-upload__overlay');
const imgPreview = form.querySelector('.img-upload__preview');
const intensityInput = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');

let lastFilterClass = '';

const clearLastFilter = () => {
  if (lastFilterClass) {
    imgPreview.classList.remove(lastFilterClass);
    imgPreview.style.filter = 'none';
  }
};

const CLASS_TEMPLATE = 'effects__imgPreview--';

const FILTERS = {
  chrome: {
    className: `${CLASS_TEMPLATE}chrome`,
    style: (value) => ` grayscale(${value})`
  },
  sepia: {
    className: `${CLASS_TEMPLATE}sepia`,
    style: (value) => ` sepia(${value})`
  },
  marvin: {
    className: `${CLASS_TEMPLATE}marvin`,
    style: (value) => ` invert(${value}%)`
  },
  phobos: {
    className: `${CLASS_TEMPLATE}phobos`,
    style: (value) => ` blur(${value}px)`
  },
  heat: {
    className: `${CLASS_TEMPLATE}heat`,
    style: (value) => ` brightness(${value})`
  }
};

const applyFilter = (filterName) => {
  const filter = FILTERS[filterName];
  const filterClass = filter.className;
  const filterStyle = filter.style;
  imgPreview.classList.add(filterClass);
  lastFilterClass = filterClass;

  slider.noUiSlider.on('update', () => {
    const value = slider.noUiSlider.get();
    intensityInput.value = value;
    imgPreview.style.filter = filterStyle(value);
  });
};

export { clearLastFilter, applyFilter };
