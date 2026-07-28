import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Phone, Mail, Plus, X } from "lucide-react";
import { doctors as initialDoctors } from "../../data/mockData";
import { StatusBadge } from "../shared/StatusBadge";
import { Header } from "../layout/Header";

const specializations = [
  "Semua",
  "Kardiolog",
  "Pediatr",
  "Nevropatolog",
  "Ginekolog",
  "Jarroh",
];

const avatarGradients = [
  "linear-gradient(135deg, #60A5FA, #22D3EE)",
  "linear-gradient(135deg, #34D399, #2DD4BF)",
  "linear-gradient(135deg, #A78BFA, #818CF8)",
  "linear-gradient(135deg, #F472B6, #FB7185)",
  "linear-gradient(135deg, #FBBF24, #F97316)",
];

function getInitials(name) {
  const parts = name.replace(/Dr\.\s?/, "").split(" ");
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
}

export function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState(initialDoctors);
  const [activeSpec, setActiveSpec] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [form, setForm] = useState({
    name: "",
    specialization: "Kardiolog",
    experience: "",
    phone: "",
    email: "",
  });

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const filtered = doctors.filter((d) => {
    const matchSpec = activeSpec === "Semua" || d.specialization === activeSpec;
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSpec && matchSearch && matchStatus;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      showNotif("Harus mengisi nama, telepon, dan email");
      return;
    }
    const newDoctor = {
      id: "d" + (doctors.length + 1),
      name: form.name,
      specialization: form.specialization,
      experience: parseInt(form.experience, 10) || 0,
      phone: form.phone,
      email: form.email,
      status: "active",
      rating: 0,
      patients: 0,
      bio: "",
      schedule: [],
    };
    setDoctors([...doctors, newDoctor]);
    setForm({
      name: "",
      specialization: "Kardiolog",
      experience: "",
      phone: "",
      email: "",
    });
    setShowModal(false);
    showNotif("Dokter berhasil ditambahkan");
  };

  return (
    <div>
      {notification && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "12px 20px",
            background: "var(--color-success)",
            color: "white",
            borderRadius: "var(--radius-md)",
            fontSize: 14,
            fontWeight: 500,
            zIndex: 100,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {notification}
        </div>
      )}

      <Header
        title="Dokter"
        subtitle={`${filtered.length} dari ${doctors.length} dokter`}
        action={{ label: "Tambah Dokter", onClick: () => setShowModal(true) }}
      />

      <div className="filter-tabs mb-5">
        {specializations.map((spec) => (
          <button
            key={spec}
            className={`filter-tab ${activeSpec === spec ? "filter-tab-active" : ""}`}
            onClick={() => setActiveSpec(spec)}
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="filters mb-5">
        <div className="filter-input-wrapper">
          <Search size={16} className="filter-input-icon" />
          <input
            type="text"
            placeholder="Cari dokter..."
            className="filter-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Search size={24} />
          </div>
          <div className="empty-state-text">Tidak ada dokter ditemukan</div>
          <div className="empty-state-sub">
            Coba ubah filter atau kata kunci pencarian
          </div>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((doctor, index) => (
            <div
              key={doctor.id}
              className="doctor-card"
              onClick={() => navigate(`/doctors/${doctor.id}`)}
            >
              <div className="doctor-card-header">
                <div className="doctor-card-info">
                  <div
                    className="doctor-card-avatar"
                    style={{
                      background:
                        avatarGradients[index % avatarGradients.length],
                    }}
                  >
                    {getInitials(doctor.name)}
                  </div>
                  <div>
                    <h3 className="doctor-card-name">{doctor.name}</h3>
                    <p className="doctor-card-spec">{doctor.specialization}</p>
                  </div>
                </div>
                <StatusBadge status={doctor.status} />
              </div>

              <div className="doctor-card-contact">
                <div className="doctor-card-contact-item">
                  <Phone size={14} />
                  <span>{doctor.phone}</span>
                </div>
                <div className="doctor-card-contact-item">
                  <Mail size={14} />
                  <span>{doctor.email}</span>
                </div>
              </div>

              <div className="doctor-card-footer">
                <div className="doctor-card-stats">
                  <div className="doctor-card-stat">
                    <div className="doctor-card-stat-value">
                      {doctor.patients}
                    </div>
                    <div className="doctor-card-stat-label">Pasien</div>
                  </div>
                  <div className="doctor-card-divider" />
                  <div className="doctor-card-stat">
                    <div className="doctor-card-stat-value">
                      {doctor.experience}
                    </div>
                    <div className="doctor-card-stat-label">Tahun</div>
                  </div>
                </div>
                <div className="doctor-card-rating">
                  <Star
                    size={14}
                    fill="var(--color-warning)"
                    color="var(--color-warning)"
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--color-gray-800)",
                    }}
                  >
                    {doctor.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Tambah Dokter Baru</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Dr. ..."
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Spesialisasi</label>
                  <select
                    name="specialization"
                    className="form-select"
                    value={form.specialization}
                    onChange={handleChange}
                  >
                    {specializations
                      .filter((s) => s !== "Semua")
                      .map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tahun Pengalaman</label>
                  <input
                    type="number"
                    name="experience"
                    className="form-input"
                    placeholder="0"
                    min="0"
                    value={form.experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Telepon</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-input"
                    placeholder="+998 XX XXX XX XX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="email@klinika.uz"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
