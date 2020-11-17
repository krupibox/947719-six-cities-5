import {Router} from 'react-router-dom';
import OfferCard from './offer-card';
import {TestMock} from '@root/test-mock/test-mock';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";

import {AuthorizationStatus} from "../../consts/authorization-status";

const mockStore = configureStore([]);

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  }
});

const noop = () => {};

describe(`<OfferCard/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Provider store={store}>
                  <Router
                    history={browserHistory}
                  >
                    <OfferCard
                      nearby={false}
                      favorite={false}
                      offer={TestMock.offer}
                      onCardHover={noop}
                      onFavoriteClick={noop}
                      onSetOfferId={noop}
                      onSetOfferCoords={noop}
                    />)
                  </Router>
                </Provider>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
