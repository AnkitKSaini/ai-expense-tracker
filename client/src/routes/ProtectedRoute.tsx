import { Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
  //const { isAuthenticated } = useAuth();
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;