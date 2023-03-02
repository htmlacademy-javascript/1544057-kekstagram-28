const createPhoto = (comments, likes, idGenerator) => {
  const generatePhotoId = idGenerator;
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии ${id}`,
    likes,
    comments
  };
};

const createPhotos = (param) => Array.from({ length: param.count }, () => createPhoto(param.comments, param.likes, param.idGenerator));

export { createPhotos };
