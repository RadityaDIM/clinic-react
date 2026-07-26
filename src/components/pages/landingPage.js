import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import useAuthStore from "./auth/useAuthStore";
import { ModalRegisterPatient } from "../modalRegisterPatient";
import { jwtDecode } from "jwt-decode";
import { dashboardService } from "../../services/dashboardService";

export const LandingPage = () => {
  //opsi ambil data user dari authstore
  const { user, token } = useAuthStore();
  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState();

  //sama aja opsi pengambilan data user dari decode
  let userDataToken = null;

  if (token) {
    userDataToken = jwtDecode(token);
  }

  let handleDetail = async () => {
    setModalShow(true);
    setUserData(user);
  };

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
          <h1 className="display-3 fw-bold">Manajemen Klinik Modern</h1>
          <p className="lead col-md-8 mx-auto">
            Solusi terintegrasi untuk meningkatkan efisiensi dan kualitas
            pelayanan kesehatan Anda.
          </p>
          <div className="d-flex gap-2 justify-content-center">
            {token ? (
              <>
                <Link to="/dashboard" className="btn btn-light btn-lg">
                  Lihat Dashboard
                </Link>
                <Link to="/appointment" className="btn btn-light btn-lg">
                  Buat Appointment
                </Link>
                <Button
                  className="btn btn-dark btn-lg"
                  onClick={() => handleDetail()}
                >
                  Daftar menjadi pasien
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-light btn-lg">
                  Lihat Dashboard
                </Link>
                <Link to="/login" className="btn btn-light btn-lg">
                  Buat Appointment
                </Link>
                <Link to="/login" className="btn btn-dark btn-lg">
                  Daftar menjadi pasien
                </Link>
              </>
            )}
          </div>
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
      <ModalRegisterPatient
        show={modalShow}
        data={userDataToken}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default LandingPage;
