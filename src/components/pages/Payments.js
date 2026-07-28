import React, { useState } from "react";
import {
  Search,
  Clock,
  XCircle,
  TrendingUp,
  Check,
  Ban,
  Eye,
} from "lucide-react";
import { payments, getPatientById, formatCurrency } from "../../data/mockData";
import { Header } from "../layout/Header";
import { StatusBadge } from "../shared/StatusBadge";

const statusFilters = ["Semua", "Dibayar", "Menunggu", "Gagal"];
const methodFilters = ["Semua", "Kartu", "Tunai", "Transfer"];

const avatarColors = [
  "#60A5FA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#FB923C",
];

export function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("Semua");
  const [activeMethod, setActiveMethod] = useState("Semua");

  const filtered = payments.filter((pay) => {
    const patient = getPatientById(pay.patientId);
    const matchSearch =
      !searchTerm ||
      (patient &&
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pay.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      activeStatus === "Semua" ||
      (activeStatus === "Dibayar" && pay.status === "paid") ||
      (activeStatus === "Menunggu" && pay.status === "pending") ||
      (activeStatus === "Gagal" && pay.status === "failed");
    const matchMethod =
      activeMethod === "Semua" ||
      (activeMethod === "Kartu" && pay.method === "card") ||
      (activeMethod === "Tunai" && pay.method === "cash") ||
      (activeMethod === "Transfer" && pay.method === "transfer");
    return matchSearch && matchStatus && matchMethod;
  });

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + p.amount, 0);
  const totalFailed = payments
    .filter((p) => p.status === "failed")
    .reduce((s, p) => s + p.amount, 0);
  const totalRevenue = totalPaid + totalPending;

  const summaryCards = [
    {
      label: "Dibayar",
      value: formatCurrency(totalPaid),
      icon: <Check size={20} />,
      iconClass: "stat-card-icon-green",
    },
    {
      label: "Menunggu",
      value: formatCurrency(totalPending),
      icon: <Clock size={20} />,
      iconClass: "stat-card-icon-amber",
    },
    {
      label: "Gagal",
      value: formatCurrency(totalFailed),
      icon: <XCircle size={20} />,
      iconClass: "stat-card-icon-blue",
    },
    {
      label: "Total Pendapatan",
      value: formatCurrency(totalRevenue),
      icon: <TrendingUp size={20} />,
      iconClass: "stat-card-icon-violet",
    },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 3500000 },
    { month: "Feb", revenue: 4200000 },
    { month: "Mar", revenue: 3800000 },
    { month: "Apr", revenue: 5100000 },
    { month: "Mei", revenue: 4700000 },
    { month: "Jun", revenue: 5600000 },
    { month: "Jul", revenue: 5200000 },
  ];
  const maxMonthly = Math.max(...monthlyData.map((d) => d.revenue));

  const totalByMethod = { card: 0, cash: 0, transfer: 0 };
  payments.forEach((p) => {
    totalByMethod[p.method] = (totalByMethod[p.method] || 0) + p.amount;
  });
  const totalAll = Object.values(totalByMethod).reduce((a, b) => a + b, 0);
  const methodBreakdown = [
    { key: "card", label: "Kartu", color: "var(--color-primary)" },
    { key: "cash", label: "Tunai", color: "var(--color-success)" },
    { key: "transfer", label: "Transfer", color: "var(--color-violet)" },
  ];

  return (
    <div>
      <Header title="Pembayaran" subtitle="Kelola data pembayaran pasien" />

      <div className="grid-4 mb-6">
        {summaryCards.map((card, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-card-header">
              <div className={`stat-card-icon ${card.iconClass}`}>
                {card.icon}
              </div>
            </div>
            <div className="stat-card-label">{card.label}</div>
            <div className="stat-card-value">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-sidebar mb-6">
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
              Pendapatan Bulanan
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                height: 160,
              }}
            >
              {monthlyData.map((item, idx) => {
                const heightPercent = (item.revenue / maxMonthly) * 100;
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
                          idx === monthlyData.length - 1
                            ? "var(--color-primary)"
                            : "var(--color-primary-100)",
                        borderRadius: "6px 6px 2px 2px",
                        transition: "height 0.3s ease",
                      }}
                      title={`${item.month}: ${formatCurrency(item.revenue)}`}
                    />
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
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-gray-900)",
              }}
            >
              Metode Pembayaran
            </h3>
            <div className="space-y-4">
              {methodBreakdown.map((m) => {
                const percent =
                  totalAll > 0 ? (totalByMethod[m.key] / totalAll) * 100 : 0;
                return (
                  <div key={m.key}>
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
                        {m.label}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "var(--color-gray-400)" }}
                      >
                        {formatCurrency(totalByMethod[m.key])}
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
                          width: `${percent}%`,
                          height: "100%",
                          background: m.color,
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
      </div>

      <div className="filters mb-5">
        <div className="filter-input-wrapper">
          <Search size={16} className="filter-input-icon" />
          <input
            type="text"
            placeholder="Cari pasien atau deskripsi..."
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
        >
          {statusFilters.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={activeMethod}
          onChange={(e) => setActiveMethod(e.target.value)}
        >
          {methodFilters.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Deskripsi</th>
              <th>Tanggal</th>
              <th>Metode</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="table-empty">Tidak ada data pembayaran</div>
                </td>
              </tr>
            ) : (
              filtered.map((pay, idx) => {
                const patient = getPatientById(pay.patientId);
                const initials = patient
                  ? patient.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "?";
                return (
                  <tr key={pay.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="avatar avatar-sm"
                          style={{
                            background: avatarColors[idx % avatarColors.length],
                          }}
                        >
                          {initials}
                        </div>
                        <span
                          style={{
                            fontWeight: 500,
                            color: "var(--color-gray-900)",
                          }}
                        >
                          {patient ? patient.name : "-"}
                        </span>
                      </div>
                    </td>
                    <td>{pay.description}</td>
                    <td>{pay.date}</td>
                    <td>
                      <StatusBadge status={pay.method} />
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {formatCurrency(pay.amount)}
                    </td>
                    <td>
                      <StatusBadge status={pay.status} />
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {pay.status === "pending" && (
                          <>
                            <button className="table-action-btn table-action-btn-success">
                              <Check
                                size={12}
                                style={{
                                  marginRight: 4,
                                  verticalAlign: "middle",
                                }}
                              />
                              Konfirmasi
                            </button>
                            <button className="table-action-btn table-action-btn-danger">
                              <Ban
                                size={12}
                                style={{
                                  marginRight: 4,
                                  verticalAlign: "middle",
                                }}
                              />
                              Tolak
                            </button>
                          </>
                        )}
                        {pay.status !== "pending" && (
                          <button
                            className="table-action-btn table-action-btn-success"
                            style={{
                              background: "var(--color-gray-50)",
                              color: "var(--color-gray-500)",
                            }}
                          >
                            <Eye size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
