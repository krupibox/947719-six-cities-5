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
        <Route path="/" exact>
          <Main
            offersMock = {offersMock}
            reviewsMock = {reviewsMock}
            numberOfPlaces = {numberOfPlaces}
          />
        </Route>
        <Route path="/login" exact><SignIn /></Route>
        <Route path="/favorites" exact><Favorites /></Route>
        <Route path="/offer/:id?" exact component={OfferDetails} />
        <Route
          render={() => (<>
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
            <Link to="/">Go to main page</Link>

          </>)}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offersMock: PropTypes.shape(offerProperties).isRequired,
  reviewsMock: PropTypes.shape(reviewProperties).isRequired,
  numberOfPlaces: PropTypes.string.isRequired,
};

export default App;
