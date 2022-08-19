import { Event, Offer } from './const.js';
import { getRandomInt, getRandomElementFromIt, getNRandomElementsFromIt } from '../utils/random.js';
import dayjs from 'dayjs';


const generateDate = (offset) =>
  dayjs().add(offset, 'day').add(offset, 'hour')
    .add(offset, 'minute').toISOString();


const generateOffers = (event) => {
  const hasOffers = getRandomInt(0, 1);
  const offers = [];
  if (hasOffers) {
    const { type } = event;
    const typeOffers = Offer.OFFERS_BY_TYPE.find((offer) => offer.type === type).offers;
    const typeOffersIds = typeOffers.map((offer) => offer.id);
    const offersCount = getRandomInt(1, typeOffersIds.length);
    offers.push(...getNRandomElementsFromIt(typeOffersIds, offersCount));
  }
  return offers;
};


const generateEvent = () => ({
  basePrice: getRandomInt(Event.MIN_PRICE, Event.MAX_PRICE),
  dateFrom: generateDate(getRandomInt(Event.DATE_FROM.MIN, Event.DATE_FROM.MAX)),
  dateTo: generateDate(getRandomInt(Event.DATE_TO.MIN, Event.DATE_TO.MAX)),
  type: getRandomElementFromIt(Event.EVENT_TYPES),
});


const generateEvents = () => {
  const events = Array.from({ length: Event.EVENT_COUNT }, generateEvent);

  return events.map((event, index) => {
    const offers = generateOffers(event);
    const destination = index;
    return {
      ...event,
      offers,
      destination,
      id: index.toString(),
    };
  });
};


export { generateEvents };
