import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Cities} from './cities';
import {TestMock} from '../../test-mock/test-mock';

const mockStore = configureStore([]);

const store = mockStore({
  DATA: {
    cities: [],
    activeCity: ``,
  }
});

describe(`<Cities/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Provider store={store}>
                  <Cities
                    activeCity={`Cologne`}
                    cities={TestMock.cities}
                    onUpdateCity={() => { }}
                  />)
                </Provider>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
