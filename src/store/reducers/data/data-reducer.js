import {updateState} from '@root/utils';
import {ActionType} from './data-actions';
import {ReviewLimit} from '@root/consts';

const initialState = {
  offers: [],
  favorites: [],
  cities: [],
  activeCity: ``,
  activeOfferId: ``,
  activeCoords: {}
};

export const dataReducer = (state = initialState, action) => {

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
