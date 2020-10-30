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
};


// for updating State Props
export const reducer = (state = initialState, action) => {

  return state; // send initial state at start
};
