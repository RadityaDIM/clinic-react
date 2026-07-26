import { Alert, Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboardService } from "../../services/dashboardService";
import useAuthStore from "./auth/useAuthStore";

export const Appointment = (props) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [formData, setformData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Guard clause untuk memastikan data user (dan ID-nya) sudah tersedia
      if (!user?.id) {
        console.error("Data user atau user ID tidak ditemukan.");
        return;
      }
      try {
        const patientResponse = await dashboardService.getPatientByUserId(
          user.id, // Menggunakan user.id, sesuaikan dengan properti ID dari response login Anda
        );
        const patientId = patientResponse.data.data.id; // Disesuaikan dengan struktur response API Anda

        if (!patientId) {
          throw new Error(
            "Anda belum terdaftar sebagai pasien. Silakan daftar di halaman utama.",
          );
        }

        const doctorsResponse = await dashboardService.getDoctors();
        setDoctors(doctorsResponse.data.data); // Disesuaikan dengan struktur response API Anda

        // 3. Set patientId di state formData
        setformData((prev) => ({ ...prev, patientId: patientId }));
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Gagal memuat data untuk membuat janji temu.";
        console.log("Terdapat error : ", errorMessage);
      }
    };
    fetchData();
  }, [user]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("User : ", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dashboardService.createAppointment(formData);
      setAlert({
        show: true,
        message: "Pendaftaran Appointment berhasil!",
        variant: "success",
      });
      setTimeout(() => navigate("/"), 2000);
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
    // <>
    //   <div className="w-50 max-w-md mx-auto p-4 mt-5 border">
    //     <h4 className="text-center">Form Pembuatan Jadwal Pemeriksaan</h4>
    //     {alert.show && (
    //       <Alert
    //         variant={alert.variant}
    //         onClose={() => setAlert({ ...alert, show: false })}
    //         dismissible
    //       >
    //         {alert.message}
    //       </Alert>
    //     )}
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group className="mb-3" controlId="formBasicUsername">
    //         <Form.Label>Username</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="username"
    //           placeholder="Enter username"
    //           onChange={handleChange}
    //           value={formData.username}
    //         />
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="formBasicEmail">
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control
    //           type="email"
    //           name="email"
    //           placeholder="Enter email"
    //           onChange={handleChange}
    //           value={formData.email}
    //         />
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="formBasicPassword">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           onChange={handleChange}
    //           value={formData.password}
    //         />
    //         <Form.Text className="text-danger">
    //           Pastikan untuk password terdiri dari minimal 8 karakter dan
    //           gabungan angka.
    //         </Form.Text>
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="formBasicFirstName">
    //         <Form.Label>First Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="firstName"
    //           placeholder="Enter your first name"
    //           onChange={handleChange}
    //           value={formData.firstName}
    //         />
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="formBasicLastName">
    //         <Form.Label>Last Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           name="lastName"
    //           placeholder="Enter your last name"
    //           onChange={handleChange}
    //           value={formData.lastName}
    //         />
    //       </Form.Group>
    //       <div className="text-center mt-3">
    //         <Button variant="primary" type="submit">
    //           Submit
    //         </Button>
    //         <p>
    //           Sudah punya akun? <Link to="/login">Login</Link>
    //         </p>
    //       </div>
    //     </Form>
    //   </div>
    // </>
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <h4 className="text-center mb-4">Form Janji Temu Pemeriksaan</h4>
          <Form onSubmit={handleSubmit}>
            {alert.show && (
              <Alert
                variant={alert.variant}
                onClose={() => setAlert({ ...alert, show: false })}
                dismissible
              >
                {alert.message}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label>ID Pasien</Form.Label>
              <Form.Control
                type="text"
                name="patientId"
                value={formData.patientId}
                readOnly
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pilih Dokter</Form.Label>
              <Form.Select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
              >
                <option value="">-- Silakan Pilih Dokter --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {`${doctor.user.person.firstName} ${doctor.user.person.lastName} - (Spesialis: ${doctor.specialization})`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tanggal Janji Temu</Form.Label>
              <Form.Control
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]} // Mencegah pemilihan tanggal di masa lalu
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Buat Janji Temu
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
