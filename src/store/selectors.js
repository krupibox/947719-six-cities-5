// import {NameSpace} from './reducers/root-reducer';
import {createSelector} from 'reselect';

// to Main
// export const selectOffers = (state) => state[NameSpace.DATA].offers; // example with [NameSpace]
export const selectOffersFromState = (state) => state.offers;
export const selectActiveCityFromState = (state) => state.activeCity;

export const selectOffersByCity = createSelector(
    selectOffersFromState,
    selectActiveCityFromState,
    (offers, activeCity) => offers.filter((offer) => offer.city.name === activeCity)
);

// Favorites
export const selectFavorites = (state) => state.favorites;
