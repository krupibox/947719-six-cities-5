const cityProperties = {
  name: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default {
  city: PropTypes.shape(cityProperties).isRequired,
  previewImage: PropTypes.string.isRequired.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  isPremium: PropTypes.bool,
};
