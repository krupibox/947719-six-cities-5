import withSortToggle from './with-sort-toggle';

describe(`<withSortToggle/>: `, () => {

  const MockComponent = () => <div />;
  const MockWrapper = withSortToggle(MockComponent);

  it(`should render correctly`, () => {
    const wrapper = renderer
      .create(
          <MockWrapper
            onTypeClick={() => { }}
          />
      ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
