import { generateDestinations } from '../mock/destination.js';

export default class DestinationsModel {
  _destinations = generateDestinations();

  get destinations() {
    return this._destinations;
  }
}
