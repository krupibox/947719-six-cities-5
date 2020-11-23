import {shallow} from 'enzyme';
import {Cities} from './cities';
import {TestMock} from '../../__mocks__/mocks';

describe(`<City/> link works correct`, () => {
  it(`Should city link be pressed`, () => {
    const handleCityClick = jest.fn();

    const cities = shallow(
        <Cities
          activeCity={TestMock.activeCity}
          cities={TestMock.firstCity}
          onUpdateCity={handleCityClick}
        />
    );

    const cityLink = cities.find(`a.locations__item-link`);
    cityLink.simulate(`click`);

    expect(handleCityClick).toHaveBeenCalledTimes(1);
  });
});

