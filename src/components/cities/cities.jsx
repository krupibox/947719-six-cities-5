const Cities = () => {

  return (<>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Paris</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Cologne</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Brussels</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item tabs__item--active">
            <span>Amsterdam</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Hamburg</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Dusseldorf</span>
          </a>
        </li>
    </>);
};

export default Cities;
