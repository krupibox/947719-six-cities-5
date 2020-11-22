import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./services/api";
import App from './components/app/app';
import rootReducer from "./store/reducers/root-reducer";
import {requireAuthorization} from "./store/reducers/user";
import {AuthorizationStatus} from "./consts/authorization-status";
import {fetchOffersList} from "./store/reducers/data";
import {checkAuth} from "./store/reducers/user";
import {redirect} from "./store/middlewares/redirect";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)) // init and send NO_AUTH
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

Promise.all([
  store.dispatch(fetchOffersList()),
  store.dispatch(checkAuth()),
])
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />,
      </Provider>,
      document.getElementById(`root`)
  );
});
