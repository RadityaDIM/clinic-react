import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  X,
  Phone,
  ChevronRight,
  UserCheck,
  Users,
} from "lucide-react";
import { patients as initialPatients } from "../../data/mockData";
import { StatusBadge } from "../shared/StatusBadge";
import { Header } from "../layout/Header";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboardService";

const calculateAge = (dob) => {
  if (!dob) return "-";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const genderLabel = (g) => {
  if (g === "MALE") return "Laki-laki";
  if (g === "FEMALE") return "Perempuan";
  return g || "-";
};

const statusLabel = (s) => {
  if (s === "ACTIVE") return "Aktif";
  if (s === "INACTIVE") return "Nonaktif";
  return s || "-";
};

const getInitials = (first, last) => {
  return ((first?.[0] || "") + (last?.[0] || "")).toUpperCase();
};

const buildPatientRow = (p) => {
  const person = p.user?.person || {};
  const firstName = person.firstName || p.firstName || "";
  const lastName = person.lastName || p.lastName || "";
  const email = p.user?.email || p.email || "";
  const name = `${firstName} ${lastName}`.trim() || p.name || "Tanpa Nama";
  const age = calculateAge(person.dateOfBirth);
  const gender = person.gender || p.gender || "-";
  const phone = person.phoneNumber || p.phone || "-";
  const bloodType = p.bloodType || "-";
  const status = p.status || "ACTIVE";

  return {
    id: p.id,
    name,
    email,
    age,
    gender,
    phone,
    bloodType,
    registered: "-",
    status,
    initials: getInitials(firstName, lastName),
  };
};

export function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [genderFilter, setGenderFilter] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    bloodType: "",
    email: "",
    address: "",
  });

  const fetchPatients = async () => {
    try {
      const res = await dashboardService.getPatients();
      const apiData = res.data?.data ?? res.data;
      if (Array.isArray(apiData) && apiData.length > 0) {
        setPatients(apiData.map(buildPatientRow));
        return;
      }
    } catch (err) {
      console.error("Failed to fetch patients, using mock data:", err);
    }
    const fallback = initialPatients.map(buildPatientRow);
    setPatients(fallback);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       const res = await dashboardService.getPatients();
  //       const apiData = res.data?.data ?? res.data;
  //       if (Array.isArray(apiData) && apiData.length > 0) {
  //         setPatients(apiData.map(buildPatientRow));
  //         return;
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch patients, using mock data:", err);
  //     }
  //     const fallback = initialPatients.map(buildPatientRow);
  //     setPatients(fallback);
  //   };
  //   load();
  // }, []);

  const filteredPatients = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);

    const matchStatus =
      statusFilter === "Semua" ||
      (statusFilter === "Aktif" && p.status === "ACTIVE") ||
      (statusFilter === "Nonaktif" && p.status === "INACTIVE");

    const matchGender =
      genderFilter === "Semua" ||
      (genderFilter === "Laki-laki" && p.gender === "MALE") ||
      (genderFilter === "Perempuan" && p.gender === "FEMALE");

    return matchSearch && matchStatus && matchGender;
  });

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === "ACTIVE").length;
  const now = new Date();
  const thisMonth = patients.filter((p) => {
    const d = new Date(p.registered);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  const handleAddPatient = () => {
    if (
      !newPatient.fullName ||
      !newPatient.gender ||
      !newPatient.phone ||
      !newPatient.bloodType
    ) {
      return;
    }
    const entry = {
      id: patients.length + 1,
      name: newPatient.fullName,
      email: newPatient.email || "-",
      age: newPatient.age || "-",
      gender: newPatient.gender === "Laki-laki" ? "MALE" : "FEMALE",
      phone: newPatient.phone,
      bloodType: newPatient.bloodType,
      registered: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "ACTIVE",
      initials: newPatient.fullName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };
    setPatients([entry, ...patients]);
    setNewPatient({
      fullName: "",
      age: "",
      gender: "",
      phone: "",
      bloodType: "",
      email: "",
      address: "",
    });
    setShowModal(false);
  };

  const handleRowClick = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <div>
      <Header
        title="Pasien"
        subtitle={`Total ${totalPatients} pasien terdaftar`}
      />

      <div className="grid-3 mb-6">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon-blue">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-card-label">Total Pasien</div>
          <div className="stat-card-value">{totalPatients}</div>
          <div className="stat-card-sub">terdaftar</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon-green">
              <UserCheck size={20} />
            </div>
          </div>
          <div className="stat-card-label">Pasien Aktif</div>
          <div className="stat-card-value">{activePatients}</div>
          <div className="stat-card-sub">aktif saat ini</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon-amber">
              <Plus size={20} />
            </div>
          </div>
          <div className="stat-card-label">Baru Bulan Ini</div>
          <div className="stat-card-value">{thisMonth}</div>
          <div className="stat-card-sub">bulan ini</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="filters">
          <div className="filter-input-wrapper">
            <Search size={16} className="filter-input-icon" />
            <input
              type="text"
              placeholder="Cari pasien..."
              className="filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
          <select
            className="filter-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="Semua">Semua Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Tambah Pasien
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Umur</th>
              <th>Jenis Kelamin</th>
              <th>Telepon</th>
              <th>Golongan Darah</th>
              <th>Terdaftar</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="8" className="table-empty">
                  Tidak ada pasien ditemukan.
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => handleRowClick(patient.id)}
                  className="table-row-clickable"
                >
                  <td>
                    <div className="patient-cell">
                      <div className="avatar avatar-sm">{patient.initials}</div>
                      <div className="patient-cell-info">
                        <span className="patient-cell-name">
                          {patient.name}
                        </span>
                        <span className="patient-cell-email">
                          {patient.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{genderLabel(patient.gender)}</td>
                  <td>
                    <div className="phone-cell">
                      <Phone size={14} />
                      {patient.phone}
                    </div>
                  </td>
                  <td>{patient.bloodType}</td>
                  <td>{patient.registered}</td>
                  <td>
                    <StatusBadge
                      status={
                        patient.status === "ACTIVE" ? "success" : "danger"
                      }
                    >
                      {statusLabel(patient.status)}
                    </StatusBadge>
                  </td>
                  <td>
                    <ChevronRight size={16} className="action-icon" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Pasien Baru</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={newPatient.fullName}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, fullName: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Umur</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Umur"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    className="form-select"
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value })
                    }
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Telepon</label>
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="Nomor telepon"
                    value={newPatient.phone}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Golongan Darah</label>
                  <select
                    className="form-select"
                    value={newPatient.bloodType}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        bloodType: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih golongan darah</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Alamat email"
                  value={newPatient.email}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Alamat</label>
                <textarea
                  className="form-textarea"
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                  value={newPatient.address}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleAddPatient}>
                Simpan Pasien
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
