import {connect} from 'react-redux';
import Header from '../header/header';
import Cities from '../cities/cities';
import OffersSorting from '../offers-sorting/offers-sorting';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import MainEmpty from '../main-empty/main-empty';
import withActiveCoords from '../hocs/with-active-coords';
import {getCoordinates} from '../../utils/get-coordinates';
import {selectOffersByCity} from '../../store/selectors';
import offerMock from '../../mocks/offer-mock';
import offerProperties from "../../proptypes/offer-properties";

const Main = ({offers, activeCoords, onCardHover, onTypeClick, activeCity, sortingType}) => {

  return (
    <div className="page page--gray page--main">

      <Header />

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
          <div className={`cities__places-container${offers.length > 0 ? `` : ` cities__places-container--empty`} container`}>
            {
              offers.length > 0 ?
                <section className={`${offers.length > 0 ? `cities__places places` : `cities__no-places`}`}>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {activeCity}</b>

                  <OffersSorting onTypeClick={onTypeClick} sortingType={sortingType} />

                  <div className="cities__places-list places__list tabs__content">

                    <OffersList
                      offers={offers}
                      sortingType={sortingType}
                      onCardHover={onCardHover}
                      nearby={false}
                      favorite={false}
                    />

                  </div>
                </section>
                : <MainEmpty activeCity={activeCity} />
            }
            <div className="cities__right-section">
              {
                offers.length > 0 &&
                <section className="cities__map map">

                  <Map
                    offerCoords={getCoordinates(offers).places}
                    cityCenterCoords={getCoordinates(offers).cityCenter}
                    activeCoords={activeCoords}
                    currentCoords = {null}
                    onCardHover={onCardHover}
                  />

                </section>
              }
            </div>
          </div>
        </div>
      </main></div>
  );

};

Main.defaultProps = {
  offer: offerMock,
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  activeCoords: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.oneOf([null]).isRequired]),
  onCardHover: PropTypes.func.isRequired,
  onTypeClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  sortingType: PropTypes.string.isRequired,
};

const mapStateToProps = ({DATA}) => ({
  activeCity: DATA.activeCity,
  offers: selectOffersByCity(DATA),
});

export {Main};
export default connect(mapStateToProps)(withActiveCoords(Main));
