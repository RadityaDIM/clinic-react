import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">
          <div className="bg-black p-2 border rounded-pill text-white fs-6">
            Amartek Clinic
          </div>
        </Navbar.Brand>
        <div className="mx-0">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Services</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
            <Nav.Link href="/login" className="mx-3">
              <Button variant="primary" size="sm" className="rounded-2">
                Login
              </Button>
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}
