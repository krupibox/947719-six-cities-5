import {PureComponent} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import OffersList from '../offers-list/offers-list';
import OfferMap from '../offer-map/offer-map';
import Host from '../host/host';
import {getStars} from '@root/utils';
import {MapAdapter} from '@root/adapters';
import {AppRoute, AuthorizationStatus, MAX_ITEMS} from '@root/consts';
import {fetchNearby, fetchOffer, fetchReviews, postFavorite} from '@root/store/reducers/data/data-operations';
import {setActiveOfferId} from '@root/store/reducers/data/data-actions';
import {selectNearbyFromState} from '@root/store/selectors';
import offerProperties from '@root/proptypes/offer-properties';
import reviewProperties from '@root/proptypes/review-properties';
import nearbyProperties from '@root/proptypes/nearby-properties';

class OfferDetails extends PureComponent {

  constructor(props) {
    super(props);
    this._currentCoords = {};
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

    const {latitude, longitude} = this.props.offer.location;
    const currentCoords = {offerId, latitude, longitude};

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

              <OfferMap
                offersCoords={MapAdapter.getOffersCoords(nearby)}
                cityCoords={MapAdapter.getCityCoords(nearby)}
                currentCoords={currentCoords}
              />

            </section>
          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                <OffersList
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
    id: 0,
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
    id: 0,
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

