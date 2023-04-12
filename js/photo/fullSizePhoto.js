import { COMMENTS_SHOW_COUNT, IMG_WIDTH, IMG_HEIGHT } from '../constants.mjs';
import { onEscKeyDown } from '../utils.mjs';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImgElement = bigPicture.querySelector('.big-picture__img img');
const likesCountElement = bigPicture.querySelector('.likes-count');
const socialСommentsCountElement = bigPicture.querySelector('.social__comment-count');
const commentsCountElement = socialСommentsCountElement.querySelector('.comments-count');
const socialCaptionElement = bigPicture.querySelector('.social__caption');
const socialCommentsElement = bigPicture.querySelector('.social__comments');
const commentsLoaderElement = bigPicture.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const renderComment = (comment) => {
  const commentElement = document.createElement('li');

  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="${IMG_WIDTH}"
      height="${IMG_HEIGHT}"
    />
    <p class="social__text">${comment.message}</p>
  `;

  socialCommentsElement.appendChild(commentElement);
};

const renderComments = (comments) => {
  const commentsToShow = comments.splice(0, COMMENTS_SHOW_COUNT);

  commentsLoaderElement.classList.remove('hidden');

  if (comments.length <= 0) {
    commentsLoaderElement.classList.add('hidden');
  }

  commentsToShow.forEach((comment) => {
    renderComment(comment);
  });

  socialСommentsCountElement.innerHTML = `${socialCommentsElement.children.length} из ${commentsCountElement.textContent} комментариев`;
};

const renderBigPicture = (photoData) => {
  bigPictureImgElement.src = photoData.url;
  likesCountElement.textContent = photoData.likes;
  socialCaptionElement.textContent = photoData.description;

  const comments = photoData.comments;

  commentsCountElement.textContent = comments.length;
  socialCommentsElement.innerHTML = '';

  renderComments(comments);

  commentsLoaderElement.addEventListener('click', () => {
    renderComments(comments);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', (event) => {
    if (onEscKeyDown(event)) {
      event.preventDefault();
      closeBigPicture();
    }
  });
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCloseButtonClick);
};

const addPictureHandlers = (userPhotos) => {
  const pictures = document.querySelectorAll('.picture');

  for (const picture of pictures) {
    picture.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.closest('.picture__img')) {
        const pictureIndex = userPhotos.findIndex((el) => el.id === +event.target.alt);
        renderBigPicture(userPhotos[pictureIndex]);
      }
    });
  }
};

export { addPictureHandlers };