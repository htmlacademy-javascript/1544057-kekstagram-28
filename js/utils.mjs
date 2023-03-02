const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomIntGenerator = (min, max) => {
  const usedIds = new Set();

  return () => {
    let id;
    do {
      id = getRandomInt(min, max);
    } while (usedIds.has(id));

    usedIds.add(id);
    return id;
  };
};

export { getRandomInt, getRandomArrayElement, getRandomIntGenerator };
