import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./pages/auth/useAuthStore";

export default function ProtectedRoute() {
  const token = useAuthStore.getState().token;
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return <Outlet />;
}
