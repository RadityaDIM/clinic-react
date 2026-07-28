import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import { dashboardService } from "../services/dashboardService";
import { useState, useEffect } from "react";

export const ModalRegisterPatient = (props) => {
  // props.data sudah merupakan objek user, jadi kita bisa langsung menggunakannya
  const user = props.data;

  const [formData, setformData] = useState({
    userId: "",
    bloodType: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    if (user?.userId) {
      setformData((prevData) => ({ ...prevData, userId: user.userId }));
    }
  }, [user]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data : ", formData);
    try {
      const payload = {
        ...formData,
        height: Number(formData.height) || 0,
        weight: Number(formData.weight) || 0,
      };
      const response = await dashboardService.registerPatient(payload);
      setAlert({
        show: true,
        message: "Registrasi pasien berhasil!",
        variant: "success",
      });
      setformData({
        ...formData,
        bloodType: "",
        height: "",
        weight: "",
      });
      console.log("Registration successful:", response);
    } catch (error) {
      const msg = error.response?.data?.message || "";
      let userMsg;
      if (msg.includes("UK_939") || msg.toLowerCase().includes("duplicate") || error.response?.status === 409 || error.response?.status === 500) {
        userMsg = "User ini sudah terdaftar sebagai pasien.";
      } else {
        userMsg = msg || "Registrasi gagal. Silakan periksa kembali data Anda.";
      }
      setAlert({
        show: true,
        message: userMsg,
        variant: "danger",
      });
    }
  };

  return (
    <Modal
      // {...console.log(user)}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="">
        <div className="mx-auto justify-content-center">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className=" mx-auto fs-3"
          >
            Registrasi Pasien
          </Modal.Title>
          {alert.show && (
            <Alert variant={alert.variant} dismissible>
              {alert.message}
            </Alert>
          )}
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control name="userId" value={formData.userId} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBloodType">
            <Form.Label>Blood Type</Form.Label>
            <Form.Control
              name="bloodType"
              placeholder="Blood Type"
              onChange={handleChange}
              value={formData.bloodType}
            />
            <Form.Text className="text-danger fw-semibold p-2 color-red-500">
              *(A/B/AB/O)
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formWeight">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              name="weight"
              placeholder="Weight"
              onChange={handleChange}
              value={formData.weight}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHeight">
            <Form.Label>Height (cm)</Form.Label>
            <Form.Control
              name="height"
              placeholder="Height"
              onChange={handleChange}
              value={formData.height}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
