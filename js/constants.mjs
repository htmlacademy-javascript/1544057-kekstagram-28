const NAMES = ['Алексей', 'Мария', 'Иван', 'Екатерина', 'Андрей', 'Наталья', 'Дмитрий', 'Ольга'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_PHOTO_COUNT = 25;

const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 100;

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENTS = 3;
const MAX_COMMENTS = 20;

const COMMENTS_SHOW_COUNT = 5;

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const IMG_SCALE_CHANGE_STEP = 25;
const IMG_MIN_SCALE = 25;
const IMG_MAX_SCALE = 100;


export const CHROME_FILTER = {
  start: 1,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  }
};

export const SEPIA_FILTER = {
  start: 1,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  }
};

export const MARVIN_FILTER = {
  start: 100,
  step: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  }
};

export const PHOBOS_FILTER = {
  start: 3,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 3,
  }
};

export const HEAT_FILTER = {
  start: 3,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 1,
    max: 3,
  }
};

export { NAMES, MESSAGES, SIMILAR_PHOTO_COUNT, MIN_COMMENT_ID, MAX_COMMENT_ID, MIN_AVATAR, MAX_AVATAR, MIN_PHOTO_ID, MAX_PHOTO_ID, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, COMMENTS_SHOW_COUNT, IMG_WIDTH, IMG_HEIGHT, HASHTAG_REGEX, MAX_HASHTAG_COUNT, IMG_SCALE_CHANGE_STEP, IMG_MIN_SCALE, IMG_MAX_SCALE };
