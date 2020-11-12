// import {NameSpace} from './reducers/root-reducer';
import {createSelector} from 'reselect';

// Main
// export const selectOffers = (state) => state[NameSpace.DATA].offers; // example with [NameSpace]
export const selectOffersFromState = (state) => state.offers;
export const selectActiveCityFromState = (state) => state.activeCity;
export const selectNearby = (state) => state.nearby;

export const selectUniqFavoriteCitiesFromState = (state) => [...new Set(state.favorites.map((offer) => offer.city.name))];
export const selectFavoriteOffersFromState = (state) => state.favorites;


// Favorites
export const selectOffersByCity = createSelector(
    selectOffersFromState,
    selectActiveCityFromState,
    (offers, activeCity) => offers.filter((offer) => offer.city.name === activeCity)
);

export const selectFavoritesByCity = createSelector(
    selectUniqFavoriteCitiesFromState,
    selectFavoriteOffersFromState,
    (favoriteCities, favorites) => favorites.reduce((total, offer) => {

      favoriteCities.forEach((city) => {
        total[city] = total[city] || [];

        if (city === offer.city.name) {
          total[city].push(offer);
        }
      });

      return total;
    }, {})
);
