import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageHeader = ({ title }) => {
  return (
    <section
      style={{
        background: "#f5f5f5",
        padding: "80px 0",
        textAlign: "center",
        backgroundImage: "url('/images/page-header-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Container>
        <h1 style={{ fontWeight: "600", marginBottom: "10px" }}>{title}</h1>

        <div style={{ fontSize: "16px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#0d6efd" }}>
            Home
          </Link>

          <span style={{ margin: "0 10px" }}>|</span>

          <span>{title}</span>
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;