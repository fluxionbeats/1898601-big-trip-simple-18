import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventAddView from '../view/event-add-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';


export default class EventsPresenter {
  constructor() {
    this.eventsListComponent = new EventsListView();
  }

  init(eventsContainer) {
    this.eventsContainer = eventsContainer;

    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new EventAddView(), this.eventsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}
