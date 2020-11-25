import {createSelector} from 'reselect';

export const selectOffersFromState = (state) => state.offers;
export const selectActiveCityFromState = (state) => state.activeCity;
export const selectUniqFavoriteCitiesFromState = (state) => [...new Set(state.favorites.map((offer) => offer.city.name))];
export const selectFavoriteOffersFromState = (state) => state.favorites;
export const selectNearbyFromState = (state) => state.nearby;

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
