import {
  formatToDashedDate, formatToShortDate,
  formatToShortISO, formatToTime
} from '../utils/date.js';
import { capitalizeFirstLetter } from '../utils/util.js';
import AbstractView from '../framework/view/abstract-view.js';


const createOfferTemplate = (offer) =>
  `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`;


const createOffersTemplate = (offers) => (
  offers.length
    ? `${offers.map((offer) => createOfferTemplate(offer)).join('')}`
    : `<li class="event__offer">
        <span class="event__offer-title">No additional offers</span>
      </li>`
);


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
    <ul class="event__selected-offers">
      ${createOffersTemplate(offers)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};


export default class EventView extends AbstractView{
  #event = null;
  #offers = null;
  #destination = null;

  constructor(event, offers, destination) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destination);
  }

  setEditClickHandler = (cb) => {
    this._callback.editClick = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
