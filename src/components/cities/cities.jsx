import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const Cities = ({cities, updateCity}) => {

  const MAX_CITIES = 6;

  return cities.slice(0, MAX_CITIES).map((city, index) => (
    <li key={`${index}-${city}`} className="locations__item">
      <a className="locations__item-link tabs__item" href="#"

        onClick = {() => updateCity(city)}>

        <span>{city}</span>
      </a>
    </li>)
  );
};

Cities.propTypes = {cities: PropTypes.array.isRequired};

const mapStateToProps = (state) => ({
  cities: state.cities
});

const mapDispatchToProps = (dispatch) => ({
  updateCity(city) {
    dispatch(ActionCreator.updateCity(city));
  }
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Cities));
