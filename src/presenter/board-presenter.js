import { render, RenderPosition, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/util.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoEventsView from '../view/no-events-view.js';


const getTypeOffers = (event, offers) => offers.find((offer) => offer.type === event.type).offers;


const getEventOffers = (event, offers) => offers.filter((offer) => event.offers.includes(offer.id));


const getEventDestination = (event, destinations) =>
  destinations.find((destination) => event.destination === destination.id);


export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();

  constructor(boardContainer, eventsModel, offersModel, destionationsModel) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destionationsModel;
  }

  init() {
    if (this.#eventsModel.events.length) {
      this.#renderSort();
      this.#renderEvents();
    }
    else {
      this.#renderNoEvents();
    }
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#boardContainer);
  }

  #renderEvent(event) {
    const typeOffers = getTypeOffers(event, this.#offersModel.offers);
    const eventOffers = getEventOffers(event, typeOffers);
    const eventDestination = getEventDestination(event, this.#destinationsModel.destinations);
    const eventComponent = new EventView(event, eventOffers, eventDestination);
    let eventEditComponent;


    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replace(eventEditComponent, eventComponent);
        eventEditComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };


    render(eventComponent, this.#eventsListComponent.element);

    eventComponent.setEditClickHandler(() => {
      eventEditComponent = new EventEditView(event, typeOffers, eventDestination);
      replace(eventEditComponent, eventComponent);

      eventEditComponent.setFormSubmitHandler(() => {
        replace(eventEditComponent, eventComponent);
        eventEditComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      eventEditComponent.setFormCloseHandler(() => {
        replace(eventComponent, eventEditComponent);
        eventEditComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      document.addEventListener('keydown', onEscKeyDown);
    });
  }

  #renderEvents() {
    render(this.#eventsListComponent, this.#boardContainer);

    for (const event of this.#eventsModel.events) {
      this.#renderEvent(event);
    }
  }
}
