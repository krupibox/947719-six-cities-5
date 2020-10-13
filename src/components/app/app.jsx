import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Main from '../main/main';
import SignIn from '../signin/signin';
import Favorites from '../favorites/favorites';
import Room from '../room/room';

const App = ({numberOfPlaces}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Main numberOfPlaces={numberOfPlaces}/></Route>
        <Route path="/login" exact><SignIn /></Route>
        <Route path="/favorites" exact><Favorites /></Route>
        <Route path="/offer/:id?" exact component={Room} />
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
  numberOfPlaces: PropTypes.string.isRequired,
};

export default App;
