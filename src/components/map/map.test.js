import Map from './map';
import {TestMock} from '../../__mocks__/mocks';

describe(`<Map/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Map
            cityCenterCoords={TestMock.offer.city.location}
            offerCoords={TestMock.offer.coordinates}
            currentCoords={TestMock.offer.city.location}
          />,
          {
            createNodeMock: () => { }
          })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
