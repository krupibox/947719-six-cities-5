/* eslint-disable */

export default {
  id: PropTypes.number.isRequired,
  city: PropTypes.object.isRequired,
  preview_image: PropTypes.string.isRequired,
  // preview_image: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  isPremium: PropTypes.bool,
};
