import {OfferCard} from './offer-card';
import {shallow} from 'enzyme';
import {AuthorizationStatus} from "../../consts/authorization-status";
import {TestMock} from '../../test-mock/test-mock';

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

  // onClick={() => onFavoriteClick(offerId, isFavorite, nearby)}

  it(`should favorite button be clicked`, () => {
    const onClick = jest.fn(() => offer.id);
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

  // it(`MOUSELEAVE should return null`, () => {
  //   onChangerOfferCoordinate = jest.fn(() => null);
  //   const placeCard = shallow(
  //       <PlaceCard
  //         offer={offer}
  //         onChangeDetailOfferId={() => {}}
  //         onChangerOfferCoordinate={onChangerOfferCoordinate}
  //         onChangeFavorite={() => {}}
  //         onTitleClick={() => {}}
  //         isNear={true}
  //         key={(new Date() * Math.random()).toString()}
  //       />
  //   );

  //   placeCard.find(`article.place-card`).simulate(`mouseleave`);

  //   expect(onChangerOfferCoordinate.mock.results[0].value).toBeNull();
  // });

  // it(`CLICK on title`, () => {
  //   const onClick = jest.fn();
  //   const placeCard = shallow(
  //       <PlaceCard
  //         offer={offer}
  //         onChangeDetailOfferId={() => {}}
  //         onChangerOfferCoordinate={() => {}}
  //         onChangeFavorite={() => {}}
  //         onTitleClick={onClick}
  //         isNear={true}
  //         key={(new Date() * Math.random()).toString()}
  //       />
  //   );

  //   placeCard.find(`h2.place-card__name`).simulate(`click`, {preventDefault: onClick});

  //   expect(onClick).toHaveBeenCalledTimes(2);
  // });

  // it(`CLICK on button favorite`, () => {
  //   const onClick = jest.fn();
  //   const placeCard = shallow(
  //       <PlaceCard
  //         offer={offer}
  //         onChangeDetailOfferId={() => {}}
  //         onChangerOfferCoordinate={() => {}}
  //         onChangeFavorite={onClick}
  //         onTitleClick={() => {}}
  //         isNear={true}
  //         key={(new Date() * Math.random()).toString()}
  //       />
  //   );

  //   placeCard.find(`button.place-card__bookmark-button`).simulate(`click`, {preventDefault: onClick});

  //   expect(onClick).toHaveBeenCalledTimes(2);
  // });
});
