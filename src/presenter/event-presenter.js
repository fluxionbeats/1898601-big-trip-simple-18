import { isEscapeKey } from '../utils/util.js';
import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


const getAllOffers = (event, offers) => offers.find((offer) => offer.type === event.type).offers;


const getEventOffers = (event, allOffers) => allOffers.filter((offer) => event.offers.includes(offer.id));


const getDestination = (event, destinations) =>
  destinations.find((destination) => destination.id === event.destination);


export default class EventPresenter {
  #event = null;
  #allOffers = null;
  #eventOffers = null;
  #destination = null;

  #eventsListContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;

  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor(eventsListContainer, changeData, changeMode) {
    this.#eventsListContainer = eventsListContainer.element;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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
    else if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }
    else if (this.#mode === Mode.EDITING) {
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

  resetView(){
    if(this.#mode !== Mode.DEFAULT){
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    this.#eventEditComponent = new EventEditView(this.#event, this.#allOffers, this.#destination);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setFormCloseHandler(this.#handleFormClose);

    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#eventEditComponent.removeElement();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
