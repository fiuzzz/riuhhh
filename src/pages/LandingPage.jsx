import React from "react";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Carousel,
  Image,
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLaptopCode, FaUniversity, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import bnsp1 from "../../src/assets/bnsp1.png";
import bnsp2 from "../../src/assets/bnsp2.png";
import bnsp3 from "../../src/assets/bnsp3.png";
import bnsp4 from "../../src/assets/bnsp4.jpg";

const LandingPage = () => {
  return (
    <>
      {/* Header/Navbar */}
      <Navbar expand="lg" className="shadow-sm bg-dark py-3 px-4">
        <Navbar.Brand>
          <h3 className="fw-bold text-warning mb-0">PeTIK</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/form_registrasi">
              <Button variant="outline-warning" className="fw-bold">
                Pendaftaran
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero / Carousel */}
      <Container fluid className="p-0">
        <Carousel fade indicators={false}>
          {[bnsp1, bnsp2, bnsp3].map((image, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx + 1}`}
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(60%)",
                }}
              />
              <Carousel.Caption className="pt-0">
                <h1 className="display-4 fw-bold pt-0">
                  {
                    [
                      "Kelola Proyek IT dengan Mudah",
                      "Manajemen Proyek IT Lebih Cepat",
                      "Sistem Proyek IT yang Modern",
                    ][idx]
                  }
                </h1>
                <p className="lead">
                  {
                    [
                      "Solusi praktis untuk mengelola proyek IT dan pengembangan perangkat lunak.",
                      "Dapatkan pembaruan real-time untuk kemajuan proyek pengembangan perangkat lunak.",
                      "Kelola proyek IT dengan sistem yang aman dan teknologi terbaru.",
                    ][idx]
                  }
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Fitur */}
      <Container className="py-5" id="features">
        <Row className="justify-content-center mt-5">
          {[
            {
              icon: <FaLaptopCode size={50} style={{ color: "#f8b400" }} />,
              title: "Manajemen Proyek IT",
              desc: "Kelola tugas, timeline, dan sumber daya proyek perangkat lunak.",
            },
            {
              icon: <FaUniversity size={50} style={{ color: "#f8b400" }} />,
              title: "Pelacakan Pembelajaran",
              desc: "Catat kemajuan dalam materi dan proyek pembelajaran IT.",
            },
            {
              icon: <FaBookOpen size={50} style={{ color: "#f8b400" }} />,
              title: "Laporan Kemajuan",
              desc: "Analisis data kemajuan pembelajaran dan proyek dengan laporan yang detail.",
            },
          ].map((fitur, i) => (
            <Col md={4} className="mb-4" key={i}>
              <Card className="shadow-lg text-center border-0 feature-card">
                <Card.Body className="feature-body">
                  {fitur.icon}
                  <Card.Title className="fw-bold mt-3">
                    {fitur.title}
                  </Card.Title>
                  <Card.Text className="text-muted p-3">
                    <h6>{fitur.desc}</h6>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={bnsp4}
                alt="Keunggulan Platform Pembelajaran IT"
                fluid
                className="rounded shadow"
                style={{ width: "600px", height: "400px" }}
              />
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h2 className="fw-bold text-dark">
                Mengapa Memilih Platform Pembelajaran IT Kami?
              </h2>
              <p
                className="text-muted text-justify"
                style={{ fontSize: "14px" }}
              >
                Platform kami memberikan pengalaman pembelajaran yang
                terorganisir untuk mahasiswa IT. Dengan fitur manajemen proyek
                dan pelacakan pembelajaran, platform ini akan membantu mahasiswa
                dalam mengelola studi mereka, mempersiapkan tugas, dan memantau
                perkembangan proyek perangkat lunak.
              </p>
              <ul className="text-muted" style={{ fontSize: "14px" }}>
                <li>Pencatatan kemajuan belajar otomatis</li>
                <li>Sistem pelacakan proyek perangkat lunak yang efisien</li>
                <li>Laporan kemajuan untuk analisis pribadi</li>
                <li>Keamanan data dengan autentikasi yang kuat</li>
                <li>Desain responsif & mudah digunakan</li>
              </ul>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-4 mt-5">
        <Container>
          <p className="mb-1 fw-bold">
            © {new Date().getFullYear()} PeTIK Project
          </p>
          <small>
            Platform manajemen proyek dan pembelajaran untuk mahasiswa IT
          </small>
        </Container>
      </footer>
    </>
  );
};

export default LandingPage;
