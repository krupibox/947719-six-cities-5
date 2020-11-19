import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import Main from './main';
import {AuthorizationStatus} from "../../consts/authorization-status";
import {TestMock} from '../../test-mock/test-mock';

const mockStore = configureStore([]);

const store = mockStore({
  DATA: {
    offers: TestMock.offers,
    activeCity: TestMock.activeCity,
    cities: TestMock.cities,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authorizationInfo: {},
  }
});

describe(`<Main/>`, () => {
  it(`<Main/> should render correctly`, () => {
    const tree = renderer
            .create(
                <Provider store={store}>
                  <Router history={browserHistory}>
                    <Main />)
                  </Router>
                </Provider>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
