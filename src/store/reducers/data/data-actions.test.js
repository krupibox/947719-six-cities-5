import {ActionType} from './user';
import {loadOfferAction,
  // setActiveOfferId,
  // setActiveOfferCoords,
  // loadOffersAction,
  // loadNearbyAction,
  // loadReviewsAction,
  // loadFavoritesAction,
  // getCitiesAction,
  // getFirstCityAction,
  // updateCityAction,
} from './user';
// import {AppRoute} from "../../../consts/app-route";
// import {AuthorizationStatus} from "../../../consts/authorization-status";
// import ModelUser from '../../../models/model-user';
import {TestMock} from '../../../__mocks__/mocks';

import ModelOffer from '../../../models/model-offer';

// const status = AuthorizationStatus.AUTH;

describe(`Actions work correctly`, () => {
  it(`Action loadOfferAction work correctly`, () => {
    expect(loadOfferAction(TestMock.offer)).toEqual({
      type: ActionType.LOAD_OFFER,
      payload: ModelOffer.parseOffer(TestMock.offer),
    });
  });
});
