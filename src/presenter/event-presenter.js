import { isEscapeKey } from '../utils/util.js';
import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';


const getAllOffers = (event, offers) => offers.find((offer) => offer.type === event.type).offers;


const getEventOffers = (event, allOffers) => allOffers.filter((offer) => event.offers.includes(offer.id));


const getDestination = (event, destinations) =>
  destinations.find((destination) => destination.id === event.destination);


export default class EventPresenter {
  #eventsListContainer = null;
  #changeData = null;

  #event = null;
  #allOffers = null;
  #eventOffers = null;
  #destination = null;

  #eventComponent = null;
  #eventEditComponent = null;

  constructor(eventsListContainer, changeData) {
    this.#eventsListContainer = eventsListContainer.element;
    this.#changeData = changeData;
  }

  init(event, offers, destinations) {
    this.#event = event;
    this.#allOffers = getAllOffers(event, offers);
    this.#eventOffers = getEventOffers(event, this.#allOffers);
    this.#destination = getDestination(event, destinations);

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(this.#event, this.#eventOffers, this.#destination);
    this.#eventComponent.setEditClickHandler(this.#handleEditClick);

    if (prevEventComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
    }
    else if (this.#eventsListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }
    else if (this.#eventsListContainer.contains(prevEventEditComponent.element)) {
      this.#eventEditComponent = new EventEditView(this.#event, this.#allOffers, this.#destination);
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #replaceCardToForm = () => {
    this.#eventEditComponent = new EventEditView(this.#event, this.#allOffers, this.#destination);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setFormCloseHandler(this.#handleFormClose);

    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#eventEditComponent.removeElement();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleFormSubmit = (event) => {
    this.#changeData(event);
    this.#replaceFormToCard();
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
  };
}
