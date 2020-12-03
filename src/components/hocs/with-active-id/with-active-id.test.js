import withActiveId from './with-active-id';

describe(`<withActiveCoords/>: `, () => {

  const MockComponent = () => <div />;
  const MockWrapper = withActiveId(MockComponent);

  it(`should render correctly`, () => {
    const wrapper = renderer
      .create(
          <MockWrapper/>
      ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
