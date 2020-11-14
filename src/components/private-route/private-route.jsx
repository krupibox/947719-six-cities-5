import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../consts/app-route";
import {AuthorizationStatus} from "../../consts/authorization-status";

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {

  return (
    <Route
      exact={exact}
      path={path}
      render={(componentProps) => {

        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(componentProps)
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = ({USER}) => ({
  authorizationStatus: USER.authorizationStatus,
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
