import {Route, Switch, Link, Router as BrowserRouter} from 'react-router-dom';

import Main from '../main/main';
import SignIn from '../signin/signin';
import Favorites from '../favorites/favorites';
import OfferDetails from '../offer-details/offer-details';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history"; // send history as prop to router

import AppRoute from "../../consts/app-route";

const App = () => {

  return (
    // now we can recieve browserHistory as prop in components
    <BrowserRouter history={browserHistory}>
      <Switch>

        <Route exact path={AppRoute.ROOT}
          render={() => (<Main />)}>
        </Route>

        <PrivateRoute exact path={AppRoute.LOGIN}
          render={() => (<SignIn />)}>
        </PrivateRoute>

        <Route exact path={`${AppRoute.OFFER}/:id?`}
          render={({match: {params: {id}}}) => (<OfferDetails offerId={id} />)}>
        </Route>

        <Route exact path={AppRoute.FAVORITES}><Favorites />
        </Route>

        <Route render={() => (<>
          <h1>404</h1><p>Page not found</p>
          <Link to="/">Go to main page</Link>
        </>)}>
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default App;
