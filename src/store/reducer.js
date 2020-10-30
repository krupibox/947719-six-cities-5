import {updateState} from '../utils/update-state';
import {ActionType} from './action';

import offersMock from '../mocks/offers-mocks';
import reviewsMock from '../mocks/reviews-mocks';
import nearbyMock from '../mocks/nearby-mocks';

// for State Props
const initialState = {
  offersMock,
  reviewsMock,
  nearbyMock,
  cities: [],
};

// for updating State Props
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITIES:
      return updateState(state, {cities: offerCities});
  }

  return state; // send initial state at start
};

const offerCities = offersMock.map((offer) => offer.city);

