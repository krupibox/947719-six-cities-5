import OfferCard from '../offer-card/offer-card';

const OfferList = ({offersMock}) => {

  return (
    offersMock.map((offer, index) => <OfferCard key={`${index}-${offer.id}`} {...offer}/>)
  );
};

export default OfferList;
