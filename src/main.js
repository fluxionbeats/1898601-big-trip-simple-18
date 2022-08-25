import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter(
  eventsContainerElement,
  new EventsModel(),
  new OffersModel(),
  new DestinationsModel()
);

render(new FilterView(), filtersContainerElement);

eventsPresenter.init();
