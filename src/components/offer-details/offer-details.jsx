import {PureComponent} from "react";
import {connect} from 'react-redux';

import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import OfferList from '../offers-list/offer-list';
import Map from '../map/map';

import {getStars} from '../../utils/get-stars';
import MAX_ITEMS from '../../consts/max-items';

// Thunk functions
import {fetchOffer} from "../../store/reducers/data";
import {fetchNearby} from "../../store/reducers/data";

import offerProperties from "../../proptypes/offer-properties";
import reviewProperties from "../../proptypes/review-properties";
import nearbyProperties from "../../proptypes/nearby-properties";

const getPlaces = (places) => {
  return places.map((place) => [
    place.location.latitude,
    place.location.longitude,
    place.location.zoom
  ]);
};

const getCoordinates = (places) => {
  return {
    cityCenter: {
      latitude: places[0].city.location.latitude,
      longitude: places[0].city.location.longitude,
      zoom: places[0].city.location.zoom
    },
    places: getPlaces(places),
  };
};

class OfferDetails extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {offerId} = this.props;
    this.props.getOffer(offerId);
    this.props.getNearby(offerId);
  }

  render() {

    // offer and nearby are not initial in state
    const {offer, nearby} = this.props;

    if (!offer || !nearby) {
      return (<p>Loading...</p>);
    }

    const {is_premium: isPremium, is_favorite: isFavorite, price, title, images, rating, bedrooms, max_adults: maxAdults, goods, description, host: {avatar_url: avatarUrl, name, is_pro: isPro}, location: {latitude, longitude}} = offer;

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
                  {/* TODO put data from mock*/}
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
                      goods.length > 0 && goods.map((good, index) => <li key={`${index}-${good}`} className="property__inside-item">{good}</li>)
                    }

                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${isPro && `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={avatarUrl} alt="Host avatar" width={74} height={74} />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                  </div>

                </div>
                <section className="property__reviews reviews">

                  {/* <ReviewsList reviewMock={reviewMock} /> */}

                  <ReviewForm />

                </section>
              </div>
            </div>

            <section className="property__map map">

              <Map
                offerCoords={getCoordinates(nearby).places}
                cityCenterCoords={getCoordinates(nearby).cityCenter}
                activeCoords={[latitude, longitude]}
                handleCardHover={(evt) => {
                  evt.preventDefault();
                }}
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

OfferDetails.propTypes = {
  offer: PropTypes.shape(offerProperties).isRequired,
  nearby: PropTypes.shape(nearbyProperties).isRequired,
  review: PropTypes.arrayOf(PropTypes.shape(reviewProperties)).isRequired,
  getOffer: PropTypes.func.isRequired,
  // handleCardHover: PropTypes.func.isRequired,
  // handleCardClick: PropTypes.func.isRequired
};

const mapStateToProps = ({DATA}) => ({
  offer: DATA.offer,
  nearby: DATA.nearby,
});

const mapDispatchToProps = (dispatch) => ({
  getOffer(offerId) {
    dispatch(fetchOffer(offerId));
  },
  getNearby(offerId) {
    dispatch(fetchNearby(offerId));
  }
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);

