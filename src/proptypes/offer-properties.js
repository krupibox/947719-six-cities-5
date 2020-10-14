export default {
  id: PropTypes.number,
  city: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  name: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
};
