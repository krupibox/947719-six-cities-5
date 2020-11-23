import ReviewsList from './reviews-list';
import {TestMock} from '../../__mocks__/mocks';

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
