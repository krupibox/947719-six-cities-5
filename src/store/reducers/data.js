import {updateState} from '../../utils/update-state';

import {APIRoute} from '../../consts/api-route';
import {FIRST_CITY} from '../../consts/first-city';
import {MAX_REVIEWS} from '../../consts/max-reviews';

// Request
import {setRequest as setRequestAction} from '../reducers/request';

// Models
import ModelOffer from '../../models/model-offer';

import {RequestStatus} from '../../consts/request-status';

import {getUniqueCities} from '../../utils/get-unique-cities';

// stateToProps
const initialState = {
  offers: [],
  offerCities: [],
  activeCity: ``
};

// Actions
export const ActionType = {
  LOAD_OFFER: `LOAD_OFFER`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  GET_CITIES: `GET_CITIES`,
  GET_FIRST_CITY: `GET_FIRST_CITY`,
  UPDATE_ACTIVE_CITY: `UPDATE_ACTIVE_CITY`,
};

// ActionCreators (mapDispatchToProps) (2)
export const loadOfferAction = (offer) => ({
  type: ActionType.LOAD_OFFER,
  payload: ModelOffer.parseOffer(offer),
});

export const loadOffersAction = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: ModelOffer.parseOffers(offers), // because async vs thunk on promise
});

export const loadNearbyAction = (nearby) => ({
  type: ActionType.LOAD_NEARBY,
  payload: ModelOffer.parseOffers(nearby)
});

export const loadReviewsAction = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews
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

// Async thunk functions (1)
export const fetchOffersList = () => (dispatch, getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => {
      dispatch(loadOffersAction(data));
      dispatch(getCitiesAction(data));
      dispatch(getFirstCityAction(getState().DATA.offerCities[FIRST_CITY]));
    }) // normal redux dispatch
);

export const fetchOffer = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}`)
    .then(({data}) => {
      dispatch(loadOfferAction(data));
    }) // normal redux dispatch
);

export const fetchNearby = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}/nearby`)
  .then(({data}) => {
    dispatch(loadNearbyAction(data));
  })
);

export const fetchReviews = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${offerId}`)
  .then(({data}) => {
    dispatch(loadReviewsAction(data));
  })
);

// Post review data
export const postReview = ({review, rating, offerId}) => (dispatch, _getState, api) => {
  dispatch(setRequestAction({status: RequestStatus.PENDING}));
  return api.post(`${APIRoute.REVIEWS}/${offerId}`, {comment: review, rating})
      .then(({data}) => {
        dispatch(loadReviewsAction(data));
        dispatch(setRequestAction({status: RequestStatus.SUCCESS}));
      })
      .catch(() => {
        dispatch(setRequestAction({status: RequestStatus.FAILURE}));
      });
};

export const postFavorite = (offerId, favoriteStatus) => (dispatch, _getState, api) => {
  const status = favoriteStatus ?
    api.post(`${APIRoute.FAVORITE}/${offerId}/0`, {'hotel_id': offerId, "status": `0`})
      .then(({data}) => {
        console.log(data); dispatch(fetchOffersList());
      })
    :
    api.post(`${APIRoute.FAVORITE}/${offerId}/1`, {'hotel_id': offerId, "status": `1`})
      .then(({data}) => {
        console.log(data); dispatch(fetchOffersList());
      });
};

// Reducer (for updating stateToProps) (3)
export const data = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.LOAD_OFFER:
      return updateState(state, {offer: action.payload});
    case ActionType.LOAD_OFFERS:
      return updateState(state, {offers: action.payload});
    case ActionType.LOAD_NEARBY:
      return updateState(state, {nearby: action.payload});
    case ActionType.LOAD_REVIEWS:
      return updateState(state, {reviews: action.payload.slice(0, MAX_REVIEWS).sort((a, b) => b.id - a.id)});
    case ActionType.GET_CITIES:
      return updateState(state, {offerCities: action.payload});
    case ActionType.GET_FIRST_CITY:
      return updateState(state, {activeCity: action.payload});
    case ActionType.UPDATE_ACTIVE_CITY:
      return updateState(state, {activeCity: action.payload});
  }

  return state; // send initial state at start
};
