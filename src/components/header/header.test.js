import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import Header from './header';
import {AuthorizationStatus} from "../../consts/authorization-status";

const mockStore = configureStore([]);

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authorizationInfo: {},
  }
});

describe(`<Header/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Provider store={store}>
                  <Router
                    history={browserHistory}
                  >
                    <Header/>)
                  </Router>
                </Provider>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
