import React, { useState } from "react";
import {
  Search,
  Plus,
  X,
  Trash2,
  Pill,
  User,
  Stethoscope,
  Calendar,
} from "lucide-react";
import {
  prescriptions,
  patients,
  doctors,
  getPatientById,
  getDoctorById,
} from "../../data/mockData";
import { Header } from "../layout/Header";

const avatarColors = [
  "#60A5FA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#FB923C",
];

const emptyMed = { name: "", dosage: "", frequency: "", duration: "" };

export function Prescriptions() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newRx, setNewRx] = useState({
    patientId: "",
    doctorId: "",
    date: new Date().toISOString().slice(0, 10),
    diagnosis: "",
    medications: [{ ...emptyMed }],
    advice: "",
    nextVisit: "",
  });

  const filtered = prescriptions.filter((rx) => {
    const patient = getPatientById(rx.patientId);
    return (
      !searchTerm ||
      (patient &&
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const selected = prescriptions.find((rx) => rx.id === selectedId);

  const handleAddMed = () =>
    setNewRx((prev) => ({
      ...prev,
      medications: [...prev.medications, { ...emptyMed }],
    }));
  const handleRemoveMed = (idx) =>
    setNewRx((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== idx),
    }));
  const handleMedChange = (idx, field, value) => {
    setNewRx((prev) => ({
      ...prev,
      medications: prev.medications.map((m, i) =>
        i === idx ? { ...m, [field]: value } : m,
      ),
    }));
  };

  const handleSubmit = () => {
    setShowModal(false);
    setNewRx({
      patientId: "",
      doctorId: "",
      date: new Date().toISOString().slice(0, 10),
      diagnosis: "",
      medications: [{ ...emptyMed }],
      advice: "",
      nextVisit: "",
    });
  };

  return (
    <div>
      <Header
        title="Resep"
        subtitle="Kelola resep obat pasien"
        action={{ label: "Tambah Resep", onClick: () => setShowModal(true) }}
      />

      <div className="filters mb-5">
        <div className="filter-input-wrapper">
          <Search size={16} className="filter-input-icon" />
          <input
            type="text"
            placeholder="Cari pasien atau diagnosis..."
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid-sidebar">
        <div className="card" style={{ maxHeight: 600, overflowY: "auto" }}>
          <div className="card-p">
            {filtered.length === 0 ? (
              <div className="empty-state" style={{ padding: 40 }}>
                <div className="empty-state-icon">
                  <Pill size={24} />
                </div>
                <div className="empty-state-text">
                  Tidak ada resep ditemukan
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((rx, idx) => {
                  const patient = getPatientById(rx.patientId);
                  return (
                    <div
                      key={rx.id}
                      className={`item-row ${selectedId === rx.id ? "item-row-selected" : ""}`}
                      onClick={() => setSelectedId(rx.id)}
                    >
                      <div
                        className="avatar avatar-md"
                        style={{
                          background: avatarColors[idx % avatarColors.length],
                        }}
                      >
                        {patient
                          ? patient.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()
                          : "?"}
                      </div>
                      <div className="item-row-content">
                        <div className="item-row-title">
                          {patient ? patient.name : "-"}
                        </div>
                        <div className="item-row-sub">{rx.diagnosis}</div>
                        <div
                          className="flex items-center gap-2"
                          style={{ marginTop: 2 }}
                        >
                          <span className="item-row-sub">{rx.date}</span>
                          <span className="item-row-sub">•</span>
                          <span className="item-row-sub">
                            {rx.medications.length} obat
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-p">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--color-gray-900)",
                    }}
                  >
                    Detail Resep
                  </h3>
                </div>

                <div className="detail-section detail-section-blue mb-5">
                  <div className="detail-section-title detail-section-title-blue">
                    Diagnosis
                  </div>
                  <div className="detail-section-text">
                    {selected.diagnosis}
                  </div>
                </div>

                <div className="mb-5">
                  <h4
                    style={{
                      margin: "0 0 12px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-gray-900)",
                    }}
                  >
                    Daftar Obat
                  </h4>
                  <div className="space-y-2">
                    {selected.medications.map((med, idx) => (
                      <div className="med-item" key={idx}>
                        <div className="med-number">{idx + 1}</div>
                        <div className="med-info">
                          <div className="med-name">
                            {med.name}{" "}
                            <span className="med-dosage">({med.dosage})</span>
                          </div>
                          <div className="med-detail">
                            {med.frequency} • {med.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid-2 gap-3 mb-5">
                  {(() => {
                    const patient = getPatientById(selected.patientId);
                    const doctor = getDoctorById(selected.doctorId);
                    return (
                      <>
                        <div className="card">
                          <div className="card-p">
                            <div className="flex items-center gap-2 mb-4">
                              <User
                                size={16}
                                style={{ color: "var(--color-primary-600)" }}
                              />
                              <span
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "var(--color-gray-900)",
                                }}
                              >
                                Pasien
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Nama</span>
                              <span className="info-value">
                                {patient ? patient.name : "-"}
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Usia</span>
                              <span className="info-value">
                                {patient ? patient.age + " tahun" : "-"}
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Telepon</span>
                              <span className="info-value">
                                {patient ? patient.phone : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-p">
                            <div className="flex items-center gap-2 mb-4">
                              <Stethoscope
                                size={16}
                                style={{ color: "var(--color-success-600)" }}
                              />
                              <span
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "var(--color-gray-900)",
                                }}
                              >
                                Dokter
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Nama</span>
                              <span className="info-value">
                                {doctor ? doctor.name : "-"}
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Spesialisasi</span>
                              <span className="info-value">
                                {doctor ? doctor.specialization : "-"}
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Telepon</span>
                              <span className="info-value">
                                {doctor ? doctor.phone : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="detail-section detail-section-amber mb-4">
                  <div className="detail-section-title detail-section-title-amber">
                    Saran
                  </div>
                  <div className="detail-section-text">{selected.advice}</div>
                </div>

                <div
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-gray-500)", fontSize: 14 }}
                >
                  <Calendar size={16} />
                  <span>
                    Kunjungan berikutnya:{" "}
                    <strong style={{ color: "var(--color-gray-800)" }}>
                      {selected.nextVisit}
                    </strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Pill size={24} />
                </div>
                <div className="empty-state-text">
                  Pilih resep untuk melihat detail
                </div>
                <div className="empty-state-sub">
                  Klik salah satu resep di panel kiri
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content modal-content-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Tambah Resep Baru</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="grid-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Pasien</label>
                  <select
                    className="form-select"
                    value={newRx.patientId}
                    onChange={(e) =>
                      setNewRx((prev) => ({
                        ...prev,
                        patientId: e.target.value,
                      }))
                    }
                  >
                    <option value="">Pilih pasien</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Dokter</label>
                  <select
                    className="form-select"
                    value={newRx.doctorId}
                    onChange={(e) =>
                      setNewRx((prev) => ({
                        ...prev,
                        doctorId: e.target.value,
                      }))
                    }
                  >
                    <option value="">Pilih dokter</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newRx.date}
                    onChange={(e) =>
                      setNewRx((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Kunjungan Berikutnya</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newRx.nextVisit}
                    onChange={(e) =>
                      setNewRx((prev) => ({
                        ...prev,
                        nextVisit: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Diagnosis</label>
                <input
                  type="text"
                  className="form-input"
                  value={newRx.diagnosis}
                  onChange={(e) =>
                    setNewRx((prev) => ({ ...prev, diagnosis: e.target.value }))
                  }
                  placeholder="Masukkan diagnosis"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="form-label" style={{ margin: 0 }}>
                    Obat
                  </label>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={handleAddMed}
                  >
                    <Plus size={14} /> Tambah Obat
                  </button>
                </div>
                <div className="space-y-3">
                  {newRx.medications.map((med, idx) => (
                    <div
                      key={idx}
                      className="med-item"
                      style={{ flexDirection: "column", alignItems: "stretch" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--color-gray-700)",
                          }}
                        >
                          Obat {idx + 1}
                        </span>
                        {newRx.medications.length > 1 && (
                          <button
                            className="table-action-btn table-action-btn-danger"
                            onClick={() => handleRemoveMed(idx)}
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                      <div className="grid-2 gap-2">
                        <input
                          className="form-input"
                          placeholder="Nama obat"
                          value={med.name}
                          onChange={(e) =>
                            handleMedChange(idx, "name", e.target.value)
                          }
                        />
                        <input
                          className="form-input"
                          placeholder="Dosis"
                          value={med.dosage}
                          onChange={(e) =>
                            handleMedChange(idx, "dosage", e.target.value)
                          }
                        />
                      </div>
                      <div className="grid-2 gap-2" style={{ marginTop: 8 }}>
                        <input
                          className="form-input"
                          placeholder="Frekuensi"
                          value={med.frequency}
                          onChange={(e) =>
                            handleMedChange(idx, "frequency", e.target.value)
                          }
                        />
                        <input
                          className="form-input"
                          placeholder="Durasi"
                          value={med.duration}
                          onChange={(e) =>
                            handleMedChange(idx, "duration", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Saran</label>
                <textarea
                  className="form-textarea"
                  value={newRx.advice}
                  onChange={(e) =>
                    setNewRx((prev) => ({ ...prev, advice: e.target.value }))
                  }
                  placeholder="Masukkan saran untuk pasien"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Simpan Resep
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
