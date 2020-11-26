import {updateState} from '../../../utils/update-state';
import {getUniqueCities} from '../../../utils/get-unique-cities';
import {setRequest as setRequestAction} from '../request/request';
import {RequestStatus} from '../../../consts/request-status';
import {ReviewLimit} from '../../../consts/review-limit';
import {APIRoute} from '../../../consts/api-route';
import {FIRST_CITY} from '../../../consts/first-city';
import ModelOffer from '../../../models/model-offer';

const initialState = {
  offers: [],
  favorites: [],
  cities: [],
  activeCity: ``,
  activeOfferId: ``,
  activeCoords: {}
};

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
  payload: ModelOffer.parseOffer(offer),
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
  payload: ModelOffer.parseOffers(offers),
});

export const loadNearbyAction = (nearby) => ({
  type: ActionType.LOAD_NEARBY,
  payload: ModelOffer.parseOffers(nearby)
});

export const loadReviewsAction = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews
});

export const loadFavoritesAction = (favorites) => ({
  type: ActionType.LOAD_FAVORITES,
  payload: ModelOffer.parseOffers(favorites)
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

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => {
      dispatch(loadOffersAction(data));
      dispatch(getCitiesAction(data));
      dispatch(getFirstCityAction(data[FIRST_CITY].city.name));
    })
);

export const fetchOffer = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}`)
    .then(({data}) => dispatch(loadOfferAction(data)))
);

export const fetchNearby = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.HOTELS}/${offerId}/nearby`)
  .then(({data}) => dispatch(loadNearbyAction(data)))
);

export const fetchReviews = (offerId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${offerId}`)
  .then(({data}) => {
    dispatch(loadReviewsAction(data));
  })
);

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

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FAVORITE}`)
  .then(({data}) => {
    dispatch(loadFavoritesAction(data));
  })
);

export const postFavorite = (offerId, favoriteStatus, nearby) => (dispatch, getState, api) => {

  const STATUS = {true: `0`, false: `1`};

  return api.post(`${APIRoute.FAVORITE}/${offerId}/${STATUS[favoriteStatus]}`, {'hotel_id': offerId, status})
  .then(({data}) => {

    if (nearby) {

      dispatch(fetchFavorites());

      let nears = getState().DATA.nearby;
      const index = nears.findIndex((el) => el.id === data.id);
      nears = [...nears.slice(0, index), data, ...nears.slice(index + 1)];
      dispatch(loadNearbyAction(nears));

      return;
    }

    let offers = getState().DATA.offers;
    const index = offers.findIndex((offer) => offer.id === data.id);
    offers = [...offers.slice(0, index), data, ...offers.slice(index + 1)];
    dispatch(loadOfferAction(data));
    dispatch(loadOffersAction(offers));
    dispatch(fetchFavorites());

  });
};

export const data = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.LOAD_OFFER:
      return updateState(state, {offer: action.payload});
    case ActionType.SET_ACTIVE_OFFER_ID:
      return updateState(state, {activeOfferId: action.payload});
    case ActionType.SET_ACTIVE_OFFER_COORDS:
      return updateState(state, {activeCoords: action.payload});
    case ActionType.LOAD_OFFERS:
      return updateState(state, {offers: action.payload});
    case ActionType.LOAD_NEARBY:
      return updateState(state, {nearby: action.payload});
    case ActionType.LOAD_REVIEWS:
      return updateState(state, {reviews: action.payload.slice(0, ReviewLimit.MAX_COUNT).sort((a, b) => b.id - a.id)});
    case ActionType.LOAD_FAVORITES:
      return updateState(state, {favorites: action.payload});
    case ActionType.GET_CITIES:
      return updateState(state, {cities: action.payload});
    case ActionType.GET_FIRST_CITY:
      return updateState(state, {activeCity: action.payload});
    case ActionType.UPDATE_ACTIVE_CITY:
      return updateState(state, {activeCity: action.payload});
  }

  return state;
};
