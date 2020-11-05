import {Route, Router as BrowserRouter, Switch, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import Main from '../main/main';
import SignIn from '../signin/signin';
import Favorites from '../favorites/favorites';
import OfferDetails from '../offer-details/offer-details';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";

import AppRoute from "../../consts/app-route";
import AuthorizationStatus from "../../consts/authorization-status";

import offerProperties from '../../proptypes/offer-properties';
import reviewProperties from '../../proptypes/review-properties';
import nearbyProperties from '../../proptypes/nearby-properties';

const App = ({offers, authorizationStatus}) => {

  return (
    // now we can recieve browserHistory as prop in component
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={({history}) => (
            <Main
              offers={offers}
              // handleCardClick={(id) => history.push(`/offer/${id}`)}
            />
          )}
        />

        <PrivateRoute exact to={AppRoute.ROOT}
          path={AppRoute.LOGIN}
          require={authorizationStatus === AuthorizationStatus.NO_AUTH}
          render={() => (
            <SignIn
              goBack={history.goBack}
            />
          )}
        >
        </PrivateRoute>

        <Route exact path={AppRoute.FAVORITES}><Favorites /></Route>

        <Route exact path="/offer/:id?"
          render={({match: {params: {id}}}) => {

            return (
              <OfferDetails
                offerId={id}
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
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = ({DATA, USER}) => ({
  offers: DATA.offers,
  authorizationStatus: USER.authorizationStatus,
  authorizationEmail: USER.authorizationEmail,
});

export {App}; // leave it here for testing purpose in future
export default connect(mapStateToProps)(App);
