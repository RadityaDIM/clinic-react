import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  Star,
  Edit,
  Users,
  Calendar,
  Award,
  Clock,
} from "lucide-react";
import {
  doctors,
  appointments,
  patients,
  getPatientById,
  getDoctorById,
} from "../../data/mockData";
import { Header } from "../layout/Header";
import { StatusBadge } from "../shared/StatusBadge";

const daysOrder = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export function DoctorProfile() {
  const { id } = useParams();
  const doctor = getDoctorById(id);

  if (!doctor) {
    return (
      <div>
        <Link to="/doctors" className="back-link">
          <ArrowLeft size={16} /> Kembali ke Daftar Dokter
        </Link>
        <div className="empty-state">
          <div className="empty-state-text">Dokter tidak ditemukan</div>
        </div>
      </div>
    );
  }

  const doctorAppointments = appointments.filter((a) => a.doctorId === id);
  const initials = doctor.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const scheduleMap = {};
  (doctor.schedule || []).forEach((s) => {
    scheduleMap[s.day] = s;
  });

  const recentAppointments = doctorAppointments.slice(0, 5);

  return (
    <div>
      <Link to="/doctors" className="back-link">
        <ArrowLeft size={16} /> Kembali ke Daftar Dokter
      </Link>

      <div className="grid-sidebar">
        <div>
          <div className="card mb-5">
            <div className="card-p">
              <div className="profile-header-inner">
                <div className="avatar avatar-xl profile-avatar-gradient">
                  {initials}
                </div>
                <div className="profile-info">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="profile-name">{doctor.name}</h2>
                      <p className="profile-sub">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="profile-meta">
                    <div className="profile-meta-item">
                      <Star
                        size={16}
                        style={{ color: "var(--color-warning)" }}
                      />
                      <span>{doctor.rating}</span>
                    </div>
                    <div className="profile-meta-item">
                      <Phone size={16} />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="profile-meta-item">
                      <Mail size={16} />
                      <span>{doctor.email}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      color: "var(--color-gray-500)",
                      lineHeight: 1.6,
                    }}
                  >
                    {doctor.bio}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <button className="btn btn-primary btn-sm">
                      <Edit size={14} /> Edit Profil
                    </button>
                  </div>
                </div>
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
                Jadwal Mingguan
              </h3>
              <div className="schedule-grid">
                {daysOrder.map((day) => {
                  const sch = scheduleMap[day];
                  return (
                    <div
                      key={day}
                      className={`schedule-day ${sch ? "schedule-day-active" : ""}`}
                    >
                      <div
                        className="schedule-day-label"
                        style={{
                          color: sch
                            ? "var(--color-primary-700)"
                            : "var(--color-gray-400)",
                        }}
                      >
                        {day}
                      </div>
                      <div
                        className="schedule-day-time"
                        style={{
                          color: sch
                            ? "var(--color-primary-600)"
                            : "var(--color-gray-300)",
                        }}
                      >
                        {sch ? `${sch.from} - ${sch.to}` : "Libur"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="profile-stats mb-5">
            <div className="profile-stat-box" style={{ flex: 1 }}>
              <div className="profile-stat-value">{doctor.patients}</div>
              <div className="profile-stat-label">Pasien</div>
            </div>
            <div className="profile-stat-box" style={{ flex: 1 }}>
              <div className="profile-stat-value">
                {doctorAppointments.length}
              </div>
              <div className="profile-stat-label">Janji Temu</div>
            </div>
            <div className="profile-stat-box" style={{ flex: 1 }}>
              <div className="profile-stat-value">{doctor.experience}</div>
              <div className="profile-stat-label">Tahun Pengalaman</div>
            </div>
            <div className="profile-stat-box" style={{ flex: 1 }}>
              <div className="flex items-center justify-center gap-1">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      doctor.status === "active"
                        ? "var(--color-success)"
                        : "var(--color-gray-300)",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color:
                      doctor.status === "active"
                        ? "var(--color-success-700)"
                        : "var(--color-gray-400)",
                  }}
                >
                  {doctor.status === "active" ? "Aktif" : "Nonaktif"}
                </span>
              </div>
              <div className="profile-stat-label">Status</div>
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
                Janji Temu Terbaru
              </h3>
              <div
                className="table-container"
                style={{ border: "none", boxShadow: "none" }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Pasien</th>
                      <th>Tanggal</th>
                      <th>Waktu</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={4}>
                          <div className="table-empty">
                            Belum ada janji temu
                          </div>
                        </td>
                      </tr>
                    ) : (
                      recentAppointments.map((appt) => {
                        const patient = getPatientById(appt.patientId);
                        return (
                          <tr key={appt.id}>
                            <td
                              style={{
                                fontWeight: 500,
                                color: "var(--color-gray-900)",
                              }}
                            >
                              {patient ? patient.name : "-"}
                            </td>
                            <td>{appt.date}</td>
                            <td>{appt.time}</td>
                            <td>
                              <StatusBadge status={appt.status} />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
