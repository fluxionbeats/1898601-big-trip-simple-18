import { createElement } from '../render.js';


const createEventsTemplate = () => '<section class="trip-events"></section>';


export default class EventsView {
  getTemplate() {
    return createEventsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
