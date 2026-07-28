import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  CreditCard,
  ClipboardList,
  Settings,
  Activity,
  Stethoscope,
  LogOut,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { Role } from "../../data/mockData";
import useAuthStore from "../pages/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    label: "Beranda",
    roles: [Role.ADMIN, Role.CASHIER, Role.DOCTOR],
  },
  { path: "/doctors", icon: Stethoscope, label: "Dokter", roles: [Role.ADMIN] },
  {
    path: "/patients",
    icon: Users,
    label: "Pasien",
    roles: [Role.ADMIN, Role.DOCTOR],
  },
  {
    path: "/appointments",
    icon: Calendar,
    label: "Janji Temu",
    roles: [Role.ADMIN, Role.CASHIER, Role.DOCTOR],
  },
  {
    path: "/prescriptions",
    icon: FileText,
    label: "Resep",
    roles: [Role.ADMIN, Role.DOCTOR],
  },
  {
    path: "/payments",
    icon: CreditCard,
    label: "Pembayaran",
    roles: [Role.ADMIN, Role.CASHIER],
  },
  {
    path: "/medical-records",
    icon: ClipboardList,
    label: "Rekam Medis",
    roles: [Role.ADMIN, Role.DOCTOR],
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Pengaturan",
    roles: [Role.ADMIN],
  },
];

export function Sidebar() {
  const { role } = useAppContext();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Activity size={18} />
        </div>
        <div>
          <span className="sidebar-logo-text">Amartek Clinic</span>
          <p className="sidebar-logo-sub">Dashboard v2.0</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-title">Menu Utama</p>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? "sidebar-nav-item-active" : ""}`}
            >
              <Icon
                size={18}
                className={
                  isActive ? "sidebar-nav-icon-active" : "sidebar-nav-icon"
                }
              />
              <span>{item.label}</span>
              {isActive && <span className="sidebar-nav-dot" />}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-user-avatar">
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">
              {user?.firstName || "Admin"} {user?.lastName || "User"}
            </p>
            <p className="sidebar-user-email">
              {user?.email || "admin@klinik.com"}
            </p>
          </div>
        </div>
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
