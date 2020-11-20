import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import {SignIn} from "./sign-in";
import {AuthorizationStatus} from "../../consts/authorization-status";

const mockStore = configureStore([]);

const noop = () => {};

describe(`<SignIn/>`, () => {

  it(`should render correctly with NO_AUTH`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authorizationInfo: {},
      }
    });
    const tree = renderer
              .create(
                  <Provider store={store}>
                    <Router history={browserHistory}>
                      <SignIn
                        goBack={noop}
                        onSubmit={noop}
                      />)
                    </Router>
                  </Provider>)
              .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly with AUTH`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authorizationInfo: {},
      }
    });
    const tree = renderer
              .create(
                  <Provider store={store}>
                    <Router history={browserHistory}>
                      <SignIn
                        goBack={noop}
                        onSubmit={noop}
                      />)
                    </Router>
                  </Provider>)
              .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
