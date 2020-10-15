import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Main from '../main/main';
import SignIn from '../signin/signin';
import Favorites from '../favorites/favorites';
import OfferDetails from '../offer-details/offer-details';

import offerProperties from "../../proptypes/offer-properties";
import reviewProperties from "../../proptypes/review-properties";

const App = ({offersMock, reviewsMock, numberOfPlaces}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact
          render={({history}) => (
            <Main
              offersMock={offersMock}
              numberOfPlaces={numberOfPlaces}
              onCardClick={() => history.push(`/offer/`)}
            />
          )}
        />
        <Route path="/login" exact><SignIn /></Route>
        <Route path="/favorites" exact><Favorites /></Route>
        <Route path="/offer/:id?" exact><OfferDetails offerMock={offersMock[0]} reviewMock={reviewsMock[0]}/></Route>
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
  numberOfPlaces: PropTypes.string.isRequired,
};

export default App;
