const generateCommentText = (messages, getRandomArrayElement) => {
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


const createComment = (param) => {
  const { MIN_AVATAR, MAX_AVATAR, MIN_COMMENT_ID, MAX_COMMENT_ID, MESSAGES, NAMES } = param.consts;
  const { getRandomArrayElement, getRandomInt, getRandomIntGenerator } = param.func;
  const generateCommentId = getRandomIntGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);
  return {
    id: generateCommentId(), //number
    avatar: `img/avatar-${getRandomInt(MIN_AVATAR, MAX_AVATAR)}.svg`,
    message: generateCommentText(MESSAGES, getRandomArrayElement), //
    name: getRandomArrayElement(NAMES),
  };
};


const createComments = (param) => Array.from({ length: param.func.getRandomInt(param.consts.MIN_COMMENTS, param.consts.MAX_COMMENTS) }, () => createComment(param));

export { createComments };
