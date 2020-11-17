import {Router} from 'react-router-dom';
import {TestMock} from '@root/test-mock/test-mock';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import {Favorites} from './favorites';
import {AuthorizationStatus} from "../../consts/authorization-status";

const mockStore = configureStore([]);

const store = mockStore({
  DATA: {
    favorites: [],
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authorizationInfo: {},
  }
});

describe(`<Favorites/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router
              history={browserHistory}
            >
              <Favorites
                favorites={TestMock.favorites}
                getFavorites={() => { }}
              />)
            </Router>
          </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
