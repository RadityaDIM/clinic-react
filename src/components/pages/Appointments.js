import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  X,
  Calendar,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  appointments as initialAppts,
  doctors,
  patients,
  getPatientById,
  getDoctorById,
} from "../../data/mockData";
import { StatusBadge } from "../shared/StatusBadge";
import { Header } from "../layout/Header";
import { dashboardService } from "../../services/dashboardService";

const statusLabel = {
  PENDING: "Menunggu",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  RESERVED: "Dijadwalkan",
  RESCHEDULED: "Dijadwal Ulang",
};

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const DAY_NAMES_FULL = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateDisplay(d) {
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [view, setView] = useState("list");
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [showModal, setShowModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    room: "",
  });

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await dashboardService.displayAppointment();
        if (response && response.data && response.data.length > 0) {
          setAppointments(response.data);
        } else {
          setAppointments(initialAppts);
        }
      } catch {
        setAppointments(initialAppts);
      }
    }
    fetchAppointments();
  }, []);

  const filtered = appointments.filter((a) => {
    if (statusFilter && a.status !== statusFilter) return false;
    if (doctorFilter && a.doctorId !== doctorFilter) return false;
    if (search) {
      const patient = getPatientById(a.patientId);
      const doctor = getDoctorById(a.doctorId);
      const q = search.toLowerCase();
      const patientMatch = patient && patient.name.toLowerCase().includes(q);
      const doctorMatch = doctor && doctor.name.toLowerCase().includes(q);
      const reasonMatch = a.reason && a.reason.toLowerCase().includes(q);
      if (!patientMatch && !doctorMatch && !reasonMatch) return false;
    }
    return true;
  });

  const countScheduled = filtered.filter((a) => a.status === "RESERVED").length;
  const countInProgress = filtered.filter((a) => a.status === "PENDING").length;
  const countCompleted = filtered.filter(
    (a) => a.status === "COMPLETED",
  ).length;
  const countCancelled = filtered.filter(
    (a) => a.status === "CANCELLED",
  ).length;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await dashboardService.updateAppointment(id, newStatus);
    } catch {
      // fallback: update local only
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
  };

  const handleAddAppointment = () => {
    const appt = {
      id: "a" + Date.now(),
      patientId: newAppt.patientId,
      doctorId: newAppt.doctorId,
      date: newAppt.date,
      time: newAppt.time,
      reason: newAppt.reason,
      room: newAppt.room,
      status: "RESERVED",
    };
    setAppointments((prev) => [...prev, appt]);
    setNewAppt({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
      room: "",
    });
    setShowModal(false);
  };

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    weekDays.push(d);
  }

  const weekAppts = filtered.filter((a) => {
    const apptDate = new Date(a.date);
    return weekDays.some((wd) => isSameDay(wd, apptDate));
  });

  const statusCards = [
    {
      key: "RESERVED",
      label: "Dijadwalkan",
      count: countScheduled,
      activeClass: "status-summary-card-active-blue",
    },
    {
      key: "PENDING",
      label: "Dalam Proses",
      count: countInProgress,
      activeClass: "status-summary-card-active-amber",
    },
    {
      key: "COMPLETED",
      label: "Selesai",
      count: countCompleted,
      activeClass: "status-summary-card-active-green",
    },
    {
      key: "CANCELLED",
      label: "Dibatalkan",
      count: countCancelled,
      activeClass: "status-summary-card-active-red",
    },
  ];

  return (
    <div>
      <Header
        title="Janji Temu"
        subtitle={`Total ${filtered.length} janji temu`}
        action={{
          label: "Janji Temu Baru",
          onClick: () => navigate("/book/appointment"),
        }}
      />
      {/* <Link to="/book/appointment" className="btn btn-dark">
        Janji Temu Baru
      </Link> */}

      <div className="flex items-center justify-between mb-5">
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${view === "list" ? "view-toggle-btn-active" : ""}`}
            onClick={() => setView("list")}
          >
            <List size={14} />
            Daftar
          </button>
          <button
            className={`view-toggle-btn ${view === "calendar" ? "view-toggle-btn-active" : ""}`}
            onClick={() => setView("calendar")}
          >
            <Calendar size={14} />
            Kalender
          </button>
        </div>
      </div>

      <div className="status-summary mb-5">
        {statusCards.map((sc) => (
          <button
            key={sc.key}
            className={`status-summary-card ${statusFilter === sc.key ? sc.activeClass : ""}`}
            onClick={() =>
              setStatusFilter(statusFilter === sc.key ? "" : sc.key)
            }
          >
            <div className="status-summary-value">{sc.count}</div>
            <div className="status-summary-label">{sc.label}</div>
          </button>
        ))}
      </div>

      <div className="filters mb-5">
        <div className="filter-input-wrapper">
          <Search size={16} className="filter-input-icon" />
          <input
            type="text"
            placeholder="Cari pasien, dokter, atau alasan..."
            className="filter-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
        >
          <option value="">Semua Dokter</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {view === "list" && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Pasien</th>
                <th>Dokter</th>
                <th>Tanggal & Waktu</th>
                <th>Alasan</th>
                <th>Ruangan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty">
                    Tidak ada janji temu ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((appt) => {
                  const patient = getPatientById(appt.patientId);
                  const doctor = getDoctorById(appt.doctorId);
                  return (
                    <tr key={appt.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar avatar-sm avatar-gradient-blue">
                            {patient ? patient.name.charAt(0) : "?"}
                          </div>
                          <span style={{ fontWeight: 500 }}>
                            {patient ? patient.name : "-"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 14 }}>
                            {doctor ? doctor.name : "-"}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--color-primary-600)",
                            }}
                          >
                            {doctor ? doctor.specialization : ""}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className="flex items-center gap-2"
                          style={{ fontSize: 13 }}
                        >
                          <Calendar
                            size={14}
                            style={{ color: "var(--color-gray-400)" }}
                          />
                          {appt.date}
                          <Clock
                            size={14}
                            style={{ color: "var(--color-gray-400)" }}
                          />
                          {appt.time}
                        </div>
                      </td>
                      <td>{appt.reason || "-"}</td>
                      <td>{appt.room || "-"}</td>
                      <td>
                        <StatusBadge status={appt.status} />
                      </td>
                      <td>
                        <select
                          className="filter-select"
                          value={appt.status}
                          onChange={(e) =>
                            handleStatusChange(appt.id, e.target.value)
                          }
                          style={{ fontSize: 12, padding: "4px 8px" }}
                        >
                          <option value="RESERVED">Dijadwalkan</option>
                          <option value="PENDING">Menunggu</option>
                          <option value="COMPLETED">Selesai</option>
                          <option value="CANCELLED">Dibatalkan</option>
                          <option value="RESCHEDULED">Dijadwal Ulang</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "calendar" && (
        <div className="card">
          <div className="calendar-header">
            <button
              className="calendar-nav-btn"
              onClick={() => {
                const d = new Date(weekStart);
                d.setDate(d.getDate() - 7);
                setWeekStart(d);
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <span
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: "var(--color-gray-800)",
              }}
            >
              {formatDateDisplay(weekStart)} — {formatDateDisplay(weekDays[6])}
            </span>
            <button
              className="calendar-nav-btn"
              onClick={() => {
                const d = new Date(weekStart);
                d.setDate(d.getDate() + 7);
                setWeekStart(d);
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px repeat(7, 1fr)",
                minWidth: 700,
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid var(--color-border-light)",
                  borderRight: "1px solid var(--color-border-light)",
                }}
              />
              {weekDays.map((d, i) => {
                const today = isSameDay(d, new Date());
                return (
                  <div
                    key={i}
                    style={{
                      padding: "10px 4px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--color-border-light)",
                      borderRight:
                        i < 6 ? "1px solid var(--color-border-light)" : "none",
                      background: today
                        ? "var(--color-primary-light)"
                        : "transparent",
                    }}
                  >
                    <div
                      style={{ fontSize: 11, color: "var(--color-gray-400)" }}
                    >
                      {DAY_NAMES[i]}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: today
                          ? "var(--color-primary-700)"
                          : "var(--color-gray-800)",
                        marginTop: 2,
                      }}
                    >
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}

              {HOURS.map((hour) => (
                <React.Fragment key={hour}>
                  <div
                    style={{
                      padding: "6px 8px",
                      fontSize: 11,
                      color: "var(--color-gray-400)",
                      borderBottom: "1px solid var(--color-border-light)",
                      borderRight: "1px solid var(--color-border-light)",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingTop: 4,
                    }}
                  >
                    {hour}
                  </div>
                  {weekDays.map((d, i) => {
                    const cellAppts = weekAppts.filter((a) => {
                      const apptDate = new Date(a.date);
                      return (
                        isSameDay(d, apptDate) &&
                        a.time &&
                        a.time.startsWith(hour.substring(0, 2))
                      );
                    });
                    return (
                      <div
                        key={i}
                        style={{
                          padding: "2px 2px",
                          borderBottom: "1px solid var(--color-border-light)",
                          borderRight:
                            i < 6
                              ? "1px solid var(--color-border-light)"
                              : "none",
                          minHeight: 48,
                        }}
                      >
                        {cellAppts.map((a) => {
                          const patient = getPatientById(a.patientId);
                          const colors = {
                            RESERVED: {
                              bg: "var(--color-primary-light)",
                              border: "var(--color-primary-200)",
                              text: "var(--color-primary-700)",
                            },
                            PENDING: {
                              bg: "var(--color-warning-light)",
                              border: "var(--color-warning-100)",
                              text: "var(--color-warning-700)",
                            },
                            COMPLETED: {
                              bg: "var(--color-success-light)",
                              border: "var(--color-success-100)",
                              text: "var(--color-success-700)",
                            },
                            CANCELLED: {
                              bg: "var(--color-danger-light)",
                              border: "var(--color-danger-100)",
                              text: "var(--color-danger-600)",
                            },
                            RESCHEDULED: {
                              bg: "var(--color-violet-light)",
                              border: "#EDE9FE",
                              text: "var(--color-violet-600)",
                            },
                          };
                          const c = colors[a.status] || colors.RESERVED;
                          return (
                            <div
                              key={a.id}
                              style={{
                                background: c.bg,
                                border: `1px solid ${c.border}`,
                                borderRadius: "var(--radius-sm)",
                                padding: "3px 6px",
                                marginBottom: 2,
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 10,
                                  fontWeight: 600,
                                  color: c.text,
                                }}
                              >
                                {a.time} —{" "}
                                {patient ? patient.name.split(" ")[0] : ""}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Janji Temu Baru</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body space-y-4">
              <div className="form-group">
                <label className="form-label">Pasien</label>
                <select
                  className="form-select"
                  value={newAppt.patientId}
                  onChange={(e) =>
                    setNewAppt({ ...newAppt, patientId: e.target.value })
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
                  value={newAppt.doctorId}
                  onChange={(e) =>
                    setNewAppt({ ...newAppt, doctorId: e.target.value })
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
              <div className="flex gap-3">
                <div className="form-group flex-1">
                  <label className="form-label">Tanggal</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newAppt.date}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, date: e.target.value })
                    }
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Waktu</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newAppt.time}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Alasan</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Masukkan alasan kunjungan"
                  value={newAppt.reason}
                  onChange={(e) =>
                    setNewAppt({ ...newAppt, reason: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Ruangan</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nomor ruangan"
                  value={newAppt.room}
                  onChange={(e) =>
                    setNewAppt({ ...newAppt, room: e.target.value })
                  }
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
              <button
                className="btn btn-primary"
                onClick={handleAddAppointment}
                disabled={
                  !newAppt.patientId ||
                  !newAppt.doctorId ||
                  !newAppt.date ||
                  !newAppt.time
                }
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
