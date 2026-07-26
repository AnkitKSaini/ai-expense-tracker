import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

function PublicRoute() {
  const { loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;