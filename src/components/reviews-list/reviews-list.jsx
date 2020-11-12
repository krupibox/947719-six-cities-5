import Reviews from '../reviews/reviews';
import reviewProperties from "../../proptypes/review-properties";

import reviewMock from '../../mocks/review-mock';

const ReviewsList = ({reviews}) => {

  const reviewsAmount = reviews.length > 0 ? reviews.length : 0;

  return (<>
  <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviewsAmount}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review, index) => <Reviews key={`${index}-${review.id}`} {...review}/>)}
    </ul>
  </>);
};

ReviewsList.defaultProps = reviewMock;

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProperties))
};

export default React.memo(ReviewsList);
