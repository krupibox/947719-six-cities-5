import withForm from '../hoc/with-form.jsx';
import ReviewStars from './review-stars';

import {ReviewLimit} from '../../consts/review-limit';

const ReviewForm = ({rating, review, handleSubmit, handleFieldChange, pendingStatus}) => {

  return (<>
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <ReviewStars handleFieldChange={handleFieldChange}/>

      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" value={review}
        disabled={pendingStatus}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating || review.length < ReviewLimit.MIN_LENGTH
            || review.length > ReviewLimit.MAX_LENGTH || pendingStatus}>
              Submit</button>
      </div>
    </form>
  </>);
};

ReviewForm.propTypes = {
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
};

export default withForm(ReviewForm);

