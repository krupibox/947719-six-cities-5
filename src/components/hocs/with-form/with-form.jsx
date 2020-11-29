import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RequestStatus} from '@root/consts';
import {setRequestAction} from '@root/store/reducers/request/request-actions';
import {postReview} from '@root/store/reducers/data/data-operations';

export const withForm = (Component) => (props) => {

  const [rating, setRating] = useState(``);
  const [review, setReview] = useState(``);

  const requestStatus = useSelector(({REQUEST}) => ({
    requestStatus: REQUEST.status,
  }));

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const {offerId} = props;

    dispatch(postReview({
      review,
      rating: parseInt(rating, 10),
      offerId
    }));
    dispatch(setRequestAction({status: RequestStatus.INITIAL}));

    handleFormClear();
  };

  const handleFieldChange = (evt) => {
    switch (evt.target.name) {
      case `rating`:
        setRating(evt.target.value);
        break;
      case `review`:
        setReview(evt.target.value);
        break;
    }
  };

  const handleFormClear = () => {
    setRating(``);
    setReview(``);
  };

  const statusPending = requestStatus === RequestStatus.PENDING;
  const statusFailure = requestStatus === RequestStatus.FAILURE;

  return (
    <Component
      {...props}
      rating={rating}
      review={review}
      status={{pending: statusPending, failure: statusFailure}}
      onSubmit={handleSubmit}
      onFieldChange={handleFieldChange}
    />
  );
};

export default withForm;
