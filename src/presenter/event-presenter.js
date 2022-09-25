import { isEscapeKey } from '../utils/util.js';
import { render, replace } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';


const getAllOffers = (event, offers) => offers.find((offer) => offer.type === event.type).offers;


const getEventOffers = (event, allOffers) => allOffers.filter((offer) => event.offers.includes(offer.id));


const getDestination = (event, destinations) =>
  destinations.find((destination) => event.destination === destination.id);


export default class EventPresenter {
  #eventsListContainer = null;
  #event = null;
  #allOffers = null;
  #eventOffers = null;
  #destination = null;

  #eventComponent = null;
  #eventEditComponent = null;

  constructor(eventsListContainer) {
    this.#eventsListContainer = eventsListContainer;
  }

  init(event, offers, destinations) {
    this.#event = event;
    this.#allOffers = getAllOffers(event, offers);
    this.#eventOffers = getEventOffers(event, this.#allOffers);
    this.#destination = getDestination(event, destinations);

    this.#eventComponent = new EventView(this.#event, this.#eventOffers, this.#destination);
    this.#eventComponent.setEditClickHandler(this.#replaceCardToForm);

    render(this.#eventComponent, this.#eventsListContainer.element);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    this.#eventEditComponent = new EventEditView(this.#event, this.#allOffers, this.#destination);
    this.#eventEditComponent.setFormSubmitHandler(this.#replaceFormToCard);
    this.#eventEditComponent.setFormCloseHandler(this.#replaceFormToCard);

    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#eventEditComponent.removeElement();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
