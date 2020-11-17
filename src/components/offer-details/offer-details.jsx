import {PureComponent} from "react";
import {Link} from "react-router-dom";
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
import {AuthorizationStatus} from '../../consts/authorization-status';
import {AppRoute} from '../../consts/app-route';

import {fetchOffer} from '../../store/reducers/data';
import {fetchNearby} from '../../store/reducers/data';
import {fetchReviews} from '../../store/reducers/data';
import {postFavorite} from '../../store/reducers/data';

import {setActiveOfferId} from '../../store/reducers/data';

import {selectNearbyFromState} from '../../store/selectors';

import offerProperties from "../../proptypes/offer-properties";
import reviewProperties from "../../proptypes/review-properties";
import nearbyProperties from "../../proptypes/nearby-properties";

class OfferDetails extends PureComponent {

  constructor(props) {
    super(props);
    this._currentCoords = {}; // (1)
  }

  componentDidMount() {
    const {offerId} = this.props;
    this.props.getOffer(offerId);
    this.props.setOfferId(offerId);
    this.props.getNearby(offerId);
    this.props.getReviews(offerId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.offerId !== prevProps.offerId) {
      this.props.getOffer(this.props.offerId);
      this.props.getReviews(this.props.offerId);
    }
  }

  _renderContent() {

    const {offer, nearby, reviews, authorizationStatus, onFavoriteClick} = this.props;
    const {id: offerId, isPremium, isFavorite, price, title, images, rating, bedrooms, maxAdults, goods, description, host} = offer;

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
                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <button
                      className={`property__bookmark-button button ${isFavorite && `property__bookmark-button--active`}`}
                      type="button"
                      onClick={() => onFavoriteClick(offerId, isFavorite)}
                    >
                      <svg className="property__bookmark-icon" width={31} height={33}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button> :
                    <Link to={AppRoute.LOGIN} className={`property__bookmark-button button`}>
                      <svg className="property__bookmark-icon" width={31} height={33}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </Link>
                  }
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

                  {
                    authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm offerId={this.props.offerId}/>
                  }

                </section>
              </div>
            </div>
            <section className="property__map map">

              <Map
                offerCoords={getCoordinates(nearby).places}
                cityCenterCoords={getCoordinates(nearby).cityCenter}
                activeCoords={null}
                currentCoords={this.props.offer.location}
                onCardHover={() => {}}
              />

            </section>
          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                <OfferList
                  offers={nearby}
                  nearby={true}
                  favorite={false}
                  onCardHover={() => {}}
                />

              </div>
            </section>
          </div>

        </main>
      </div>
    );
  }

  render() {
    return (this.props.offer && this.props.nearby && this.props.reviews ? this._renderContent() : <p>Loading...</p>);
  }
}

OfferDetails.defaultProps = {
  offer: {
    city: {
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    },
    previewImage: ``,
    images: [],
    type: ``,
    price: 0,
    rating: 0,
    title: ``,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    host: {
      id: 0,
      name: ``,
      isPro: false,
      avatarUrl: ``,
      description: ``,
    }
  },
  activeCoords: {},
  currentCoords: {},

  nearby: [{
    city: {
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    },
    previewImage: ``,
    images: [],
    type: ``,
    price: 0,
    rating: 0,
    title: ``,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    host: {
      id: 0,
      name: ``,
      isPro: false,
      avatarUrl: ``,
      description: ``,
    }
  }],

  reviews: [],
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
  setOfferId: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({USER, DATA}) => ({
  offer: DATA.offer,
  nearby: selectNearbyFromState(DATA),
  reviews: DATA.reviews,
  authorizationStatus: USER.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOffer(offerId) {
    dispatch(fetchOffer(offerId));
  },
  setOfferId(offerId) {
    dispatch(setActiveOfferId(offerId));
  },
  getNearby(offerId) {
    dispatch(fetchNearby(offerId));
  },
  getReviews(offerId) {
    dispatch(fetchReviews(offerId));
  },
  onFavoriteClick(offerId, status) {
    dispatch(postFavorite(offerId, status));
  },
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);

