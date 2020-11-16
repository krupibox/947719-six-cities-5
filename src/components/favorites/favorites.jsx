import {PureComponent} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Header from '../header/header';
import OfferCard from '../offer-card/offer-card';
import {fetchFavorites} from "../../store/reducers/data";
import {selectFavoritesByCity} from '../../store/selectors';
import {AppRoute} from '../../consts/app-route';

class Favorites extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFavorites();
  }

  render() {

    const {favorites} = this.props;
    const isFavorite = Object.keys(favorites).length === 0;

    return (
      <div className={`page ${isFavorite ? `page--favorites-empty` : ``}`}>

        <Header isSignIn={true} />

        <main className={`page__main page__main--favorites ${isFavorite && `page__main--favorites--empty`}`}>
          <div className="page__favorites-container container">

            <section className={`favorites ${isFavorite ? `favorites--empty` : ``}`}>
              {isFavorite ? <h1 className="visually-hidden">Favorites (empty)</h1> : <h1 className="favorites__title">Saved listing</h1>}
              {
                isFavorite ?
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
                  </div> :
                  <ul className="favorites__list">
                    {Object.entries(favorites).map(([city, offers]) => {
                      return (
                        <li className="favorites__locations-items" key={city}>
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{city}</span>
                              </a>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {offers.map((offer, index) =>
                              <OfferCard
                                key={`${index}-${offer.id}`}
                                offer={offer}
                                onCardHover={() => { }}
                                favorite={true}
                              />
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
              }
            </section>

          </div>
        </main>
        <footer className="footer container">

          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>

        </footer>
      </div>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.object.isRequired,
  getFavorites: PropTypes.func.isRequired
};

const mapStateToProps = ({DATA}) => ({
  favorites: selectFavoritesByCity(DATA),
});

const mapDispatchToProps = (dispatch) => ({
  getFavorites() {
    dispatch(fetchFavorites());
  }
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
