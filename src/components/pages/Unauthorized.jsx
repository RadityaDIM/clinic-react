import React from "react";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-gray-800)",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>403</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Akses Ditolak</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
};
