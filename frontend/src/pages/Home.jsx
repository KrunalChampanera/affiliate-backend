import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { Container, Row, Col, Card , Nav , Button} from "react-bootstrap";
import TrendingSection from "../components/TrendingSection";
import TopSellerProducts from "../components/TopSellersSection";
import PopularBlogs from "../components/BlogSection";
import InstagramSection from "../components/InstagramSection";

const BASE_URL = "http://localhost:5000/uploads/";

const Home = () => {

  const [topDeals, setTopDeals] = useState([]);
  const [banners, setBanners] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [activeTrendCategory, setActiveTrendCategory] = useState("All");

  useEffect(() => {
    fetchTopDeals();
    fetchBanners();
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      const res = await API.get("/products");
      const popular = res.data.filter(p => p.isPopular);
      setPopularProducts(popular);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopDeals = async () => {
    try {
      const res = await API.get("/products");
      const deals = res.data.filter(p => p.isTopDeal);
      setTopDeals(deals.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banners");
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const heroBanner = banners.find(
    b => b.position?.toLowerCase() === "right"
  );

  const leftBanners = banners.filter(
    b => b.position?.toLowerCase() === "top-deals"
  );

  const promoBanner = banners.find(
    b => b.position?.toLowerCase() === "promo"
  );

  const popularLeftBanner = banners.find(
    b => b.position?.toLowerCase() === "popular-left"
  );

  const popularRightBanner = banners.find(
    b => b.position?.toLowerCase() === "popular-right"
  );

  const categories = [
  {
    name: "Clothing",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <path d="M20 8 L8 20 L16 24 L16 56 L48 56 L48 24 L56 20 L44 8 C44 8 40 14 32 14 C24 14 20 8 20 8Z" />
      </svg>
    ),
  },
  {
    name: "Computer",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <rect x="8" y="10" width="48" height="34" rx="2" />
        <line x1="20" y1="54" x2="44" y2="54" />
        <line x1="32" y1="44" x2="32" y2="54" />
      </svg>
    ),
  },
  {
    name: "Lightings",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <path d="M32 8 C22 8 16 16 16 24 C16 32 22 38 28 40 L28 48 L36 48 L36 40 C42 38 48 32 48 24 C48 16 42 8 32 8Z" />
        <line x1="28" y1="52" x2="36" y2="52" />
      </svg>
    ),
  },
  {
    name: "Televisions",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <rect x="6" y="14" width="52" height="34" rx="2" />
        <line x1="20" y1="54" x2="44" y2="54" />
      </svg>
    ),
  },
  {
    name: "Smart Phone",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <rect x="18" y="6" width="28" height="52" rx="4" />
        <line x1="28" y1="52" x2="36" y2="52" />
      </svg>
    ),
  },
  {
    name: "Stoves",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <rect x="8" y="16" width="48" height="38" rx="2" />
        <circle cx="22" cy="30" r="5" />
        <circle cx="42" cy="30" r="5" />
      </svg>
    ),
  },
  {
    name: "Furniture",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
        <rect x="8" y="28" width="48" height="16" rx="2" />
        <rect x="14" y="18" width="36" height="10" rx="2" />
      </svg>
    ),
  },
];


  return (
    <>
      {/* HERO SECTION */}
      <div className="container-fluid p-0">
  <div className="row g-0">

    {/* LEFT CATEGORY SIDEBAR */}
    <div
      className="col-md-3 col-lg-2"
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "600px"
      }}
    >
    </div>

    {/* RIGHT HERO SECTION */}
    <div
      className="col-md-9 col-lg-10 d-flex align-items-center"
      style={{
        backgroundColor: heroBanner?.backgroundColor || "#f8f8f8",
        minHeight: "600px",
        padding: "60px"
      }}
    >

      <div className="row align-items-center w-100">

        {/* LEFT TEXT */}
        <div className="col-md-6">

          <h1 className="display-4 fw-bold mb-4">
            {heroBanner?.title || "The Best Comparison"}
          </h1>

          <p className="text-muted mb-4">
            {heroBanner?.subtitle}
          </p>

          {heroBanner && (
            <button
              className="btn text-white px-4 py-2 rounded-pill"
              style={{ backgroundColor: heroBanner.backgroundColor }}
            >
              {heroBanner.buttonText}
            </button>
          )}

        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-6 text-center">

          {heroBanner?.image && (
            <img
              src={`${BASE_URL}${heroBanner.image}`}
              alt=""
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          )}

        </div>

      </div>

    </div>

  </div>
</div>

      {/* TOP DEALS SECTION */}
      <div className="container my-5">
        <div className="row">

          {/* LEFT BANNERS */}
          <div className="col-md-6">
            {leftBanners.map((banner) => (
              <div
                key={banner.id}
                className="p-4 mb-4"
                style={{
                  backgroundColor: banner.backgroundColor,
                  borderRadius: "8px"
                }}
              >
                <small>{banner.subtitle}</small>
                <h4 className="fw-bold mt-2">{banner.title}</h4>

                {banner.image && (
                  <img
                    src={`${BASE_URL}${banner.image}`}
                    alt=""
                    className="img-fluid my-3"
                  />
                )}

                <button className="btn btn-dark rounded-pill px-4">
                  {banner.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="col-md-6">
            <h3 className="fw-bold mb-4">Torado Top Deals</h3>

            <div className="row">
              {topDeals.map(product => (
                <div className="col-md-6 mb-4" key={product.id}>
                  <div className="card border-0 shadow-sm h-100">

                    {product.image && (
                      <img
                        src={`${BASE_URL}${product.image}`}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "contain" }}
                        alt=""
                      />
                    )}

                    <div className="card-body">
                      <h6 className="fw-bold">{product.title}</h6>

                      <div className="d-flex justify-content-between">
                        <span className="text-warning">
                          ⭐ {product.rating || 4}
                        </span>
                        <span className="text-danger fw-bold">
                          ${product.price}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* PROMO FULL WIDTH */}
      {promoBanner && (
        <div
          className="container-fluid my-5 position-relative"
          style={{
            height: "450px",
            backgroundImage: `url(${BASE_URL}${promoBanner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center h-100 text-white"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <div className="text-center">
              <small className="text-warning">
                {promoBanner.subtitle}
              </small>
              <h1 className="fw-bold my-3">
                {promoBanner.title}
              </h1>
              <button
                className="btn px-4 py-2 rounded-pill text-white"
                style={{ backgroundColor: promoBanner.backgroundColor }}
              >
                {promoBanner.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPULAR PRODUCTS SECTION */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-5">
          Top Popular Products
        </h2>

        <div className="row g-4">

          {/* LEFT POPULAR BANNER */}
          {popularLeftBanner && (
            <div className="col-lg-3 col-md-6">
              <div
                className="p-4 h-100 text-white"
                style={{
                  backgroundImage: `url(${BASE_URL}${popularLeftBanner.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px"
                }}
              >
                <small>{popularLeftBanner.subtitle}</small>
                <h5 className="fw-bold">{popularLeftBanner.title}</h5>
                <button className="btn btn-light rounded-pill">
                  {popularLeftBanner.buttonText}
                </button>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {popularProducts.slice(0, 6).map(product => (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <div className="card border-0 shadow-sm h-100">

                {product.image && (
                  <img
                    src={`${BASE_URL}${product.image}`}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "contain" }}
                    alt=""
                  />
                )}

                <div className="card-body">
                  <h6 className="fw-bold">{product.title}</h6>
                  <div className="d-flex justify-content-between">
                    <span className="text-warning">
                      ⭐ {product.rating || 4}
                    </span>
                    <span className="text-danger fw-bold">
                      ${product.price}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* RIGHT POPULAR BANNER */}
          {popularRightBanner && (
            <div className="col-lg-3 col-md-6">
              <div
                className="p-4 h-100 text-white"
                style={{
                  backgroundImage: `url(${BASE_URL}${popularRightBanner.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px"
                }}
              >
                <small>{popularRightBanner.subtitle}</small>
                <h5 className="fw-bold">{popularRightBanner.title}</h5>
                <button className="btn btn-light rounded-pill">
                  {popularRightBanner.buttonText}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* section 3 */}
          <section style={{ background: "#f5f6f8", padding: "60px 0" }}>
      <Container>
        <h2
          className="text-center mb-5"
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: "700",
            fontSize: "32px",
            color: "#1a1a1a",
          }}
        >
          Shop By Category
        </h2>

        <Row className="justify-content-center g-3">
          {categories.map((cat) => (
            <Col
              key={cat.name}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="d-flex justify-content-center"
            >
              <Card
                className="text-center border-0 shadow-sm category-card"
                style={{
                  width: "130px",
                  height: "110px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  {cat.icon}
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      marginTop: "8px",
                      color: "#333",
                    }}
                  >
                    {cat.name}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          color: #b8860b;
        }
        .category-card:hover svg {
          stroke: #b8860b;
        }
      `}</style>
    </section>

    {/* section 4 */}

    <TrendingSection/>

    {/* section 5 */}
       <section style={{ padding: "60px 0" }}>
      <Container>
        <Row className="g-4">

          {/* LEFT BANNER */}
          <Col md={6}>
            <div
              className="promo-banner"
              style={{
                backgroundImage: `url("/images/instant-img-1.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                minHeight: "350px",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div className="overlay-content">
                <p className="discount-text">Up To 21% Off</p>
                <h3 className="banner-title">
                  Instant Pot Pressure Cookers
                </h3>
                <Button className="shop-btn-red">
                  Shop Now
                </Button>
              </div>
            </div>
          </Col>

          {/* RIGHT BANNER */}
          <Col md={6}>
  <div
    className="promo-banner"
    style={{
      backgroundImage: `url("/images/banner2.png")`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right center",
      backgroundColor: "#f8f8f8",
      borderRadius: "8px",
      minHeight: "350px",
      position: "relative",
      overflow: "hidden"
    }}
  >
    <div className="overlay-content">
      <p className="discount-text">Up To 40% - 60% Off</p>
      <h3 className="banner-title">
        Colours Of You Hot Special
      </h3>
      <Button className="shop-btn-blue">
        Shop Now
      </Button>
    </div>
  </div>
</Col>

        </Row>
      </Container>

      <style>{`
        .promo-banner {
          display: flex;
          align-items: center;
          padding: 40px;
          transition: transform 0.3s ease;
        }

        .promo-banner:hover {
          transform: scale(1.02);
        }

        .overlay-content {
          max-width: 300px;
        }

        .discount-text {
          color: #ff3d00;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .banner-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .shop-btn-red {
          background-color: #ff3d00;
          border: none;
          padding: 10px 25px;
          border-radius: 30px;
          font-weight: 500;
        }

        .shop-btn-red:hover {
          background-color: #e53935;
        }

        .shop-btn-blue {
          background-color: #2196f3;
          border: none;
          padding: 10px 25px;
          border-radius: 30px;
          font-weight: 500;
        }

        .shop-btn-blue:hover {
          background-color: #1e88e5;
        }

        @media (max-width: 768px) {
          .promo-banner {
            min-height: 250px;
            padding: 30px;
          }

          .banner-title {
            font-size: 18px;
          }
        }
      `}</style>
    </section>

        {/* section 6 */}

        <TopSellerProducts/>

        {/* section 7 */}
        
        <PopularBlogs/>        

        {/* section 8 */}

        <InstagramSection />

    </>
  );
};

export default Home;

