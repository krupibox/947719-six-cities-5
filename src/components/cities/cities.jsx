import {connect} from 'react-redux';
import {updateCityAction} from '../../store/reducers/data';

const Cities = ({activeCity, cities, onUpdateCity}) => {

  return cities ? cities.map((city, index) => (
    <li key={`${index}-${city}`} className="locations__item">
      <a
        className={`locations__item-link tabs__item ${city === activeCity && `tabs__item--active`}`} href="#"
        onClick={() => onUpdateCity(city)}
      >
        <span>{city}</span>
      </a>
    </li>)) : <p>There are no cities</p>;
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeCity: PropTypes.string.isRequired,
  onUpdateCity: PropTypes.func.isRequired
};

const mapStateToProps = ({DATA, _USER}) => ({
  activeCity: DATA.activeCity,
  cities: DATA.cities,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateCity(city) {
    dispatch(updateCityAction(city));
  }
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Cities));
