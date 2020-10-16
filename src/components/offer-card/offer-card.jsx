import {Link} from "react-router-dom";
import offerProperties from "../../proptypes/offer-properties";

const OfferCard = (props) => {

  const {id, isPremium, price, name, images, rating, type, onCardHover, onCardClick} = props;
  const FIRST_IMAGE = images[0];
  const MIN_RATING = 20;
  const getStars = (offerRating) => Math.round(offerRating) * MIN_RATING;

  return (
    <article className="cities__place-card place-card"
      // all attributes set here
      onMouseEnter={() => onCardHover(id)}
    >

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ``}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={FIRST_IMAGE} alt="Place image" width={260} height={200} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getStars(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name"

          onClick={() => onCardClick(id)}

        >

          <Link to={`/offer/${id}`} className={`place-card__name`}>
            {name}
          </Link>

        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = offerProperties;

OfferCard.propTypes = {
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferCard;
