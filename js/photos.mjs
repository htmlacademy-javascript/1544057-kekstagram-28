import { getRandomInt, getRandomIntGenerator } from './utils.mjs';
import { MIN_PHOTO_ID, MAX_PHOTO_ID, MIN_LIKES, MAX_LIKES, SIMILAR_PHOTO_COUNT } from './constants.mjs';
import { createComments } from './comments.mjs';

const createPhoto = (generatePhotoId) => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии ${id}`,
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: createComments()
  };
};

const createPhotos = () => {
  const generatePhotoId = getRandomIntGenerator(MIN_PHOTO_ID, MAX_PHOTO_ID);
  return Array.from({ length: SIMILAR_PHOTO_COUNT }, () => createPhoto(generatePhotoId));
};

export { createPhotos };
