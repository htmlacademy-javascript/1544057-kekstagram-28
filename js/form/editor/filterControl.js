const form = document.querySelector('.img-upload__overlay');
const imgPreview = form.querySelector('.img-upload__preview');
const intensityInput = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');

let lastFilterClass = '';

const clearLastFilter = (destroy) => {
  if (lastFilterClass) {
    imgPreview.classList.remove(lastFilterClass);
    imgPreview.style.filter = '';
    if (destroy) {
      slider.noUiSlider.destroy();
    }
  }
};

const applyFilter = (filterName) => {
  const filterClass = `effects__imgPreview--${filterName}`;
  imgPreview.classList.add(filterClass);
  lastFilterClass = filterClass;

  slider.noUiSlider.on('update', () => {
    const value = slider.noUiSlider.get();
    intensityInput.value = value;

    switch (filterName) {
      case 'chrome':
        imgPreview.style.filter = `grayscale(${value})`;
        break;
      case 'sepia':
        imgPreview.style.filter = `sepia(${value})`;
        break;
      case 'marvin':
        imgPreview.style.filter = `invert(${value}%)`;
        break;
      case 'phobos':
        imgPreview.style.filter = `blur(${value}px)`;
        break;
      case 'heat':
        imgPreview.style.filter = `brightness(${value})`;
        break;
    }

  });
};

export { clearLastFilter, applyFilter };
