import { useEffect, useState, useMemo, useCallback } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import API from "../services/api"
import PageHeader from "../components/PageHeader"
import InstagramSection from "../components/InstagramSection"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"
const PER_PAGE = 12

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
  const r = Math.min(5, Math.max(0, parseFloat(rating) || 0))
  const full = Math.floor(r)
  const half = r - full >= 0.5
  return (
    <span style={{ color: "#f5a623", fontSize: "12px" }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: T.muted, fontSize: "10px", marginLeft: "4px" }}>
        ({r.toFixed(1)})
      </span>
    </span>
  )
}

// ── Product Card ──────────────────────────────────────────────
const ProductCard = ({ product, index, vis }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(18px)",
      transition: `all 0.5s ease ${(index % PER_PAGE) * 0.04}s`,
    }}>
      <Link
        to={`/product/${product.id}`}
        style={{
          background: T.white, borderRadius: T.radius, textDecoration: "none",
          border: `1px solid ${hov ? "rgba(232,97,58,0.22)" : T.border}`,
          overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: hov ? "0 20px 56px rgba(232,97,58,0.12)" : "0 3px 16px rgba(0,0,0,0.05)",
          transform: hov ? "translateY(-5px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Badges */}
        <div style={{ position: "relative" }}>
          <div style={{
            height: "200px", overflow: "hidden",
            background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}>
            {product.image
              ? <img src={`${BASE_URL}${product.image}`} alt={product.title}
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
                    transform: hov ? "scale(1.07)" : "scale(1)",
                    transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)" }} />
              : <div style={{ fontSize: "48px", opacity: 0.2 }}>📦</div>
            }
          </div>
          {/* Badge row */}
          <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {product.isTopDeal && (
              <span style={{ background: "linear-gradient(135deg,#e8613a,#f0855e)", color: "#fff",
                fontSize: "9px", fontWeight: "800", padding: "3px 10px", borderRadius: "50px",
                letterSpacing: "0.5px" }}>🔥 TOP DEAL</span>
            )}
            {product.isNew && (
              <span style={{ background: "linear-gradient(135deg,#34d399,#6ee7b7)", color: "#fff",
                fontSize: "9px", fontWeight: "800", padding: "3px 10px", borderRadius: "50px" }}>NEW</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {product.Category?.name && (
            <span style={{ fontSize: "10px", fontWeight: "800", color: T.accent,
              textTransform: "uppercase", letterSpacing: "1px" }}>
              {product.Category.name}
            </span>
          )}
          <div style={{ fontSize: "14px", fontWeight: "700", color: hov ? T.accent : T.dark,
            lineHeight: 1.45, transition: "color 0.2s ease",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: T.sans }}>
            {product.title}
          </div>
          <Stars rating={product.rating} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            <span style={{ fontSize: "18px", fontWeight: "800", fontFamily: T.serif, color: T.accent }}>
              ${product.price}
            </span>
            <span style={{
              fontSize: "11px", fontWeight: "700",
              color: hov ? "#fff" : T.accent,
              background: hov ? "linear-gradient(135deg,#e8613a,#f0855e)" : "rgba(232,97,58,0.08)",
              padding: "5px 12px", borderRadius: "50px",
              border: `1px solid ${hov ? "transparent" : T.border}`,
              transition: "all 0.25s ease",
            }}>
              View →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ── Category pill in sidebar ──────────────────────────────────
const CatPill = ({ cat, active, count, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 14px", borderRadius: "10px", cursor: "pointer",
        background: active ? "rgba(232,97,58,0.08)" : hov ? "rgba(28,20,16,0.03)" : "transparent",
        border: `1.5px solid ${active ? T.accent : "transparent"}`,
        transition: "all 0.22s ease", marginBottom: "3px",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "8px",
        fontSize: "13px", fontWeight: active ? "700" : "600",
        color: active ? T.accent : T.dark, transition: "color 0.2s ease" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "2px", flexShrink: 0,
          background: active ? T.accent : "rgba(28,20,16,0.15)",
          transition: "background 0.2s ease" }} />
        {cat}
      </span>
      <span style={{ fontSize: "11px", fontWeight: "700",
        color: active ? T.accent : "rgba(28,20,16,0.3)" }}>
        {count}
      </span>
    </div>
  )
}

// ── Price range slider ────────────────────────────────────────
const PriceRange = ({ min, max, value, onChange }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between",
        fontSize: "12px", fontWeight: "700", color: T.muted, marginBottom: "10px" }}>
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
      <input type="range" min={min} max={max} value={value[1]}
        onChange={e => onChange([value[0], Number(e.target.value)])}
        style={{ width: "100%", accentColor: T.accent }} />
    </div>
  )
}

// ── Page button ───────────────────────────────────────────────
const PageBtn = ({ label, onClick, active, disabled }) => {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        minWidth: "44px", height: "44px", padding: "0 14px", borderRadius: "12px",
        border: `1.5px solid ${active ? T.accent : hov ? "rgba(232,97,58,0.3)" : "rgba(28,20,16,0.1)"}`,
        background: active ? "linear-gradient(135deg,#e8613a,#f0855e)" : hov ? "rgba(232,97,58,0.05)" : T.white,
        color: active ? "#fff" : hov ? T.accent : T.dark,
        fontSize: "14px", fontWeight: "700", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: active ? "0 6px 20px rgba(232,97,58,0.3)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  )
}

// ── Sort options ──────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "default",    label: "Default Sorting" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "newest",     label: "Newest First" },
]

// ── Main ──────────────────────────────────────────────────────
const CategoryPage = () => {
  const { slug }                            = useParams()
  const [searchParams, setSearchParams]     = useSearchParams()

  const [products,      setProducts]        = useState([])
  const [categories,    setCategories]      = useState([])
  const [loading,       setLoading]         = useState(true)
  const [vis,           setVis]             = useState(false)
  const [page,          setPage]            = useState(1)

  // Filters
  const [searchInput,   setSearchInput]     = useState(searchParams.get("search") || "")
  const [searchQuery,   setSearchQuery]     = useState(searchParams.get("search") || "")
  const [activeCategory,setActiveCategory]  = useState(searchParams.get("category") || slug || "")
  const [sortBy,        setSortBy]          = useState(searchParams.get("sort") || "default")
  const [priceRange,    setPriceRange]      = useState([0, 10000])
  const [maxPrice,      setMaxPrice]        = useState(10000)
  const [topDealOnly,   setTopDealOnly]     = useState(false)
  const [topRatedOnly,  setTopRatedOnly]    = useState(false)
  const [showSort,      setShowSort]        = useState(false)
  const [sbtnHov,       setSbtnHov]        = useState(false)
  const [clearHov,      setClearHov]        = useState(false)

  // Load data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, catRes] = await Promise.allSettled([
          API.get("/products"),
          API.get("/categories"),
        ])
        if (prodRes.status === "fulfilled") {
          const data = Array.isArray(prodRes.value.data) ? prodRes.value.data : []
          setProducts(data)
          // Set max price from data
          const prices = data.map(p => parseFloat(p.price) || 0)
          const max = Math.ceil(Math.max(...prices, 100))
          setMaxPrice(max)
          setPriceRange([0, max])
        }
        if (catRes.status === "fulfilled") {
          const data = catRes.value.data
          const arr = Array.isArray(data) ? data
            : Array.isArray(data?.categories) ? data.categories : []
          setCategories(arr)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        setTimeout(() => setVis(true), 80)
      }
    }
    fetchAll()

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `*{box-sizing:border-box}@keyframes spin{to{transform:rotate(360deg)}}`
    document.head.appendChild(style)
  }, [])

  // Sync URL params
  useEffect(() => {
    const p = {}
    if (searchQuery)    p.search   = searchQuery
    if (activeCategory) p.category = activeCategory
    if (sortBy !== "default") p.sort = sortBy
    setSearchParams(p, { replace: true })
  }, [searchQuery, activeCategory, sortBy])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [searchQuery, activeCategory, sortBy, priceRange, topDealOnly, topRatedOnly])

  // Category counts
  const categoryCounts = useMemo(() => {
    const map = {}
    products.forEach(p => {
      const name = p.Category?.name || p.category || ""
      if (name) map[name] = (map[name] || 0) + 1
    })
    return map
  }, [products])

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let list = [...products]

    // Category
    if (activeCategory) {
      list = list.filter(p =>
        (p.Category?.name || p.category || "").toLowerCase() === activeCategory.toLowerCase()
      )
    }
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }
    // Price
    list = list.filter(p => {
      const price = parseFloat(p.price) || 0
      return price >= priceRange[0] && price <= priceRange[1]
    })
    // Top deal
    if (topDealOnly) list = list.filter(p => p.isTopDeal)
    // Top rated
    if (topRatedOnly) list = list.filter(p => parseFloat(p.rating) >= 4)

    // Sort
    switch (sortBy) {
      case "price_asc":  list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break
      case "price_desc": list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break
      case "rating":     list.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0)); break
      case "newest":     list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
      default: break
    }

    return list
  }, [products, activeCategory, searchQuery, priceRange, sortBy, topDealOnly, topRatedOnly])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const hasFilters = !!(searchQuery || activeCategory || sortBy !== "default" || topDealOnly || topRatedOnly)

  const clearAll = useCallback(() => {
    setSearchInput(""); setSearchQuery("")
    setActiveCategory(""); setSortBy("default")
    setPriceRange([0, maxPrice])
    setTopDealOnly(false); setTopRatedOnly(false)
    setPage(1)
  }, [maxPrice])

  const currentCatName = activeCategory
    || categories.find(c => c.slug === slug)?.name
    || "All Products"

  return (
    <>
      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>
        <PageHeader title={currentCatName} breadcrumb={currentCatName} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "32px", alignItems: "start" }}>

            {/* ══ SIDEBAR ════════════════════════════════════ */}
            <aside style={{
              position: "sticky", top: "24px",
              display: "flex", flexDirection: "column", gap: "18px",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 0.2s",
            }}>

              {/* Search */}
              <div style={{ background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`, overflow: "hidden",
                boxShadow: "0 3px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
                    Search
                  </span>
                </div>
                <div style={{ padding: "14px" }}>
                  <div style={{ display: "flex", borderRadius: "12px", overflow: "hidden",
                    border: "1.5px solid rgba(28,20,16,0.1)" }}>
                    <input
                      placeholder="Search products…"
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && setSearchQuery(searchInput.trim())}
                      style={{ flex: 1, padding: "10px 13px", border: "none",
                        background: "#fafafa", fontSize: "13px",
                        fontFamily: T.sans, color: T.dark, outline: "none" }}
                    />
                    <button
                      onClick={() => setSearchQuery(searchInput.trim())}
                      onMouseEnter={() => setSbtnHov(true)}
                      onMouseLeave={() => setSbtnHov(false)}
                      style={{ padding: "10px 14px", border: "none",
                        background: sbtnHov ? "#d4542e" : T.accent,
                        color: "#fff", fontSize: "14px", cursor: "pointer",
                        transition: "background 0.2s ease" }}>
                      🔍
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div style={{ background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`, overflow: "hidden",
                boxShadow: "0 3px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
                    Categories
                  </span>
                </div>
                <div style={{ padding: "10px 10px" }}>
                  <CatPill
                    cat="All Products"
                    count={products.length}
                    active={activeCategory === ""}
                    onClick={() => setActiveCategory("")}
                  />
                  {categories.map(c => (
                    <CatPill
                      key={c.id}
                      cat={c.name}
                      count={categoryCounts[c.name] || 0}
                      active={activeCategory === c.name}
                      onClick={() => setActiveCategory(prev => prev === c.name ? "" : c.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div style={{ background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`, overflow: "hidden",
                boxShadow: "0 3px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
                    Price Range
                  </span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <PriceRange min={0} max={maxPrice} value={priceRange} onChange={setPriceRange} />
                </div>
              </div>

              {/* Quick filters */}
              <div style={{ background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`, overflow: "hidden",
                boxShadow: "0 3px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
                    Quick Filters
                  </span>
                </div>
                <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "🔥 Top Deals Only",   val: topDealOnly,  set: setTopDealOnly },
                    { label: "⭐ Top Rated (4.0+)", val: topRatedOnly, set: setTopRatedOnly },
                  ].map(({ label, val, set }) => (
                    <label key={label} style={{ display: "flex", alignItems: "center", gap: "10px",
                      cursor: "pointer", fontSize: "13px", fontWeight: "600", color: T.dark }}>
                      <div
                        onClick={() => set(v => !v)}
                        style={{
                          width: "20px", height: "20px", borderRadius: "6px", flexShrink: 0,
                          border: `2px solid ${val ? T.accent : "rgba(28,20,16,0.15)"}`,
                          background: val ? T.accent : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 0.2s ease",
                        }}>
                        {val && <span style={{ color: "#fff", fontSize: "11px", fontWeight: "900" }}>✓</span>}
                      </div>
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {hasFilters && (
                <button
                  onClick={clearAll}
                  onMouseEnter={() => setClearHov(true)}
                  onMouseLeave={() => setClearHov(false)}
                  style={{
                    padding: "13px", borderRadius: "13px", border: `1.5px solid ${T.border}`,
                    background: clearHov ? "rgba(232,97,58,0.05)" : T.white,
                    color: T.accent, fontSize: "13px", fontWeight: "800",
                    cursor: "pointer", fontFamily: T.sans,
                    transition: "all 0.2s ease",
                  }}>
                  ✕ Clear All Filters
                </button>
              )}

            </aside>

            {/* ══ MAIN CONTENT ═══════════════════════════════ */}
            <div>

              {/* Top bar: results + sort */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                padding: "16px 22px", marginBottom: "28px",
                boxShadow: "0 3px 16px rgba(0,0,0,0.04)",
                flexWrap: "wrap", gap: "12px",
              }}>
                {/* Result count */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    background: "linear-gradient(135deg,#e8613a,#f0855e)",
                    color: "#fff", fontSize: "14px", fontWeight: "800",
                    padding: "6px 14px", borderRadius: "50px",
                    fontFamily: T.serif,
                  }}>
                    {filtered.length}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: T.muted }}>
                    product{filtered.length !== 1 ? "s" : ""} found
                    {activeCategory && <span> in <strong style={{ color: T.accent }}>{activeCategory}</strong></span>}
                  </span>
                </div>

                {/* Sort dropdown */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowSort(s => !s)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "10px 18px", borderRadius: "12px",
                      border: `1.5px solid ${T.border}`,
                      background: showSort ? "rgba(232,97,58,0.05)" : T.white,
                      color: T.dark, fontSize: "13px", fontWeight: "700",
                      cursor: "pointer", fontFamily: T.sans,
                      transition: "all 0.2s ease",
                    }}>
                    <span>⇅</span>
                    {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                    <span style={{ fontSize: "10px", marginLeft: "2px" }}>▾</span>
                  </button>

                  {showSort && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 8px)", right: 0,
                      background: T.white, borderRadius: "14px",
                      border: `1px solid ${T.border}`,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
                      zIndex: 100, minWidth: "200px", overflow: "hidden",
                    }}>
                      {SORT_OPTIONS.map(opt => (
                        <div key={opt.value}
                          onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                          style={{
                            padding: "11px 18px", fontSize: "13px", fontWeight: "600",
                            color: sortBy === opt.value ? T.accent : T.dark,
                            background: sortBy === opt.value ? "rgba(232,97,58,0.06)" : "transparent",
                            cursor: "pointer", transition: "all 0.15s ease",
                            fontFamily: T.sans,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(232,97,58,0.04)"}
                          onMouseLeave={e => e.currentTarget.style.background = sortBy === opt.value ? "rgba(232,97,58,0.06)" : "transparent"}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Active filter chips */}
              {hasFilters && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
                  {searchQuery && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "5px 13px", borderRadius: "50px",
                      background: "rgba(232,97,58,0.08)", border: `1px solid ${T.border}`,
                      color: T.accent, fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                      onClick={() => { setSearchQuery(""); setSearchInput("") }}>
                      🔍 "{searchQuery}" ×
                    </span>
                  )}
                  {activeCategory && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "5px 13px", borderRadius: "50px",
                      background: "rgba(232,97,58,0.08)", border: `1px solid ${T.border}`,
                      color: T.accent, fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                      onClick={() => setActiveCategory("")}>
                      📂 {activeCategory} ×
                    </span>
                  )}
                  {topDealOnly && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "5px 13px", borderRadius: "50px",
                      background: "rgba(232,97,58,0.08)", border: `1px solid ${T.border}`,
                      color: T.accent, fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                      onClick={() => setTopDealOnly(false)}>
                      🔥 Top Deals ×
                    </span>
                  )}
                  {topRatedOnly && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "5px 13px", borderRadius: "50px",
                      background: "rgba(232,97,58,0.08)", border: `1px solid ${T.border}`,
                      color: T.accent, fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                      onClick={() => setTopRatedOnly(false)}>
                      ⭐ Top Rated ×
                    </span>
                  )}
                </div>
              )}

              {/* Products grid */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%",
                    border: "3px solid rgba(232,97,58,0.15)",
                    borderTop: "3px solid #e8613a",
                    animation: "spin 0.9s linear infinite", margin: "0 auto 16px" }} />
                  <div style={{ fontSize: "14px", fontWeight: "700", color: T.muted }}>Loading products…</div>
                </div>
              ) : paginated.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 24px",
                  background: T.white, borderRadius: T.radius, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: "52px", marginBottom: "16px" }}>🔍</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: T.serif,
                    color: T.dark, marginBottom: "8px" }}>No products found</div>
                  <div style={{ fontSize: "14px", color: T.muted, marginBottom: "24px" }}>
                    Try adjusting your filters or search
                  </div>
                  <button onClick={clearAll} style={{
                    padding: "12px 28px", borderRadius: "50px", border: "none",
                    background: "linear-gradient(135deg,#e8613a,#f0855e)",
                    color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(232,97,58,0.3)",
                  }}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px", marginBottom: "40px",
                  }}>
                    {paginated.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} vis={vis} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <PageBtn label="‹" onClick={() => setPage(p => p - 1)} disabled={page === 1} />
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PageBtn
                          key={i}
                          label={String(i + 1).padStart(2, "0")}
                          active={page === i + 1}
                          onClick={() => setPage(i + 1)}
                        />
                      ))}
                      <PageBtn label="›" onClick={() => setPage(p => p + 1)} disabled={page === totalPages} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <InstagramSection />
    </>
  )
}

export default CategoryPage