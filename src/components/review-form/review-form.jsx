import withForm from '../hoc/with-form.jsx';
import ReviewStars from './review-stars';

import {ReviewLimit} from '../../consts/review-limit';

const ReviewForm = ({rating, review, onSubmit, onFieldChange, status}) => {

  const {pending, failure} = status;

  return (<>
    <form
      className={`reviews__form${failure ? ` reviews__form--error` : ``} form`}
      action="#"
      method="post"
      onSubmit={onSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <ReviewStars onFieldChange={onFieldChange} status={status} rating={rating}/>

      <textarea
        onChange={onFieldChange}
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" value={review}
        disabled={pending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating || review.length < ReviewLimit.MIN_LENGTH
            || review.length > ReviewLimit.MAX_LENGTH || pending}>
              Submit</button>
      </div>
    </form>
  </>);
};

ReviewForm.propTypes = {
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  status: PropTypes.shape(PropTypes.bool.isRequired).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default withForm(ReviewForm);

