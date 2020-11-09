import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../consts/authorization-status";
import {AppRoute} from "../../consts/app-route";


const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? <Redirect to={AppRoute.ROOT} /> // here component to render
            : render(routeProps)
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
