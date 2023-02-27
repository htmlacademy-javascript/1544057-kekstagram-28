
function validateStringLength(str, maxLength) {
  if (str.length <= maxLength) {
    return true;
  }
  return false;
}

function isPalindrome(str) {
  str = str.replace(/\s/g, '').toLowerCase();

  return str === str.split('').reverse().join('');
}

function extractNumbers(str) {
  const numStr = String(str).match(/\d+/g)?.join('');

  return numStr ? parseInt(numStr, 10) : NaN;
}

function padString(str, minLength, padChars) {
  if (str.length >= minLength) {
    return str;
  }

  const padLength = Math.ceil((minLength - str.length) / padChars.length);
  const padding = padChars.repeat(padLength).substr(0, minLength - str.length);

  return padding + str;
}
