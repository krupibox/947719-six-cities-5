const cityProperties = {
  name: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

const hostProperties = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isPro: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default {
  city: PropTypes.shape(cityProperties).isRequired,
  previewImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  host: PropTypes.shape(hostProperties).isRequired,
  isPremium: PropTypes.bool,
};
