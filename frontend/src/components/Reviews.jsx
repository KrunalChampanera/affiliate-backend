import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import API from "../services/api"
import { Link } from "react-router-dom"
import InstagramSection from "./InstagramSection"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const S = {
  page: {
    background: "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'Lora', serif",
  },
  hero: {
    textAlign: "center",
    padding: "72px 0 48px",
    position: "relative",
  },
  heroEyebrow: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: "#e8613a",
    marginBottom: "16px",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 60px)",
    fontWeight: "800",
    color: "#1c1410",
    lineHeight: 1.1,
    marginBottom: "16px",
    letterSpacing: "-1px",
  },
  heroAccent: {
    color: "#e8613a",
    fontStyle: "italic",
  },
  heroSub: {
    fontSize: "16px",
    color: "rgba(28,20,16,0.5)",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: "400",
    maxWidth: "420px",
    margin: "0 auto 36px",
    lineHeight: 1.7,
  },
  // Controls bar
  controlsWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "48px",
  },
  resultCount: {
    fontSize: "13px",
    color: "rgba(28,20,16,0.45)",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.3px",
    marginRight: "8px",
  },
  searchWrap: {
    position: "relative",
    flex: "1",
    maxWidth: "300px",
    minWidth: "200px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#e8613a",
    fontSize: "15px",
    pointerEvents: "none",
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 42px",
    borderRadius: "50px",
    border: "1.5px solid rgba(232,97,58,0.2)",
    background: "#fff",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: "0 2px 16px rgba(232,97,58,0.08)",
    transition: "all 0.25s ease",
  },
  sortSelect: {
    padding: "12px 20px",
    borderRadius: "50px",
    border: "1.5px solid rgba(232,97,58,0.2)",
    background: "#fff",
    fontSize: "13px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 2px 16px rgba(232,97,58,0.08)",
    appearance: "none",
    paddingRight: "36px",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23e8613a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
  },
  // Category chips
  categoryRow: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "52px",
  },
  chip: (active) => ({
    padding: "8px 22px",
    borderRadius: "50px",
    border: active ? "none" : "1.5px solid rgba(232,97,58,0.2)",
    background: active ? "linear-gradient(135deg, #e8613a, #f0855e)" : "#fff",
    color: active ? "#fff" : "rgba(28,20,16,0.6)",
    fontSize: "13px",
    fontWeight: "700",
    fontFamily: "'Nunito Sans', sans-serif",
    letterSpacing: "0.3px",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
    boxShadow: active ? "0 6px 20px rgba(232,97,58,0.35)" : "none",
    outline: "none",
    whiteSpace: "nowrap",
  }),
  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "28px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: (hov) => ({
    background: "#fff",
    borderRadius: "22px",
    overflow: "hidden",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: hov ? "0 20px 60px rgba(232,97,58,0.18)" : "0 4px 24px rgba(0,0,0,0.06)",
    transform: hov ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    textDecoration: "none",
    color: "inherit",
    display: "block",
    position: "relative",
  }),
  imgWrap: {
    height: "220px",
    background: "linear-gradient(135deg, #fef5f0, #fff5f2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  cardImg: (hov) => ({
    maxHeight: "160px",
    maxWidth: "100%",
    objectFit: "contain",
    transform: hov ? "scale(1.08)" : "scale(1)",
    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  cardBadge: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "linear-gradient(135deg, #e8613a, #f0855e)",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "800",
    fontFamily: "'Nunito Sans', sans-serif",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: "50px",
  },
  cardBody: {
    padding: "22px 24px 26px",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  cardAuthor: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#e8613a",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  metaDot: {
    width: "3px",
    height: "3px",
    borderRadius: "50%",
    background: "rgba(28,20,16,0.2)",
  },
  cardDate: {
    fontSize: "11px",
    color: "rgba(28,20,16,0.35)",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1c1410",
    lineHeight: 1.4,
    marginBottom: "8px",
    letterSpacing: "-0.2px",
  },
  cardStars: {
    color: "#f5a623",
    fontSize: "14px",
    letterSpacing: "2px",
    marginBottom: "10px",
  },
  cardDesc: {
    fontSize: "13px",
    color: "rgba(28,20,16,0.55)",
    lineHeight: 1.7,
    fontFamily: "'Nunito Sans', sans-serif",
  },
  readMore: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "16px",
    fontSize: "12px",
    fontWeight: "800",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#e8613a",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  // Sidebar (top products)
  sidebarWrap: {
    maxWidth: "340px",
    margin: "48px auto 0",
  },
  sidebarCard: {
    background: "#fff",
    borderRadius: "22px",
    padding: "28px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  sidebarTitle: {
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#e8613a",
    fontFamily: "'Nunito Sans', sans-serif",
    marginBottom: "24px",
    textAlign: "center",
  },
  sidebarItem: (hov) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px",
    borderRadius: "14px",
    background: hov ? "rgba(232,97,58,0.05)" : "transparent",
    transition: "all 0.25s ease",
    cursor: "pointer",
    marginBottom: "4px",
  }),
  sidebarImgWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #fef5f0, #fff5f2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: "6px",
  },
  sidebarImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  sidebarItemTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#1c1410",
    lineHeight: 1.35,
    marginBottom: "4px",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(232,97,58,0.15), transparent)",
    margin: "32px 0",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 0",
    color: "rgba(28,20,16,0.35)",
    fontFamily: "'Nunito Sans', sans-serif",
  },
}

const ProductCard = ({ item, index }) => {
  const [hov, setHov] = useState(false)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80 + index * 60)
    return () => clearTimeout(t)
  }, [index])

  return (
    <Link
      to={`/review/${item.id}`}
      style={{
        ...S.card(hov),
        opacity: vis ? 1 : 0,
        transform: vis
          ? (hov ? "translateY(-8px) scale(1.01)" : "translateY(0)")
          : "translateY(28px)",
        transition: vis
          ? "all 0.4s cubic-bezier(0.23,1,0.32,1)"
          : `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`,
        textDecoration: "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.imgWrap}>
        <img src={BASE_URL + item.image} alt={item.title} style={S.cardImg(hov)} />
        <div style={S.cardBadge}>Review</div>
      </div>
      <div style={S.cardBody}>
        <div style={S.cardMeta}>
          <span style={S.cardAuthor}>Admin</span>
          <div style={S.metaDot} />
          <span style={S.cardDate}>Verified Review</span>
        </div>
        <div style={S.cardTitle}>{item.title}</div>
        <div style={S.cardStars}>★★★★★</div>
        <div style={S.cardDesc}>{item.description?.substring(0, 90)}…</div>
        <div style={S.readMore}>
          Read Review <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
        </div>
      </div>
    </Link>
  )
}

const SidebarItem = ({ item }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={S.sidebarItem(hov)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.sidebarImgWrap}>
        <img src={BASE_URL + item.image} alt={item.title} style={S.sidebarImg} />
      </div>
      <div>
        <div style={S.sidebarItemTitle}>{item.title?.substring(0, 38)}{item.title?.length > 38 ? "…" : ""}</div>
        <div style={{ color: "#f5a623", fontSize: "12px", letterSpacing: "1px" }}>★★★★★</div>
      </div>
    </div>
  )
}

const Reviews = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchFocus, setSearchFocus] = useState(false)

  const fetchProducts = async () => {
    const res = await API.get("/products")
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,700;0,800;1,700&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      * { box-sizing: border-box; }
    `
    document.head.appendChild(style)
  }, [])

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))]

  let filtered = [...products]
  if (activeCategory !== "All") filtered = filtered.filter(p => p.category === activeCategory)
  filtered = filtered.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))
  if (sort === "low") filtered.sort((a, b) => a.price - b.price)
  if (sort === "high") filtered.sort((a, b) => b.price - a.price)

  return (
    <>
      <div style={S.page}>

        {/* Hero */}
        <div style={S.hero}>
          <div style={{ animation: "fadeUp 0.7s ease both" }}>
            <span style={S.heroEyebrow}>✦ Expert Opinions</span>
            <h1 style={S.heroTitle}>
              Product <span style={S.heroAccent}>Reviews</span>
            </h1>
            <p style={S.heroSub}>
              Honest, in-depth reviews curated by our team — find your perfect product.
            </p>
          </div>

          {/* Controls */}
          <div style={{ ...S.controlsWrap, animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={S.resultCount}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>

            <div style={S.searchWrap}>
              <span style={S.searchIcon}>🔍</span>
              <input
                style={{
                  ...S.searchInput,
                  borderColor: searchFocus ? "#e8613a" : "rgba(232,97,58,0.2)",
                  boxShadow: searchFocus
                    ? "0 2px 20px rgba(232,97,58,0.18)"
                    : "0 2px 16px rgba(232,97,58,0.08)",
                }}
                placeholder="Search reviews…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
            </div>

            <select
              style={S.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="default">Default Sorting</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

          {/* Category chips */}
          <div style={{ ...S.categoryRow, animation: "fadeUp 0.7s ease 0.18s both" }}>
            {categories.map(cat => (
              <button
                key={cat}
                style={S.chip(activeCategory === cat)}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid — centered */}
        <Container fluid style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px 80px" }}>

          {filtered.length === 0 ? (
            <div style={S.emptyState}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#1c1410", marginBottom: "8px" }}>No reviews found</div>
              <div>Try adjusting your search or category filter</div>
            </div>
          ) : (
            <div style={S.grid}>
              {filtered.map((item, i) => (
                <ProductCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}

          {/* Top Products sidebar strip — centered below grid */}
          {products.length > 0 && (
            <>
              <div style={S.divider} />
              <div style={S.sidebarWrap}>
                <div style={S.sidebarCard}>
                  <div style={S.sidebarTitle}>⭐ Top Reviewed</div>
                  {products.slice(0, 4).map(item => (
                    <SidebarItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </>
          )}
        </Container>
      </div>

      <InstagramSection />
    </>
  )
}

export default Reviews