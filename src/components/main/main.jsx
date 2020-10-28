import {PureComponent} from "react";
import Header from '../header/header';
import Cities from '../cities/cities';
import OfferList from '../offers-list/offer-list';
import Map from '../map/map';

import offerProperties from "../../proptypes/offer-properties";

class Main extends PureComponent {

  constructor(props) {
    super(props);
    this._offersMock = props.offersMock;
    this._handleCardHover = props.handleCardHover;
    this.handleCardHover = this.handleCardHover.bind(this);

    this.state = {
      activeCoords: [0, 0],
    };

  }

  handleCardHover(value) {
    this.setState({activeCoords: value});
  }

  render() {

    const offerCoords = this._offersMock.map((offer) => offer.coordinates);
    const offerCities = this._offersMock.map((offer) => offer.city);
    const numberOfPlaces = this._offersMock.filter((offer) => offer.city === `Paris`);

    return (<>
      <div className="page page--gray page--main">

        <Header isSignIn={true}/>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">

                <Cities cities={offerCities}/>

              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{numberOfPlaces.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                  {/*
                <select class="places__sorting-type" id="places-sorting">
                  <option class="places__option" value="popular" selected="">Popular</option>
                  <option class="places__option" value="to-high">Price: low to high</option>
                  <option class="places__option" value="to-low">Price: high to low</option>
                  <option class="places__option" value="top-rated">Top rated first</option>
                </select>
                */}
                </form>
                <div className="cities__places-list places__list tabs__content">

                  <OfferList
                    offersMock={this._offersMock}
                    handleCardHover={this._handleCardHover}
                    handleCardClick={this._handleCardClick}
                    nearby={false}
                  />

                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">

                  <Map
                    offerCoords={offerCoords}
                    handleCardHover={this._handleCardHover}
                    activeCoords={this.state.activeCoords}
                  />

                </section>
              </div>
            </div>
          </div>
        </main>
      </div>    </>);


  }
}

Main.propTypes = {
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  numberOfPlaces: PropTypes.string.isRequired,
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Main;
