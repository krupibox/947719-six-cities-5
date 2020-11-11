import OfferCard from '../offer-card/offer-card';

import getSortedOffers from '../../utils/get-sorted-offers';

const OfferList = ({offers, onCardHover, sortingType, nearby, favorite}) => {

  const sortedOffers = getSortedOffers(offers, sortingType);

  return (
    sortedOffers.map((offer, index) =>
      <OfferCard
        key={`${index}-${offer.id}`}
        {...offer}
        onCardHover={onCardHover}
        nearby={nearby}
        favorite={favorite}
      />)
  );
};

export default React.memo(OfferList);
