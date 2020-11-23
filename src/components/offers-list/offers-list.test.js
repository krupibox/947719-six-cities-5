import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import OffersList from './offers-list';
import {AuthorizationStatus} from "../../consts/authorization-status";
import {TestMock} from '../../__mocks__/mocks';

const mockStore = configureStore([]);

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authorizationInfo: {},
  }
});

describe(`<OfferList/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Provider store={store}>
                  <Router
                    history={browserHistory}
                  >
                    <OffersList
                      offers={TestMock.offers}
                      nearby={false}
                      favorite={false}
                      onCardHover={() => {}}
                    />)
                  </Router>
                </Provider>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
