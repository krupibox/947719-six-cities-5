import {PureComponent} from "react";
import {connect} from 'react-redux';

import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import OfferList from '../offers-list/offer-list';
import Map from '../map/map';
import Host from '../offer-details/host';

import {getStars} from '../../utils/get-stars';
import {getCoordinates} from '../../utils/get-coordinates';
import {MAX_ITEMS} from '../../consts/max-items';
import {AuthorizationStatus} from "../../consts/authorization-status";

// Thunk functions
import {fetchOffer} from "../../store/reducers/data";
import {fetchNearby} from "../../store/reducers/data";
import {fetchReviews} from "../../store/reducers/data";

import offerProperties from "../../proptypes/offer-properties";
import reviewProperties from "../../proptypes/review-properties";
import nearbyProperties from "../../proptypes/nearby-properties";

import offerMock from '../../mocks/offer-mock';
import nearbyMock from '../../mocks/nearby-mock';
import reviewMock from '../../mocks/review-mock';

class OfferDetails extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {offerId} = this.props;
    this.props.getOffer(offerId);
    this.props.getNearby(offerId);
    this.props.getReviews(offerId);
  }

  render() {
    // offer and nearby are not initial in state
    const {offer, nearby, reviews, authorizationStatus} = this.props;

    if (!offer || !nearby || !reviews) {
      return (<p>Loading...</p>);
    }

    const {is_premium: isPremium, is_favorite: isFavorite, price, title, images, rating, bedrooms, max_adults: maxAdults, goods, description, host, location} = offer;

    return (
      <div className="page">

        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">

                {
                  images.slice(0, MAX_ITEMS).map((image, index) => (
                    <div key={`${index}-${image.src}`} className="property__image-wrapper">
                      <img className="property__image" src={image} alt="Photo studio" />
                    </div>)
                  )
                }

              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">

                {isPremium && <div className="property__mark"><span>Premium</span></div>}

                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className={`property__bookmark-button button ${isFavorite && `property__bookmark-button--active`}`}
                    type="button"
                  >
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${getStars(rating)}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">4.8</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    Apartment
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">

                    {
                      goods && goods.map((good, index) => <li key={`${index}-${good}`} className="property__inside-item">{good}</li>)
                    }

                  </ul>
                </div>

                <Host description={description} {...host}/>

                <section className="property__reviews reviews">

                  <ReviewsList reviews={reviews} />

                  {/* { authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm />} */}
                  <ReviewForm offerId={this.props.offerId}/>

                </section>
              </div>
            </div>

            <section className="property__map map">

              <Map
                offerCoords={getCoordinates(nearby).places}
                cityCenterCoords={getCoordinates(nearby).cityCenter}
                activeCoords={[0, 0]}
                currentCoords = {location}
                handleCardHover={() => {}}
              />

            </section>

          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                <OfferList
                  offers={nearby}
                  handleCardHover={(evt) => {
                    evt.preventDefault();
                  }}
                  handleCardClick={(evt) => {
                    evt.preventDefault();
                  }}
                  nearby={true}
                />

              </div>
            </section>
          </div>


        </main>
      </div>
    );
  }
}

OfferDetails.defaultProps = {
  offer: offerMock,
  nearby: nearbyMock,
  reviews: reviewMock,
};

OfferDetails.propTypes = {
  offer: PropTypes.shape(offerProperties).isRequired,
  nearby: PropTypes.arrayOf(PropTypes.shape(nearbyProperties)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProperties)).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offerId: PropTypes.string.isRequired,
  getOffer: PropTypes.func.isRequired,
  getNearby: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
};

const mapStateToProps = ({USER, DATA}) => ({
  offer: DATA.offer,
  nearby: DATA.nearby,
  reviews: DATA.reviews,
  authorizationStatus: USER.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOffer(offerId) {
    dispatch(fetchOffer(offerId));
  },
  getNearby(offerId) {
    dispatch(fetchNearby(offerId));
  },
  getReviews(offerId) {
    dispatch(fetchReviews(offerId));
  }
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);

