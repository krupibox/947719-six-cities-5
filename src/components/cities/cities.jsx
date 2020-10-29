const Cities = ({cities}) => {

  const MAX_CITIES = 6;

  return cities.slice(0, MAX_CITIES).map((city, index) => (
    <li key={`${index}-${city}`} className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
    </li>)
  );
};

Cities.propTypes = {cities: PropTypes.array.isRequired};

export default React.memo(Cities);
