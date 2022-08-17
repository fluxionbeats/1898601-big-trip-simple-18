import { generateOffers } from '../mock/offer.js';

export default class OffersModel {
  _offers = generateOffers();

  get offers() {
    return this._offers;
  }
}
