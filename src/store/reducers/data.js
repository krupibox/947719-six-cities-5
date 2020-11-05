import {updateState} from '../../utils/update-state';

import APIRoute from '../../consts/api-route';
import FIRST_CITY from '../../consts/first-city';
import {getUniqueCities} from '../../utils/get-unique-cities';

// import offersMock from '../../mocks/offers-mocks'; // mocks
import reviewsMock from '../../mocks/reviews-mocks'; // mocks
import nearbyMock from '../../mocks/nearby-mocks'; // mocks

// stateToProps
const initialState = {
  offers: [],
  reviewsMock,
  nearbyMock,
  offerCities: [],
  activeCity: ``
};

// Actions
export const ActionType = {
  LOAD_OFFER: `LOAD_OFFER`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  GET_CITIES: `GET_CITIES`,
  GET_FIRST_CITY: `GET_FIRST_CITY`,
  UPDATE_ACTIVE_CITY: `UPDATE_ACTIVE_CITY`,
};

// ActionCreators (mapDispatchToProps) (2)
export const loadOfferAction = (offer) => ({
  type: ActionType.LOAD_OFFER,
  payload: offer,
});

export const loadNearbyAction = (nearby) => ({
  type: ActionType.LOAD_NEARBY,
  payload: nearby
});

export const loadOffersAction = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
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

//  example with getState: api.get(APIRoute.HOTELS`:${getState().DATA.offerId}`)
export const fetchOffer = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}`)
    .then(({data}) => {
      dispatch(loadOfferAction(data));
    }) // normal redux dispatch
);

export const fetchNearby = (offerId) => (dispatch, getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}/nearby`)
  .then(({data}) => {
    dispatch(loadNearbyAction(data));
    // console.log(`getState().DATA)`, getState().DATA);
  })
);

// Reducer (for updating stateToProps) (3)
export const data = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.LOAD_OFFER:
      return updateState(state, {offer: action.payload});
    case ActionType.LOAD_OFFERS:
      return updateState(state, {offers: action.payload});
    case ActionType.LOAD_NEARBY:
      return updateState(state, {nearby: action.payload});
    case ActionType.GET_CITIES:
      return updateState(state, {offerCities: action.payload});
    case ActionType.GET_FIRST_CITY:
      return updateState(state, {activeCity: action.payload});
    case ActionType.UPDATE_ACTIVE_CITY:
      return updateState(state, {activeCity: action.payload});
  }

  return state; // send initial state at start
};
