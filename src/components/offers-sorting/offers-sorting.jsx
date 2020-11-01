import {PureComponent} from "react";

// const SORT_TYPES = {
//   `Popular`: `popular`,
//   `to-high`, `to-low`, `top-rated`
// };

class OffersSorting extends PureComponent {

  constructor(props) {
    super(props);

    this._handleTypeClick = props.handleTypeClick.bind(this);
    this._handleSortingMenuClick = this.handleSortingMenuClick.bind(this);

    this.state = {
      isOpen: false,
    };

  }

  handleSortingMenuClick() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  // handleTypeClick() {
  //   this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  // }

  render() {

    return (<form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={this._handleSortingMenuClick}>{this.props.sortingType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      { this.state.isOpen &&
        <ul className="places__options places__options--custom places__options--opened" onClick={(evt) => this._handleTypeClick(evt.target.textContent)}>
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
