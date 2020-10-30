import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

import Main from '../main/main';
import SignIn from '../signin/signin';
import Favorites from '../favorites/favorites';
import OfferDetails from '../offer-details/offer-details';

import offerProperties from '../../proptypes/offer-properties';
import reviewProperties from '../../proptypes/review-properties';
import nearbyProperties from '../../proptypes/nearby-properties';

const App = ({offersMock, reviewsMock, nearbyMock}) => {

  const offerCities = offersMock.map((offer) => offer.city);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"
          render={({history}) => (
            <Main
              offerCities={offerCities}
              offersMock={offersMock}
              handleCardClick={(id) => history.push(`/offer/${id}`)}
            />
          )}
        />

        <Route exact path="/login"><SignIn /></Route>
        <Route exact path="/favorites"><Favorites /></Route>

        <Route exact path="/offer/:id?"
          render={(props) => {

            /* eslint-disable */
            const indexCard = offersMock.findIndex((element) => element.id === parseInt(props.match.params.id));
            /* eslint-enable */

            return (
              <OfferDetails
                offerMock={offersMock[indexCard]}
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
  offersMock: PropTypes.arrayOf(PropTypes.shape(offerProperties)).isRequired,
  reviewsMock: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(reviewProperties))).isRequired,
  nearbyMock: PropTypes.arrayOf(PropTypes.shape(nearbyProperties)).isRequired,
};

const mapStateToProps = (state) => state;

export {App}; // leave it here for testing purpose in future
export default connect(mapStateToProps)(App);
