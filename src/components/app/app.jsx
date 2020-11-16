import {Route, Switch, Link, Router as BrowserRouter} from 'react-router-dom';

import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import OfferDetails from '../offer-details/offer-details';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";

import {AppRoute} from "../../consts/app-route";

const App = () => {

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>

        <Route exact path={AppRoute.ROOT}
          render={() => (<Main />)}>
        </Route>

        <Route exact path={AppRoute.LOGIN}
          render={({history}) => (<SignIn goBack={history.goBack}/>)}>
        </Route>

        <Route exact path={`${AppRoute.OFFER}/:id`}
          render={({match: {params: {id}}}) => (<OfferDetails offerId={id} />)}>
        </Route>

        <PrivateRoute exact path={AppRoute.FAVORITES}
          render={() => (<Favorites />)}>
        </PrivateRoute>

        <Route render={() => (<>
          <h1>404</h1><p>Page not found</p>
          <Link to="/"><b>Go to main page</b></Link>
        </>)}>
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default App;
