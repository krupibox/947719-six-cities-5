import ReviewStars from './review-stars';

describe(`<ReviewStars/>: `, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <ReviewStars
            onFieldChange={() => {}}
            status={{pending: false}}
            rating={`5`}
          />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
