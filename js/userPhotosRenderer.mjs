const picturesContainer = document.querySelector('.pictures');


const createPictureElement = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');
  const pictureElement = pictureTemplate.content.cloneNode(true);

  const pictureLink = pictureElement.querySelector('.picture');
  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureLink.href = pictureData.url;
  pictureImg.src = pictureData.url;
  pictureLikes.textContent = pictureData.likes;
  pictureComments.textContent = pictureData.comments.length;

  return pictureElement;
};

const renderUserPhotos = (picturesData) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < picturesData.length; i++) {
    const pictureElement = createPictureElement(picturesData[i]);
    fragment.appendChild(pictureElement);
  }

  picturesContainer.appendChild(fragment);
};


export { renderUserPhotos };

