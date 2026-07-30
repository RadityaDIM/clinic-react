import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landingPage";
import Register from "./components/pages/auth/register";
import { Login } from "./components/pages/auth/login";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./components/pages/dashboard";
import { Doctors } from "./components/pages/Doctors";
import { DoctorProfile } from "./components/pages/DoctorProfile";
import { Patients } from "./components/pages/Patients";
import { PatientProfile } from "./components/pages/PatientProfile";
import { Appointments } from "./components/pages/Appointments";
import { Prescriptions } from "./components/pages/Prescriptions";
import { Payments } from "./components/pages/Payments";
import { MedicalRecords } from "./components/pages/MedicalRecords";
import { Settings } from "./components/pages/Settings";
import { Unauthorized } from "./components/pages/Unauthorized";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Appointment } from "./components/pages/appointment";
import ProtectedRoute from "./components/ProtectedRoute";

function NotFound() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" style={{ fontSize: 32 }}>
        🔍
      </div>
      <h2
        style={{
          color: "var(--color-gray-800)",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        Halaman Tidak Ditemukan
      </h2>
      <p className="empty-state-sub">Halaman yang Anda cari tidak tersedia</p>
      <a
        href="/dashboard"
        className="btn btn-primary"
        style={{ marginTop: 16 }}
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/book/appointment" element={<Appointment />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="doctors"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                    <Doctors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="doctors/:id"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <DoctorProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="patients"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <Patients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="patients/:id"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <PatientProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="appointments"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="prescriptions"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <Prescriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payments"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                    <Payments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="medical-records"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DOCTOR"]}>
                    <MedicalRecords />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
