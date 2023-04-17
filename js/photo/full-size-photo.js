import { COMMENTS_SHOW_COUNT } from '../constants.js';
import { onEscKeyDown } from '../utils.js';

const bigPicture = document.querySelector('.big-picture');
const socialСommentsCountElement = bigPicture.querySelector('.social__comment-count');
const commentsCountElement = socialСommentsCountElement.querySelector('.comments-count');
const socialCommentsElement = bigPicture.querySelector('.social__comments');
const commentsLoaderElement = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createComment = (comment) => {
  const commentTemplate = document.querySelector('#comment-template');
  const commentElement = commentTemplate.content.cloneNode(true);
  const textElement = commentElement.querySelector('.social__text');
  const avatarElement = commentElement.querySelector('.social__picture');

  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  textElement.textContent = comment.message;

  return commentElement;
};

const renderComments = (comments) => {
  commentsCountElement.textContent = comments.length;

  const commentsToShow = comments.slice(socialCommentsElement.children.length, COMMENTS_SHOW_COUNT + socialCommentsElement.children.length);
  const fragment = document.createDocumentFragment();

  commentsLoaderElement.classList.remove('hidden');

  commentsToShow.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  socialCommentsElement.appendChild(fragment);

  if (comments.length === socialCommentsElement.children.length) {
    commentsLoaderElement.classList.add('hidden');
  }

  socialСommentsCountElement.textContent = `${socialCommentsElement.children.length} из ${commentsCountElement.textContent} комментариев`;
};

const renderBigPicture = (photoData) => {
  const bigPictureImgElement = bigPicture.querySelector('.big-picture__img img');
  const likesCountElement = bigPicture.querySelector('.likes-count');
  const socialCaptionElement = bigPicture.querySelector('.social__caption');
  const comments = photoData.comments;

  bigPictureImgElement.src = photoData.url;
  likesCountElement.textContent = photoData.likes;
  socialCaptionElement.textContent = photoData.description;


  socialCommentsElement.innerHTML = '';
  renderComments(comments);

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  document.addEventListener('keydown', onBigPictureEscKeyDown);

  closeButton.addEventListener('click', closeBigPicture);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  function onCommentsLoaderClick() {
    renderComments(comments);
  }

  function onBigPictureEscKeyDown(event) {
    onEscKeyDown(event, closeBigPicture);
  }

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeyDown);
    commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
    closeButton.removeEventListener('click', closeBigPicture);
  }
};

const onUserPictureClick = (userPhotos) => {
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

export { onUserPictureClick };
