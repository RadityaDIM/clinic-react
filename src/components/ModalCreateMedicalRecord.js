import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { dashboardService } from "../services/dashboardService";

export const ModalCreateMedicalRecord = (props) => {
  const { show, onHide, data, onSuccess } = props;

  const [formData, setFormData] = useState({
    appointmentId: "",
    diagnosis: "",
    result: "",
    diseaseId: "", // Menambahkan field diseaseId
    notes: "",
    diseaseName: "", // Tambahkan untuk menampilkan nama penyakit yang dipilih
    medicine: [], // Menambahkan field medicine (array)
  });

  useEffect(() => {
    // Reset form setiap kali data appointment baru dipilih
    if (data) {
      setFormData({
        appointmentId: data.id || "",
        diagnosis: "",
        result: "",
        diseaseId: "", // Inisialisasi diseaseId
        diseaseName: "",
        notes: "",
        medicine: [], // Inisialisasi array medicine
      });
    }
  }, [data]);

  const [diseases, setDiseases] = useState([]);
  const [loadingDiseases, setLoadingDiseases] = useState(false);
  const [diseaseError, setDiseaseError] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      setLoadingDiseases(true);
      setDiseaseError(null);
      try {
        const response = await dashboardService.displayAllDisease();
        // Asumsi response.data.data adalah array objek penyakit { id, name }
        setDiseases(response.data.data);
      } catch (err) {
        setDiseaseError(
          err.response?.data?.message || "Gagal memuat daftar penyakit.",
        );
        console.error("Error fetching diseases:", err);
      } finally {
        setLoadingDiseases(false);
      }
    };

    if (show) {
      fetchDiseases();
    }
  }, [data]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    if (name === "diseaseId") {
      // Ketika diseaseId dipilih, simpan juga nama penyakitnya
      const selectedDiseaseName = options[selectedIndex].text;
      setFormData({
        ...formData,
        [name]: value,
        diseaseName: selectedDiseaseName,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Fungsi untuk menangani perubahan pada input medicine
  const handleMedicineChange = (index, e) => {
    const newMedicine = [...formData.medicine];
    newMedicine[index][e.target.name] = e.target.value;
    setFormData({ ...formData, medicine: newMedicine });
  };

  // Fungsi untuk menambahkan item medicine baru
  const handleAddMedicine = () => {
    setFormData({
      ...formData,
      medicine: [...formData.medicine, { name: "", quantity: "" }],
    });
  };

  // Fungsi untuk menghapus item medicine
  const handleRemoveMedicine = (index) => {
    const newMedicine = [...formData.medicine];
    newMedicine.splice(index, 1);
    setFormData({ ...formData, medicine: newMedicine });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentId) {
      setAlert({
        show: true,
        message: "Gagal, ID appointment tidak ditemukan.",
        variant: "danger",
      });
      return;
    }

    // Membuat payload yang bersih sesuai dengan DTO backend
    // dan memastikan tipe data number sudah benar (bukan string dari form)
    const payload = {
      appointmentId: parseInt(formData.appointmentId, 10),
      diagnosis: formData.diagnosis,
      result: formData.result,
      diseaseId: parseInt(formData.diseaseId, 10),
      notes: formData.notes,
      medicine: formData.medicine.map((med) => ({
        name: med.name,
        // Pastikan quantity adalah angka, default ke 0 jika tidak valid
        quantity: parseInt(med.quantity, 10) || 0,
      })),
    };
    console.log("Payload : ", payload);

    try {
      await dashboardService.createMedicalRecord(payload);

      setAlert({
        show: true,
        message: "Rekam medis berhasil dibuat!",
        variant: "success",
      });

      onSuccess(); // Memanggil fungsi untuk me-refresh data di dashboard

      setTimeout(() => {
        onHide(); // Menutup modal setelah sukses
      }, 1500);
    } catch (error) {
      setAlert({
        show: true,
        message:
          error.response?.data?.message ||
          "Gagal membuat rekam medis. Silakan coba lagi.",
        variant: "danger",
      });
      console.error("Error creating medical record:", error.response || error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Buat Rekam Medis</Modal.Title>
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
        <p>
          <strong>Pasien:</strong> {data?.patientName}
        </p>
        <p>
          <strong>Dokter:</strong> {data?.doctorName}
        </p>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDiagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Masukkan hasil diagnosis..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formResult">
            <Form.Label>Hasil/Tindakan/Pengobatan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="result"
              value={formData.result}
              onChange={handleChange}
              placeholder="Jelaskan tindakan atau resep yang diberikan..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDiseaseId">
            <Form.Label>Pilih Penyakit</Form.Label>
            <Form.Select
              name="diseaseId"
              value={formData.diseaseId}
              onChange={handleChange}
              required
              disabled={loadingDiseases}
            >
              <option value="">
                {loadingDiseases
                  ? "Memuat penyakit..."
                  : "-- Pilih Penyakit --"}
              </option>
              {diseaseError && <option disabled>{diseaseError}</option>}
              {diseases.map((disease) => (
                <option key={disease.id} value={disease.id}>
                  {disease.name}
                </option>
              ))}
            </Form.Select>
            {diseaseError && (
              <Alert variant="danger" className="mt-2">
                {diseaseError}
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNotes">
            <Form.Label>Catatan Tambahan</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Catatan lain jika ada..."
            />
          </Form.Group>

          <hr />
          <h5>Daftar Obat</h5>
          {formData.medicine.map((med, index) => (
            <div key={index} className="d-flex mb-2 align-items-end">
              <Form.Group
                controlId={`medicineName-${index}`}
                className="me-2 flex-grow-1"
              >
                <Form.Label>{index === 0 ? "Nama Obat" : ""}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(index, e)}
                  placeholder="Nama Obat"
                  required
                />
              </Form.Group>
              <Form.Group
                controlId={`medicineQuantity-${index}`}
                className="me-2"
                style={{ width: "100px" }}
              >
                <Form.Label>{index === 0 ? "Jumlah" : ""}</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={med.quantity}
                  onChange={(e) => handleMedicineChange(index, e)}
                  placeholder="Jumlah"
                  required
                />
              </Form.Group>
              <Button
                variant="danger"
                onClick={() => handleRemoveMedicine(index)}
                className="mb-0" // Menghilangkan margin bawah default button
                style={{ height: "38px" }} // Menyesuaikan tinggi dengan input
              >
                Hapus
              </Button>
            </div>
          ))}
          <div className="">
            <Button
              variant="outline-primary"
              onClick={handleAddMedicine}
              className="mb-3 mr-2"
            >
              Tambah Obat
            </Button>
            <Button variant="primary" type="submit" className="mb-3">
              Simpan Rekam Medis
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
