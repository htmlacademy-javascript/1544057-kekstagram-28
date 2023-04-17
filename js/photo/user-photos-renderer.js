import { get } from '../api.js';
import { debounce, shuffleArr, showAlert } from '../utils.js';
import { RANDOM_PICS_COUNT, RERENDER_DELAY } from '../constants.js';
import { addPictureHandlers } from './full-size-photo.js';

const picturesContainer = document.querySelector('.pictures');
const filterPicture = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const createPictureElement = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');
  const pictureElement = pictureTemplate.content.cloneNode(true);

  const pictureLink = pictureElement.querySelector('.picture');
  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureLink.href = pictureData.url;
  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.id;
  pictureLikes.textContent = pictureData.likes;
  pictureComments.textContent = pictureData.comments.length;

  return pictureElement;
};

const renderUserPhotos = (picturesData) => {
  const fragment = document.createDocumentFragment();

  picturesData.forEach((e) => {
    const pictureElement = createPictureElement(e);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};


const makeButtonActive = (evt) => {
  filterButtons.forEach((filter) => {
    if (evt.target.classList.contains('img-filters__button')) {
      filter.classList.remove('img-filters__button--active');
    }
  });
  if (evt.target.classList.contains('img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }
};

const switchPhotosByFilter = (userPhotos, evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelectorAll('.picture').forEach((picture) => {
      picture.remove();
    });
  }
  let photosList = userPhotos;
  switch (evt.target.id) {
    case 'filter-default':
      renderUserPhotos(photosList);
      break;
    case 'filter-random':
      photosList = shuffleArr(userPhotos).slice(0, RANDOM_PICS_COUNT);
      renderUserPhotos(photosList);
      break;
    case 'filter-discussed':
      photosList = userPhotos
        .slice()
        .sort((a, b) => {
          if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return -1;
          }
        });
      renderUserPhotos(photosList);
      break;
  }
};

get()
  .then((userPhotos) => {
    renderUserPhotos(userPhotos);
    addPictureHandlers(userPhotos);
    filterPicture.classList.remove('img-filters--inactive');
    filterPicture.addEventListener('click', debounce((evt) => switchPhotosByFilter(userPhotos, evt), RERENDER_DELAY,));
    filterPicture.addEventListener('click', (evt) => makeButtonActive(evt));
  })
  .catch(
    () => {
      showAlert('Ошибка получения фотографий', () => {
        location.reload();
      });
    });


