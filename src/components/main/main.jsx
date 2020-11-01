import {connect} from 'react-redux';
// import {ActionCreator} from '../../store/action';

import Header from '../header/header';
import Cities from '../cities/cities';
import OffersSorting from '../offers-sorting/offers-sorting';
import OfferList from '../offers-list/offer-list';
import Map from '../map/map';

import {withActiveCoords} from '../hoc/with-active-coords';

import offerProperties from "../../proptypes/offer-properties";

const Main = ({offersMock, activeCoords, handleCardClick, handleCardHover, handleTypeClick, activeCity, sortingType}) => {

  const offerPlaces = offersMock.filter((offer) => offer.city === activeCity);
  const offerCoords = offerPlaces.map((offer) => offer.coordinates);

  return (
    <div className="page page--gray page--main">

      <Header isSignIn={true}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">

              <Cities />

            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerPlaces.length} places to stay in {activeCity}</b>

              <OffersSorting handleTypeClick={handleTypeClick} sortingType={sortingType}/>

              <div className="cities__places-list places__list tabs__content">

                <OfferList
                  offersMock={offerPlaces}
                  sortingType={sortingType}
                  handleCardHover={handleCardHover}
                  handleCardClick={handleCardClick}
                  nearby={false}
                />

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                <Map
                  offerCoords={offerCoords}
                  activeCoords={activeCoords}
                  handleCardHover={handleCardHover}
                />

              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

};

Main.propTypes = {
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  activeCoords: PropTypes.array.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardHover: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity
});

export default connect(mapStateToProps)(withActiveCoords(Main));
