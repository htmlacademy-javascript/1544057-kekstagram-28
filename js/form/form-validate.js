import { onEscKeyDown } from '../utils.js';
import { MAX_HASHTAG_COUNT, HASHTAG_REGEX } from '../constants.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const inputTextFormElement = uploadFormElement.querySelector('.img-upload__text');
const hastagFormElement = inputTextFormElement.querySelector('.text__hashtags');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const hashtagPristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

const validateHashtag = (string) => {
  if (string === '') {
    return true;
  }
  const tags = string.trim().split(/\s+/);
  for (const tag of tags) {
    if (!HASHTAG_REGEX.test(tag)) {
      return false;
    }
  }
  return true;
};

const validateHashtagCount = (string) => string.split('').filter((tag) => tag === '#').length <= MAX_HASHTAG_COUNT;

const validateSimilarHashtags = (string) => {
  const stringArr = string.replaceAll(' ', '').toLowerCase().split('#');
  stringArr.shift();
  const unique = Array.from(new Set(stringArr));
  return stringArr.length === unique.length;
};

hashtagPristine.addValidator(
  hastagFormElement,
  validateHashtag,
  'Ошибка! Не правильный формат хэштега'
);

hashtagPristine.addValidator(
  hastagFormElement,
  validateHashtagCount,
  'Ошибка! Максимальное кол-во хэштегов: 5'
);

hashtagPristine.addValidator(
  hastagFormElement,
  validateSimilarHashtags,
  'Ошибка! Вы использовали одинаковые хэштеги'
);

uploadFormElement.addEventListener('input', () => {
  if (hashtagPristine.validate()) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', '');
  }
});

inputTextFormElement.addEventListener('keydown', (event) => {
  onEscKeyDown(event, () => {
    document.activeElement.blur();
    event.stopPropagation();
  });
});
