const form = document.querySelector('.img-upload__overlay');
const preview = form.querySelector('.img-upload__preview');
const intensityInput = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');

let lastFilterClass = '';

const clearLastFilter = () => {
  if (lastFilterClass) {
    preview.classList.remove(lastFilterClass);
    preview.style.filter = '';
  }
};

const applyFilter = (filterName) => {
  const filterClass = `effects__preview--${filterName}`;
  preview.classList.add(filterClass);
  lastFilterClass = filterClass;

  slider.noUiSlider.on('update', () => {
    const value = slider.noUiSlider.get();
    intensityInput.value = value;

    switch (filterName) {
      case 'chrome':
        preview.style.filter = `grayscale(${value})`;
        break;
      case 'sepia':
        preview.style.filter = `sepia(${value})`;
        break;
      case 'marvin':
        preview.style.filter = `invert(${value}%)`;
        break;
      case 'phobos':
        preview.style.filter = `blur(${value}px)`;
        break;
      case 'heat':
        preview.style.filter = `brightness(${value})`;
        break;
    }

  });
};

export { clearLastFilter, applyFilter };
