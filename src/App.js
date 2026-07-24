import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/register";
import { Login } from "./components/auth/login";
import { Dashboard } from "./components/pages/dashboard";
import LandingPage from "./components/pages/landingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
