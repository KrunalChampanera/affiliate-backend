// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { Container, Row, Col, Card , Nav , Button} from "react-bootstrap";
// import TrendingSection from "../components/TrendingSection";
// import TopSellerProducts from "../components/TopSellersSection";
// import PopularBlogs from "../components/BlogSection";
// import InstagramSection from "../components/InstagramSection";

// const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/";

// const Home = () => {

//   const [topDeals, setTopDeals] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [popularProducts, setPopularProducts] = useState([]);
//   const [activeTrendCategory, setActiveTrendCategory] = useState("All");

//   useEffect(() => {
//     fetchTopDeals();
//     fetchBanners();
//     fetchPopularProducts();
//   }, []);

//   const fetchPopularProducts = async () => {
//     try {
//       const res = await API.get("/products");
//       const popular = res.data.filter(p => p.isPopular);
//       setPopularProducts(popular);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchTopDeals = async () => {
//     try {
//       const res = await API.get("/products");
//       const deals = res.data.filter(p => p.isTopDeal);
//       setTopDeals(deals.slice(0, 4));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchBanners = async () => {
//     try {
//       const res = await API.get("/banners");
//       setBanners(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const heroBanner = banners.find(
//     b => b.position?.toLowerCase() === "right"
//   );

//   const leftBanners = banners.filter(
//     b => b.position?.toLowerCase() === "top-deals"
//   );

//   const promoBanner = banners.find(
//     b => b.position?.toLowerCase() === "promo"
//   );

//   const popularLeftBanner = banners.find(
//     b => b.position?.toLowerCase() === "popular-left"
//   );

//   const popularRightBanner = banners.find(
//     b => b.position?.toLowerCase() === "popular-right"
//   );

//   const categories = [
//   {
//     name: "Clothing",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <path d="M20 8 L8 20 L16 24 L16 56 L48 56 L48 24 L56 20 L44 8 C44 8 40 14 32 14 C24 14 20 8 20 8Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Computer",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <rect x="8" y="10" width="48" height="34" rx="2" />
//         <line x1="20" y1="54" x2="44" y2="54" />
//         <line x1="32" y1="44" x2="32" y2="54" />
//       </svg>
//     ),
//   },
//   {
//     name: "Lightings",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <path d="M32 8 C22 8 16 16 16 24 C16 32 22 38 28 40 L28 48 L36 48 L36 40 C42 38 48 32 48 24 C48 16 42 8 32 8Z" />
//         <line x1="28" y1="52" x2="36" y2="52" />
//       </svg>
//     ),
//   },
//   {
//     name: "Televisions",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <rect x="6" y="14" width="52" height="34" rx="2" />
//         <line x1="20" y1="54" x2="44" y2="54" />
//       </svg>
//     ),
//   },
//   {
//     name: "Smart Phone",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <rect x="18" y="6" width="28" height="52" rx="4" />
//         <line x1="28" y1="52" x2="36" y2="52" />
//       </svg>
//     ),
//   },
//   {
//     name: "Stoves",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <rect x="8" y="16" width="48" height="38" rx="2" />
//         <circle cx="22" cy="30" r="5" />
//         <circle cx="42" cy="30" r="5" />
//       </svg>
//     ),
//   },
//   {
//     name: "Furniture",
//     icon: (
//       <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="42" height="42">
//         <rect x="8" y="28" width="48" height="16" rx="2" />
//         <rect x="14" y="18" width="36" height="10" rx="2" />
//       </svg>
//     ),
//   },
// ];


//   return (
//     <>
//       {/* HERO SECTION */}
//       <div className="container-fluid p-0">
//   <div className="row g-0">

//     {/* LEFT CATEGORY SIDEBAR */}
//     <div
//       className="col-md-3 col-lg-2"
//       style={{
//         backgroundColor: "#f5f5f5",
//         minHeight: "600px"
//       }}
//     >
//     </div>

//     {/* RIGHT HERO SECTION */}
//     <div
//       className="col-md-9 col-lg-10 d-flex align-items-center"
//       style={{
//         backgroundColor: heroBanner?.backgroundColor || "#f8f8f8",
//         minHeight: "600px",
//         padding: "60px"
//       }}
//     >

//       <div className="row align-items-center w-100">

//         {/* LEFT TEXT */}
//         <div className="col-md-6">

//           <h1 className="display-4 fw-bold mb-4">
//             {heroBanner?.title || "The Best Comparison"}
//           </h1>

//           <p className="text-muted mb-4">
//             {heroBanner?.subtitle}
//           </p>

//           {heroBanner && (
//             <button
//               className="btn text-white px-4 py-2 rounded-pill"
//               style={{ backgroundColor: heroBanner.backgroundColor }}
//             >
//               {heroBanner.buttonText}
//             </button>
//           )}

//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="col-md-6 text-center">

//           {heroBanner?.image && (
//             <img
//               src={`${BASE_URL}${heroBanner.image}`}
//               alt=""
//               className="img-fluid"
//               style={{ maxHeight: "450px" }}
//             />
//           )}

//         </div>

//       </div>

//     </div>

//   </div>
// </div>

//       {/* TOP DEALS SECTION */}
//       <div className="container my-5">
//         <div className="row">

//           {/* LEFT BANNERS */}
//           <div className="col-md-6">
//             {leftBanners.map((banner) => (
//               <div
//                 key={banner.id}
//                 className="p-4 mb-4"
//                 style={{
//                   backgroundColor: banner.backgroundColor,
//                   borderRadius: "8px"
//                 }}
//               >
//                 <small>{banner.subtitle}</small>
//                 <h4 className="fw-bold mt-2">{banner.title}</h4>

//                 {banner.image && (
//                   <img
//                     src={`${BASE_URL}${banner.image}`}
//                     alt=""
//                     className="img-fluid my-3"
//                   />
//                 )}

//                 <button className="btn btn-dark rounded-pill px-4">
//                   {banner.buttonText}
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT PRODUCTS */}
//           <div className="col-md-6">
//             <h3 className="fw-bold mb-4">Torado Top Deals</h3>

//             <div className="row">
//               {topDeals.map(product => (
//                 <div className="col-md-6 mb-4" key={product.id}>
//                   <div className="card border-0 shadow-sm h-100">

//                     {product.image && (
//                       <img
//                         src={`${BASE_URL}${product.image}`}
//                         className="card-img-top"
//                         style={{ height: "200px", objectFit: "contain" }}
//                         alt=""
//                       />
//                     )}

//                     <div className="card-body">
//                       <h6 className="fw-bold">{product.title}</h6>

//                       <div className="d-flex justify-content-between">
//                         <span className="text-warning">
//                           ⭐ {product.rating || 4}
//                         </span>
//                         <span className="text-danger fw-bold">
//                           ${product.price}
//                         </span>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* PROMO FULL WIDTH */}
//       {promoBanner && (
//         <div
//           className="container-fluid my-5 position-relative"
//           style={{
//             height: "450px",
//             backgroundImage: `url(${BASE_URL}${promoBanner.image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center"
//           }}
//         >
//           <div
//             className="d-flex align-items-center justify-content-center h-100 text-white"
//             style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
//           >
//             <div className="text-center">
//               <small className="text-warning">
//                 {promoBanner.subtitle}
//               </small>
//               <h1 className="fw-bold my-3">
//                 {promoBanner.title}
//               </h1>
//               <button
//                 className="btn px-4 py-2 rounded-pill text-white"
//                 style={{ backgroundColor: promoBanner.backgroundColor }}
//               >
//                 {promoBanner.buttonText}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* POPULAR PRODUCTS SECTION */}
//       <div className="container my-5">
//         <h2 className="text-center fw-bold mb-5">
//           Top Popular Products
//         </h2>

//         <div className="row g-4">

//           {/* LEFT POPULAR BANNER */}
//           {popularLeftBanner && (
//             <div className="col-lg-3 col-md-6">
//               <div
//                 className="p-4 h-100 text-white"
//                 style={{
//                   backgroundImage: `url(${BASE_URL}${popularLeftBanner.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   borderRadius: "10px"
//                 }}
//               >
//                 <small>{popularLeftBanner.subtitle}</small>
//                 <h5 className="fw-bold">{popularLeftBanner.title}</h5>
//                 <button className="btn btn-light rounded-pill">
//                   {popularLeftBanner.buttonText}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* PRODUCTS */}
//           {popularProducts.slice(0, 6).map(product => (
//             <div className="col-lg-3 col-md-6" key={product.id}>
//               <div className="card border-0 shadow-sm h-100">

//                 {product.image && (
//                   <img
//                     src={`${BASE_URL}${product.image}`}
//                     className="card-img-top"
//                     style={{ height: "200px", objectFit: "contain" }}
//                     alt=""
//                   />
//                 )}

//                 <div className="card-body">
//                   <h6 className="fw-bold">{product.title}</h6>
//                   <div className="d-flex justify-content-between">
//                     <span className="text-warning">
//                       ⭐ {product.rating || 4}
//                     </span>
//                     <span className="text-danger fw-bold">
//                       ${product.price}
//                     </span>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           ))}

//           {/* RIGHT POPULAR BANNER */}
//           {popularRightBanner && (
//             <div className="col-lg-3 col-md-6">
//               <div
//                 className="p-4 h-100 text-white"
//                 style={{
//                   backgroundImage: `url(${BASE_URL}${popularRightBanner.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   borderRadius: "10px"
//                 }}
//               >
//                 <small>{popularRightBanner.subtitle}</small>
//                 <h5 className="fw-bold">{popularRightBanner.title}</h5>
//                 <button className="btn btn-light rounded-pill">
//                   {popularRightBanner.buttonText}
//                 </button>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* section 3 */}
//           <section style={{ background: "#f5f6f8", padding: "60px 0" }}>
//       <Container>
//         <h2
//           className="text-center mb-5"
//           style={{
//             fontFamily: "Playfair Display, serif",
//             fontWeight: "700",
//             fontSize: "32px",
//             color: "#1a1a1a",
//           }}
//         >
//           Shop By Category
//         </h2>

//         <Row className="justify-content-center g-3">
//           {categories.map((cat) => (
//             <Col
//               key={cat.name}
//               xs={6}
//               sm={4}
//               md={3}
//               lg={2}
//               className="d-flex justify-content-center"
//             >
//               <Card
//                 className="text-center border-0 shadow-sm category-card"
//                 style={{
//                   width: "130px",
//                   height: "110px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   transition: "all 0.25s ease",
//                 }}
//               >
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   {cat.icon}
//                   <div
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: "500",
//                       marginTop: "8px",
//                       color: "#333",
//                     }}
//                   >
//                     {cat.name}
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       <style>{`
//         .category-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(0,0,0,0.08);
//           color: #b8860b;
//         }
//         .category-card:hover svg {
//           stroke: #b8860b;
//         }
//       `}</style>
//     </section>

//     {/* section 4 */}

//     <TrendingSection/>

//     {/* section 5 */}
//        <section style={{ padding: "60px 0" }}>
//       <Container>
//         <Row className="g-4">

//           {/* LEFT BANNER */}
//           <Col md={6}>
//             <div
//               className="promo-banner"
//               style={{
//                 backgroundImage: `url("/images/instant-img-1.png")`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 borderRadius: "8px",
//                 minHeight: "350px",
//                 position: "relative",
//                 overflow: "hidden"
//               }}
//             >
//               <div className="overlay-content">
//                 <p className="discount-text">Up To 21% Off</p>
//                 <h3 className="banner-title">
//                   Instant Pot Pressure Cookers
//                 </h3>
//                 <Button className="shop-btn-red">
//                   Shop Now
//                 </Button>
//               </div>
//             </div>
//           </Col>

//           {/* RIGHT BANNER */}
//           <Col md={6}>
//   <div
//     className="promo-banner"
//     style={{
//       backgroundImage: `url("/images/banner2.png")`,
//       backgroundSize: "contain",
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "right center",
//       backgroundColor: "#f8f8f8",
//       borderRadius: "8px",
//       minHeight: "350px",
//       position: "relative",
//       overflow: "hidden"
//     }}
//   >
//     <div className="overlay-content">
//       <p className="discount-text">Up To 40% - 60% Off</p>
//       <h3 className="banner-title">
//         Colours Of You Hot Special
//       </h3>
//       <Button className="shop-btn-blue">
//         Shop Now
//       </Button>
//     </div>
//   </div>
// </Col>

//         </Row>
//       </Container>

//       <style>{`
//         .promo-banner {
//           display: flex;
//           align-items: center;
//           padding: 40px;
//           transition: transform 0.3s ease;
//         }

//         .promo-banner:hover {
//           transform: scale(1.02);
//         }

//         .overlay-content {
//           max-width: 300px;
//         }

//         .discount-text {
//           color: #ff3d00;
//           font-weight: 600;
//           margin-bottom: 10px;
//           font-size: 14px;
//         }

//         .banner-title {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 20px;
//         }

//         .shop-btn-red {
//           background-color: #ff3d00;
//           border: none;
//           padding: 10px 25px;
//           border-radius: 30px;
//           font-weight: 500;
//         }

//         .shop-btn-red:hover {
//           background-color: #e53935;
//         }

//         .shop-btn-blue {
//           background-color: #2196f3;
//           border: none;
//           padding: 10px 25px;
//           border-radius: 30px;
//           font-weight: 500;
//         }

//         .shop-btn-blue:hover {
//           background-color: #1e88e5;
//         }

//         @media (max-width: 768px) {
//           .promo-banner {
//             min-height: 250px;
//             padding: 30px;
//           }

//           .banner-title {
//             font-size: 18px;
//           }
//         }
//       `}</style>
//     </section>

//         {/* section 6 */}

//         <TopSellerProducts/>

//         {/* section 7 */}
        
//         <PopularBlogs/>        

//         {/* section 8 */}

//         <InstagramSection />

//     </>
//   );
// };

// export default Home;


import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../services/api"
import TrendingSection from "../components/TrendingSection"
import TopSellerProducts from "../components/TopSellersSection"
import PopularBlogs from "../components/BlogSection"
import InstagramSection from "../components/InstagramSection"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const T = {
  bg:     "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
  white:  "#ffffff",
  accent: "#e8613a",
  dark:   "#1c1410",
  muted:  "rgba(28,20,16,0.45)",
  border: "rgba(232,97,58,0.1)",
  serif:  "'Lora', serif",
  sans:   "'Nunito Sans', sans-serif",
  radius: "18px",
}

// ── Category data with SVG icons ──────────────────────────────
const CATEGORIES = [
  {
    name: "Clothing",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <path d="M20 8 L8 20 L16 24 L16 56 L48 56 L48 24 L56 20 L44 8 C44 8 40 14 32 14 C24 14 20 8 20 8Z" />
      </svg>
    ),
  },
  {
    name: "Computer",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <rect x="8" y="10" width="48" height="34" rx="2" />
        <line x1="20" y1="54" x2="44" y2="54" />
        <line x1="32" y1="44" x2="32" y2="54" />
      </svg>
    ),
  },
  {
    name: "Lightings",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <path d="M32 8 C22 8 16 16 16 24 C16 32 22 38 28 40 L28 48 L36 48 L36 40 C42 38 48 32 48 24 C48 16 42 8 32 8Z" />
        <line x1="28" y1="52" x2="36" y2="52" />
      </svg>
    ),
  },
  {
    name: "Televisions",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <rect x="6" y="14" width="52" height="34" rx="2" />
        <line x1="20" y1="54" x2="44" y2="54" />
      </svg>
    ),
  },
  {
    name: "Smart Phone",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <rect x="18" y="6" width="28" height="52" rx="4" />
        <line x1="28" y1="52" x2="36" y2="52" />
      </svg>
    ),
  },
  {
    name: "Stoves",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <rect x="8" y="16" width="48" height="38" rx="2" />
        <circle cx="22" cy="30" r="5" />
        <circle cx="42" cy="30" r="5" />
      </svg>
    ),
  },
  {
    name: "Furniture",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <rect x="8" y="28" width="48" height="16" rx="2" />
        <rect x="14" y="18" width="36" height="10" rx="2" />
      </svg>
    ),
  },
]

// ── Reusable Section Heading ──────────────────────────────────
const SectionHeading = ({ title, sub }) => (
  <div style={{ textAlign: "center", marginBottom: "44px" }}>
    {sub && (
      <div style={{
        fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
        textTransform: "uppercase", color: T.accent, marginBottom: "10px",
      }}>
        {sub}
      </div>
    )}
    <h2 style={{
      fontSize: "clamp(22px,3vw,36px)", fontWeight: "800",
      fontFamily: T.serif, color: T.dark, letterSpacing: "-0.5px", margin: 0,
    }}>
      {title}
    </h2>
    <div style={{
      width: "48px", height: "3px", borderRadius: "50px",
      background: "linear-gradient(135deg,#e8613a,#f0855e)",
      margin: "14px auto 0",
    }} />
  </div>
)

// ── Product Card ──────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        background: T.white, borderRadius: T.radius, textDecoration: "none",
        border: `1px solid ${hov ? "rgba(232,97,58,0.22)" : T.border}`,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: hov ? "0 16px 48px rgba(232,97,58,0.12)" : "0 3px 16px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        height: "180px", overflow: "hidden",
        background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {product.image
          ? <img src={`${BASE_URL}${product.image}`} alt={product.title}
              style={{
                maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
                transform: hov ? "scale(1.07)" : "scale(1)",
                transition: "transform 0.4s ease",
              }} />
          : <div style={{ fontSize: "40px", opacity: 0.25 }}>📦</div>
        }
      </div>
      <div style={{ padding: "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{
          fontSize: "13px", fontWeight: "700", color: T.dark, lineHeight: 1.45,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ fontSize: "12px", color: "#f5a623", fontWeight: "700" }}>
            ★ {product.rating || "4.0"}
          </span>
          <span style={{
            fontSize: "15px", fontWeight: "800", fontFamily: T.serif,
            color: T.accent,
          }}>
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Category Card ─────────────────────────────────────────────
const CategoryCard = ({ cat }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={{
      background: hov ? "linear-gradient(135deg,#e8613a,#f0855e)" : T.white,
      borderRadius: "16px",
      border: `1px solid ${hov ? "transparent" : T.border}`,
      padding: "24px 16px 18px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
      transform: hov ? "translateY(-5px)" : "translateY(0)",
      boxShadow: hov ? "0 12px 36px rgba(232,97,58,0.28)" : "0 2px 12px rgba(0,0,0,0.05)",
      color: hov ? "#fff" : T.dark,
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ marginBottom: "10px", lineHeight: 1 }}>{cat.icon}</div>
      <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.3px" }}>
        {cat.name}
      </div>
    </div>
  )
}

// ── Banner Card ───────────────────────────────────────────────
const BannerCard = ({ banner, minHeight = "200px" }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={{
      background: banner.backgroundColor || T.accent,
      borderRadius: T.radius,
      padding: "32px 28px",
      minHeight,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflow: "hidden",
      position: "relative",
      transition: "transform 0.3s ease",
      transform: hov ? "scale(1.02)" : "scale(1)",
      cursor: "pointer",
      boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.14)" : "0 4px 20px rgba(0,0,0,0.07)",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {banner.image && (
        <img
          src={`${BASE_URL}${banner.image}`} alt=""
          style={{
            position: "absolute", right: 0, bottom: 0,
            maxHeight: "80%", maxWidth: "55%",
            objectFit: "contain", opacity: 0.92,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {banner.subtitle && (
          <div style={{
            fontSize: "11px", fontWeight: "700",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px",
          }}>
            {banner.subtitle}
          </div>
        )}
        <h4 style={{
          fontSize: "20px", fontWeight: "800", fontFamily: T.serif,
          color: "#fff", marginBottom: "20px",
          maxWidth: "200px", lineHeight: 1.35,
        }}>
          {banner.title}
        </h4>
        <BtnLight label={banner.buttonText || "Shop Now"} />
      </div>
    </div>
  )
}

// ── Buttons ───────────────────────────────────────────────────
const BtnAccent = ({ label, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 36px", borderRadius: "50px", border: "none",
        background: hov
          ? "linear-gradient(135deg,#d4542e,#e8613a)"
          : "linear-gradient(135deg,#e8613a,#f0855e)",
        color: "#fff", fontSize: "14px", fontWeight: "800",
        cursor: "pointer", fontFamily: T.sans, letterSpacing: "0.5px",
        boxShadow: hov ? "0 12px 36px rgba(232,97,58,0.45)" : "0 6px 22px rgba(232,97,58,0.28)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label} →
    </button>
  )
}

const BtnLight = ({ label }) => {
  const [hov, setHov] = useState(false)
  return (
    <button style={{
      padding: "10px 26px", borderRadius: "50px", border: "none",
      background: hov ? "#fff" : "rgba(255,255,255,0.92)",
      color: T.accent, fontSize: "13px", fontWeight: "800",
      cursor: "pointer", fontFamily: T.sans,
      boxShadow: hov ? "0 6px 20px rgba(0,0,0,0.15)" : "none",
      transform: hov ? "translateY(-1px)" : "none",
      transition: "all 0.25s ease",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

const BtnBlue = ({ label }) => {
  const [hov, setHov] = useState(false)
  return (
    <button style={{
      padding: "11px 28px", borderRadius: "50px", border: "none",
      background: hov ? "#1e88e5" : "#2196f3",
      color: "#fff", fontSize: "13px", fontWeight: "800",
      cursor: "pointer", fontFamily: T.sans,
      boxShadow: hov ? "0 8px 24px rgba(33,150,243,0.4)" : "none",
      transform: hov ? "translateY(-1px)" : "none",
      transition: "all 0.25s ease",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

// ── Main Home ─────────────────────────────────────────────────
const Home = () => {
  const [topDeals,         setTopDeals]         = useState([])
  const [banners,          setBanners]          = useState([])
  const [popularProducts,  setPopularProducts]  = useState([])
  const [vis,              setVis]              = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, banRes] = await Promise.all([
          API.get("/products"),
          API.get("/banners"),
        ])
        const products = Array.isArray(prodRes.data) ? prodRes.data : []
        setTopDeals(products.filter(p => p.isTopDeal).slice(0, 4))
        setPopularProducts(products.filter(p => p.isPopular))
        setBanners(Array.isArray(banRes.data) ? banRes.data : [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchAll()
    setTimeout(() => setVis(true), 80)

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `*{box-sizing:border-box}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`
    document.head.appendChild(style)
  }, [])

  const heroBanner         = banners.find(b => b.position?.toLowerCase() === "right")
  const leftBanners        = banners.filter(b => b.position?.toLowerCase() === "top-deals")
  const promoBanner        = banners.find(b => b.position?.toLowerCase() === "promo")
  const popularLeftBanner  = banners.find(b => b.position?.toLowerCase() === "popular-left")
  const popularRightBanner = banners.find(b => b.position?.toLowerCase() === "popular-right")

  const wrap = { maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }

  return (
    <div style={{ fontFamily: T.sans, background: T.bg }}>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section style={{
        background: heroBanner?.backgroundColor || "linear-gradient(135deg,#1ca7c9,#0e8aaa)",
        minHeight: "580px", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        opacity: vis ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:"-100px", right:"-100px",
          width:"500px", height:"500px", borderRadius:"50%",
          background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-80px", left:"-80px",
          width:"350px", height:"350px", borderRadius:"50%",
          background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />

        <div style={{ ...wrap, width:"100%", position:"relative", zIndex:1 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "48px", alignItems: "center",
          }}>
            {/* Text */}
            <div style={{ animation: vis ? "fadeUp 0.7s ease both" : "none" }}>
              <div style={{
                fontSize: "11px", fontWeight: "800", letterSpacing: "3px",
                textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                marginBottom: "18px",
              }}>
                ✦ Best Comparison Platform
              </div>
              <h1 style={{
                fontSize: "clamp(30px,4vw,54px)", fontWeight: "800",
                fontFamily: T.serif, color: "#fff", lineHeight: 1.15,
                letterSpacing: "-1px", marginBottom: "20px",
              }}>
                {heroBanner?.title || "The Best Comparison"}
              </h1>
              <p style={{
                fontSize: "16px", color: "rgba(255,255,255,0.72)",
                lineHeight: 1.75, marginBottom: "36px", maxWidth: "440px",
              }}>
                {heroBanner?.subtitle || "Find the best products at the best prices. Compare, review and shop smarter."}
              </p>
              {heroBanner && (
                <BtnAccent label={heroBanner.buttonText || "Shop Now"} />
              )}
            </div>

            {/* Image */}
            <div style={{ textAlign: "center", animation: vis ? "fadeUp 0.8s ease 0.1s both" : "none" }}>
              {heroBanner?.image
                ? <img src={`${BASE_URL}${heroBanner.image}`} alt=""
                    style={{
                      maxHeight: "440px", maxWidth: "100%", objectFit: "contain",
                      filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.25))",
                    }} />
                : <div style={{ fontSize: "120px", opacity: 0.2 }}>🛍</div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* ══ TOP DEALS ════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: T.bg }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>

            {/* Left banners */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {leftBanners.length > 0
                ? leftBanners.map(b => <BannerCard key={b.id} banner={b} minHeight="220px" />)
                : (
                  <div style={{
                    background: "linear-gradient(135deg,#e8613a,#f0855e)",
                    borderRadius: T.radius, padding: "40px",
                    minHeight: "220px", display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.7)",
                        textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                        Limited Time
                      </div>
                      <h3 style={{ fontFamily: T.serif, fontSize: "24px", fontWeight: "800",
                        color: "#fff", marginBottom: "20px" }}>
                        Top Deals Today
                      </h3>
                    </div>
                    <BtnLight label="Shop Now" />
                  </div>
                )
              }
            </div>

            {/* Right products */}
            <div>
              <SectionHeading title="Torado Top Deals" sub="🔥 Hot Picks" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                {topDeals.map(p => <ProductCard key={p.id} product={p} />)}
                {topDeals.length === 0 && (
                  <div style={{ gridColumn: "1/-1", textAlign: "center",
                    padding: "48px", color: T.muted, fontSize: "14px" }}>
                    No top deals available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROMO FULL WIDTH BANNER ══════════════════════════ */}
      {promoBanner && (
        <section style={{
          background: `linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.42)),
            url(${BASE_URL}${promoBanner.image}) center/cover no-repeat`,
          minHeight: "440px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", color: "#fff", padding: "48px 24px" }}>
            <div style={{
              fontSize: "12px", fontWeight: "800", letterSpacing: "3px",
              textTransform: "uppercase", color: "#fbbf24", marginBottom: "16px",
            }}>
              {promoBanner.subtitle}
            </div>
            <h2 style={{
              fontSize: "clamp(28px,4vw,52px)", fontWeight: "800",
              fontFamily: T.serif, letterSpacing: "-0.5px", marginBottom: "32px",
            }}>
              {promoBanner.title}
            </h2>
            <BtnAccent label={promoBanner.buttonText || "Shop Now"} />
          </div>
        </section>
      )}

      {/* ══ POPULAR PRODUCTS ════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: T.bg }}>
        <div style={wrap}>
          <SectionHeading title="Top Popular Products" sub="⭐ Fan Favourites" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>

            {/* Left banner */}
            {popularLeftBanner && (
              <div style={{
                background: `url(${BASE_URL}${popularLeftBanner.image}) center/cover no-repeat`,
                borderRadius: T.radius, padding: "28px",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                minHeight: "280px", position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  borderRadius: T.radius,
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)",
                    fontWeight: "700", marginBottom: "6px" }}>
                    {popularLeftBanner.subtitle}
                  </div>
                  <h5 style={{ color: "#fff", fontFamily: T.serif, fontWeight: "800",
                    fontSize: "16px", marginBottom: "14px" }}>
                    {popularLeftBanner.title}
                  </h5>
                  <BtnLight label={popularLeftBanner.buttonText || "Shop Now"} />
                </div>
              </div>
            )}

            {/* Products */}
            {popularProducts.slice(0,
              (popularLeftBanner && popularRightBanner) ? 6
              : (popularLeftBanner || popularRightBanner) ? 7 : 8
            ).map(p => <ProductCard key={p.id} product={p} />)}

            {/* Right banner */}
            {popularRightBanner && (
              <div style={{
                background: `url(${BASE_URL}${popularRightBanner.image}) center/cover no-repeat`,
                borderRadius: T.radius, padding: "28px",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                minHeight: "280px", position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  borderRadius: T.radius,
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)",
                    fontWeight: "700", marginBottom: "6px" }}>
                    {popularRightBanner.subtitle}
                  </div>
                  <h5 style={{ color: "#fff", fontFamily: T.serif, fontWeight: "800",
                    fontSize: "16px", marginBottom: "14px" }}>
                    {popularRightBanner.title}
                  </h5>
                  <BtnLight label={popularRightBanner.buttonText || "Shop Now"} />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ══ SHOP BY CATEGORY ════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: T.white }}>
        <div style={wrap}>
          <SectionHeading title="Shop By Category" sub="📂 Browse" />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: "14px",
          }}>
            {CATEGORIES.map(cat => <CategoryCard key={cat.name} cat={cat} />)}
          </div>
        </div>
      </section>

      {/* ══ TRENDING ════════════════════════════════════════ */}
      <TrendingSection />

      {/* ══ PROMO BANNERS ROW ════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: T.bg }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

            {/* Left promo */}
            <PromoBanner
              bg="linear-gradient(135deg,#e8613a,#f0855e)"
              img="/images/instant-img-1.png"
              discount="Up To 21% Off"
              title="Instant Pot Pressure Cookers"
              dark
              btn={<BtnLight label="Shop Now" />}
            />

            {/* Right promo */}
            <PromoBanner
              bg="#f8f9ff"
              img="/images/banner2.png"
              discount="Up To 40% - 60% Off"
              title="Colours Of You Hot Special"
              btn={<BtnBlue label="Shop Now" />}
            />

          </div>
        </div>
      </section>

      {/* ══ TOP SELLERS ═════════════════════════════════════ */}
      <TopSellerProducts />

      {/* ══ POPULAR BLOGS ═══════════════════════════════════ */}
      <PopularBlogs />

      {/* ══ INSTAGRAM ═══════════════════════════════════════ */}
      <InstagramSection />

    </div>
  )
}

// ── Promo Banner helper ───────────────────────────────────────
const PromoBanner = ({ bg, img, discount, title, dark, btn }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{
        background: bg, borderRadius: T.radius,
        padding: "40px", minHeight: "320px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        overflow: "hidden", position: "relative",
        transform: hov ? "scale(1.02)" : "scale(1)",
        transition: "all 0.35s ease",
        cursor: "pointer",
        boxShadow: hov ? "0 20px 56px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.06)",
        border: `1px solid ${dark ? "transparent" : T.border}`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "relative", zIndex: 1, maxWidth: "240px" }}>
        <div style={{
          fontSize: "12px", fontWeight: "800", letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: dark ? "rgba(255,255,255,0.8)" : T.accent,
          marginBottom: "10px",
        }}>
          {discount}
        </div>
        <h3 style={{
          fontSize: "22px", fontWeight: "800", fontFamily: T.serif,
          color: dark ? "#fff" : T.dark,
          marginBottom: "24px", lineHeight: 1.35,
        }}>
          {title}
        </h3>
        {btn}
      </div>
      <img
        src={img} alt=""
        style={{
          maxHeight: "260px", maxWidth: "46%", objectFit: "contain",
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.14))",
          flexShrink: 0,
        }}
      />
    </div>
  )
}

export default Home

