import {PureComponent} from "react";

import OfferCard from '../offer-card/offer-card';

import offerProperties from "../../proptypes/offer-properties";

class OfferList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {activeCard: null};
  }

  render() {
    const {offersMock, handleCardHover, handleCardClick, nearby} = this.props;

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

  }
}

OfferList.propTypes = {
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  nearby: PropTypes.bool.isRequired,
};

export default OfferList;
