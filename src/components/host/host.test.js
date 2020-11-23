import Host from './host';
import {TestMock} from '../../__mocks__/mocks';

describe(`<Host/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <Host
                  description={TestMock.offer.description}
                  {...TestMock.offer.host}
                />)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
