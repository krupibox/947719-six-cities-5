import {ActionType} from './data-actions';
import {dataReducer} from './data-reducer';
import {TestMock} from '../../../__mocks__/mocks';

const {offer, offers, favorites, cities, activeCity} = TestMock;
const {id: activeOfferId, location: activeCoords} = offer;

describe(`Data reducer work correctly`, () => {
  it(`Reducer return initial state`, () => {
    expect(dataReducer(void 0, {})).toEqual({
      offers: [],
      favorites: [],
      cities: [],
      activeCity: ``,
      activeOfferId: ``,
      activeCoords: {}
    });
  });

  it(`Reducer should update offers by load offers`, () => {
    expect(dataReducer({
      offers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      offers,
    });
  });

  it(`Reducer should update favorites by load favorites`, () => {
    expect(dataReducer({
      favorites: [],
    }, {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    })).toEqual({
      favorites,
    });
  });

  it(`Reducer should update cities by get cities`, () => {
    expect(dataReducer({
      cities: [],
    }, {
      type: ActionType.GET_CITIES,
      payload: cities,
    })).toEqual({
      cities,
    });
  });

  it(`Reducer should update activeCity by update activeCity`, () => {
    expect(dataReducer({
      activeCity: ``,
    }, {
      type: ActionType.UPDATE_ACTIVE_CITY,
      payload: activeCity,
    })).toEqual({
      activeCity,
    });
  });

  it(`Reducer should update activeOfferId by set activeOfferId`, () => {
    expect(dataReducer({
      activeOfferId: ``,
    }, {
      type: ActionType.SET_ACTIVE_OFFER_ID,
      payload: activeOfferId,
    })).toEqual({
      activeOfferId,
    });
  });

  it(`Reducer should update activeCoords by set activeCoords`, () => {
    expect(dataReducer({
      activeCoords: ``,
    }, {
      type: ActionType.SET_ACTIVE_OFFER_COORDS,
      payload: activeCoords,
    })).toEqual({
      activeCoords,
    });
  });
});

