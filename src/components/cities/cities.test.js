import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import browserHistory from "../../browser-history";
import Cities from './cities';
import {TestMock} from '../../__mocks__/mocks';

const mockStore = configureStore([]);

const store = mockStore({
  DATA: {
    activeCity: TestMock.activeCity,
    cities: TestMock.cities,
  }
});

describe(`<Cities/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Provider store={store}>
                  <Router history={browserHistory}>
                    <Cities
                      onUpdateCity={() => { }}/>)
                  </Router>
                </Provider>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
