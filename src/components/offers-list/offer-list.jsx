import React, {PureComponent} from "react";
import OfferCard from '../offer-card/offer-card';

import offerProperties from "../../proptypes/offer-properties";

class OfferList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {activeCard: null};
  }

  render() {
    const {offersMock, onCardClick} = this.props;

    return (
      offersMock.map((offer, index) =>
        <OfferCard
          key={`${index}-${offer.id}`}
          {...offer}
          onCardHover={() => {
            this.setState(() => ({activeCard: offer.id}));
          }}
          onCardClick={onCardClick}
        />)
    );

  }
}

OfferList.propTypes = {
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferList;
