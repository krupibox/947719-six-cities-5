import {Review} from './review';
import {TestMock} from '../../test-mock/test-mock';

describe(`<Review/>: `, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Review
            {...TestMock.review}
          />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
