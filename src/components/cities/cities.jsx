import {connect} from 'react-redux';
import {updateCityAction} from '../../store/reducers/data';

// сюда импортируем функцию созданную при помощи createSelector и вставляем в maspStateToProps

const Cities = ({activeCity, offerCities, updateCity}) => {

  return offerCities ? offerCities.map((city, index) => (
    <li key={`${index}-${city}`} className="locations__item">
      <a className={`locations__item-link tabs__item ${city === activeCity && `tabs__item--active`}`} href="#"

        onClick={() => {
          updateCity(city);
        }}>

        <span>{city}</span>
      </a>
    </li>)) : <p>There are no cities</p>;
};

Cities.propTypes = {
  offerCities: PropTypes.array.isRequired,
  activeCity: PropTypes.string.isRequired,
  updateCity: PropTypes.func.isRequired
};

const mapStateToProps = ({DATA, _USER}) => ({
  activeCity: DATA.activeCity,
  offerCities: DATA.offerCities,
});

const mapDispatchToProps = (dispatch) => ({
  updateCity(city) {
    dispatch(updateCityAction(city));
  }
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Cities));
