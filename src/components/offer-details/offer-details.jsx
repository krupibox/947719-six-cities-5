import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import OfferList from '../offers-list/offer-list';
import Map from '../map/map';

import {getStars} from '../../utils/get-stars';

import offerProperties from "../../proptypes/offer-properties";
import reviewProperties from "../../proptypes/review-properties";

const OfferDetails = ({offerMock, reviewMock, nearbyMock, onCardHover, onCardClick}) => {

  const {isPremium, price, name, images, rating} = offerMock;

  const nearbyCords = nearbyMock.map((offer) => offer.coordinates);

  return (

    <div className="page">

      <Header isSignIn={true} />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {
                images.map((image, index) => (
                  <div key={`${index}-${image.src}`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>)
                )
              }

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {isPremium ? <div className="property__mark"><span>Premium</span></div> : ``}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {name}
                </h1>
                <button className="property__bookmark-button button" type="button">
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
                  3 Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {/* TODO put data from mock*/}
                  <li className="property__inside-item">
                    Wi-Fi
                  </li>
                  <li className="property__inside-item">
                    Washing machine
                  </li>
                  <li className="property__inside-item">
                    Towels
                  </li>
                  <li className="property__inside-item">
                    Heating
                  </li>
                  <li className="property__inside-item">
                    Coffee machine
                  </li>
                  <li className="property__inside-item">
                    Baby seat
                  </li>
                  <li className="property__inside-item">
                    Kitchen
                  </li>
                  <li className="property__inside-item">
                    Dishwasher
                  </li>
                  <li className="property__inside-item">
                    Cabel TV
                  </li>
                  <li className="property__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" alt="Host avatar" width={74} height={74} />
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>

              </div>
              <section className="property__reviews reviews">

                <ReviewsList reviewMock={reviewMock} />

                <ReviewsForm />

              </section>
            </div>
          </div>

          <section className="property__map map">

            <Map {...nearbyCords}/>

          </section>

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <OfferList
                offersMock={nearbyMock}
                onCardHover={onCardHover}
                onCardClick={onCardClick}
                nearby={true}
              />

            </div>
          </section>
        </div>
      </main>
    </div>

  );
};

OfferDetails.propTypes = {
  offerMock: PropTypes.shape(offerProperties).isRequired,
  reviewMock: PropTypes.arrayOf(PropTypes.shape(reviewProperties)).isRequired,
  nearbyMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default OfferDetails;
