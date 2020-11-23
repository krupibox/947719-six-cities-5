import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import {Favorites} from './favorites';
import {AuthorizationStatus} from "../../consts/authorization-status";
import {TestMock} from '../../__mocks__/mocks';

const mockStore = configureStore([]);

describe(`<Favorites/>`, () => {

  it(`should render correctly without favorites`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authorizationInfo: {email: `Oliver.conner@gmail.com`},
      },
      DATA: {
        favorites: TestMock.favorites
      }
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={browserHistory}>
              <Favorites
                favorites={{}}
                getFavorites={() => { }}
              />)
            </Router>
          </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly with favorites`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authorizationInfo: {email: `Oliver.conner@gmail.com`},
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={browserHistory}>
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
