import Reviews from '../reviews/reviews';

const ReviewsList = ({reviewMock}) => {

  const reviewsAmount = reviewMock.length > 0 ? reviewMock.length : 0;

  return (<>
  <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviewsAmount}</span></h2>
    <ul className="reviews__list">
      { reviewMock.map((review, index) => <Reviews key={`${index}-${review.comment.id}`} {...review}/>)}
    </ul>

  </>);
};

export default ReviewsList;
