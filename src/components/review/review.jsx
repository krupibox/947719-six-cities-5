import {getStars} from '../../utils/get-stars';
import {getFormatDate} from '../../utils/get-format-date';

import reviewProperties from "../../proptypes/review-properties";

const Review = ({user: {avatar_url: avatarUrl, name}, comment: text, date, rating}) => {

  return (<>
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} alt="Reviews avatar" width={54} height={54} />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getStars(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{getFormatDate(date)}</time>
      </div>
    </li>
  </>);
};

Review.propTypes = PropTypes.arrayOf(reviewProperties).isRequired;

export {Review};
export default Review;
