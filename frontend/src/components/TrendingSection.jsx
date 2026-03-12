import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import API from "../services/api";

const BASE_URL = "http://localhost:5000/uploads/";

const TrendingSection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories/active");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const tabCategories = ["All", ...categories.map(c => c.name)];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          p =>
            p.Category &&
            p.Category.name === activeCategory
        );

  return (
    <section style={{ padding: "70px 0", background: "#fff" }}>
      <Container>

        <Row className="align-items-center mb-4">
          <Col md={6}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "30px"
              }}
            >
              Trending Fashion Items
            </h2>
          </Col>

          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <Nav className="justify-content-md-end">
              {tabCategories.map(cat => (
                <Nav.Item key={cat}>
                  <Nav.Link
                    onClick={() => setActiveCategory(cat)}
                    className={`trend-tab ${
                      activeCategory === cat ? "active-trend" : ""
                    }`}
                  >
                    {cat}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>

        <hr style={{ marginTop: "-5px" }} />

        <Row className="mt-4 g-4">
          {filteredProducts.slice(0, 6).map(product => (
            <Col md={4} key={product.id}>
              <Card className="border-0 trend-card">

                {product.image && (
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}${product.image}`}
                    style={{
                      background: "#f4f4f4",
                      padding: "40px",
                      height: "280px",
                      objectFit: "contain"
                    }}
                  />
                )}

                <Card.Body>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div style={{ color: "#f4b400", fontSize: "14px" }}>
                      {"★".repeat(Math.round(product.rating || 4))}
                      <span style={{ color: "#888", marginLeft: "6px" }}>
                        ({Math.round(product.rating || 4)})
                      </span>
                    </div>

                    <div
                      style={{
                        color: "#ff3d00",
                        fontWeight: 600
                      }}
                    >
                      ${product.price}
                    </div>
                  </div>

                  <Card.Title style={{ fontSize: "15px", fontWeight: 500 }}>
                    {product.title}
                  </Card.Title>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>

      <style>{`
        .trend-tab {
          color: #666 !important;
          font-weight: 500;
          margin-left: 20px;
          cursor: pointer;
          position: relative;
        }

        .trend-tab:hover {
          color: #ff3d00 !important;
        }

        .active-trend {
          color: #ff3d00 !important;
        }

        .active-trend::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 2px;
          background: #ff3d00;
        }

        .trend-card {
          transition: all 0.3s ease;
        }

        .trend-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;