import {ActionType} from './data';
import {
  loadOfferAction,
  setActiveOfferId,
  setActiveOfferCoords,
  loadOffersAction,
  loadNearbyAction,
  loadReviewsAction,
  loadFavoritesAction,
  getCitiesAction,
  getFirstCityAction,
  updateCityAction,
} from './data';
import {getUniqueCities} from '../../../utils/get-unique-cities';
import ModelOffer from '../../../models/model-offer';
import {TestMock} from '../../../__mocks__/mocks';

const {offer, offers, reviews, firstCity, activeCity} = TestMock;
const {id, location} = offer;

describe(`Data actions work correctly`, () => {
  it(`Action loadOfferAction work correctly`, () => {
    expect(loadOfferAction(offer)).toEqual({
      type: ActionType.LOAD_OFFER,
      payload: ModelOffer.parseOffer(offer),
    });
  });

  it(`Action setActiveOfferId work correctly`, () => {
    expect(setActiveOfferId(id)).toEqual({
      type: ActionType.SET_ACTIVE_OFFER_ID,
      payload: id,
    });
  });

  it(`Action setActiveOfferCoords work correctly`, () => {
    expect(setActiveOfferCoords(location)).toEqual({
      type: ActionType.SET_ACTIVE_OFFER_COORDS,
      payload: location,
    });
  });

  it(`Action loadOffersAction work correctly`, () => {
    expect(loadOffersAction(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });

  it(`Action loadNearbyAction work correctly`, () => {
    expect(loadNearbyAction(offers)).toEqual({
      type: ActionType.LOAD_NEARBY,
      payload: offers,
    });
  });

  it(`Action loadReviewsAction work correctly`, () => {
    expect(loadReviewsAction(reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: TestMock.reviews,
    });
  });

  it(`Action loadFavoritesAction work correctly`, () => {
    expect(loadFavoritesAction(offers)).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: ModelOffer.parseOffers(offers),
    });
  });

  it(`Action getCitiesAction work correctly`, () => {
    expect(getCitiesAction(offers)).toEqual({
      type: ActionType.GET_CITIES,
      payload: getUniqueCities(offers),
    });
  });

  it(`Action getFirstCityAction work correctly`, () => {
    expect(getFirstCityAction(firstCity)).toEqual({
      type: ActionType.GET_FIRST_CITY,
      payload: firstCity,
    });
  });

  it(`Action updateCityAction work correctly`, () => {
    expect(updateCityAction(activeCity)).toEqual({
      type: ActionType.UPDATE_ACTIVE_CITY,
      payload: activeCity,
    });
  });
});
