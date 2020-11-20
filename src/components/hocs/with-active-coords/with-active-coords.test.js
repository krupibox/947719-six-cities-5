import withActiveCoords from './with-active-coords';

describe(`<withActiveCoords/>: `, () => {

  const MockComponent = () => <div />;
  const MockWrapper = withActiveCoords(MockComponent);

  it(`should render correctly`, () => {
    const wrapper = renderer
      .create(
          <MockWrapper/>
      ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
