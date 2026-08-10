import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";


function AdminRoute() {
  const { user, isAdmin } = useAuth();

  // Agar user logged in nahi hai ya admin nahi hai -> Home redirect
  if (!user || !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;