import {PureComponent} from "react";
import {connect} from 'react-redux';

import {sendReview} from '../../store/reducers/data';

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

      const {offerId, onSubmit} = this.props;

      // send object with form data
      onSubmit({
        review: this.state.review,
        rating: parseInt(this.state.rating, 10),
        offerId
      });
    }

    _handleFieldChange(evt) {
      const {name, value} = evt.target;

      // name - it's keys
      this.setState({
        [name]: value
      });
    }

    // union this class with component class
    render() {
      return (
        <Component
          {...this.props} // important for props from parent
          rating={this.state.rating}
          review={this.state.review}
          handleSubmit={this._handleSubmit}
          handleFieldChange={this._handleFieldChange}
        />
      );
    }
  }

  WithForm.propTypes = {
    offerId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    onSubmit(data) {
      dispatch(sendReview(data));
    },
  });

  return connect(null, mapDispatchToProps)(WithForm);
};

export default withForm;
