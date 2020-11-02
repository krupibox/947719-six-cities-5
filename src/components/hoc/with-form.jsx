import {PureComponent} from "react";

export const withForm = (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);
      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleFieldChange = this._handleFieldChange.bind(this);

      this.state = {rating: ``, review: ``};

    }

    _handleSubmit(evt) {
      evt.preventDefault();
      /* eslint-disable */
      console.log(this.state);
      /* eslint-enable */
    }

    _handleFieldChange(evt) {
      const {name, value} = evt.target;

      this.setState({
        [name]: value
      });
    }

    // union this class with component class
    render() {
      return (
        <Component
          rating={this.state.rating}
          review={this.state.review}
          handleSubmit={this._handleSubmit}
          handleFieldChange={this._handleFieldChange}
        />
      );
    }
  }

  return WithForm;

};

export default withForm;

