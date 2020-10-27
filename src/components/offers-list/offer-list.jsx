import {PureComponent} from "react";
import OfferCard from '../offer-card/offer-card';

import offerProperties from "../../proptypes/offer-properties";

class OfferList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {activeCard: null};
  }

  render() {
    const {offersMock, onCardHover, onCardClick, nearby} = this.props;

    return (
      offersMock.map((offer, index) =>
        <OfferCard
          key={`${index}-${offer.id}`}
          {...offer}
          onCardHover={onCardHover}
          onCardClick={onCardClick}
          nearby={nearby}
        />)
    );

  }
}

OfferList.propTypes = {
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  nearby: PropTypes.bool.isRequired,
};

export default OfferList;
