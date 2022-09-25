import { isEscapeKey } from '../utils/util.js';
import { render, replace, remove } from '../framework/render.js';
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

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(this.#event, this.#eventOffers, this.#destination);
    this.#eventComponent.setEditClickHandler(this.#replaceCardToForm);

    if(prevEventComponent === null){
      render(this.#eventComponent, this.#eventsListContainer.element);
    }
    else if(this.#eventsListContainer.contains(prevEventComponent.element)){
      replace(this.#eventComponent, prevEventComponent);
    }
    else if(this.#eventsListContainer.contains(prevEventEditComponent.element)){
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy(){
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
    this.#event = null;
    this.#allOffers = null;
    this.#eventOffers = null;
    this.#destination = null;
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
