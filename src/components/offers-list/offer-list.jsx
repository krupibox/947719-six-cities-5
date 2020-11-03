import OfferCard from '../offer-card/offer-card';

import getSortedOffers from '../../utils/get-sorted-offers';

import offerProperties from "../../proptypes/offer-properties";

const OfferList = ({offers, handleCardHover, handleCardClick, sortingType, nearby}) => {

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
