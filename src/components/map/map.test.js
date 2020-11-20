import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import Map from './map';
// import {AuthorizationStatus} from "../../consts/authorization-status";
// import {RequestStatus} from '../../consts/request-status';
import {TestMock} from '../../test-mock/test-mock';

const mockStore = configureStore([]);

const store = mockStore({
  // USER: {
  //   authorizationStatus: AuthorizationStatus.AUTH,
  //   authorizationInfo: {email: `Oliver.conner@gmail.com`},
  // },
  // REQUEST: {
  //   status: RequestStatus.SUCCESS,
  // }
});

// const noop = () => {};

describe(`<OfferDetails/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={browserHistory}>
              <Map
                cityCenterCoords={TestMock.offer.city.location}
                offerCoords={[0, 0]}
              />
            </Router>
          </Provider>,
          {
            createNodeMock: () => { }
          })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
