// import {NameSpace} from './reducers/root-reducer';
import {createSelector} from 'reselect';

// to Main
// export const selectOffers = (state) => state[NameSpace.DATA].offers; // example with [NameSpace]
export const selectOffersFromState = (state) => state.offers;
export const selectActiveCityFromState = (state) => state.activeCity;

export const selectOffersByCity = createSelector(
    selectOffersFromState,
    selectActiveCityFromState,
    (offers, activeCity) => offers.filter((offer) => offer.city.name === activeCity));

// to OfferList
// export const getSortedOffers = (offers, currentSortType) => {
//   switch (currentSortType) {
//     case OfferSortType.PRICE_LOW_TO_HIGH:
//       return offers.slice().sort((a, b) => a.price - b.price);
//     case OfferSortType.PRICE_HIGH_TO_LOW:
//       return offers.slice().sort((a, b) => b.price - a.price);
//     case OfferSortType.TOP_RATED:
//       return offers.slice().sort((a, b) => b.rating - a.rating);
//   }

//   return offers;
// };
