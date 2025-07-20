import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { PropTypes } from 'prop-types';

const ProtectedRoute = ({allowedRoles}) => {
  //const { isAuthenticated, role } = useAuth();
  const { data } = useUser();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  if (!data || !data.role) {
    return <Navigate to="/login" replace/>;
  }

  if (!allowedRoles.includes(data.role)) {
    return <Navigate to="/access-denied" replace/>;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ProtectedRoute;
