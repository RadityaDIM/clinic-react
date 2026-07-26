import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "./pages/auth/useAuthStore";
import { useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const [isBrandHovered, setIsBrandHovered] = useState(false);
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const { token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkStyle = (isHovered) => ({
    transition: "transform 0.2s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    // `display: "inline-block"` diperlukan agar properti `transform`
    // dapat diterapkan dengan benar pada elemen link.
    display: "inline-block",
  });

  return (
    <Navbar bg="white" expand="sm" className="shadow-sm py-2" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="p-0">
          <div
            className="d-flex align-items-center rounded-pill shadow-sm"
            style={{
              backgroundColor: "#18181b",
              padding: "10px 10px",
              gap: "5px",
              border: "1px solid #2d2d2d",
              transition: "transform 0.2s ease-in-out",
              transform: isBrandHovered ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setIsBrandHovered(true)}
            onMouseLeave={() => setIsBrandHovered(false)}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3H14V10H21V14H14V21H10V14H3V10H10V3Z"
                fill="#75C9C8"
              />
              <path
                d="M10.5 14.5C10.5 10 15 8.5 15 8.5C15 8.5 13.5 14.5 10.5 14.5Z"
                fill="#18181b"
              />
            </svg>

            <span
              className="text-white mb-0"
              style={{
                fontSize: "1rem",
                letterSpacing: "0.8px",
              }}
            >
              <span className="fw-bold">Amartek Clinic</span>
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-2 gap-md-4">
            <Nav.Link
              as={Link}
              to="/"
              className="fw-medium text-dark"
              style={navLinkStyle(isHomeHovered)}
              onMouseEnter={() => setIsHomeHovered(true)}
              onMouseLeave={() => setIsHomeHovered(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#features"
              className="fw-medium text-dark"
              style={navLinkStyle(isServicesHovered)}
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              Services
            </Nav.Link>
            <Nav.Link
              href="#pricing"
              className="fw-medium text-dark"
              style={navLinkStyle(isContactHovered)}
              onMouseEnter={() => setIsContactHovered(true)}
              onMouseLeave={() => setIsContactHovered(false)}
            >
              Contact
            </Nav.Link>

            <div className="ms-md-2 mt-3 mt-md-0 mb-3 mb-md-0">
              {token ? (
                <Button
                  variant="danger"
                  className="px-4 py-2 rounded-3 fw-semibold shadow-sm w-100"
                  onClick={handleLogout}
                  style={navLinkStyle(isButtonHovered)}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="primary"
                    className="px-4 py-2 rounded-3 fw-semibold shadow-sm w-100"
                    style={navLinkStyle(isButtonHovered)}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
