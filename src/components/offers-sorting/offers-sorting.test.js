import OffersSorting from './offers-sorting';

describe(`<OffersSorting/>`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
            .create(
                <OffersSorting
                  sortingType={`Popular`}
                  onTypeClick={() => {}}
                />)
            .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
