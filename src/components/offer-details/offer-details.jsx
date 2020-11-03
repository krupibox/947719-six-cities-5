import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
// import OfferList from '../offers-list/offer-list';
// import Map from '../map/map';

import {getStars} from '../../utils/get-stars';
import MAX_ITEMS from '../../consts/max-items';

import offerProperties from "../../proptypes/offer-properties";
import reviewProperties from "../../proptypes/review-properties";
import nearbyProperties from "../../proptypes/nearby-properties";

/* eslint-disable */

const OfferDetails = ({offer, reviewMock, nearbyMock, handleCardHover, handleCardClick}) => {

  const {is_premium, is_favorite, price, title, images, rating, bedrooms, max_adults, goods, description} = offer;
  const {avatar_url, name, is_pro} = offer.host;

  // const nearbyCords = nearbyMock.map((nearbyOffer) => nearbyOffer.coordinates);

  return (

    <div className="page">

      <Header isSignIn={true} />

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

              {is_premium && <div className="property__mark"><span>Premium</span></div>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={`property__bookmark-button button ${is_favorite && `property__bookmark-button--active`}`}
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
                  Max {max_adults} adults
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
                  <div className={`property__avatar-wrapper ${is_pro && `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={avatar_url} alt="Host avatar" width={74} height={74} />
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

                <ReviewsList reviewMock={reviewMock} />

                <ReviewForm />

              </section>
            </div>
          </div>

          <section className="property__map map">

            {/* <Map {...nearbyCords}/> */}

          </section>

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              {/* <OfferList
                offersMock={nearbyMock}
                handleCardHover={handleCardHover}
                handleCardClick={handleCardClick}
                nearby={true}
              /> */}

            </div>
          </section>
        </div>
      </main>
    </div>

  );
};

OfferDetails.propTypes = {
  offer: PropTypes.shape(offerProperties).isRequired,
  reviewMock: PropTypes.arrayOf(PropTypes.shape(reviewProperties)).isRequired,
  nearbyMock: PropTypes.arrayOf(PropTypes.shape(nearbyProperties)).isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default OfferDetails;
