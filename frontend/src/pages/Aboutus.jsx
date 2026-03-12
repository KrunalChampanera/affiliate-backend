import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaStore,
  FaBalanceScale,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section
        style={{
          background: "#f3f3f3",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <h2 className="fw-bold mb-3">About Us</h2>
          <p className="text-muted">
            Home <span className="mx-2">|</span> About Us
          </p>
        </Container>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section style={{ padding: "100px 0" }}>
        <Container>
          <Row className="align-items-center">

            <Col lg={6}>
              <h3 className="fw-bold mb-4">
                Our Mission In The Company
              </h3>

              <p className="text-muted mb-3">
                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.
              </p>

              <p className="text-muted mb-4">
                To ensue; and equal blame belongs to those who fail in their duty through weakness of will.
              </p>

              <div
                style={{
                  background: "#f6f6f6",
                  padding: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <h1 className="fw-bold text-primary mb-0">20</h1>
                <div>
                  <h6 className="fw-bold">Years On The Market</h6>
                  <p className="text-muted small mb-0">
                    Omnis voluptas assumenda est, omnis dolor repellendus.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
                alt="mission"
                className="img-fluid rounded"
              />
            </Col>

          </Row>
        </Container>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section style={{ background: "#f7f7f7", padding: "70px 0" }}>
        <Container>
          <Row className="text-center">

            <Col md={3}>
              <FaStore size={35} className="mb-3 text-primary" />
              <h6 className="fw-bold">Social Business</h6>
              <p className="text-muted small">
                Quis nostrum exercitationem corporis suscipit.
              </p>
            </Col>

            <Col md={3}>
              <FaBalanceScale size={35} className="mb-3 text-primary" />
              <h6 className="fw-bold">Price Comparison</h6>
              <p className="text-muted small">
                Quis nostrum exercitationem corporis suscipit.
              </p>
            </Col>

            <Col md={3}>
              <FaShoppingBag size={35} className="mb-3 text-primary" />
              <h6 className="fw-bold">Multivendor Store</h6>
              <p className="text-muted small">
                Quis nostrum exercitationem corporis suscipit.
              </p>
            </Col>

            <Col md={3}>
              <FaStar size={35} className="mb-3 text-primary" />
              <h6 className="fw-bold">Product Review</h6>
              <p className="text-muted small">
                Quis nostrum exercitationem corporis suscipit.
              </p>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ================= CLIENT FEEDBACK ================= */}
      <section style={{ padding: "100px 0" }}>
        <Container>
          <h3 className="text-center fw-bold mb-5">Our Client Feedback</h3>

          <Row>
            <Col md={6}>
              <Card className="p-4 border-0 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt=""
                    width="60"
                    className="rounded-circle me-3"
                  />
                  <div>
                    <h6 className="fw-bold mb-0">Donatella Nobatti</h6>
                    <small className="text-muted">SEO - Founder</small>
                  </div>
                </div>
                <p className="text-muted small">
                  There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.
                </p>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-4 border-0 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt=""
                    width="60"
                    className="rounded-circle me-3"
                  />
                  <div>
                    <h6 className="fw-bold mb-0">Mike Roscope</h6>
                    <small className="text-muted">Manager</small>
                  </div>
                </div>
                <p className="text-muted small">
                  There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= POPULAR STORES ================= */}
      <section style={{ background: "#f7f7f7", padding: "80px 0" }}>
        <Container>
          <h3 className="text-center fw-bold mb-5">Popular Stores</h3>

          <Row className="text-center">

            {["Infra", "Arise", "Tybo", "Inon", "Teva"].map((store, i) => (
              <Col md={2} key={i} className="mb-3">
                <Card className="p-3 border-0 shadow-sm">
                  <h6 className="fw-bold">{store}</h6>
                  <p className="text-danger small mb-0">
                    Get 10% Cashback
                  </p>
                </Card>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* ================= INSTAGRAM SECTION ================= */}
      <section style={{ padding: "100px 0" }}>
        <Container>
          <h3 className="text-center fw-bold mb-5">
            Torado’s Instagram
          </h3>

          <Row>
            {[
              "https://images.unsplash.com/photo-1510557880182-3a935b4a12a7",
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
              "https://images.unsplash.com/photo-1585386959984-a4155223166d",
              "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8",
            ].map((img, i) => (
              <Col md={2} key={i} className="mb-3">
                <img
                  src={img}
                  alt=""
                  className="img-fluid rounded"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default AboutUs;