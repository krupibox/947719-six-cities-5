import {PureComponent} from "react";

const withSortToggle = (Component) => {
  class WithSortToggle extends PureComponent {
    constructor(props) {
      super(props);

      this._handleTypeClick = props.onTypeClick.bind(this);
      this._handleToggleMenuClick = this.handleToggleMenuClick.bind(this);

      this.state = {
        isOpen: false,
      };

    }

    handleToggleMenuClick() {
      this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    handleTypeClick(value) {
      this.setState({sortingType: value});
    }

    // union this class with component class
    render() {
      return (
        <Component
          {...this.props}
          isOpen={this.state.isOpen}
          onTypeClick={this._handleTypeClick}
          onToggleMenuClick={this._handleToggleMenuClick}
        />
      );
    }
  }

  WithSortToggle.propTypes = {
    onTypeClick: PropTypes.func.isRequired,
  };

  return WithSortToggle;
};


export default withSortToggle;
