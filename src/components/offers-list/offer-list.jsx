import OfferCard from '../offer-card/offer-card';

import getSortedOffers from '../../utils/get-sorted-offers';

const OfferList = ({offers, handleCardHover, sortingType, nearby}) => {

  const sortedOffers = getSortedOffers(offers, sortingType);

  return (
    sortedOffers.map((offer, index) =>
      <OfferCard
        key={`${index}-${offer.id}`}
        {...offer}
        handleCardHover={handleCardHover}
        nearby={nearby}
      />)
  );
};

export default OfferList;
