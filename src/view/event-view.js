import { createElement } from '../utils/render.js';
import {
  formatToDashedDate, formatToShortDate,
  formatToShortISO, formatToTime
} from '../utils/date.js';
import { capitalizeFirstLetter } from '../utils/util.js';


const createOffersTemplate = (offers) => {
  let offersTemplate =
    `<ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
    </li>
  </ul>`;
  if (offers.length) {
    offersTemplate =
      `<ul class="event__selected-offers">
      ${offers.map((offer) => `<li class="event__offer">
      <span class="event__offer-title">
        ${offer.title}
      </span>&plus;&euro;&nbsp;
      <span class="event__offer-price">
        ${offer.price}
      </span>
    </li>`).join('')}
    </ul>`;
  }
  return offersTemplate;
};


const createEventTemplate = (event, offers, destination) => {
  const { dateFrom, dateTo, type, basePrice } = event;
  const { name } = destination;
  return `
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatToDashedDate(dateFrom)}">${formatToShortDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${capitalizeFirstLetter(type)} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatToShortISO(dateFrom)}">${formatToTime(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatToShortISO(dateTo)}">${formatToTime(dateTo)}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createOffersTemplate(offers)}
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};


export default class EventView {
  #event;
  #offers;
  #destination;
  #element;

  constructor(event, offers, destination) {
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destination);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
