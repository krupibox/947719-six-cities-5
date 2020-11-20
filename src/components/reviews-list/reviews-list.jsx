import Review from '../review/review';
import reviewProperties from "../../proptypes/review-properties";

const ReviewsList = ({reviews}) => {

  const reviewsAmount = reviews.length > 0 ? reviews.length : 0;

  return (<>
  <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviewsAmount}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review, index) => <Review key={`${index}-${review.id}`} {...review}/>)}
    </ul>
  </>);
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProperties))
};

export default React.memo(ReviewsList);
