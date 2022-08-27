import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import { generateFilters } from './mock/filter.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter(
  eventsContainerElement,
  eventsModel,
  new OffersModel(),
  new DestinationsModel()
);

const filters = generateFilters(eventsModel.events);
render(new FilterView(filters), filtersContainerElement);

eventsPresenter.init();
