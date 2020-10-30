import {updateState} from '../utils/update-state';
import {ActionType} from './action';

import offersMock from '../mocks/offers-mocks';
import reviewsMock from '../mocks/reviews-mocks';
import nearbyMock from '../mocks/nearby-mocks';

const offerCities = offersMock.map((offer) => offer.city);

// for State Props
const initialState = {
  offersMock,
  reviewsMock,
  nearbyMock,
  offerCities,
  activeCity: `Paris`
};

// for updating State Props
export const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.UPDATE_ACTIVE_CITY:
      return updateState(state, {activeCity: action.payload});
  }

  return state; // send initial state at start
};
