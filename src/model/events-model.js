import { generateEvents } from '../mock/event.js';

export default class EventsModel {
  _events = generateEvents();

  get events() {
    return this._events;
  }
}
