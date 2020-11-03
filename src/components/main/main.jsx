import {connect} from 'react-redux';

import Header from '../header/header';
import Cities from '../cities/cities';
import OffersSorting from '../offers-sorting/offers-sorting';
import OfferList from '../offers-list/offer-list';
import Map from '../map/map';

import MainEmpty from '../main-empty/main-empty';

import withActiveCoords from '../hoc/with-active-coords';

import offerProperties from "../../proptypes/offer-properties";

const Main = ({offers, activeCoords, handleCardClick, handleCardHover, handleTypeClick, activeCity, sortingType}) => {

  const offerPlaces = offers.filter((offer) => offer.city.name === activeCity);

  const cityCenterCoords = {
    latitude: offerPlaces[0].city.location.latitude,
    longitude: offerPlaces[0].city.location.longitude,
    zoom: offerPlaces[0].city.location.zoom
  };

  const offerCoords = offerPlaces.map((offer) => [
    offer.location.latitude,
    offer.location.longitude,
    offer.location.zoom
  ]);

  return (
    <div className="page page--gray page--main">

      <Header isSignIn={false} />

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
          <div className={`cities__places-container${offerPlaces.length > 0 ? `` : ` cities__places-container--empty`} container`}>
            {
              offerPlaces.length > 0 ?
                <section className={`${offerPlaces.length > 0 ? `cities__places places` : `cities__no-places`}`}>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offerPlaces.length} places to stay in {activeCity}</b>

                  <OffersSorting handleTypeClick={handleTypeClick} sortingType={sortingType} />

                  <div className="cities__places-list places__list tabs__content">

                    <OfferList
                      offers={offerPlaces}
                      sortingType={sortingType}
                      handleCardHover={handleCardHover}
                      handleCardClick={handleCardClick}
                      nearby={false}
                    />

                  </div>
                </section>
                : <MainEmpty activeCity={activeCity} />
            }
            <div className="cities__right-section">
              {
                offerPlaces.length > 0 &&
                <section className="cities__map map">

                  <Map
                    offerCoords={offerCoords}
                    cityCenterCoords={cityCenterCoords}
                    activeCoords={activeCoords}
                    handleCardHover={handleCardHover}
                  />

                </section>
              }
            </div>
          </div>
        </div>
      </main></div>
  );

};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  activeCoords: PropTypes.array.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleTypeClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  sortingType: PropTypes.string.isRequired,
};

const mapStateToProps = ({DATA, _USER}) => ({
  activeCity: DATA.activeCity
});

export default connect(mapStateToProps)(withActiveCoords(Main));
