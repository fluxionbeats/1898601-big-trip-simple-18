import { render } from '../utils/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';


const getEventOffers = (event, offers) => {
  const typeOffers = offers.find((offer) => offer.type === event.type).offers;
  return typeOffers.filter((offer) => event.offers.includes(offer.id));
};


const getEventDestination = (event, destinations) =>
  destinations.find((destination) => event.destination === destination.id);


const renderEvents = (events, offers, destinations, listComponent) => {
  for (const event of events) {
    const eventOffers = getEventOffers(event, offers);
    const eventDestination = getEventDestination(event, destinations);
    render(new EventView(event, eventOffers, eventDestination), listComponent.getElement());
  }
};


export default class EventsPresenter {
  constructor(eventsContainer) {
    this.eventsListComponent = new EventsListView();
    this.eventsContainer = eventsContainer;
  }

  init(eventsModel, offersModel, destionationsModel) {
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
    this.destionationsModel = destionationsModel;

    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    renderEvents(this.eventsModel.events, this.offersModel.offers,
      this.destionationsModel.destinations, this.eventsListComponent);
  }
}
