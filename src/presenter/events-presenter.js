import { render } from '../utils/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';


const getTypeOffers = (event, offers) => offers.find((offer) => offer.type === event.type).offers;


const getEventOffers = (event, offers) => offers.filter((offer) => event.offers.includes(offer.id));


const getEventDestination = (event, destinations) =>
  destinations.find((destination) => event.destination === destination.id);


const renderEvents = (events, offers, destinations, listComponent) => {
  let first = true;
  for (const event of events) {
    const typeOffers = getTypeOffers(event, offers);
    const eventDestination = getEventDestination(event, destinations);
    let eventView;
    if (first) {
      eventView = new EventEditView(event, typeOffers, eventDestination);
      first = false;
    }
    else {
      const eventOffers = getEventOffers(event, typeOffers);
      eventView = new EventView(event, eventOffers, eventDestination);
    }
    render(eventView, listComponent.element);
  }
};


export default class EventsPresenter {
  #eventsModel;
  #offersModel;
  #destinationsModel;
  #eventsListComponent;
  #eventsContainer;

  constructor(eventsContainer, eventsModel, offersModel, destionationsModel) {
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destionationsModel;
    this.#eventsListComponent = new EventsListView();
    this.#eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.#eventsContainer);
    render(this.#eventsListComponent, this.#eventsContainer);
    renderEvents(this.#eventsModel.events, this.#offersModel.offers,
      this.#destinationsModel.destinations, this.#eventsListComponent);
  }
}
