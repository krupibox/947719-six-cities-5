import {PureComponent} from "react";

class OffersSorting extends PureComponent {

  constructor(props) {
    super(props);

    this._handleSortingClick = this.handleSortingClick.bind(this);
    this.state = {isOpen: false};
  }

  handleSortingClick() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  render() {
    return (<form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={this._handleSortingClick}>Popular
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      { this.state.isOpen &&
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      }
    </form>);
  }
}

export default OffersSorting;
