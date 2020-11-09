import withSortToggle from '../hoc/with-sort-toggle';

import {SortType} from '../../consts/sort-type';

const OffersSorting = ({isOpen, sortingType, handleTypeClick, handleToggleMenuClick}) => {

  return (<form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex={0} onClick={handleToggleMenuClick}>{sortingType}
      <svg className="places__sorting-arrow" width={7} height={4}>
        <use xlinkHref="#icon-arrow-select" />
      </svg>
    </span>
    { isOpen &&
      <ul className={`places__options places__options--custom ${isOpen && `places__options--opened`}`}
        onClick={(evt) => {
          handleTypeClick(evt.target.textContent); handleToggleMenuClick();
        }}
      >

        {Object.values(SortType).map((item, index) =>
          <li key={`${index}-${item}`}
            className={`places__option ${sortingType === item && `places__option--active`}`}
            tabIndex={0}>{item}
          </li>)}

      </ul>
    }
  </form>);
};

OffersSorting.propTypes = {
  handleToggleMenuClick: PropTypes.func.isRequired,
  handleTypeClick: PropTypes.func.isRequired,
  sortingType: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withSortToggle(OffersSorting);

