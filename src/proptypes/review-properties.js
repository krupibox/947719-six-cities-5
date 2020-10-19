export default {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),

  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
  }),
};
