import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Users,
  Award,
  Clock,
  Check,
  X,
  Heart,
  Shield,
  Stethoscope,
  Brain,
} from "lucide-react";
import { Button } from "react-bootstrap";
import useAuthStore from "./auth/useAuthStore";
import { ModalRegisterPatient } from "../modalRegisterPatient";
import { jwtDecode } from "jwt-decode";
import "../../styles/theme.css";
import { Navigate } from "react-router-dom";

export const LandingPage = () => {
  const { user, token, logout } = useAuthStore();
  const [modalShow, setModalShow] = useState(false);

  let userDataToken = null;
  if (token) {
    try {
      userDataToken = jwtDecode(token);
      console.log("UserDataToken: ", userDataToken);
    } catch (e) {
      userDataToken = null;
    }
  }

  const navigate = useNavigate();

  const handleRegister = () => {
    setModalShow(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const comparisonRows = [
    {
      feature: "Biaya Konsultasi",
      clinic: "GRATIS (Senilai Rp500rb)",
      clinicOk: true,
      other: "Rp200rb - Rp750rb",
      otherOk: false,
    },
    {
      feature: "Klinik Lokal vs Korporat",
      clinic: "Milik Lokal & Dioperasikan",
      clinicOk: true,
      other: "Rantai Korporat",
      otherOk: false,
    },
    {
      feature: "Layanan Hari Sama",
      clinic: "Konsultasi & prosedur hari sama",
      clinicOk: true,
      other: "Antrian 2-4 minggu",
      otherOk: false,
    },
    {
      feature: "Transparansi Harga",
      clinic: "Harga jujur & transparan",
      clinicOk: true,
      other: "Biaya tersembunyi",
      otherOk: false,
    },
    {
      feature: "Perawatan Personal",
      clinic: "Perhatian satu lawan satu",
      clinicOk: true,
      other: "Pendekatan massal",
      otherOk: false,
    },
    {
      feature: "Teknologi",
      clinic: "Pencitraan 3D terbaru",
      clinicOk: true,
      other: "Bervariasi",
      otherOk: "warna",
    },
    {
      feature: "Garansi",
      clinic: "Garansi seumur hidup",
      clinicOk: true,
      other: "Garansi terbatas",
      otherOk: false,
    },
    {
      feature: "Opsi Pembiayaan",
      clinic: "Cicilan fleksibel",
      clinicOk: true,
      other: "Bunga tinggi",
      otherOk: "warna",
    },
    {
      feature: "Perawatan Lanjutan",
      clinic: "Program perawatan menyeluruh",
      clinicOk: true,
      other: "Dukungan terbatas",
      otherOk: false,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      {/* Header */}
      <header className="lp-header">
        <div className="lp-header-inner">
          <Link to="/" className="lp-header-brand">
            <div className="lp-header-logo">AC</div>
            <div>
              <h1 className="lp-header-name">Amartek Clinic</h1>
              <p className="lp-header-sub">Klinik Kesehatan Modern</p>
            </div>
          </Link>
          <div className="lp-header-actions">
            <a href="tel:+628123456789" className="lp-header-phone">
              <Phone size={16} />
              <span>(021) 1234-5678</span>
            </a>
            {token ? (
              <>
                {userDataToken.roles[0] == "ROLE_DOCTOR" ||
                userDataToken.roles[0] == "ROLE_ADMIN" ? (
                  <>
                    <Link to="/dashboard" className="btn btn-primary">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <></>
                )}
                <Button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Masuk
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div>
            <span className="lp-hero-badge">
              Konsultasi GRATIS Senilai Rp500.000
            </span>
            <h1 className="lp-hero-title">
              Dapatkan Kembali Senyum Indah Anda dengan{" "}
              <span className="lp-hero-title-accent">
                Layanan Kesehatan Profesional
              </span>
            </h1>
            <p className="lp-hero-desc">
              Solusi kesehatan modern dengan teknologi terkini. Kami membantu
              ribuan pasien mendapatkan kembali kepercayaan diri melalui layanan
              medis berkualitas tinggi.
            </p>
            <div className="lp-hero-actions">
              {token ? (
                <Link
                  to="/book/appointment"
                  className="btn btn-primary"
                  style={{ padding: "14px 28px", fontSize: 16 }}
                >
                  Buat Janji Temu Sekarang
                </Link>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ padding: "14px 28px", fontSize: 16 }}
                  onClick={handleRegister}
                >
                  Daftar Menjadi Pasien
                </button>
              )}
              <a
                href="tel:+628123456789"
                className="btn btn-outline"
                style={{ padding: "14px 28px", fontSize: 16 }}
              >
                <Phone size={18} style={{ marginRight: 6 }} />
                Hubungi Kami
              </a>
            </div>
            <div className="lp-hero-trust">
              <div className="lp-hero-trust-item">
                <CheckCircle size={18} />
                <span>Asuransi Diterima</span>
              </div>
              <div className="lp-hero-trust-item">
                <CheckCircle size={18} />
                <span>Konsultasi Hari Sama</span>
              </div>
              <div className="lp-hero-trust-item">
                <CheckCircle size={18} />
                <span>Cicilan Tersedia</span>
              </div>
            </div>
          </div>
          <div className="lp-hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop"
              alt="Klinik modern"
              className="lp-hero-image"
            />
            <div className="lp-hero-rating">
              <div className="lp-hero-rating-stars">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
              <span className="lp-hero-rating-score">4.9/5</span>
              <span className="lp-hero-rating-count">(2.847 ulasan)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="lp-section lp-section-white">
        <div className="lp-inner">
          <h2 className="lp-section-title">Layanan Kesehatan Unggulan Kami</h2>
          <p className="lp-section-desc">
            Kami menawarkan solusi kesehatan komprehensif yang disesuaikan
            dengan kebutuhan Anda, menggunakan teknologi dan teknik terbaru.
          </p>
          <div className="lp-services-grid">
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <Heart size={28} />
              </div>
              <h3 className="lp-service-title">Pemeriksaan Umum</h3>
              <p className="lp-service-desc">
                Pemeriksaan kesehatan menyeluruh untuk deteksi dini dan
                pencegahan penyakit.
              </p>
              <div className="lp-service-price">Mulai dari Rp250.000</div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <Stethoscope size={28} />
              </div>
              <h3 className="lp-service-title">Konsultasi Spesialis</h3>
              <p className="lp-service-desc">
                Konsultasi langsung dengan dokter spesialis berpengalaman untuk
                diagnosis akurat.
              </p>
              <div className="lp-service-price">Mulai dari Rp350.000</div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <Shield size={28} />
              </div>
              <h3 className="lp-service-title">Program Vaksinasi</h3>
              <p className="lp-service-desc">
                Layanan vaksinasi lengkap untuk perlindungan optimal dari
                berbagai penyakit.
              </p>
              <div className="lp-service-price">Mulai dari Rp150.000</div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <Brain size={28} />
              </div>
              <h3 className="lp-service-title">Laboratorium & Diagnostik</h3>
              <p className="lp-service-desc">
                Pemeriksaan laboratorium lengkap dengan peralatan modern dan
                hasil akurat.
              </p>
              <div className="lp-service-price">Mulai dari Rp100.000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="lp-section lp-section-gray">
        <div className="lp-inner">
          <div className="lp-benefits-grid">
            <div>
              <h2 className="lp-benefits-title">
                Mengapa Memilih Amartek Clinic?
              </h2>
              <div className="lp-benefit-item">
                <div className="lp-benefit-icon">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="lp-benefit-item-title">
                    Dokter Bersertifikat
                  </h3>
                  <p className="lp-benefit-item-desc">
                    Tim kami terdiri dari dokter spesialis berlisensi dengan
                    pengalaman lebih dari 20 tahun.
                  </p>
                </div>
              </div>
              <div className="lp-benefit-item">
                <div className="lp-benefit-icon">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="lp-benefit-item-title">5.000+ Pasien Puas</h3>
                  <p className="lp-benefit-item-desc">
                    Kami telah membantu ribuan pasien mendapatkan kembali
                    kesehatan optimal dengan tingkat keberhasilan 98%.
                  </p>
                </div>
              </div>
              <div className="lp-benefit-item">
                <div className="lp-benefit-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="lp-benefit-item-title">Layanan Hari Sama</h3>
                  <p className="lp-benefit-item-desc">
                    Teknologi canggih memungkinkan kami memberikan layanan cepat
                    dalam satu kunjungan jika memungkinkan.
                  </p>
                </div>
              </div>
            </div>
            <div className="lp-benefits-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
                alt="Klinik modern"
                className="lp-benefits-image"
              />
              <div className="lp-benefits-stat">
                <div className="lp-benefits-stat-value">98%</div>
                <div className="lp-benefits-stat-label">
                  Tingkat Keberhasilan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="lp-section lp-section-white">
        <div className="lp-inner">
          <h2 className="lp-section-title">
            Perbandingan Amartek Clinic dengan Klinik Lain
          </h2>
          <p className="lp-section-desc">
            Lihat bagaimana pendekatan personal, teknologi canggih, dan keahlian
            lokal kami memberikan nilai lebih dibandingkan klinik jaringan
            lainnya.
          </p>
          <table className="lp-compare-table">
            <thead>
              <tr>
                <th>Fitur</th>
                <th className="lp-compare-highlight">Amartek Clinic</th>
                <th>Klinik Lainnya</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.feature}</td>
                  <td className="lp-compare-highlight">
                    <span className="lp-compare-check">
                      <Check size={16} />
                      <span
                        style={{
                          fontWeight: 500,
                          color: "var(--color-primary-600)",
                        }}
                      >
                        {row.clinic}
                      </span>
                    </span>
                  </td>
                  <td>
                    {row.otherOk === "warna" ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          color: "var(--color-warning-600)",
                        }}
                      >
                        <span style={{ fontSize: 14 }}>⚠️</span>
                        {row.other}
                      </span>
                    ) : (
                      <span className="lp-compare-x">
                        <X size={16} />
                        <span>{row.other}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--color-gray-900)",
                marginBottom: 8,
              }}
            >
              Siap Merasakan Perbedaan Amartek?
            </h3>
            <p
              style={{
                color: "var(--color-gray-500)",
                marginBottom: 24,
                maxWidth: 500,
                margin: "0 auto 24px",
              }}
            >
              Jangan puas dengan klinik biasa. Pilih layanan personal, ahli,
              dengan harga transparan.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/book/appointment"
                className="btn btn-primary"
                style={{ padding: "14px 28px", fontSize: 16 }}
              >
                Jadwalkan Konsultasi GRATIS
              </Link>
              <a
                href="tel:+628123456789"
                className="btn btn-outline"
                style={{ padding: "14px 28px", fontSize: 16 }}
              >
                <Phone size={16} />
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="lp-section lp-section-gray">
        <div className="lp-inner">
          <h2 className="lp-section-title">Apa Kata Pasien Kami</h2>
          <p className="lp-section-desc">
            Cerita nyata dari pasien yang telah mendapatkan kembali kepercayaan
            diri
          </p>
          <div className="lp-testimonials-grid">
            {[
              {
                text: "Saya sangat puas dengan layanan Amartek Clinic. Dokternya ramah dan profesional, hasilnya memuaskan. Sekarang saya bisa tersenyum dengan percaya diri lagi!",
                name: "Sarah M.",
                location: "Jakarta Selatan",
                avatar:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b650?w=40&h=40&fit=crop&crop=face",
              },
              {
                text: "Program vaksinasi di sini sangat terorganisir. Tidak perlu menunggu lama, pelayanan cepat dan hasilnya memuaskan. Sangat recommended!",
                name: "Robert K.",
                location: "Jakarta Pusat",
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
              },
              {
                text: "Pemeriksaan laboratorium di Amartek Clinic sangat akurat dan hasilnya cepat. Biayanya juga terjangkau. Terima kasih Amartek!",
                name: "Jennifer L.",
                location: "Bandung",
                avatar:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
              },
            ].map((t, idx) => (
              <div key={idx} className="lp-testimonial-card">
                <div className="lp-testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} />
                  ))}
                </div>
                <p className="lp-testimonial-text">"{t.text}"</p>
                <div className="lp-testimonial-author">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="lp-testimonial-avatar"
                  />
                  <div>
                    <div className="lp-testimonial-name">{t.name}</div>
                    <div className="lp-testimonial-location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-cta">
        <div className="lp-inner">
          <h2 className="lp-cta-title">Siap Mengubah Hidup Anda?</h2>
          <p className="lp-cta-desc">
            Bergabunglah dengan ribuan pasien puas yang telah mendapatkan
            kembali kepercayaan diri mereka.
          </p>
          <div className="lp-cta-actions">
            {token ? (
              <Link
                to="/book/appointment"
                className="btn"
                style={{
                  padding: "14px 28px",
                  fontSize: 16,
                  background: "var(--color-white)",
                  color: "var(--color-primary-600)",
                  fontWeight: 600,
                }}
              >
                Jadwalkan Konsultasi
              </Link>
            ) : (
              <button
                className="btn"
                style={{
                  padding: "14px 28px",
                  fontSize: 16,
                  background: "var(--color-white)",
                  color: "var(--color-primary-600)",
                  fontWeight: 600,
                }}
                onClick={handleRegister}
              >
                Daftar Sekarang
              </button>
            )}
            <a
              href="tel:+628123456789"
              className="btn btn-outline"
              style={{
                padding: "14px 28px",
                fontSize: 16,
                border: "1px solid rgba(255,255,255,0.4)",
                color: "white",
                background: "transparent",
              }}
            >
              <Phone size={18} style={{ marginRight: 6 }} />
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-grid">
          <div>
            <div className="lp-footer-brand">
              <div className="lp-footer-logo">AC</div>
              <span className="lp-footer-brand-name">Amartek Clinic</span>
            </div>
            <p className="lp-footer-desc">
              Solusi kesehatan modern melayani pasien dengan teknologi canggih
              dan perhatian penuh.
            </p>
          </div>
          <div>
            <h4 className="lp-footer-title">Layanan</h4>
            <ul className="lp-footer-list">
              <li>Pemeriksaan Umum</li>
              <li>Konsultasi Spesialis</li>
              <li>Program Vaksinasi</li>
              <li>Laboratorium & Diagnostik</li>
              <li>Konsultasi Kesehatan</li>
            </ul>
          </div>
          <div>
            <h4 className="lp-footer-title">Kontak</h4>
            <div className="lp-footer-contact-item">
              <Phone size={14} />
              <span>(021) 1234-5678</span>
            </div>
            <div className="lp-footer-contact-item">
              <Mail size={14} />
              <span>info@amartekclinic.com</span>
            </div>
            <div className="lp-footer-contact-item">
              <MapPin size={14} />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
          <div>
            <h4 className="lp-footer-title">Jam Operasional</h4>
            <div className="lp-footer-hours">
              <div>Senin - Jumat: 08.00 - 18.00</div>
              <div>Sabtu: 09.00 - 15.00</div>
              <div>Minggu: Tutup</div>
              <div className="lp-footer-hours-highlight">
                Janji darurat tersedia
              </div>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          &copy; 2026 Amartek Clinic. All Rights Reserved.
        </div>
      </footer>

      <ModalRegisterPatient
        show={modalShow}
        data={userDataToken}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default LandingPage;
