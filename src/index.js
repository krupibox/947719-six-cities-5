import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createAPI} from "./services/api";
import App from './components/app/app';
import rootReducer from "./store/reducers/root-reducer";
import {AuthorizationStatus} from './consts/authorization-status';
import {fetchOffersList} from './store/reducers/data/data-operations';
import {requireAuthorization} from './store/reducers/user/user-actions';
import {checkAuth} from './store/reducers/user/user-operations';
import {redirect} from './store/middlewares/redirect';

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
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
