import { getRandomElementFromIt, getRandomInt } from '../random.js';
import { Mock, Destination, Event } from './const.js';


const generateDescription = () => getRandomElementFromIt(Destination.DESCRIPTIONS);


const generateName = () => getRandomElementFromIt(Destination.NAMES);


const generateSrc = () => Mock.PICTURE_URL + getRandomInt(1, 10);


const generatePictureDescription = () => getRandomElementFromIt(Mock.DESCRIPTION_SENTENCES);


const generateDestination = () => ({
  name: generateName(),
  description: generateDescription(),
  pictures: Array.from({ length: getRandomInt(0, 5) }, () => (
    {
      src: generateSrc(),
      description: generatePictureDescription(),
    }
  )),
});


const generateDestinations = () => {
  const destinations = Array.from({ length: Event.EVENT_COUNT }, generateDestination);
  return destinations.map((destination, id) => (
    {
      ...destination,
      id,
    }
  ));
};


export { generateDestinations };
