import {OfferAdapter} from '@root/adapters';
import {getUniqueCities} from '@root/utils';

export const ActionType = {
  LOAD_OFFER: `LOAD_OFFER`,
  SET_ACTIVE_OFFER_ID: `SET_ACTIVE_OFFER_ID`,
  SET_ACTIVE_OFFER_COORDS: `SET_ACTIVE_OFFER_COORDS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  GET_CITIES: `GET_CITIES`,
  GET_FIRST_CITY: `GET_FIRST_CITY`,
  UPDATE_ACTIVE_CITY: `UPDATE_ACTIVE_CITY`,
};

export const loadOfferAction = (offer) => ({
  type: ActionType.LOAD_OFFER,
  payload: OfferAdapter.parseOffer(offer),
});

export const setActiveOfferId = (offerId) => ({
  type: ActionType.SET_ACTIVE_OFFER_ID,
  payload: offerId,
});

export const setActiveOfferCoords = (location) => ({
  type: ActionType.SET_ACTIVE_OFFER_COORDS,
  payload: location,
});

export const loadOffersAction = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: OfferAdapter.parseOffers(offers),
});

export const loadNearbyAction = (nearby) => ({
  type: ActionType.LOAD_NEARBY,
  payload: OfferAdapter.parseOffers(nearby)
});

export const loadReviewsAction = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews
});

export const loadFavoritesAction = (favorites) => ({
  type: ActionType.LOAD_FAVORITES,
  payload: OfferAdapter.parseOffers(favorites)
});

export const getCitiesAction = (offers) => ({
  type: ActionType.GET_CITIES,
  payload: getUniqueCities(offers),
});

export const getFirstCityAction = (firstCity) => ({
  type: ActionType.GET_FIRST_CITY,
  payload: firstCity,
});

export const updateCityAction = (activeCity) => ({
  type: ActionType.UPDATE_ACTIVE_CITY,
  payload: activeCity
});
