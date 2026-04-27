import { useEffect, useState, useRef } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"
import InstagramSection from "./InstagramSection"
import PageHeader from "./PageHeader"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

// ─── Design tokens ────────────────────────────────────────────
const T = {
  bg:      "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
  accent:  "#e8613a",
  dark:    "#1c1410",
  card:    "#ffffff",
  muted:   "rgba(28,20,16,0.45)",
  border:  "rgba(232,97,58,0.1)",
  radius:  "20px",
  font:    "'Nunito Sans', sans-serif",
  serif:   "'Lora', serif",
}

const S = {
  page: {
    background: T.bg,
    minHeight: "100vh",
    fontFamily: T.font,
  },
  section: {
    maxWidth: "1340px",
    margin: "0 auto",
    padding: "56px 24px 96px",
  },
  // ── Filter bar ──
  filterBar: {
    background: "#fff",
    borderRadius: "22px",
    border: `1px solid ${T.border}`,
    boxShadow: "0 4px 32px rgba(232,97,58,0.06)",
    padding: "22px 28px",
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  resultChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "120px",
    padding: "14px 20px",
    background: "linear-gradient(135deg,rgba(232,97,58,0.08),rgba(232,97,58,0.04))",
    borderRadius: "14px",
    border: `1px solid ${T.border}`,
  },
  resultNum: {
    fontSize: "26px",
    fontWeight: "800",
    fontFamily: T.serif,
    color: T.accent,
    lineHeight: 1,
  },
  resultLabel: {
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: T.muted,
    marginTop: "3px",
  },
  // Search
  searchWrap: {
    position: "relative",
    flex: "1",
    minWidth: "200px",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "15px",
    pointerEvents: "none",
    color: T.muted,
  },
  searchInput: (focus) => ({
    width: "100%",
    padding: "13px 16px 13px 42px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? T.accent : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: T.font,
    color: T.dark,
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  // Sort select
  sortWrap: { minWidth: "200px" },
  sortLabel: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: T.muted,
    marginBottom: "6px",
    display: "block",
  },
  sortSelect: (focus) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? T.accent : "rgba(28,20,16,0.1)"}`,
    background: "#fafafa",
    fontSize: "14px",
    fontFamily: T.font,
    color: T.dark,
    outline: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23e8613a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "38px",
  }),
  // ── Active filter chips ──
  chipRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "28px",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    borderRadius: "50px",
    background: "rgba(232,97,58,0.08)",
    border: "1px solid rgba(232,97,58,0.2)",
    color: T.accent,
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },
  // ── Products grid ──
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "56px",
  },
  // ── Product card ──
  card: (hov) => ({
    background: T.card,
    borderRadius: T.radius,
    border: `1px solid ${hov ? "rgba(232,97,58,0.2)" : T.border}`,
    boxShadow: hov
      ? "0 20px 56px rgba(232,97,58,0.14)"
      : "0 3px 20px rgba(0,0,0,0.05)",
    transform: hov ? "translateY(-6px)" : "translateY(0)",
    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    cursor: "pointer",
  }),
  imgWrap: {
    position: "relative",
    height: "240px",
    background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "16px",
  },
  img: (hov) => ({
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    transform: hov ? "scale(1.07)" : "scale(1)",
    transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
  }),
  badgeRow: {
    position: "absolute",
    top: "14px",
    left: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  badge: (color, bg) => ({
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color,
    background: bg,
    padding: "4px 10px",
    borderRadius: "50px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }),
  couponTag: {
    position: "absolute",
    bottom: "14px",
    right: "14px",
    background: "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "800",
    padding: "5px 12px",
    borderRadius: "50px",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 14px rgba(232,97,58,0.35)",
  },
  wishBtn: (hov) => ({
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: hov ? T.accent : "#fff",
    border: `1px solid ${hov ? T.accent : "rgba(232,97,58,0.2)"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
    zIndex: 2,
  }),
  cardBody: {
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  productTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: T.dark,
    lineHeight: 1.4,
    fontFamily: T.font,
    minHeight: "40px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  ratingStars: {
    display: "flex",
    gap: "1px",
  },
  ratingNum: {
    fontSize: "12px",
    fontWeight: "700",
    color: T.muted,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "2px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
    fontFamily: T.serif,
    background: "linear-gradient(135deg,#e8613a,#f0855e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  oldPrice: {
    fontSize: "13px",
    color: "rgba(28,20,16,0.3)",
    textDecoration: "line-through",
    fontWeight: "600",
  },
  addBtn: (hov) => ({
    width: "100%",
    padding: "13px",
    borderRadius: "13px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg,#d4542e,#e8613a)"
      : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 30px rgba(232,97,58,0.45)" : "0 4px 16px rgba(232,97,58,0.2)",
    transform: hov ? "translateY(-1px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "auto",
  }),
  // ── Toast ──
  toast: (show, ok) => ({
    position: "fixed",
    bottom: "32px",
    right: "32px",
    background: "#fff",
    border: `1px solid ${ok ? "rgba(0,180,80,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "16px",
    padding: "16px 22px",
    color: ok ? "#00a84f" : T.accent,
    fontWeight: "700",
    fontSize: "14px",
    fontFamily: T.font,
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: "none",
    maxWidth: "340px",
  }),
  // ── Empty state ──
  empty: {
    textAlign: "center",
    padding: "80px 24px",
    background: "#fff",
    borderRadius: T.radius,
    border: `1px solid ${T.border}`,
  },
  // ── Pagination ──
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  pageBtn: (active, hov) => ({
    minWidth: "42px",
    height: "42px",
    padding: "0 12px",
    borderRadius: "12px",
    border: `1.5px solid ${active ? T.accent : hov ? "rgba(232,97,58,0.3)" : "rgba(28,20,16,0.1)"}`,
    background: active
      ? "linear-gradient(135deg,#e8613a,#f0855e)"
      : hov ? "rgba(232,97,58,0.05)" : "#fff",
    color: active ? "#fff" : hov ? T.accent : T.dark,
    fontSize: "14px",
    fontWeight: "700",
    fontFamily: T.font,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    boxShadow: active ? "0 6px 20px rgba(232,97,58,0.3)" : "none",
    transition: "all 0.25s ease",
  }),
  // ── Spinner ──
  spinnerWrap: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  spinner: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "3px solid rgba(232,97,58,0.15)",
    borderTop: "3px solid #e8613a",
    animation: "spin 0.9s linear infinite",
  },
}

// ─── Star renderer ────────────────────────────────────────────
const Stars = ({ rating }) => {
  // Guard: clamp to 0-5, default to 0 if invalid
  const r     = Math.min(5, Math.max(0, parseFloat(rating) || 0))
  const full  = Math.floor(r)
  const half  = r % 1 >= 0.5
  const empty = Math.max(0, 5 - full - (half ? 1 : 0))
  return (
    <div style={S.ratingStars}>
      {Array(full).fill(null).map((_,i) => <span key={"f"+i} style={{ color:"#f5a623",fontSize:"13px" }}>★</span>)}
      {half && <span style={{ color:"#f5a623",fontSize:"13px" }}>★</span>}
      {Array(empty).fill(null).map((_,i) => <span key={"e"+i} style={{ color:"rgba(28,20,16,0.2)",fontSize:"13px" }}>☆</span>)}
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart, vis, index }) => {
  const [hov,     setHov]     = useState(false)
  const [btnHov,  setBtnHov]  = useState(false)
  const [wishHov, setWishHov] = useState(false)
  const [wished,  setWished]  = useState(false)

  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s ease ${(index % 12) * 0.05}s`,
    }}>
      <Link to={`/product/${product.id}`} style={{ ...S.card(hov), display: "flex", flexDirection: "column", textDecoration: "none" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

        {/* Image area */}
        <div style={S.imgWrap}>
          {product.image
            ? <img src={BASE_URL + product.image} alt={product.title} style={S.img(hov)} />
            : <div style={{ fontSize: "48px", opacity: 0.3 }}>📦</div>
          }

          {/* Badges */}
          <div style={S.badgeRow}>
            {product.isNew      && <span style={S.badge("#fff","linear-gradient(135deg,#34d399,#059669)")}>✦ New</span>}
            {product.isTopDeal  && <span style={S.badge("#fff","linear-gradient(135deg,#e8613a,#f0855e)")}>🔥 Top Deal</span>}
            {product.isPopular  && <span style={S.badge("#1c1410","linear-gradient(135deg,#fbbf24,#fde68a)")}>⭐ Popular</span>}
          </div>

          {/* Coupon tag */}
          {product.Coupon && (
            <div style={S.couponTag}>
              Save {product.Coupon.discountType === "percentage"
                ? product.Coupon.discountValue + "%"
                : "$" + product.Coupon.discountValue}
            </div>
          )}

          {/* Wishlist button */}
          <button
            style={S.wishBtn(wishHov || wished)}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setWished(w => !w) }}
            onMouseEnter={e => { e.preventDefault(); setWishHov(true) }}
            onMouseLeave={e => { e.preventDefault(); setWishHov(false) }}
          >
            {wished ? "♥" : "♡"}
          </button>
        </div>

        {/* Body */}
        <div style={S.cardBody}>
          <div style={S.productTitle}>{product.title}</div>

          {product.rating && !isNaN(parseFloat(product.rating)) && (
            <div style={S.ratingRow}>
              <Stars rating={parseFloat(product.rating)} />
              <span style={S.ratingNum}>{parseFloat(product.rating).toFixed(1)}</span>
            </div>
          )}

          <div style={S.priceRow}>
            <span style={S.price}>${Number(product.price).toFixed(2)}</span>
            {product.oldPrice && <span style={S.oldPrice}>${Number(product.oldPrice).toFixed(2)}</span>}
          </div>

          <button
            style={S.addBtn(btnHov)}
            onClick={e => { e.preventDefault(); e.stopPropagation(); onAddToCart(product) }}
            onMouseEnter={e => { e.preventDefault(); setBtnHov(true) }}
            onMouseLeave={e => { e.preventDefault(); setBtnHov(false) }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </Link>
    </div>
  )
}

// ─── Pagination button ────────────────────────────────────────
const PageBtn = ({ label, onClick, active, disabled }) => {
  const [hov, setHov] = useState(false)
  if (disabled) return null
  return (
    <button
      style={S.pageBtn(active, hov)}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────
const Shop = () => {
  const [products,    setProducts]    = useState([])
  const [search,      setSearch]      = useState("")
  const [sort,        setSort]        = useState("default")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading,     setLoading]     = useState(true)
  const [vis,         setVis]         = useState(false)
  const [searchFocus, setSearchFocus] = useState(false)
  const [sortFocus,   setSortFocus]   = useState(false)
  const [toast,       setToast]       = useState({ show: false, msg: "", ok: true })

  const productsPerPage = 12

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2400)
  }

  useEffect(() => {
    fetchProducts()
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await API.get("/products")
      setProducts(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setTimeout(() => setVis(true), 80)
    }
  }

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const existing = cart.find(i => i.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, couponId: product.couponId, qty: 1 })
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    showToast(`✓ ${product.title.substring(0, 28)}… added to cart!`)
  }

  const filtered = [...products]
    .filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "priceLow")  return a.price - b.price
      if (sort === "priceHigh") return b.price - a.price
      if (sort === "rating")    return (b.rating || 0) - (a.rating || 0)
      if (sort === "newest")    return b.id - a.id
      if (sort === "nameAZ")    return a.title.localeCompare(b.title)
      if (sort === "nameZA")    return b.title.localeCompare(a.title)
      return 0
    })

  const indexOfLast    = currentPage * productsPerPage
  const indexOfFirst   = indexOfLast - productsPerPage
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages      = Math.ceil(filtered.length / productsPerPage)

  const clearFilters = () => { setSearch(""); setSort("default"); setCurrentPage(1) }

  const hasFilters = search !== "" || sort !== "default"

  // ── Sort label map ──
  const SORT_LABELS = {
    default: null, newest: "Newest First", priceLow: "Price ↑",
    priceHigh: "Price ↓", rating: "Top Rated", nameAZ: "A→Z", nameZA: "Z→A",
  }

  return (
    <>
      <div style={S.page}>
        <PageHeader title="Shop" breadcrumb="Shop" />

        {/* Toast */}
        <div style={S.toast(toast.show, toast.ok)}>
          {toast.ok ? "✓" : "✕"} {toast.msg}
        </div>

        <div style={S.section}>

          {/* ── Filter bar ─────────────────────────────────── */}
          <div style={{
            ...S.filterBar,
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(14px)",
            transition: "all 0.5s ease",
          }}>
            {/* Result count chip */}
            <div style={S.resultChip}>
              <div style={S.resultNum}>{filtered.length}</div>
              <div style={S.resultLabel}>Products</div>
            </div>

            {/* Search */}
            <div style={S.searchWrap}>
              <span style={S.searchIcon}>🔍</span>
              <input
                placeholder="Search products…"
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
                style={S.searchInput(searchFocus)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
            </div>

            {/* Sort */}
            <div style={S.sortWrap}>
              <span style={S.sortLabel}>Sort by</span>
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setCurrentPage(1) }}
                style={S.sortSelect(sortFocus)}
                onFocus={() => setSortFocus(true)}
                onBlur={() => setSortFocus(false)}
              >
                <option value="default">Default Sorting</option>
                <option value="newest">Newest First</option>
                <option value="priceLow">💰 Price: Low → High</option>
                <option value="priceHigh">💰 Price: High → Low</option>
                <option value="rating">⭐ Top Rated</option>
                <option value="nameAZ">A → Z</option>
                <option value="nameZA">Z → A</option>
              </select>
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button onClick={clearFilters} style={{
                padding: "11px 18px", borderRadius: "13px",
                border: "1.5px solid rgba(232,97,58,0.25)",
                background: "rgba(232,97,58,0.06)",
                color: T.accent, fontSize: "12px", fontWeight: "800",
                cursor: "pointer", whiteSpace: "nowrap",
              }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* ── Active filter chips ─────────────────────────── */}
          {hasFilters && (
            <div style={S.chipRow}>
              {search && (
                <div style={S.chip} onClick={() => setSearch("")}>
                  🔍 "{search}" <span>×</span>
                </div>
              )}
              {sort !== "default" && (
                <div style={S.chip} onClick={() => setSort("default")}>
                  ↕ {SORT_LABELS[sort]} <span>×</span>
                </div>
              )}
            </div>
          )}

          {/* ── Loading ─────────────────────────────────────── */}
          {loading ? (
            <div style={S.spinnerWrap}>
              <div style={S.spinner} />
              <div style={{ fontSize: "14px", fontWeight: "700", color: T.muted }}>
                Loading products…
              </div>
            </div>
          ) : currentProducts.length === 0 ? (
            /* ── Empty state ──────────────────────────────── */
            <div style={S.empty}>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>🔍</div>
              <div style={{ fontSize: "22px", fontWeight: "800", fontFamily: T.serif, color: T.dark, marginBottom: "8px" }}>
                No Products Found
              </div>
              <div style={{ fontSize: "14px", color: T.muted, marginBottom: "28px" }}>
                Try adjusting your search or filters
              </div>
              <button onClick={clearFilters} style={{
                padding: "13px 30px", borderRadius: "50px", border: "none",
                background: "linear-gradient(135deg,#e8613a,#f0855e)",
                color: "#fff", fontSize: "14px", fontWeight: "800", cursor: "pointer",
                boxShadow: "0 8px 24px rgba(232,97,58,0.3)",
              }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* ── Products grid ──────────────────────────── */}
              <div style={S.grid}>
                {currentProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    vis={vis}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* ── Pagination ─────────────────────────────── */}
              {totalPages > 1 && (
                <div style={S.pagination}>
                  <PageBtn
                    label="← Prev"
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PageBtn
                      key={i}
                      label={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      active={currentPage === i + 1}
                    />
                  ))}
                  <PageBtn
                    label="Next →"
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage === totalPages}
                  />
                </div>
              )}
            </>
          )}

        </div>
      </div>

      <InstagramSection />
    </>
  )
}

export default Shop