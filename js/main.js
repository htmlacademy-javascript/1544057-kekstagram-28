import { SIMILAR_PHOTO_COUNT, MIN_LIKES, MAX_LIKES, MIN_PHOTO_ID, MAX_PHOTO_ID, MESSAGES, MIN_COMMENT_ID, MAX_COMMENT_ID, MIN_AVATAR, MAX_AVATAR, NAMES, MIN_COMMENTS, MAX_COMMENTS } from './constants.mjs';
import { createComments } from './comments.mjs';
import { getRandomInt, getRandomIntGenerator, getRandomArrayElement } from './utils.mjs';
import { createPhotos } from './photos.mjs';

createPhotos({
  count: SIMILAR_PHOTO_COUNT,
  comments: createComments({
    minComents: MIN_COMMENTS,
    maxComents: MAX_COMMENTS,
    minCommentId: MIN_COMMENT_ID,
    maxCommentId: MAX_COMMENT_ID,
    minAvatar: MIN_AVATAR,
    maxAvatar: MAX_AVATAR,
    names: NAMES,
    messages: MESSAGES
  }, {
    getRandomInt: getRandomInt,
    getRandomIntGenerator: getRandomIntGenerator,
    getRandomArrayElement: getRandomArrayElement,
  }),
  likes: getRandomInt(MIN_LIKES, MAX_LIKES),
  idGenerator: getRandomIntGenerator(MIN_PHOTO_ID, MAX_PHOTO_ID)
});
