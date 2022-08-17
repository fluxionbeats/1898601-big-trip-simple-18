/*Функция getRandomInt возвращает случайное число из диапазона
[округлвверх(min), округлвниз(max)].
Если min = max, возвращает это число.
В случае некорректных переданных параметров возвращает null.
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/

const getRandomInt = (min, max) => {
  let result = null;
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min <= max) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return result;
};


const getRandomElementFromIt = (iterable) => iterable[getRandomInt(0, iterable.length - 1)];


/*Функция getNRandomElementsFromIt возвращает count
случайных элементов из итерируемого объекта iterable*/

const getNRandomElementsFromIt = (iterable, count) => iterable.slice().sort(() => Math.random() - Math.random()).slice(0, count);


export { getRandomInt, getRandomElementFromIt, getNRandomElementsFromIt };
