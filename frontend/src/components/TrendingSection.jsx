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

// ── Star renderer ─────────────────────────────────────────────
const Stars = ({ rating }) => {
  const r = Math.min(5, Math.max(0, parseFloat(rating) || 4))
  const full = Math.floor(r)
  const half = r - full >= 0.5
  return (
    <span style={{ color: "#f5a623", fontSize: "13px", letterSpacing: "1px" }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: T.muted, fontSize: "11px", marginLeft: "5px", fontWeight: "600" }}>
        ({r.toFixed(1)})
      </span>
    </span>
  )
}

// ── Product Card ──────────────────────────────────────────────
const TrendCard = ({ product, index, vis }) => {
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
        boxShadow: hov
          ? "0 20px 56px rgba(232,97,58,0.12)"
          : "0 3px 16px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${index * 0.07}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{
        height: "240px", overflow: "hidden",
        background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}>
        {product.image
          ? <img
              src={`${BASE_URL}${product.image}`}
              alt={product.title}
              style={{
                maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
                transform: hov ? "scale(1.07)" : "scale(1)",
                transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          : <div style={{ fontSize: "52px", opacity: 0.25 }}>📦</div>
        }
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <Stars rating={product.rating} />
        <div style={{
          fontSize: "14px", fontWeight: "700", color: T.dark,
          lineHeight: 1.45, fontFamily: T.sans,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{
            fontSize: "18px", fontWeight: "800",
            fontFamily: T.serif, color: T.accent,
          }}>
            ${product.price}
          </span>
          <span style={{
            fontSize: "11px", fontWeight: "700",
            color: hov ? T.accent : T.muted,
            transition: "color 0.2s ease",
          }}>
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Tab button ────────────────────────────────────────────────
const TabBtn = ({ label, active, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: "50px",
        border: `1.5px solid ${active ? T.accent : hov ? "rgba(232,97,58,0.3)" : "rgba(28,20,16,0.1)"}`,
        background: active ? "linear-gradient(135deg,#e8613a,#f0855e)" : hov ? "rgba(232,97,58,0.05)" : "transparent",
        color: active ? "#fff" : hov ? T.accent : T.muted,
        fontSize: "13px", fontWeight: "700",
        cursor: "pointer", fontFamily: T.sans,
        boxShadow: active ? "0 6px 20px rgba(232,97,58,0.3)" : "none",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

// ── Main ──────────────────────────────────────────────────────
const TrendingSection = () => {
  const [products,        setProducts]        = useState([])
  const [categories,      setCategories]      = useState([])
  const [activeCategory,  setActiveCategory]  = useState("All")
  const [vis,             setVis]             = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, catRes] = await Promise.allSettled([
          API.get("/products"),
          API.get("/categories/active"),
        ])
        if (prodRes.status === "fulfilled") {
          setProducts(Array.isArray(prodRes.value.data) ? prodRes.value.data : [])
        }
        if (catRes.status === "fulfilled") {
          setCategories(Array.isArray(catRes.value.data) ? catRes.value.data : [])
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchAll()
    setTimeout(() => setVis(true), 80)
  }, [])

  const tabCategories = ["All", ...categories.map(c => c.name)]

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.Category?.name === activeCategory)

  return (
    <section style={{ padding: "80px 0", background: T.white }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Header row ──────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "32px", flexWrap: "wrap", gap: "20px",
        }}>
          {/* Title */}
          <div>
            <div style={{
              fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
              textTransform: "uppercase", color: T.accent, marginBottom: "8px",
            }}>
              🔥 What's Hot
            </div>
            <h2 style={{
              fontSize: "clamp(22px,3vw,34px)", fontWeight: "800",
              fontFamily: T.serif, color: T.dark,
              letterSpacing: "-0.5px", margin: 0,
            }}>
              Trending Fashion Items
            </h2>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {tabCategories.map(cat => (
              <TabBtn
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setVis(false)
                  setTimeout(() => setVis(true), 60)
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────── */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(232,97,58,0.2), transparent)",
          marginBottom: "36px",
        }} />

        {/* ── Product grid ─────────────────────────────── */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            color: T.muted, fontSize: "14px", fontWeight: "600",
          }}>
            No products found in this category.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}>
            {filtered.slice(0, 6).map((product, i) => (
              <TrendCard key={product.id} product={product} index={i} vis={vis} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default TrendingSection