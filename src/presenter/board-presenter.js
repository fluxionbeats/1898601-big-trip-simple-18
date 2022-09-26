import { render, RenderPosition } from '../framework/render.js';
import { updateItemInIterable } from '../utils/util.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import EventPresenter from './event-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;
  #events = null;
  #offers = null;
  #destinations = null;

  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();

  #eventsPresenter = new Map();

  constructor(boardContainer, eventsModel, offersModel, destionationsModel) {
    this.#boardContainer = boardContainer;
    this.#events = eventsModel.events;
    this.#offers = offersModel.offers;
    this.#destinations = destionationsModel.destinations;
  }

  init() {
    if (this.#events.length) {
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
    const eventPresenter = new EventPresenter(this.#eventsListComponent, this.#handleEventChange);
    eventPresenter.init(event, this.#offers, this.#destinations);
    this.#eventsPresenter.set(event.id, eventPresenter);
  }

  #renderEvents() {
    render(this.#eventsListComponent, this.#boardContainer);

    for (const event of this.#events) {
      this.#renderEvent(event);
    }
  }

  #clearEventsList() {
    this.#eventsPresenter.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventsPresenter.clear();
  }

  #handleEventChange = (updatedEvent) => {
    updateItemInIterable(this.#events, updatedEvent);
    this.#eventsPresenter.get(updatedEvent.id).init(updatedEvent, this.#offers, this.#destinations);
  };
}
