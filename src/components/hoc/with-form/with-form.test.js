import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import withForm from './with-form';
import {RequestStatus} from '../../../consts/request-status';

const mockStore = configureStore([]);

const store = mockStore({
  REQUEST: {
    status: RequestStatus.SUCCESS,
  }
});

describe(`<withForm/>: `, () => {

  const MockComponent = () => (
    <div/>
  );

  const MockWrapper = withForm(MockComponent);

  it(`should render correctly`, () => {
    const wrapper = renderer
      .create(
          <Provider store={store}>
            <MockWrapper
              offerId={`1`}
            />
          </Provider>)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
