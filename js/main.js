const NAMES = ['Алексей', 'Мария', 'Иван', 'Екатерина', 'Андрей', 'Наталья', 'Дмитрий', 'Ольга'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_PHOTO_COUNT = 25;

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

const generateCommentText = () => {
  const firstMessage = getRandomArrayElement(MESSAGES);
  let secondMessage;

  // Шанс добавления втрой части 50%
  if (Math.random() > 0.5) {
    do {
      secondMessage = getRandomArrayElement(MESSAGES);
    } while (secondMessage === firstMessage);
  }

  return `${firstMessage} ${secondMessage ?? ''}`.trim();
};

const generateCommentId = getRandomIntGenerator(1, 100);

const createComment = () => ({
  id: generateCommentId(), //number
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: generateCommentText(), //
  name: getRandomArrayElement(NAMES),
});

const generatePhotoId = getRandomIntGenerator(1, 25);

const createPhoto = () => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`, // photos/{{i}}.jpg, где {{i}} — это число от 1 до 25
    description: `Описание фотографии ${id}`, // описание фотографии
    likes: getRandomInt(15, 200), // случайное число от 15 до 200
    comments: Array.from({
      length: getRandomInt(1, 5)
    }, createComment), //arr comments
  };
};

Array.from({ length: SIMILAR_PHOTO_COUNT }, createPhoto);
