import { COMMENTS_SHOW_COUNT } from '../constants.js';
import { checkEscKeyDown } from '../utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const socialСommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsCountElement = socialСommentsCountElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const createComment = (comment) => {
  const commentTemplateElement = document.querySelector('#comment-template');
  const commentElement = commentTemplateElement.content.cloneNode(true);
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
  const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
  const likesCountElement = bigPictureElement.querySelector('.likes-count');
  const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  const comments = photoData.comments;

  bigPictureImgElement.src = photoData.url;
  likesCountElement.textContent = photoData.likes;
  socialCaptionElement.textContent = photoData.description;


  socialCommentsElement.innerHTML = '';
  renderComments(comments);

  const onCloseButtonClick = () => {
    closeBigPicture();
  };

  const onCommentsLoaderClick = () => {
    renderComments(comments);
  };

  const onBigPictureEscKeyDown = (event) => {
    checkEscKeyDown(event, closeBigPicture);
  };

  function closeBigPicture() {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeyDown);
    commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
    closeButtonElement.removeEventListener('click', onCloseButtonClick);
  }

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  document.addEventListener('keydown', onBigPictureEscKeyDown);

  closeButtonElement.addEventListener('click', onCloseButtonClick);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onUserPictureClick = (userPhotos) => {
  const pictureElements = document.querySelectorAll('.picture');

  for (const picture of pictureElements) {
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
