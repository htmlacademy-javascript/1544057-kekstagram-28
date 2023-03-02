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


const createComment = (consts, func) => {
  const generateCommentId = func.getRandomIntGenerator(consts.minCommentId, consts.maxCommentId);
  return {
    id: generateCommentId(), //number
    avatar: `img/avatar-${func.getRandomInt(consts.minAvatar, consts.maxAvatar)}.svg`,
    message: generateCommentText(consts.messages, func.getRandomArrayElement), //
    name: func.getRandomArrayElement(consts.names),
  };
};


const createComments = (consts, func) => Array.from({ length: func.getRandomInt(consts.minComents, consts.maxComents) }, () => createComment(consts, func));

export { createComments };
