import { render } from './render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter();

render(new FilterView(), filtersContainer);

eventsPresenter.init(eventsContainer);
