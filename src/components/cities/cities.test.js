import {Cities} from './cities';
import {TestMock} from '@root/test-mock/test-mock';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const store = mockStore({
  DATA: {
    cities: [],
    activeCity: ``,
  }
});

describe(`<Cities/>`, () => {
  it(`Cities should render correctly`, () => {
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
