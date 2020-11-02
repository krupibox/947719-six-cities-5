const MainEmpty = ({activeCity}) => (

  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
    </div>
  </section>

);

MainEmpty.propTypes = {
  activeCity: PropTypes.string.isRequired,
};

export default React.memo(MainEmpty);
