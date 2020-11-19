import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import ReviewForm from './review-form';
import {RequestStatus} from '../../consts/request-status';

const mockStore = configureStore([]);

const store = mockStore({
  REQUEST: {
    status: RequestStatus.SUCCESS,
  }
});

describe(`<ReviewForm/>: `, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <ReviewForm
              offerId={`1`}
            />
          </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
