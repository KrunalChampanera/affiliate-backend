import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGoogle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f5f6f8" }}>
      <Container fluid className="py-5 border-bottom">
        <Container>
          <Row>

            {/* Left Section */}
            <Col lg={3} md={6} className="mb-4">
              <h4 className="fw-bold mb-3">
                <span style={{ color: "#ff3d2f" }}>T</span>orado
              </h4>
              <p className="text-muted small">
                Rerum hic tenetur a sapiente delectus eiciendis voluptatibus
                maiores alias consequatur.
              </p>

              <div className="d-flex gap-3 my-3">
                <div className="social-icon"><FaFacebookF /></div>
                <div className="social-icon"><FaTwitter /></div>
                <div className="social-icon"><FaLinkedinIn /></div>
                <div className="social-icon"><FaGoogle /></div>
              </div>

              <h6 className="fw-bold mt-4">Newsletter Sign Up</h6>
              <Form className="d-flex mt-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  className="rounded-0"
                />
                <Button
                  variant="info"
                  className="rounded-0 px-4 text-white"
                >
                  Submit
                </Button>
              </Form>
            </Col>

            {/* Information */}
            <Col lg={3} md={6} className="mb-4">
              <h5 className="fw-bold mb-4">Information</h5>
              <ul className="footer-links">
                <li>Home</li>
                <li>Shop</li>
                <li>About Us</li>
                <li>Blog</li>
                <li>Contact Us</li>
                <li>Top Brands</li>
              </ul>
            </Col>

            {/* Get Help */}
            <Col lg={3} md={6} className="mb-4">
              <h5 className="fw-bold mb-4">Get Help</h5>
              <ul className="footer-links">
                <li>Your Orders</li>
                <li>Your Account</li>
                <li>Track Order</li>
                <li>Wishlist</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>

            {/* Address */}
            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-4">Address</h5>

              <div className="d-flex align-items-start mb-3">
                <FaPhoneAlt className="me-3 mt-1 text-info" />
                <div>
                  <div>(800) 216 2020</div>
                  <div>(800) 216 2030</div>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <FaEnvelope className="me-3 mt-1 text-info" />
                <div>
                  <div>hello@torado.com</div>
                  <div>info@torado.com</div>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <FaMapMarkerAlt className="me-3 mt-1 text-info" />
                <div>
                  No. 12, Ribon Building,
                  <br />
                  Walse street, Australia
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </Container>

      {/* Bottom Bar */}
      <Container fluid className="py-3 bg-white">
        <Container className="d-flex justify-content-between align-items-center flex-wrap">
          <p className="mb-0 small">
            © <span className="text-info fw-bold">Torado</span> is Proudly Owned by
            <span className="text-info fw-bold"> EnvyTheme</span>
          </p>

          <div className="d-flex align-items-center gap-2">
            <span className="small me-2">We Accept Payment Via:</span>
            <img src="https://i.imgur.com/2ISgYja.png" alt="card" height="25" />
            <img src="https://i.imgur.com/6X3nX9C.png" alt="card" height="25" />
            <img src="https://i.imgur.com/9I8YQvV.png" alt="card" height="25" />
            <img src="https://i.imgur.com/Tt6p5eR.png" alt="card" height="25" />
          </div>
        </Container>
      </Container>

      <style jsx>{`
        .footer-links {
          list-style: none;
          padding: 0;
        }
        .footer-links li {
          margin-bottom: 12px;
          color: #6c757d;
          cursor: pointer;
          transition: 0.3s;
        }
        .footer-links li:hover {
          color: #0dcaf0;
          padding-left: 5px;
        }
        .social-icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: 0.3s;
        }
        .social-icon:hover {
          background: #0dcaf0;
          color: white;
        }
      `}</style>
    </footer>
  );
};

export default Footer;