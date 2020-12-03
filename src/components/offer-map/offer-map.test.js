import OfferMap from './offer-map';
import {TestMock} from '@root/__mocks__/mocks';

describe(`<OfferMap/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <OfferMap
            offersCoords={TestMock.offersCoords}
            cityCoords={TestMock.cityCoords}
            currentCoords={TestMock.offer.city.location}
          />,
          {
            createNodeMock: () => { }
          })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
