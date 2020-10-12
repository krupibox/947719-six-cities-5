import Main from '../main/main';

const App = ({numberOfPlaces}) => <Main numberOfPlaces={numberOfPlaces} />;

App.propTypes = {
  numberOfPlaces: PropTypes.string.isRequired,
};

export default App;
