const CLASS_TEMPLATE = 'effects__imgPreview--';
const formElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = formElement.querySelector('.img-upload__preview');
const intensityInputElement = formElement.querySelector('.effect-level__value');
const sliderElement = formElement.querySelector('.effect-level__slider');

let lastFilterClass = '';

const clearLastFilter = () => {
  if (lastFilterClass) {
    imgPreviewElement.classList.remove(lastFilterClass);
    imgPreviewElement.style.filter = 'none';
  }
};

const filters = {
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
  const filter = filters[filterName];
  const filterClass = filter.className;
  const filterstyle = filter.style;
  imgPreviewElement.classList.add(filterClass);
  lastFilterClass = filterClass;

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    intensityInputElement.value = value;
    imgPreviewElement.style.filter = filterstyle(value);
  });
};

export { clearLastFilter, applyFilter };
