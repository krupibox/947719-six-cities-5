import {PureComponent} from "react";
import {connect} from 'react-redux';

import {RequestStatus} from '../../consts/request-status';
import {setRequest} from '../../store/reducers/request';
import {sendReview} from '../../store/reducers/data';

export const withForm = (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);
      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleFieldChange = this._handleFieldChange.bind(this);
      this._handleFormClear = this._handleFormClear.bind(this);
      this.state = {rating: ``, review: ``};
    }

    componentDidUpdate() {
      const {requestStatus, onFormClear} = this.props;

      if (requestStatus === RequestStatus.SUCCESS) {
        this._handleFormClear();
        onFormClear();
      }
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

      // this name - it's keys for value
      this.setState({
        [name]: value
      });
    }

    _handleFormClear() {
      this.setState({rating: ``, review: ``});
    }

    // union this class with component class
    render() {

      const statusPending = this.props.requestStatus === RequestStatus.PENDING;
      const statusFailure = this.props.requestStatus === RequestStatus.FAILURE;

      return (
        <Component
          {...this.props} // important for props from parent
          rating={this.state.rating}
          review={this.state.review}
          status={{pending: statusPending, failure: statusFailure}}
          onSubmit={this._handleSubmit}
          onFieldChange={this._handleFieldChange}
        />
      );
    }
  }

  WithForm.propTypes = {
    offerId: PropTypes.string.isRequired,
    requestStatus: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFormClear: PropTypes.func.isRequired,
  };

  const mapStateToProps = ({REQUEST}) => ({
    requestStatus: REQUEST.status,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmit(data) {
      dispatch(sendReview(data));
    },
    onFormClear() {
      dispatch(setRequest({status: RequestStatus.INITIAL}));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
