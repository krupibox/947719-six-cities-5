import OfferCard from '../offer-card/offer-card';

import getSortedOffers from '../../utils/get-sorted-offers';

const OffersList = ({offers, onCardHover, sortingType, nearby, favorite}) => {

  const sortedOffers = getSortedOffers(offers, sortingType);

  return (
    sortedOffers.map((offer, index) =>
      <OfferCard
        key={`${index}-${offer.id}`}
        offer={offer}
        onCardHover={onCardHover}
        nearby={nearby}
        favorite={favorite}
      />)
  );
};

export default React.memo(OffersList);
