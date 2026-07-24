import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
// Untuk menampilkan ikon, pastikan Anda sudah menginstal bootstrap-icons
// Jalankan: npm install bootstrap-icons
// Lalu impor di file index.js atau App.js Anda: import 'bootstrap-icons/font/bootstrap-icons.css';

export const LandingPage = () => {
  return (
    <>
      <NavBar />

      <Container
        fluid
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          background: "linear-gradient(to right, #6dd5ed, #2193b0)",
          // Anda bisa sesuaikan `56px` dengan tinggi NavBar Anda
          height: "calc(100vh - 56px)",
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold">Manajemen Klinik Modern</h1>
          <p className="lead col-md-8 mx-auto">
            Solusi terintegrasi untuk meningkatkan efisiensi dan kualitas
            pelayanan kesehatan Anda.
          </p>
          <Link to="/dashboard" className="btn btn-light btn-lg">
            Lihat Demo Dashboard
          </Link>
        </Container>
      </Container>

      <Container className="py-5">
        <h2 className="text-center mb-5">Fitur Unggulan Kami</h2>
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <i className="bi bi-people-fill fs-1 text-primary"></i>
            <h3 className="mt-3">Manajemen Pasien</h3>
            <p className="text-muted">
              Kelola data pasien, riwayat medis, dan janji temu secara terpusat
              dan aman.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <i className="bi bi-calendar-check fs-1 text-primary"></i>
            <h3 className="mt-3">Jadwal Cerdas</h3>
            <p className="text-muted">
              Atur jadwal dokter dan janji temu pasien dengan mudah untuk
              menghindari tumpang tindih.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <i className="bi bi-file-earmark-bar-graph fs-1 text-primary"></i>
            <h3 className="mt-3">Laporan Analitik</h3>
            <p className="text-muted">
              Dapatkan wawasan dari laporan performa klinik untuk pengambilan
              keputusan strategis.
            </p>
          </Col>
        </Row>
      </Container>

      <footer className="bg-light text-center p-4 mt-auto">
        <Container>
          <p className="mb-0">&copy; 2026 Klinik Sehat. All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default LandingPage;
