import OfferMap from './offer-map';
import {TestMock} from '../../__mocks__/mocks';

describe(`<OfferMap/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <OfferMap
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
