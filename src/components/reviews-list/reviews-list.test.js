import ReviewsList from './reviews-list';
import {TestMock} from '../../test-mock/test-mock';

describe(`<ReviewsList/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <ReviewsList
                  reviews={TestMock.reviews}
                />)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
