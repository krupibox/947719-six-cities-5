const MIN_RATING = 20;
export const getStars = (offerRating) => Math.round(offerRating) * MIN_RATING;
