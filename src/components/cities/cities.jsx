import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const Cities = ({activeCity, offerCities, updateCity}) => {

  const MAX_CITIES = 6;

  return offerCities ? offerCities.slice(0, MAX_CITIES).map((city, index) => (
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

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offerCities: state.offerCities
});

const mapDispatchToProps = (dispatch) => ({
  updateCity(city) {
    dispatch(ActionCreator.updateCity(city));
  }
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Cities));
