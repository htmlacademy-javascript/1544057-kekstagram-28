import { onEscKeyDown } from '../utils.mjs';
import { MAX_HASHTAG_COUNT, HASHTAG_REGEX } from '../constants.mjs';

const uploadPictureForm = document.querySelector('.img-upload__form');
const hastagForm = uploadPictureForm.querySelector('.text__hashtags');
const commentForm = uploadPictureForm.querySelector('.text__description');
const submitButton = uploadPictureForm.querySelector('.img-upload__submit');

const hashtagPristine = new Pristine(uploadPictureForm, {
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
  hastagForm,
  validateHashtag,
  'Ошибка! Не правильный формат хэштега'
);

hashtagPristine.addValidator(
  hastagForm,
  validateHashtagCount,
  'Ошибка! Максимальное кол-во хэштегов: 5'
);

hashtagPristine.addValidator(
  hastagForm,
  validateSimilarHashtags,
  'Ошибка! Вы использовали одинаковые хэштеги'
);

uploadPictureForm.addEventListener('input', () => {
  if (hashtagPristine.validate()) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', '');
  }
});

hastagForm.addEventListener('keydown', (evt) => {
  if (onEscKeyDown(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

commentForm.addEventListener('keydown', (evt) => {
  if (onEscKeyDown(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});
