import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./pages/auth/useAuthStore";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ allowedRoles, children }) {
  // Ambil token dan informasi user dari Redux store
  const token = useAuthStore.getState().token;
  const role = jwtDecode(token).roles;

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Asumsikan objek user memiliki properti 'roles' yang merupakan array string,
  // contoh: user.roles = ["ROLE_ADMIN", "ROLE_DOCTOR"]
  const userRoles = role || [];

  // Jika ada peran yang diizinkan ditentukan untuk rute ini
  if (allowedRoles && allowedRoles.length > 0) {
    // Periksa apakah pengguna memiliki setidaknya satu dari peran yang diizinkan
    const hasRequiredRole = allowedRoles.some((role) =>
      userRoles.includes(role),
    );

    // Jika pengguna tidak memiliki peran yang diperlukan, arahkan ke halaman tidak berwenang atau ke dashboard
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />; // Arahkan ke halaman Unauthorized
    }
  }

  // Jika ada children, render children. Jika tidak, render Outlet (untuk layout).
  return children ? children : <Outlet />;
}

// import { Navigate, Outlet } from "react-router-dom";
// import useAuthStore from "./pages/auth/useAuthStore";

// export default function ProtectedRoute() {
//   const token = useAuthStore.getState().token;
//   if (!token) {
//     return <Navigate to={"/login"} replace={true} />;
//   }
//   return <Outlet />;
// }
