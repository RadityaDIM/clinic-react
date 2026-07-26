import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { authService } from "../../../services/authService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export const Register = () => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
      setAlert({
        show: true,
        message: "Registrasi berhasil!",
        variant: "success",
      });
      setformData({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      navigate("/login");
      console.log("Registration successful:", response);
    } catch (error) {
      setAlert({
        show: true,
        message:
          error.response?.data?.message ||
          "Registrasi gagal. Silakan periksa kembali data Anda.",
        variant: "danger",
      });
    }
  };
  return (
    <>
      <div className="w-50 max-w-md mx-auto p-4 mt-5 border">
        <h4 className="text-center">Register Form</h4>
        {alert.show && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              value={formData.username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={formData.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            <Form.Text className="text-danger">
              Pastikan untuk password terdiri dari minimal 8 karakter dan
              gabungan angka.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              value={formData.firstName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
              value={formData.lastName}
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p>
              Sudah punya akun? <Link to="/login">Login</Link>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
