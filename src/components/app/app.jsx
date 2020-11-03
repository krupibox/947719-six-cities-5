import {Route, Router as BrowserRouter, Switch, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import Main from '../main/main';
import SignIn from '../signin/signin';
import Favorites from '../favorites/favorites';
import OfferDetails from '../offer-details/offer-details';
// import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";

import AppRoute from "../../consts/app-route";

import offerProperties from '../../proptypes/offer-properties';
import reviewProperties from '../../proptypes/review-properties';
import nearbyProperties from '../../proptypes/nearby-properties';

const App = (props) => {

  const {offers, reviewsMock, nearbyMock} = props;

  return (
    // now we can recieve browserHistory as prop in component
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={({history}) => (
            <Main
              offers={offers}
              handleCardClick={(id) => history.push(`/offer/${id}`)}
            />
          )}
        />

        <Route exact path="/login"><SignIn /></Route>

        <Route exact path="/favorites"><Favorites /></Route>

        <Route exact path="/offer/:id?"
          render={(propz) => {

            /* eslint-disable */
            const getOfferIndex = (offers) => offers.findIndex((element) => element.id === parseInt(propz.match.params.id));
            /* eslint-enable */

            return (
              <OfferDetails
                offer={offers[getOfferIndex(offers)]}
                reviewMock={reviewsMock[0]}
                nearbyMock={nearbyMock}

                handleCardHover={(id) => {
                  /* eslint-disable */
                  console.log(id)
                  /* eslint-enable */
                }}
                handleCardClick={(id) => history.push(`/offer/${id}`)}
              />
            );
          }}
        />

        <Route
          render={() => (<>
            <h1>404</h1>
            <p>Page not found</p>

            <Link to="/">Go to main page</Link>

          </>)}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  reviewsMock: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(reviewProperties))).isRequired,
  nearbyMock: PropTypes.arrayOf(PropTypes.shape(nearbyProperties)).isRequired,
};

const mapStateToProps = ({DATA, USER}) => ({
  offers: DATA.offers,
  reviewsMock: DATA.reviewsMock,
  nearbyMock: DATA.nearbyMock,
  authorizationStatus: USER.authorizationStatus,
});

export {App}; // leave it here for testing purpose in future
export default connect(mapStateToProps)(App);
