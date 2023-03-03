const createPhoto = (param) => {
  const { MIN_PHOTO_ID, MAX_PHOTO_ID, MIN_LIKES, MAX_LIKES } = param.consts;
  const { getRandomInt, getRandomIntGenerator } = param.func;
  const generatePhotoId = getRandomIntGenerator(MIN_PHOTO_ID, MAX_PHOTO_ID);
  const id = generatePhotoId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии ${id}`,
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: param.createComments(param)
  };
};

const createPhotos = (param) => Array.from({ length: param.consts.SIMILAR_PHOTO_COUNT }, () => createPhoto(param));

export { createPhotos, createPhoto };
