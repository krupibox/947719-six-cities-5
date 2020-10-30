import {PureComponent} from "react";

export const withActiveCoords = (Component) => {

  /* eslint-disable */

    return class extends PureComponent {
        constructor(props) {
            super(props);
            this._handleCardHover = this.handleCardHover.bind(this);
            this.state = { activeCoords: [0, 0] };

        }

        handleCardHover(value) {
            this.setState({ activeCoords: value });
        }

        // union this class with component class
        render() {
            return (
                <Component
                  {...this.props}
                  activeCoords={this.state.activeCoords}
                  handleCardHover={this._handleCardHover}
                />
              );
        }
    };

    /* eslint-enable */

};


