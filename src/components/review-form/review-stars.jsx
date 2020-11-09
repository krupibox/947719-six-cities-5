import React from 'react';

import {ratings} from '../../consts/ratings';

const ReviewStars = ({handleFieldChange, rating, status}) => {

  const {pending} = status;

  return (<div className="reviews__rating-form form__rating">

    {ratings.map((index) => (
      <React.Fragment key={`star-${index}`}>
        <input
          className="form__rating-input visually-hidden"
          id={`${index}-stars`}
          name="rating"
          defaultValue={index}
          type="radio"
          checked={index === rating}
          disabled={pending}
          onChange={handleFieldChange}
        />
        <label
          className="reviews__rating-label form__rating-label"
          htmlFor={`${index}-stars`}

          title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>
    ))
    }
  </div>);
};

ReviewStars.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  status: PropTypes.shape(PropTypes.bool.isRequired).isRequired,
  rating: PropTypes.string.isRequired,
};

export default React.memo(ReviewStars);
