export default {
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    name: PropTypes.string,
    isPro: PropTypes.bool,
  }.isRequired),

  comment: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.number,
  }.isRequired),
};
