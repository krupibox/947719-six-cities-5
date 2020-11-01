import {PureComponent} from "react";

import OfferSortType from '../../consts/offer-sort-type';

class OffersSorting extends PureComponent {

  constructor(props) {
    super(props);

    this._handleTypeClick = props.handleTypeClick.bind(this);
    this._handleToggleMenuClick = this.handleToggleMenuClick.bind(this);

    this.state = {
      isOpen: false,
    };

  }

  handleToggleMenuClick() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  render() {

    return (<form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={this._handleToggleMenuClick}>{this.props.sortingType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      { this.state.isOpen &&
        <ul className={`places__options places__options--custom ${this.state.isOpen && `places__options--opened`}`}
          onClick={(evt) => {
            this._handleTypeClick(evt.target.textContent); this._handleToggleMenuClick();
          }}
        >

          {Object.values(OfferSortType).map((item, index) =>
            <li key={`${index}-${item}`}
              className={`places__option ${this.props.sortingType === item && `places__option--active`}`}
              tabIndex={0}>{item}
            </li>)}

        </ul>
      }
    </form>);
  }
}

OffersSorting.propTypes = {
  handleTypeClick: PropTypes.func.isRequired,
  sortingType: PropTypes.string.isRequired,
};

export default OffersSorting;
