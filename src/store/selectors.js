export const getSortedOffers = (offers, currentSortType) => {
  switch (currentSortType) {
    case OfferSortType.PRICE_LOW_TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case OfferSortType.PRICE_HIGH_TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case OfferSortType.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }

  return offers;
};

export const offerCities = offersMock.map((offer) => offer.city);
