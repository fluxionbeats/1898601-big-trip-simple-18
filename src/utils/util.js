const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);


const isEscapeKey = (evt) => evt.key === 'Escape';


const replaceComponent = (oldComponent, newComponent) => {
  oldComponent.element.replaceWith(newComponent.element);
};


export {
  capitalizeFirstLetter, isEscapeKey, replaceComponent,
};
