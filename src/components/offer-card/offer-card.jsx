import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import {AppRoute} from "../../consts/app-route";

import {getStars} from '../../utils/get-stars';
import {AuthorizationStatus} from "../../consts/authorization-status";

// Thunk
import {postFavorite} from '../../store/reducers/data';

import {setActiveOfferId} from '../../store/reducers/data';
import {setActiveOfferCoords} from '../../store/reducers/data';

import offerProperties from "../../proptypes/offer-card-properties";

const OfferCard = ({offer, onCardHover, nearby, favorite, onFavoriteClick, authorizationStatus, setOfferId, setOfferCoords}) => {

  const {id: offerId, isPremium, isFavorite, price, title, previewImage, location, rating, type} = offer;

  return (
    <article className={`${nearby ? `near-places__card` : ``} ${favorite ? `favorites__card` : `cities__place-card`} place-card`}

      onMouseEnter={onCardHover ? () => {
        onCardHover(location);
        setOfferId(offerId);
        setOfferCoords(offer.location);
      } : null}
      onMouseOut={onCardHover ? () => onCardHover(null) : null}
    >

      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}

      <div className={`${nearby && `near-places__image-wrapper` || favorite && `favorites__image-wrapper`} place-card__image-wrapper`}>

        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={favorite ? 150 : 260}
            height={favorite ? 110 : 200}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${favorite && `favorites__card-info `} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>

          {
            authorizationStatus === AuthorizationStatus.AUTH ?
              <button
                className={`place-card__bookmark-button button ${isFavorite && `place-card__bookmark-button--active`}`}
                type="button"
                onClick={() => onFavoriteClick(offerId, isFavorite, nearby)}
              >
                <svg className="place-card__bookmark-icon" width={18} height={19}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button> :
              <Link to={AppRoute.LOGIN} className={`place-card__bookmark-button button`}>
                <svg className="place-card__bookmark-icon" width={18} height={19}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </Link>
          }

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getStars(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          {
            <Link to={`${AppRoute.OFFER}/${offerId}`} className='place-card__name'>{title}</Link>
          }
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = offerProperties;

OfferCard.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = ({USER}) => ({
  authorizationStatus: USER.authorizationStatus,
  authorizationInfo: USER.authorizationInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setOfferId(offerId) {
    dispatch(setActiveOfferId(offerId));
  },
  setOfferCoords(offer) {
    dispatch(setActiveOfferCoords(offer));
  },
  onFavoriteClick(offerId, status, nearby) {
    dispatch(postFavorite(offerId, status, nearby));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
