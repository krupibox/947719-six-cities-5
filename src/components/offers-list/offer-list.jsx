import OfferCard from '../offer-card/offer-card';

import offerProperties from "../../proptypes/offer-properties";

const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

const getSortedOffers = (offers, currentSortType) => {
  switch (currentSortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortType.PRICE_HIGH_TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }

  return offers;
};

const OfferList = (props) => {

  const {offersMock, handleCardHover, handleCardClick, sortingType, nearby} = props;

  getSortedOffers(offersMock, sortingType); // why return

  return (
    offersMock.map((offer, index) =>
      <OfferCard
        key={`${index}-${offer.id}`}
        {...offer}
        handleCardHover={handleCardHover}
        handleCardClick={handleCardClick}
        nearby={nearby}
      />)
  );

};


OfferList.propTypes = {
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  nearby: PropTypes.bool.isRequired,
};

export default OfferList;
