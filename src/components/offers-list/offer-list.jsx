import OfferCard from '../offer-card/offer-card';

import OfferSortType from '../../consts/offer-sort-type';

import offerProperties from "../../proptypes/offer-properties";

const getSortedOffers = (offers, currentSortType) => {
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

const OfferList = (props) => {

  const {offers, handleCardHover, handleCardClick, sortingType, nearby} = props;

  return (
    getSortedOffers(offers, sortingType).map((offer, index) =>
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
  offers: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  nearby: PropTypes.bool.isRequired,
};

export default OfferList;
