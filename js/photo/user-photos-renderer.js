import { get } from '../api.js';
import { debounce, shuffleArr, showModal } from '../utils.js';
import { RANDOM_PICS_COUNT, RERENDER_DELAY } from '../constants.js';
import { onUserPictureClick } from './full-size-photo.js';

const picturesContainerElement = document.querySelector('.pictures');
const filterPictureElement = document.querySelector('.img-filters');
const filterButtonElements = document.querySelectorAll('.img-filters__button');

const createPictureFragment = (pictureData) => {
  const pictureTemplateElement = document.querySelector('#picture');
  const pictureFragment = pictureTemplateElement.content.cloneNode(true);

  const pictureLinkElement = pictureFragment.querySelector('.picture');
  const pictureImgElement = pictureFragment.querySelector('.picture__img');
  const pictureLikesElement = pictureFragment.querySelector('.picture__likes');
  const pictureCommentsElement = pictureFragment.querySelector('.picture__comments');

  pictureLinkElement.href = pictureData.url;
  pictureImgElement.src = pictureData.url;
  pictureImgElement.alt = pictureData.id;
  pictureLikesElement.textContent = pictureData.likes;
  pictureCommentsElement.textContent = pictureData.comments.length;

  return pictureFragment;
};

const renderUserPhotos = (picturesData) => {
  const fragment = document.createDocumentFragment();

  picturesData.forEach((pictureData) => {
    const pictureFragment = createPictureFragment(pictureData);
    fragment.appendChild(pictureFragment);
  });

  picturesContainerElement.appendChild(fragment);
  onUserPictureClick(picturesData);
};


const makeButtonActive = (evt) => {
  filterButtonElements.forEach((filter) => {
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
    const pictureElements = document.querySelectorAll('.picture');

    pictureElements.forEach((picture) => {
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
    filterPictureElement.classList.remove('img-filters--inactive');
    filterPictureElement.addEventListener('click', debounce((evt) => switchPhotosByFilter(userPhotos, evt), RERENDER_DELAY,));
    filterPictureElement.addEventListener('click', (evt) => makeButtonActive(evt));
  })
  .catch(
    () => {
      showModal('error', 'Ошибка получения фотографий', () => {
        location.reload();
      });
    });


