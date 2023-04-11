import { MIN_AVATAR, MAX_AVATAR, MIN_COMMENT_ID, MAX_COMMENT_ID, MIN_COMMENTS, MESSAGES, MAX_COMMENTS, NAMES } from './constants.mjs';
import { getRandomInt, getRandomIntGenerator, getRandomArrayElement } from './utils.mjs';

const generateCommentText = (messages) => {
  const firstMessage = getRandomArrayElement(messages);
  let secondMessage;

  // Шанс добавления втрой части 50%
  if (Math.random() > 0.5) {
    do {
      secondMessage = getRandomArrayElement(messages);
    } while (secondMessage === firstMessage);
  }

  return `${firstMessage} ${secondMessage ?? ''}`.trim();
};

const createComment = (generateCommentId) => ({
  id: generateCommentId(), //number
  avatar: `img/avatar-${getRandomInt(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: generateCommentText(MESSAGES, getRandomArrayElement), //
  name: getRandomArrayElement(NAMES),
});

const createComments = () => {
  const generateCommentId = getRandomIntGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);
  return Array.from({ length: getRandomInt(MIN_COMMENTS, MAX_COMMENTS) }, () => createComment(generateCommentId));
};
export { createComments };
