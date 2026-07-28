import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { dashboardService } from "../services/dashboardService";

export const ModalUpdateAppointment = (props) => {
  const { show, onHide, data, onUpdate } = props;

  const [formData, setFormData] = useState({
    status: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        status: data.status || "",
      });
    }
  }, [data]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data?.id) {
      console.error("Appointment ID is missing.");
      setAlert({
        show: true,
        message: "Gagal mengupdate, ID appointment tidak ditemukan.",
        variant: "danger",
      });
      return;
    }

    try {
      await dashboardService.updateAppointment(data.id, formData.status);
      setAlert({
        show: true,
        message: "Status appointment berhasil diupdate!",
        variant: "success",
      });

      // Notify parent component to refetch data
      onUpdate();

      // Hide modal after a short delay
      setTimeout(() => {
        onHide();
      }, 1500);
    } catch (error) {
      setAlert({
        show: true,
        message:
          error.response?.data?.message || "Update gagal. Silakan coba lagi.",
        variant: "danger",
      });
      console.error("Error updating appointment:", error.response || error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Status Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">PENDING</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="RESCHEDULED">RESCHEDULED</option>
              <option value="RESERVED">RESERVED</option>
              <option value="COMPLETED">COMPLETED</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Status
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
