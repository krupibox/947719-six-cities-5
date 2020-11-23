import {shallow} from 'enzyme';
import {OfferCard} from './offer-card';
import {AuthorizationStatus} from "../../consts/authorization-status";
import {TestMock} from '../../__mocks__/mocks';

describe(`<OfferCard/> events are correct: `, () => {
  const offer = TestMock.offer;

  it(`should return a string on onMouseEnter`, () => {
    const onCardHover = jest.fn(() => offer.id);

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          authorizationStatus={AuthorizationStatus.AUTH}
          onCardHover={onCardHover}
          onSetOfferId={() => {}}
          onFavoriteClick={() => {}}
          onSetOfferCoords={() => {}}
          nearby={false}
          favorite={false}
        />);

    offerCard.find(`article.place-card`).simulate(`mouseenter`);

    expect(onCardHover.mock.results[0].value).toEqual(offer.id);
  });

  it(`should favorite button be clicked`, () => {
    const onClick = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          authorizationStatus={AuthorizationStatus.AUTH}
          onCardHover={() => {}}
          onSetOfferId={() => {}}
          onFavoriteClick={onClick}
          onSetOfferCoords={() => {}}
          nearby={false}
          favorite={false}
        />);

    offerCard.find(`button.place-card__bookmark-button`).simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

});
