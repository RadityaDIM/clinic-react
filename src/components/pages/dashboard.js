import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { dashboardService } from "../../services/dashboardService";
import { PencilSquare } from "@boxicons/react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { ModalUpdateAppointment } from "../modalUpdateAppointment";
import { ModalCreateMedicalRecord } from "../ModalCreateMedicalRecord";

export const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalCreateMedicalRecordShow, setModalCreateMedicalRecordShow] =
    useState(false);
  const [
    selectedAppointmentForMedicalRecord,
    setSelectedAppointmentForMedicalRecord,
  ] = useState(null);

  // Mengambil semua data saat komponen pertama kali dimuat
  const fetchData = async () => {
    try {
      setLoading(true);
      // Mengambil data pasien dan appointment secara paralel untuk efisiensi
      const [patientsResponse, appointmentsResponse] = await Promise.all([
        dashboardService.getPatients(),
        dashboardService.displayAppointment(),
      ]);

      setPatients(patientsResponse.data.data);
      setAppointments(appointmentsResponse.data.data);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data. Silakan coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (appointment) => {
    console.log("Data appointment yang diklik:", appointment);
    setSelectedAppointment(appointment);
    setModalShow(true);
  };

  const handleUpdateSuccess = () => {
    fetchData();
  };

  const handleCreateMedicalRecord = (appointment) => {
    console.log("Create Medical Record for appointment:", appointment);
    setSelectedAppointmentForMedicalRecord(appointment);
    setModalCreateMedicalRecordShow(true);
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Dashboard Klinik</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Pasien</Card.Title>
              <Card.Text className="fs-2">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  patients.length
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Janji Temu</Card.Title>
              <Card.Text className="fs-2">{appointments.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Dokter Tersedia</Card.Title>
              <Card.Text className="fs-2">1</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>Daftar Pasien Terdaftar</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama Depan</th>
                      <th>Nama Belakang</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length > 0 ? (
                      patients.map((patient, index) => (
                        <tr key={patient.id || index}>
                          <td>{index + 1}</td>
                          <td>{patient.user.person.firstName || "-"}</td>
                          <td>{patient.user.person.lastName || "-"}</td>
                          <td>{patient.user.email || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Tidak ada data pasien.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Daftar Jadwal Periksa</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tanggal</th>
                      <th>Nama Pasien</th>
                      <th>Dokter</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appointment, index) => (
                        <tr key={appointment.id || index}>
                          <td>{index + 1}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.patientName}</td>
                          <td>{appointment.doctorName}</td>
                          <td>{appointment.status}</td>
                          <td>
                            <Button
                              className="btn btn-warning btn-sm rounded-3 me-2"
                              onClick={() => handleEdit(appointment)}
                            >
                              <PencilSquare size="sm" />
                            </Button>
                            {appointment.status === "COMPLETED" && (
                              <Button
                                className="btn btn-success btn-sm rounded-3"
                                onClick={() =>
                                  handleCreateMedicalRecord(appointment)
                                }
                              >
                                Create Medical Record
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Tidak ada data appointment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {console.log("SELECTED APPOINTMENT : ", selectedAppointment)}
      {selectedAppointment && (
        <ModalUpdateAppointment
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={selectedAppointment}
          onUpdate={handleUpdateSuccess}
        />
      )}
      {selectedAppointmentForMedicalRecord && (
        <ModalCreateMedicalRecord
          show={modalCreateMedicalRecordShow}
          onHide={() => setModalCreateMedicalRecordShow(false)}
          data={selectedAppointmentForMedicalRecord}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </Container>
  );
};
