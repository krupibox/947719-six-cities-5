import React from 'react';

import {ratings} from '../../consts/ratings';

const ReviewStars = ({handleFieldChange, status, rating}) => {

  const {pending} = status;

  return (<>
    <div className="reviews__rating-form form__rating">

      {ratings.map((index) => {
        return (
          <React.Fragment key={`star-${index}`}>
            <input
              className="form__rating-input visually-hidden"
              id={`${index}-stars`}
              name="rating"
              value={index}
              type="radio"
              checked={index === rating}
              onChange={handleFieldChange}
              disabled={pending}/>
            <label
              className="reviews__rating-label form__rating-label"
              htmlFor={`${index}-stars`}

              title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        );
      })}


      <input onChange={handleFieldChange} className="form__rating-input visually-hidden" name="rating" defaultValue={5} id="5-stars" type="radio" disabled={pending}/>
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>

    </div>
  </>);
};

ReviewStars.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  status: PropTypes.shape(PropTypes.bool.isRequired).isRequired,
};

export default React.memo(ReviewStars);
