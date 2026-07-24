import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { dashboardService } from "../../services/dashboardService";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";

export const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const patientsData = await dashboardService.getPatients();
        console.log(patientsData.data);
        setPatients(patientsData.data.data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data pasien.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
              <Card.Title>Janji Temu Hari Ini</Card.Title>
              <Card.Text className="fs-2">0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Dokter Tersedia</Card.Title>
              <Card.Text className="fs-2">3</Card.Text>
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
                          <td>{patient.user.person.firstName}</td>
                          <td>{patient.user.person.lastName}</td>
                          <td>{patient.user.email}</td>
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
    </Container>
  );
};
