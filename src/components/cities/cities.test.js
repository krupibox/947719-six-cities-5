import {Cities} from './cities';
import {TestMock} from '../../test-mock/test-mock';

describe(`<Cities/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Cities
                  activeCity={TestMock.activeCity}
                  cities={TestMock.cities}
                  onUpdateCity={() => { }}/>)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
