import { use, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { authService } from "../../../services/authService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "./useAuthStore";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const setToken = useAuthStore((state) => state.setToken);

  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(loginData);
      setAlert({
        show: true,
        message: "Login berhasil!",
        variant: "success",
      });
      setLoginData({
        username: "",
        password: "",
      });
      setToken(response.data.data.token);
      setUser(response.data.data);
      console.log("Login successful:", response);
      console.log(response.data.data);
      console.log("Token: ", response.data.data.token); // Log token untuk verifikasi
      navigate("/"); // Arahkan ke dashboard setelah login berhasil
    } catch (error) {
      setAlert({
        show: true,
        message:
          error.response?.data?.message ||
          "Login gagal. Silakan periksa kembali data Anda.",
        variant: "danger",
      });
    }
  };

  return (
    <>
      <div className="w-50 max-w-sm mx-auto p-4 mt-5 border">
        <h4 className="text-center">Login Form</h4>
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
              value={loginData.username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={loginData.password}
            />
          </Form.Group>
          <div className="text-center mt-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p>
              Belum punya akun? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};
