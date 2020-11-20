import MainEmpty from './main-empty';
import {TestMock} from '../../test-mock/test-mock';

describe(`<MainEmpty/>: `, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <MainEmpty activeCity={TestMock.activeCity}/>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
