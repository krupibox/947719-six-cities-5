import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../services/api';
import {ActionType} from './data';
import {ActionType as ActionTypeRequest} from '../request/request';
import {
  fetchOffersList,
  fetchOffer,
  fetchNearby,
  fetchReviews,
  fetchFavorites,
  postReview,
  postFavorite,
} from './data';
import {APIRoute} from '../../../consts/api-route';
import {RequestStatus} from '../../../consts/request-status';
import ModelOffer from '../../../models/model-offer';
import {TestMock} from '../../../__mocks__/mocks';

const {offers, offer, reviews} = TestMock;
const {id: offerId} = offer;
const api = createAPI(() => { });

describe(`Data Async operations work correctly`, () => {
  it(`Should make a correct API GET /hotels`, () => {
    new MockAdapter(api)
    .onGet(APIRoute.HOTELS)
    .reply(200, offers);

    const dispatch = jest.fn();
    const getOffers = fetchOffersList();

    return getOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.GET_FIRST_CITY,
          payload: `Paris`,
        });
      });
  });
  it(`Should make a correct API GET /hotels/id`, () => {
    new MockAdapter(api)
    .onGet(`${APIRoute.HOTELS}/${offerId}`)
    .reply(200, offer);

    const dispatch = jest.fn();
    const getOffer = fetchOffer(offerId);

    return getOffer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: ModelOffer.parseOffer(offer),
        });
      });
  });
  it(`Should make a correct API GET /hotels/id/nearby`, () => {
    new MockAdapter(api)
    .onGet(`${APIRoute.HOTELS}/${offerId}/nearby`)
    .reply(200, offers);

    const dispatch = jest.fn();
    const getNearby = fetchNearby(offerId);

    return getNearby(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEARBY,
          payload: ModelOffer.parseOffers(offers),
        });
      });
  });
  it(`Should make a correct API GET /comments/id`, () => {
    new MockAdapter(api)
    .onGet(`${APIRoute.REVIEWS}/${offerId}`)
    .reply(200, reviews);

    const dispatch = jest.fn();
    const getReviews = fetchReviews(offerId);

    return getReviews(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviews,
        });
      });
  });
  it(`Should make a correct API POST /comments/id`, () => {
    new MockAdapter(api)
    .onPost(`${APIRoute.REVIEWS}/${offerId}`)
    .reply(200, reviews);

    const dispatch = jest.fn();
    const sendReview = postReview({
      review: `Home is amazing.`,
      rating: 5,
      offerId
    });

    return sendReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypeRequest.SET_REQUEST,
          payload: {status: RequestStatus.PENDING},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviews,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionTypeRequest.SET_REQUEST,
          payload: {status: RequestStatus.SUCCESS},
        });
      });
  });
  it(`Should make a correct API GET /favorite`, () => {
    new MockAdapter(api)
    .onGet(`${APIRoute.FAVORITE}`)
    .reply(200, offers);

    const dispatch = jest.fn();
    const getFavorites = fetchFavorites();

    return getFavorites(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: ModelOffer.parseOffers(offers),
        });
      });
  });
  it(`Should make a correct API POST /favorite/1`, () => {
    const store = {DATA: {
      nearby: offers,
      offers,
    }};

    new MockAdapter(api)
    .onPost(`${APIRoute.FAVORITE}/${offerId}/1`)
    .reply(200, offer);

    const dispatch = jest.fn();
    const sendFavorite = postFavorite(offerId, false);

    return sendFavorite(dispatch, () => store, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: ModelOffer.parseOffer(offer),
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: ModelOffer.parseOffers(offers),
        });
      });
  });
  it(`Should make a correct API POST /favorite/0`, () => {
    const store = {DATA: {
      nearby: offers,
      offers,
    }};

    new MockAdapter(api)
    .onPost(`${APIRoute.FAVORITE}/${offerId}/0`)
    .reply(200, offer);

    const dispatch = jest.fn();
    const sendFavorite = postFavorite(offerId, true);

    return sendFavorite(dispatch, () => store, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: ModelOffer.parseOffer(offer),
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: ModelOffer.parseOffers(offers),
        });
      });
  });
});
