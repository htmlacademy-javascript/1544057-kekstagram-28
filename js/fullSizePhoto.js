const bigPicture = document.querySelector('.big-picture');
const bigPictureImgElement = bigPicture.querySelector('.big-picture__img img');
const likesCountElement = bigPicture.querySelector('.likes-count');
const commentsCountElement = bigPicture.querySelector('.comments-count');
const socialCaptionElement = bigPicture.querySelector('.social__caption');
const socialCommentsElement = bigPicture.querySelector('.social__comments');


const renderComment = (comment) => {
  const commentElement = document.createElement('li');

  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35"
      height="35"
    />
    <p class="social__text">${comment.message}</p>
  `;

  socialCommentsElement.appendChild(commentElement);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('bigPicture-open');
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const renderBigPicture = (photoData) => {
  bigPictureImgElement.src = photoData.url;
  likesCountElement.textContent = photoData.likes;
  commentsCountElement.textContent = photoData.comments.length;
  socialCaptionElement.textContent = photoData.description;

  socialCommentsElement.innerHTML = '';
  photoData.comments.forEach((comment) => renderComment(comment));

  bigPicture.classList.remove('hidden');

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('bigPicture-open');


  document.addEventListener('keydown', onEscKeyDown);
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCloseButtonClick);

};

const addPictureHandlers = (userPhotos) => {
  const pictures = document.querySelectorAll('.picture');
  for (const picture of pictures) {
    picture.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.closest('.picture')) {
        const pictureIndex = userPhotos.findIndex((el) => el.id === +event.target.alt);
        renderBigPicture(userPhotos[pictureIndex]);
      }
    });
  }
};

export {
  addPictureHandlers
};
