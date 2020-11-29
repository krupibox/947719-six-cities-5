import {
  loadOfferAction,
  loadOffersAction,
  loadNearbyAction,
  loadReviewsAction,
  loadFavoritesAction,
  getCitiesAction,
  getFirstCityAction,
} from './data-actions';
import {setRequestAction} from '../request/request-actions';
import {APIRoute, RequestStatus, FIRST_CITY} from '@root/consts';

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

