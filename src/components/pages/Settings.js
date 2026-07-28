import React, { useState } from "react";
import { User, Bell, Palette } from "lucide-react";
import { Header } from "../layout/Header";

function ToggleSwitch({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "var(--color-primary)" : "var(--color-gray-200)",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          transition: "left 0.2s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
}

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    appointments: true,
    payments: true,
    reports: false,
  });

  const toggleNotif = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <Header
        title="Pengaturan"
        subtitle="Kelola pengaturan akun dan aplikasi"
      />

      <div style={{ maxWidth: 800 }}>
        <div className="card mb-5">
          <div className="card-p">
            <div className="flex items-center gap-2 mb-5">
              <User size={20} style={{ color: "var(--color-primary-600)" }} />
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-gray-900)",
                }}
              >
                Profil
              </h3>
            </div>
            <div className="grid-2 gap-3">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-input"
                  defaultValue="Admin Utama"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  defaultValue="admin@klinika.uz"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">Telepon</label>
                <input
                  type="text"
                  className="form-input"
                  defaultValue="+998 90 000 00 00"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">Peran</label>
                <input
                  type="text"
                  className="form-input"
                  defaultValue="Administrator"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-p">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={20} style={{ color: "var(--color-warning-600)" }} />
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-gray-900)",
                }}
              >
                Notifikasi
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  key: "email",
                  label: "Notifikasi Email",
                  desc: "Terima notifikasi melalui email",
                },
                {
                  key: "push",
                  label: "Notifikasi Push",
                  desc: "Terima notifikasi push di browser",
                },
                {
                  key: "sms",
                  label: "Notifikasi SMS",
                  desc: "Terima notifikasi melalui SMS",
                },
                {
                  key: "appointments",
                  label: "Pengingat Janji Temu",
                  desc: "Pengingat 1 jam sebelum jadwal",
                },
                {
                  key: "payments",
                  label: "Notifikasi Pembayaran",
                  desc: "Notifikasi saat pembayaran diterima",
                },
                {
                  key: "reports",
                  label: "Laporan Mingguan",
                  desc: "Ringkasan aktivitas mingguan",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between"
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid var(--color-border-light)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--color-gray-800)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--color-gray-400)",
                        marginTop: 2,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={notifications[item.key]}
                    onChange={() => toggleNotif(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-p">
            <div className="flex items-center gap-2 mb-5">
              <Palette size={20} style={{ color: "var(--color-violet-600)" }} />
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-gray-900)",
                }}
              >
                Tampilan
              </h3>
            </div>
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "var(--color-gray-400)",
                fontSize: 14,
              }}
            >
              Pengaturan tampilan akan segera tersedia.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
