import { render } from '../framework/render.js';
import { isEscapeKey, replaceComponent } from '../utils/util.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoEventsView from '../view/no-events-view.js';


const getTypeOffers = (event, offers) => offers.find((offer) => offer.type === event.type).offers;


const getEventOffers = (event, offers) => offers.filter((offer) => event.offers.includes(offer.id));


const getEventDestination = (event, destinations) =>
  destinations.find((destination) => event.destination === destination.id);


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
    if (this.#eventsModel.events.length) {
      render(new SortView(), this.#eventsContainer);
      render(this.#eventsListComponent, this.#eventsContainer);
      this.#renderEvents(this.#eventsModel.events, this.#offersModel.offers,
        this.#destinationsModel.destinations, this.#eventsListComponent);
    }
    else {
      render(new NoEventsView(), this.#eventsContainer);
    }
  }

  #renderEvents(events, offers, destinations, listComponent) {
    for (const event of events) {
      const typeOffers = getTypeOffers(event, offers);
      const eventOffers = getEventOffers(event, typeOffers);
      const eventDestination = getEventDestination(event, destinations);
      const eventComponent = new EventView(event, eventOffers, eventDestination);
      let eventEditComponent;


      const onEscKeyDown = (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          replaceComponent(eventEditComponent, eventComponent);
          eventEditComponent.removeElement();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };


      render(eventComponent, listComponent.element);

      eventComponent.setEditClickHandler(() => {
        eventEditComponent = new EventEditView(event, typeOffers, eventDestination);
        replaceComponent(eventComponent, eventEditComponent);

        eventEditComponent.setFormSubmitHandler(() => {
          replaceComponent(eventEditComponent, eventComponent);
          eventEditComponent.removeElement();
          document.removeEventListener('keydown', onEscKeyDown);
        });

        eventEditComponent.setFormCloseHandler(() => {
          replaceComponent(eventEditComponent, eventComponent);
          eventEditComponent.removeElement();
          document.removeEventListener('keydown', onEscKeyDown);
        });

        document.addEventListener('keydown', onEscKeyDown);
      });
    }
  }
}
