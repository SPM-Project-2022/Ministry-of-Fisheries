import { Navigate } from "react-router-dom";

//private route logic
function PrivateRoute({ children }) {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />; //if user not login or not authorized to the restricted routes, it may be navigated to the login
}

export default PrivateRoute;
