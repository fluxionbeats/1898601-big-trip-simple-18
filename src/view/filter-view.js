import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/util.js';


const createFilterTemplate = ({ name, length }) =>
  `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}"
    ${name === 'everything' ? 'checked' : ''} ${!length && name !== 'everything' ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${capitalizeFirstLetter(name)}</label>
  </div>`;


const createFiltersTemplate = (filters) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterTemplate(filter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;


export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
