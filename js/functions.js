
const validateStringLength = function (str, maxLength) {
  if (str.length <= maxLength) {
    return true;
  }
  return false;
};

// Cтрока короче 20 символов
validateStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
validateStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
validateStringLength('проверяемая строка', 10); // false

const isPalindrome = function (str) {
  str = str.replace(/\s/g, '').toLowerCase();

  return str === str.split('').reverse().join('');
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

const extractNumbers = function (str) {
  const numStr = String(str).match(/\d+/g)?.join('');

  return numStr ? parseInt(numStr, 10) : NaN;
};

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN

extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15

const padString = function (str, minLength, padChars) {
  if (str.length >= minLength) {
    return str;
  }

  const padLength = Math.ceil((minLength - str.length) / padChars.length);
  const padding = padChars.repeat(padLength).substr(0, minLength - str.length);

  return padding + str;
};


// Добавочный символ использован один раз
padString('1', 2, '0'); // '01'

// Добавочный символ использован три раза
padString('1', 4, '0'); // '0001'

// Добавочные символы обрезаны с конца
padString('q', 4, 'werty'); // 'werq'

// Добавочные символы использованы полтора раза
padString('q', 4, 'we'); // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
padString('qwerty', 4, '0'); // 'qwerty'
