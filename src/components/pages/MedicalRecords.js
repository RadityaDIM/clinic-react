import React, { useState } from "react";
import {
  Search,
  FileText,
  User,
  Stethoscope,
  Calendar,
  ClipboardList,
} from "lucide-react";
import {
  medicalRecords,
  patients,
  doctors,
  getPatientById,
  getDoctorById,
} from "../../data/mockData";
import { Header } from "../layout/Header";
import { StatusBadge } from "../shared/StatusBadge";

const typeTabs = ["Semua", "Konsultasi", "MRI", "USG", "EKG", "Pemeriksaan"];

const typeColors = {
  Konsultatsiya: "status-completed",
  MRI: "status-reserved",
  Tekshiruv: "status-pending",
  USG: "status-rescheduled",
  EKG: "status-active",
  Pemeriksaan: "status-transfer",
};

const avatarColors = [
  "#60A5FA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#FB923C",
];

export function MedicalRecords() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("Semua");

  const filteredRecords = medicalRecords.filter((r) => {
    const patient = getPatientById(r.patientId);
    const doctor = getDoctorById(r.doctorId);
    const matchSearch =
      !searchTerm ||
      (patient &&
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doctor &&
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = activeType === "Semua" || r.type === activeType;
    return matchSearch && matchType;
  });

  const selectedRecord = medicalRecords.find((r) => r.id === selectedId);

  return (
    <div>
      <Header title="Rekam Medis" subtitle="Kelola data rekam medis pasien" />

      <div className="filters mb-5">
        <div className="filter-input-wrapper">
          <Search size={16} className="filter-input-icon" />
          <input
            type="text"
            placeholder="Cari pasien, dokter, atau diagnosis..."
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-tabs mb-5">
        {typeTabs.map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${activeType === tab ? "filter-tab-active" : ""}`}
            onClick={() => setActiveType(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid-sidebar">
        <div className="card" style={{ maxHeight: 600, overflowY: "auto" }}>
          <div className="card-p">
            {filteredRecords.length === 0 ? (
              <div className="empty-state" style={{ padding: 40 }}>
                <div className="empty-state-icon">
                  <FileText size={24} />
                </div>
                <div className="empty-state-text">
                  Tidak ada rekam medis ditemukan
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredRecords.map((record) => {
                  const patient = getPatientById(record.patientId);
                  const doctor = getDoctorById(record.doctorId);
                  return (
                    <div
                      key={record.id}
                      className={`item-row ${selectedId === record.id ? "item-row-selected" : ""}`}
                      onClick={() => setSelectedId(record.id)}
                    >
                      <div
                        className="avatar avatar-md"
                        style={{
                          background:
                            avatarColors[
                              patients.indexOf(patient) % avatarColors.length
                            ],
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
                        <div
                          className="flex items-center gap-2"
                          style={{ marginBottom: 2 }}
                        >
                          <span
                            className={`status-badge ${typeColors[record.type] || "status-default"}`}
                          >
                            {record.type}
                          </span>
                          <span className="item-row-sub">{record.date}</span>
                        </div>
                        <div className="item-row-title">
                          {patient ? patient.name : "-"}
                        </div>
                        <div className="item-row-sub">{record.diagnosis}</div>
                        <div className="item-row-sub">
                          {doctor ? doctor.name : "-"}
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
            {selectedRecord ? (
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
                    Detail Rekam Medis
                  </h3>
                  <span
                    className={`status-badge ${typeColors[selectedRecord.type] || "status-default"} status-badge-md`}
                  >
                    {selectedRecord.type}
                  </span>
                </div>

                <div className="space-y-4 mb-5">
                  <div className="detail-section detail-section-gray">
                    <div className="detail-section-title detail-section-title-gray">
                      Diagnosis
                    </div>
                    <div className="detail-section-text">
                      {selectedRecord.diagnosis}
                    </div>
                  </div>
                  <div className="detail-section detail-section-blue">
                    <div className="detail-section-title detail-section-title-blue">
                      Perawatan
                    </div>
                    <div className="detail-section-text">
                      {selectedRecord.treatment}
                    </div>
                  </div>
                  <div className="detail-section detail-section-green">
                    <div className="detail-section-title detail-section-title-green">
                      Catatan
                    </div>
                    <div className="detail-section-text">
                      {selectedRecord.notes}
                    </div>
                  </div>
                </div>

                {(() => {
                  const patient = getPatientById(selectedRecord.patientId);
                  const doctor = getDoctorById(selectedRecord.doctorId);
                  return (
                    <div className="grid-2 gap-3">
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
                          <div className="info-row">
                            <span className="info-label">Gol. Darah</span>
                            <span className="info-value">
                              {patient ? patient.bloodType : "-"}
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
                          <div className="info-row">
                            <span className="info-label">Email</span>
                            <span className="info-value">
                              {doctor ? doctor.email : "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <ClipboardList size={24} />
                </div>
                <div className="empty-state-text">
                  Pilih rekam medis untuk melihat detail
                </div>
                <div className="empty-state-sub">
                  Klik salah satu rekam medis di panel kiri
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
