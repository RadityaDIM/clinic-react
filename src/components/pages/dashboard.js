import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  TrendingUp,
  Stethoscope,
  ArrowUpRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  analyticsData,
  appointments as mockAppointments,
  doctors,
  formatCurrency,
  getPatientById,
  getDoctorById,
} from "../../data/mockData";
import { StatusBadge } from "../shared/StatusBadge";
import { Header } from "../layout/Header";
import { dashboardService } from "../../services/dashboardService";

const maxRevenue = Math.max(
  ...analyticsData.monthlyRevenue.map((d) => d.revenue),
);
const maxDeptAppointments = Math.max(
  ...analyticsData.departmentStats.map((d) => d.appointments),
);

const avatars = [
  "#60A5FA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#FB923C",
];

export function Dashboard() {
  const navigate = useNavigate();
  const [apiPatients, setApiPatients] = useState([]);
  const [apiAppointments, setApiAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsRes, appointmentsRes] = await Promise.all([
          dashboardService.getPatients(),
          dashboardService.displayAppointment(),
        ]);
        setApiPatients(patientsRes.data.data || []);
        setApiAppointments(appointmentsRes.data.data || []);
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayAppointments = apiAppointments.filter((a) => {
    const dateStr = a.appointmentDate || a.date;
    return dateStr && dateStr.startsWith(todayStr);
  });

  const activeDoctors = doctors.filter((d) => d.status === "active");

  const statCards = [
    {
      label: "Total Pasien",
      value: apiPatients.length,
      trend: "+12%",
      sub: "dari bulan lalu",
      icon: <Users size={20} />,
      iconClass: "stat-card-icon-blue",
    },
    {
      label: "Janji Temu",
      value: apiAppointments.length,
      trend: "+8%",
      sub: "minggu ini",
      icon: <Calendar size={20} />,
      iconClass: "stat-card-icon-green",
    },
    {
      label: "Total Pendapatan",
      value: formatCurrency(71400000),
      trend: "+18%",
      sub: "dari bulan lalu",
      icon: <TrendingUp size={20} />,
      iconClass: "stat-card-icon-violet",
    },
    {
      label: "Dokter Aktif",
      value: activeDoctors.length,
      trend: "+2",
      sub: "baru bulan ini",
      icon: <Stethoscope size={20} />,
      iconClass: "stat-card-icon-amber",
    },
  ];

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Selamat datang kembali! Berikut ringkasan klinik hari ini."
        action={{
          label: "Janji Baru",
          onClick: () => navigate("/appointments"),
        }}
      />

      <div className="grid-4 mb-6">
        {statCards.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-card-header">
              <div className={`stat-card-icon ${stat.iconClass}`}>
                {stat.icon}
              </div>
              <div className="stat-card-trend">
                <ArrowUpRight size={12} />
                {stat.trend}
              </div>
            </div>
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-value">
              {loading ? "..." : stat.value}
            </div>
            <div className="stat-card-sub">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-sidebar mb-6">
        <div className="card">
          <div className="card-p">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--color-gray-900)",
                  }}
                >
                  Pendapatan Bulanan
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 13,
                    color: "var(--color-gray-400)",
                  }}
                >
                  Tren pendapatan 12 bulan terakhir
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                height: 180,
                paddingTop: 8,
              }}
            >
              {analyticsData.monthlyRevenue.map((item, idx) => {
                const heightPercent = (item.revenue / maxRevenue) * 100;
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${heightPercent}%`,
                        minHeight: 8,
                        background:
                          idx === analyticsData.monthlyRevenue.length - 1
                            ? "var(--color-primary)"
                            : "var(--color-primary-100)",
                        borderRadius: "6px 6px 2px 2px",
                        transition: "height 0.3s ease",
                        position: "relative",
                      }}
                      title={`${item.month}: ${formatCurrency(item.revenue)}`}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: -18,
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: 10,
                          fontWeight: 500,
                          color: "var(--color-gray-400)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatCurrency(item.revenue).replace(" so'm", "jt")}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: 11, color: "var(--color-gray-400)" }}
                    >
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-p">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--color-gray-900)",
                  }}
                >
                  Janji Hari Ini
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 13,
                    color: "var(--color-gray-400)",
                  }}
                >
                  {todayAppointments.length} janji temu terjadwal
                </p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate("/appointments")}
              >
                Lihat Semua
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="empty-state" style={{ padding: 32 }}>
                  <div className="empty-state-text">Memuat data...</div>
                </div>
              ) : todayAppointments.length === 0 ? (
                <div className="empty-state" style={{ padding: 32 }}>
                  <div className="empty-state-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="empty-state-text">
                    Tidak ada janji hari ini
                  </div>
                </div>
              ) : (
                todayAppointments.map((appt, idx) => {
                  const patientName = appt.patientName || "-";
                  const doctorName = appt.doctorName || "-";
                  const initials = patientName
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const bgColor = avatars[idx % avatars.length];

                  return (
                    <div className="item-row" key={appt.id || idx}>
                      <div
                        className="avatar avatar-md"
                        style={{ background: bgColor }}
                      >
                        {initials}
                      </div>
                      <div className="item-row-content">
                        <div className="item-row-title">{patientName}</div>
                        <div className="item-row-sub">{doctorName}</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            color: "var(--color-gray-400)",
                            fontSize: 13,
                          }}
                        >
                          <Clock size={14} />
                          {appt.appointmentTime || appt.time || "-"}
                        </div>
                        <StatusBadge status={appt.status} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-sidebar mb-6">
        <div className="card">
          <div className="card-p">
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-gray-900)",
              }}
            >
              Statistik Per Departemen
            </h3>
            <div className="space-y-4">
              {analyticsData.departmentStats.map((dept, idx) => {
                const widthPercent =
                  (dept.appointments / maxDeptAppointments) * 100;
                const colors = [
                  "var(--color-primary)",
                  "var(--color-success)",
                  "var(--color-violet)",
                  "var(--color-warning)",
                  "var(--color-danger)",
                  "var(--color-cyan)",
                ];
                return (
                  <div key={idx}>
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: 6 }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--color-gray-700)",
                        }}
                      >
                        {dept.name}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "var(--color-gray-400)" }}
                      >
                        {dept.appointments} janji
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: 8,
                        background: "var(--color-gray-100)",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${widthPercent}%`,
                          height: "100%",
                          background: colors[idx % colors.length],
                          borderRadius: 4,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-p">
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-gray-900)",
              }}
            >
              Ringkasan Mingguan
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                height: 140,
              }}
            >
              {analyticsData.weeklyAppointments.map((item, idx) => {
                const heightPercent =
                  (item.value /
                    Math.max(
                      ...analyticsData.weeklyAppointments.map((d) => d.value),
                    )) *
                  100;
                const isToday =
                  idx === new Date().getDay() - 1 ||
                  (new Date().getDay() === 0 && idx === 5);
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--color-gray-700)",
                      }}
                    >
                      {item.value}
                    </span>
                    <div
                      style={{
                        width: "100%",
                        height: `${heightPercent}%`,
                        minHeight: 8,
                        background: isToday
                          ? "var(--color-primary)"
                          : "var(--color-primary-100)",
                        borderRadius: 6,
                        transition: "height 0.3s ease",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: isToday ? 600 : 400,
                        color: isToday
                          ? "var(--color-primary-700)"
                          : "var(--color-gray-400)",
                      }}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--color-border-light)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-gray-900)",
                }}
              >
                Status Janji Temu
              </h4>
              <div className="grid-2" style={{ gap: 8 }}>
                {[
                  {
                    label: "Selesai",
                    count: apiAppointments.filter(
                      (a) => a.status === "COMPLETED",
                    ).length,
                    color: "var(--color-success)",
                  },
                  {
                    label: "Dijadwalkan",
                    count: apiAppointments.filter(
                      (a) => a.status === "RESERVED",
                    ).length,
                    color: "var(--color-primary)",
                  },
                  {
                    label: "Menunggu",
                    count: apiAppointments.filter((a) => a.status === "PENDING")
                      .length,
                    color: "var(--color-warning)",
                  },
                  {
                    label: "Dibatalkan",
                    count: apiAppointments.filter(
                      (a) => a.status === "CANCELLED",
                    ).length,
                    color: "var(--color-danger)",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      background: "var(--color-gray-50)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontSize: 12, color: "var(--color-gray-400)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--color-gray-900)",
                        }}
                      >
                        {loading ? "..." : item.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
