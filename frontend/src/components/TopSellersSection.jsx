import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

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

// ── Stars ─────────────────────────────────────────────────────
const Stars = ({ rating }) => {
  const r = Math.min(5, Math.max(0, parseFloat(rating) || 4))
  const full = Math.floor(r)
  return (
    <span style={{ color: "#f5a623", fontSize: "12px", letterSpacing: "1px" }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
      <span style={{ color: T.muted, fontSize: "11px", marginLeft: "4px", fontWeight: "600" }}>
        ({r.toFixed(1)})
      </span>
    </span>
  )
}

// ── Product Card ──────────────────────────────────────────────
const SellerCard = ({ product, index, vis }) => {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        background: T.white,
        borderRadius: T.radius,
        border: `1px solid ${hov ? "rgba(232,97,58,0.22)" : T.border}`,
        overflow: "hidden",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        boxShadow: hov ? "0 20px 56px rgba(232,97,58,0.12)" : "0 3px 16px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${index * 0.06}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        height: "180px", overflow: "hidden",
        background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
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
        <Stars rating={product.rating} />
        <div style={{
          fontSize: "13px", fontWeight: "700", color: T.dark, lineHeight: 1.45,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ fontSize: "17px", fontWeight: "800", fontFamily: T.serif, color: T.accent }}>
            ${product.price}
          </span>
          <span style={{ fontSize: "11px", fontWeight: "700", color: hov ? T.accent : T.muted, transition: "color 0.2s ease" }}>
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Banner button ─────────────────────────────────────────────
const BannerBtn = ({ label }) => {
  const [hov, setHov] = useState(false)
  return (
    <button style={{
      padding: "11px 28px", borderRadius: "50px", border: "none",
      background: hov ? "#fff" : "rgba(255,255,255,0.92)",
      color: T.accent, fontSize: "13px", fontWeight: "800",
      cursor: "pointer", fontFamily: T.sans,
      boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.15)" : "none",
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

// ── Main ──────────────────────────────────────────────────────
const TopSellersSection = () => {
  const [banner,   setBanner]   = useState(null)
  const [products, setProducts] = useState([])
  const [vis,      setVis]      = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, productRes] = await Promise.all([
          API.get("/banners"),
          API.get("/products"),
        ])
        const topBanner   = bannerRes.data.find(b => b.position === "top-seller")
        const topProducts = productRes.data.filter(p => p.isTopDeal === true)
        setBanner(topBanner || null)
        setProducts(topProducts.slice(0, 6))
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
    setTimeout(() => setVis(true), 80)
  }, [])

  return (
    <section style={{ padding: "80px 0", background: T.bg, fontFamily: T.sans }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
            textTransform: "uppercase", color: T.accent, marginBottom: "10px",
          }}>
            🏆 Best Sellers
          </div>
          <h2 style={{
            fontSize: "clamp(22px,3vw,36px)", fontWeight: "800",
            fontFamily: T.serif, color: T.dark, letterSpacing: "-0.5px", margin: 0,
          }}>
            Top Sellers Products
          </h2>
          <div style={{
            width: "48px", height: "3px", borderRadius: "50px",
            background: "linear-gradient(135deg,#e8613a,#f0855e)",
            margin: "14px auto 0",
          }} />
        </div>

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "28px", alignItems: "start" }}>

          {/* Left — Banner */}
          <div style={{
            background: banner?.backgroundColor || "linear-gradient(135deg,#e8613a,#f0855e)",
            borderRadius: T.radius, padding: "36px 28px",
            minHeight: "460px", display: "flex",
            flexDirection: "column", justifyContent: "space-between",
            overflow: "hidden", position: "relative",
            boxShadow: "0 8px 32px rgba(232,97,58,0.2)",
          }}>
            {/* Decorative circle */}
            <div style={{
              position: "absolute", bottom: "-60px", right: "-60px",
              width: "220px", height: "220px", borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", pointerEvents: "none",
            }} />
            <div>
              {banner?.subtitle && (
                <div style={{
                  fontSize: "11px", fontWeight: "700",
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px",
                }}>
                  {banner.subtitle}
                </div>
              )}
              <h3 style={{
                fontSize: "24px", fontWeight: "800", fontFamily: T.serif,
                color: "#fff", lineHeight: 1.3, marginBottom: "24px",
              }}>
                {banner?.title || "Top Selling Products Of The Season"}
              </h3>
              <BannerBtn label={banner?.buttonText || "Shop Now"} />
            </div>
            {banner?.image && (
              <img src={`${BASE_URL}${banner.image}`} alt=""
                style={{
                  width: "100%", objectFit: "contain", maxHeight: "240px",
                  filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.2))",
                  marginTop: "20px",
                }}
              />
            )}
          </div>

          {/* Right — Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
            {products.map((product, i) => (
              <SellerCard key={product.id} product={product} index={i} vis={vis} />
            ))}
            {products.length === 0 && (
              <div style={{
                gridColumn: "1/-1", textAlign: "center",
                padding: "60px", color: T.muted, fontSize: "14px", fontWeight: "600",
              }}>
                No top seller products available.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default TopSellersSection