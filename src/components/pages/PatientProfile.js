import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Droplet,
  Calendar,
  Activity,
} from "lucide-react";
import {
  patients,
  appointments,
  medicalRecords,
  prescriptions,
  payments,
  getPatientById,
  getDoctorById,
  getAppointmentsByPatient,
  getPrescriptionsByPatient,
  getPaymentsByPatient,
  getMedicalRecordsByPatient,
  formatCurrency,
} from "../../data/mockData";
import { Header } from "../layout/Header";
import { StatusBadge } from "../shared/StatusBadge";

const avatarColors = [
  "#60A5FA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#FB923C",
];

export function PatientProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const patient = getPatientById(id);

  if (!patient) {
    return (
      <div>
        <Link to="/patients" className="back-link">
          <ArrowLeft size={16} /> Kembali ke Daftar Pasien
        </Link>
        <div className="empty-state">
          <div className="empty-state-text">Pasien tidak ditemukan</div>
        </div>
      </div>
    );
  }

  const patientAppointments = getAppointmentsByPatient(id);
  const patientMedicalRecords = getMedicalRecordsByPatient(id);
  const patientPrescriptions = getPrescriptionsByPatient(id);
  const patientPayments = getPaymentsByPatient(id);

  const initials = patient.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const completedCount = patientAppointments.filter(
    (a) => a.status === "COMPLETED",
  ).length;

  const tabs = [
    { key: "info", label: "Informasi" },
    {
      key: "records",
      label: "Rekam Medis",
      count: patientMedicalRecords.length,
    },
    {
      key: "prescriptions",
      label: "Resep",
      count: patientPrescriptions.length,
    },
    { key: "payments", label: "Pembayaran", count: patientPayments.length },
  ];

  return (
    <div>
      <Link to="/patients" className="back-link">
        <ArrowLeft size={16} /> Kembali ke Daftar Pasien
      </Link>

      <div className="profile-header mb-5">
        <div className="profile-header-inner">
          <div
            className="avatar avatar-xl"
            style={{
              background:
                avatarColors[patients.indexOf(patient) % avatarColors.length],
            }}
          >
            {initials}
          </div>
          <div className="profile-info">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="profile-name">{patient.name}</h2>
                <p className="profile-sub">
                  {patient.age} tahun •{" "}
                  {patient.gender === "male" ? "Laki-laki" : "Perempuan"}
                </p>
              </div>
            </div>
            <div className="profile-meta">
              <div className="profile-meta-item">
                <Phone size={16} /> {patient.phone}
              </div>
              {patient.email && (
                <div className="profile-meta-item">
                  <Mail size={16} /> {patient.email}
                </div>
              )}
              <div className="profile-meta-item">
                <Droplet size={16} />
                <span className="blood-type-badge">{patient.bloodType}</span>
              </div>
              <div className="profile-meta-item">
                <StatusBadge status={patient.status} />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-stats" style={{ marginTop: 20 }}>
          <div className="profile-stat-box" style={{ flex: 1 }}>
            <div className="profile-stat-value">
              {patientAppointments.length}
            </div>
            <div className="profile-stat-label">Total Janji</div>
          </div>
          <div className="profile-stat-box" style={{ flex: 1 }}>
            <div className="profile-stat-value">{completedCount}</div>
            <div className="profile-stat-label">Selesai</div>
          </div>
          <div className="profile-stat-box" style={{ flex: 1 }}>
            <div className="profile-stat-value">
              {patientPrescriptions.length}
            </div>
            <div className="profile-stat-label">Resep</div>
          </div>
          <div className="profile-stat-box" style={{ flex: 1 }}>
            <div className="profile-stat-value">{patientPayments.length}</div>
            <div className="profile-stat-label">Pembayaran</div>
          </div>
        </div>
      </div>

      <div className="tabs mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`tab-count ${activeTab === tab.key ? "tab-count-active" : "tab-count-inactive"}`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "info" && (
        <div className="grid-sidebar">
          <div className="card">
            <div className="card-p">
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-gray-900)",
                }}
              >
                Informasi Pribadi
              </h3>
              <div className="info-row">
                <span className="info-label">Nama Lengkap</span>
                <span className="info-value">{patient.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Usia</span>
                <span className="info-value">{patient.age} tahun</span>
              </div>
              <div className="info-row">
                <span className="info-label">Jenis Kelamin</span>
                <span className="info-value">
                  {patient.gender === "male" ? "Laki-laki" : "Perempuan"}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Golongan Darah</span>
                <span className="info-value">
                  <span className="blood-type-badge">{patient.bloodType}</span>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Telepon</span>
                <span className="info-value">{patient.phone}</span>
              </div>
              {patient.email && (
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">{patient.email}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Alamat</span>
                <span className="info-value">{patient.address || "-"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Terdaftar</span>
                <span className="info-value">{patient.registeredAt}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-p">
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-gray-900)",
                }}
              >
                Riwayat Janji Temu
              </h3>
              {patientAppointments.length === 0 ? (
                <div className="empty-state" style={{ padding: 40 }}>
                  <div className="empty-state-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="empty-state-text">Belum ada janji temu</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {patientAppointments.map((appt) => {
                    const doctor = getDoctorById(appt.doctorId);
                    return (
                      <div className="item-row" key={appt.id}>
                        <div
                          className="avatar avatar-sm"
                          style={{
                            background: "var(--color-primary-light)",
                            color: "var(--color-primary-600)",
                          }}
                        >
                          <Calendar size={14} />
                        </div>
                        <div className="item-row-content">
                          <div className="item-row-title">
                            {doctor ? doctor.name : "-"}
                          </div>
                          <div className="item-row-sub">
                            {appt.date} • {appt.time} • {appt.reason}
                          </div>
                        </div>
                        <StatusBadge status={appt.status} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "records" && (
        <div className="card">
          <div className="card-p">
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-gray-900)",
              }}
            >
              Rekam Medis
            </h3>
            {patientMedicalRecords.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Activity size={24} />
                </div>
                <div className="empty-state-text">Belum ada rekam medis</div>
              </div>
            ) : (
              <div className="space-y-3">
                {patientMedicalRecords.map((record) => {
                  const doctor = getDoctorById(record.doctorId);
                  return (
                    <div className="card" key={record.id}>
                      <div className="card-p">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="status-badge status-completed">
                              {record.type}
                            </span>
                            <span
                              style={{
                                fontSize: 13,
                                color: "var(--color-gray-400)",
                              }}
                            >
                              {record.date}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: 13,
                              color: "var(--color-gray-400)",
                            }}
                          >
                            {doctor ? doctor.name : "-"}
                          </span>
                        </div>
                        <div className="detail-section detail-section-gray mb-3">
                          <div className="detail-section-title detail-section-title-gray">
                            Diagnosis
                          </div>
                          <div className="detail-section-text">
                            {record.diagnosis}
                          </div>
                        </div>
                        <div className="detail-section detail-section-blue mb-3">
                          <div className="detail-section-title detail-section-title-blue">
                            Perawatan
                          </div>
                          <div className="detail-section-text">
                            {record.treatment}
                          </div>
                        </div>
                        <div className="detail-section detail-section-green">
                          <div className="detail-section-title detail-section-title-green">
                            Catatan
                          </div>
                          <div className="detail-section-text">
                            {record.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "prescriptions" && (
        <div className="card">
          <div className="card-p">
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-gray-900)",
              }}
            >
              Resep
            </h3>
            {patientPrescriptions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Activity size={24} />
                </div>
                <div className="empty-state-text">Belum ada resep</div>
              </div>
            ) : (
              <div className="space-y-3">
                {patientPrescriptions.map((rx) => {
                  const doctor = getDoctorById(rx.doctorId);
                  return (
                    <div className="card" key={rx.id}>
                      <div className="card-p">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "var(--color-gray-900)",
                              }}
                            >
                              {rx.diagnosis}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "var(--color-gray-400)",
                                marginTop: 2,
                              }}
                            >
                              {rx.date} • {doctor ? doctor.name : "-"}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {rx.medications.map((med, idx) => (
                            <div className="med-item" key={idx}>
                              <div className="med-number">{idx + 1}</div>
                              <div className="med-info">
                                <div className="med-name">
                                  {med.name}{" "}
                                  <span className="med-dosage">
                                    ({med.dosage})
                                  </span>
                                </div>
                                <div className="med-detail">
                                  {med.frequency} • {med.duration}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "payments" && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Deskripsi</th>
                <th>Metode</th>
                <th>Jumlah</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patientPayments.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="table-empty">Belum ada data pembayaran</div>
                  </td>
                </tr>
              ) : (
                patientPayments.map((pay) => (
                  <tr key={pay.id}>
                    <td>{pay.date}</td>
                    <td>{pay.description}</td>
                    <td>
                      <StatusBadge status={pay.method} />
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {formatCurrency(pay.amount)}
                    </td>
                    <td>
                      <StatusBadge status={pay.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
