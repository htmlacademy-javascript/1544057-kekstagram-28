const COMMENTS_SHOW_COUNT = 5;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const IMG_SCALE_CHANGE_STEP = 25;
const IMG_MIN_SCALE = 25;
const IMG_MAX_SCALE = 100;

const API_URL = 'https://28.javascript.pages.academy/kekstagram';

const MESSAGE_UPLOAD_SHOW_TIME = 10000;

const RANDOM_PICS_COUNT = 10;
const RERENDER_DELAY = 500;

const FILE_FORMATS = ['jpg', 'jpeg', 'png'];

export { COMMENTS_SHOW_COUNT, HASHTAG_REGEX, MAX_HASHTAG_COUNT, IMG_SCALE_CHANGE_STEP, IMG_MIN_SCALE, IMG_MAX_SCALE, API_URL, MESSAGE_UPLOAD_SHOW_TIME, RANDOM_PICS_COUNT, RERENDER_DELAY, FILE_FORMATS };

const format = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return Number(value.toFixed(0));
    }
    return Number(value.toFixed(1));
  },
  from: function (value) {
    return parseFloat(value);
  }
};

export const CHROME_FILTER = {
  start: 1,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  format
};

export const SEPIA_FILTER = {
  start: 1,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  format
};

export const MARVIN_FILTER = {
  start: 100,
  step: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  },
  format
};

export const PHOBOS_FILTER = {
  start: 3,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 3,
  },
  format
};

export const HEAT_FILTER = {
  start: 3,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 1,
    max: 3,
  },
  format
};

