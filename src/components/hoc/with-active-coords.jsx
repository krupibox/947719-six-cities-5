import {PureComponent} from "react";

export const withActiveCoords = (Component) => {
  class WithActiveCoords extends PureComponent {
    constructor(props) {
      super(props);
      this._handleCardHover = this.handleCardHover.bind(this);
      this._handleTypeClick = this.handleTypeClick.bind(this);
      this.state = {
        activeCoords: [0, 0],
        sortingType: `Popular`,
      };
    }

    handleCardHover(value) {
      this.setState({activeCoords: value});
    }

    handleTypeClick(value) {
      this.setState({sortingType: value});
    }

    // union this class with component class
    render() {
      return (
        <Component
          {...this.props}
          activeCoords={this.state.activeCoords}
          sortingType={this.state.sortingType}
          onCardHover={this._handleCardHover}
          onTypeClick={this._handleTypeClick}
        />
      );
    }
  }

  return WithActiveCoords;
};

export default withActiveCoords;

