import {PureComponent} from "react";

export const withSortToggle = (Component) => {

  /* eslint-disable */

  return class extends PureComponent {
    constructor(props) {
      super(props);

      this._handleTypeClick = props.handleTypeClick.bind(this);
      this._handleToggleMenuClick = this.handleToggleMenuClick.bind(this);

      this.state = {
        isOpen: false,
      };

    }

    handleToggleMenuClick() {
      this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    handleTypeClick(value) {
      this.setState({ sortingType: value });
    };

    // union this class with component class
    render() {
      return (
        <Component
          {...this.props}
          isOpen={this.state.isOpen}
          handleTypeClick={this._handleTypeClick}
          handleToggleMenuClick={this._handleToggleMenuClick}
        />
      );
    }
  };

  /* eslint-enable */

};
