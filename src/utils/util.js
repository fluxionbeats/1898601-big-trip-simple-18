const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);


const isEscapeKey = (evt) => evt.key === 'Escape';


const updateItemInIterable = (iterable, updateItem) => {
  const index = Array.from(iterable).findIndex((item) => item.id === updateItem.id);

  if (index !== -1) {
    iterable[index] = updateItem;
  }
};


export {
  capitalizeFirstLetter, isEscapeKey, updateItemInIterable,
};
