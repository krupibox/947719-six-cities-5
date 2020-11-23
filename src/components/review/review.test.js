import {Review} from './review';
import {TestMock} from '../../__mocks__/mocks';

describe(`<Review/>: `, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Review {...TestMock.review}/>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
