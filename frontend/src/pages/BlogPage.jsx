import { useEffect, useState, useMemo, useCallback } from "react"
import { Link, useSearchParams } from "react-router-dom"
import API from "../services/api"
import PageHeader from "../components/PageHeader"
import InstagramSection from "../components/InstagramSection"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"
const PER_PAGE = 6

// ─── Design tokens ────────────────────────────────────────────
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

const S = {
  page:    { background: T.bg, minHeight: "100vh", fontFamily: T.sans },
  section: { maxWidth: "1240px", margin: "0 auto", padding: "60px 24px 96px" },
  layout:  { display: "grid", gridTemplateColumns: "1fr 300px", gap: "40px", alignItems: "start" },

  // ── Blog cards ──
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginBottom: "40px" },
  card: (hov) => ({
    background: T.white, borderRadius: T.radius,
    border: `1px solid ${hov ? "rgba(232,97,58,0.2)" : T.border}`,
    overflow: "hidden",
    boxShadow: hov ? "0 20px 56px rgba(232,97,58,0.12)" : "0 3px 16px rgba(0,0,0,0.05)",
    transform: hov ? "translateY(-5px)" : "translateY(0)",
    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
    textDecoration: "none", display: "flex", flexDirection: "column", cursor: "pointer",
  }),
  imgWrap: {
    height: "210px", overflow: "hidden",
    background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
    position: "relative",
  },
  img: (hov) => ({
    width: "100%", height: "100%", objectFit: "cover",
    transform: hov ? "scale(1.07)" : "scale(1)",
    transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
  }),
  catPill: {
    position: "absolute", top: "12px", left: "12px",
    background: T.accent, color: "#fff",
    fontSize: "9px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", padding: "4px 12px",
    borderRadius: "50px", boxShadow: "0 4px 14px rgba(232,97,58,0.4)",
  },
  cardBody: { padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" },
  metaRow: {
    display: "flex", alignItems: "center", gap: "8px",
    fontSize: "11px", fontWeight: "700", color: T.muted,
  },
  metaDot: { width: "3px", height: "3px", borderRadius: "50%", background: T.muted },
  metaDate: { color: T.accent, fontWeight: "700" },
  cardTitle: (hov) => ({
    fontSize: "15px", fontWeight: "800", fontFamily: T.serif,
    color: hov ? T.accent : T.dark, lineHeight: 1.45,
    transition: "color 0.2s ease",
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
  }),
  cardDesc: {
    fontSize: "13px", color: T.muted, lineHeight: 1.65, flex: 1,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
  },
  readMore: (hov) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    fontSize: "12px", fontWeight: "800", color: T.accent, marginTop: "auto",
    opacity: hov ? 1 : 0.7,
    transform: hov ? "translateX(4px)" : "translateX(0)",
    transition: "all 0.2s ease",
  }),

  // ── Filter strip ──
  filterBar: {
    display: "flex", alignItems: "center", gap: "8px",
    marginBottom: "22px", flexWrap: "wrap",
  },
  filterResultText: {
    fontSize: "12px", fontWeight: "700", color: T.muted, marginRight: "4px",
  },
  filterChip: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "5px 13px", borderRadius: "50px",
    background: "rgba(232,97,58,0.08)",
    border: "1px solid rgba(232,97,58,0.2)",
    color: T.accent, fontSize: "12px", fontWeight: "700", cursor: "pointer",
    transition: "all 0.2s ease",
  },
  clearBtn: (hov) => ({
    padding: "5px 13px", borderRadius: "50px",
    border: "1px solid rgba(28,20,16,0.12)",
    background: hov ? "rgba(28,20,16,0.05)" : "transparent",
    color: T.muted, fontSize: "12px", fontWeight: "700",
    cursor: "pointer", transition: "all 0.2s ease",
  }),

  // ── Pagination ──
  pagination: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", marginTop: "8px",
  },
  pageBtn: (active, hov, disabled) => ({
    minWidth: "44px", height: "44px", padding: "0 14px",
    borderRadius: "12px",
    border: `1.5px solid ${active ? T.accent : hov ? "rgba(232,97,58,0.3)" : "rgba(28,20,16,0.1)"}`,
    background: active ? "linear-gradient(135deg,#e8613a,#f0855e)"
      : hov ? "rgba(232,97,58,0.05)" : T.white,
    color: active ? "#fff" : hov ? T.accent : T.dark,
    fontSize: "14px", fontWeight: "700", fontFamily: T.sans,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: active ? "0 6px 20px rgba(232,97,58,0.3)" : "none",
    transition: "all 0.2s ease",
  }),

  // ── Sidebar cards ──
  sidebar: { display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "24px" },
  sideCard: {
    background: T.white, borderRadius: T.radius,
    border: `1px solid ${T.border}`,
    boxShadow: "0 3px 20px rgba(0,0,0,0.04)",
    overflow: "hidden",
  },
  sideHeader: {
    padding: "16px 20px 14px",
    borderBottom: `1px solid ${T.border}`,
    display: "flex", alignItems: "center", gap: "10px",
  },
  sideDot: {
    width: "8px", height: "8px", borderRadius: "50%",
    background: "linear-gradient(135deg,#e8613a,#f0855e)",
    flexShrink: 0,
  },
  sideTitle: {
    fontSize: "14px", fontWeight: "800",
    fontFamily: T.serif, color: T.dark, letterSpacing: "-0.2px",
  },
  sideBody: { padding: "16px 20px" },

  // Search
  searchRow: {
    display: "flex", borderRadius: "12px", overflow: "hidden",
    border: "1.5px solid rgba(28,20,16,0.1)",
  },
  searchInput: {
    flex: 1, padding: "11px 14px", border: "none",
    background: "#fafafa", fontSize: "13px",
    fontFamily: T.sans, color: T.dark, outline: "none",
  },
  searchBtn: (hov) => ({
    padding: "11px 16px", border: "none",
    background: hov ? "#d4542e" : T.accent,
    color: "#fff", fontSize: "14px", cursor: "pointer",
    transition: "background 0.2s ease", flexShrink: 0,
  }),

  // Category items
  catItem: (active, hov) => ({
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "9px 14px", borderRadius: "10px",
    background: active ? "rgba(232,97,58,0.08)" : hov ? "rgba(28,20,16,0.03)" : "transparent",
    cursor: "pointer", transition: "all 0.2s ease",
    marginBottom: "4px",
  }),
  catName: (active) => ({
    display: "flex", alignItems: "center", gap: "8px",
    fontSize: "13px", fontWeight: active ? "700" : "600",
    color: active ? T.accent : T.dark, transition: "color 0.2s ease",
  }),
  catSquare: (active) => ({
    width: "10px", height: "10px", borderRadius: "3px",
    background: active ? T.accent : "rgba(28,20,16,0.15)",
    flexShrink: 0, transition: "background 0.2s ease",
  }),
  catCount: (active) => ({
    fontSize: "11px", fontWeight: "700",
    color: active ? T.accent : "rgba(28,20,16,0.35)",
  }),

  // Recent posts
  recentItem: {
    display: "flex", alignItems: "flex-start", gap: "12px",
    padding: "10px 0", borderBottom: "1px solid rgba(28,20,16,0.05)",
    textDecoration: "none",
  },
  recentImg: {
    width: "58px", height: "46px", borderRadius: "10px",
    objectFit: "cover", flexShrink: 0,
    background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
  },
  recentMeta: {
    fontSize: "10px", fontWeight: "700", color: T.muted,
    marginBottom: "3px", display: "flex", gap: "6px", alignItems: "center",
  },
  recentDate: { color: T.accent },
  recentTitle: (hov) => ({
    fontSize: "12px", fontWeight: "700", lineHeight: 1.4,
    color: hov ? T.accent : T.dark, transition: "color 0.2s ease",
    display: "-webkit-box", WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical", overflow: "hidden",
  }),

  // Tags
  tag: (active, hov) => ({
    padding: "6px 14px", borderRadius: "8px",
    border: `1px solid ${active ? T.accent : "rgba(28,20,16,0.1)"}`,
    background: active ? "rgba(232,97,58,0.08)" : hov ? "rgba(28,20,16,0.03)" : "#fafafa",
    color: active ? T.accent : T.muted,
    fontSize: "12px", fontWeight: "700",
    cursor: "pointer", transition: "all 0.2s ease",
  }),

  // States
  center: { textAlign: "center", padding: "60px 24px", color: T.muted },
  spinner: {
    width: "40px", height: "40px", borderRadius: "50%",
    border: "3px solid rgba(232,97,58,0.15)",
    borderTop: "3px solid #e8613a",
    animation: "spin 0.9s linear infinite", margin: "0 auto 16px",
  },
  noImg: {
    width: "100%", height: "100%",
    background: "linear-gradient(135deg,#fef5f0,#fff0ec)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "36px", opacity: 0.4,
  },
}

// ─── Helpers ──────────────────────────────────────────────────
const fmtDate = (d) => {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

// ─── BlogCard ─────────────────────────────────────────────────
const BlogCard = ({ blog, index, vis }) => {
  const [hov, setHov] = useState(false)
  const category = blog.Category?.name || blog.category || ""
  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(18px)",
        transition: `all 0.5s ease ${(index % PER_PAGE) * 0.07}s`,
      }}
    >
      <Link
        to={`/blog/${blog.id}`}
        style={S.card(hov)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Image */}
        <div style={S.imgWrap}>
          {blog.image
            ? <img src={`${BASE_URL}${blog.image}`} alt={blog.title} style={S.img(hov)} />
            : <div style={S.noImg}>✍</div>
          }
          {category && <span style={S.catPill}>{category}</span>}
        </div>

        {/* Body */}
        <div style={S.cardBody}>
          <div style={S.metaRow}>
            <span>By {blog.author || "Admin"}</span>
            <span style={S.metaDot} />
            <span style={S.metaDate}>{fmtDate(blog.createdAt)}</span>
          </div>
          <div style={S.cardTitle(hov)}>{blog.title}</div>
          {blog.description && (
            <div style={S.cardDesc}>{blog.description}</div>
          )}
          <div style={S.readMore(hov)}>
            Read More <span style={{ fontSize: "14px" }}>→</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ─── PageBtn ──────────────────────────────────────────────────
const PageBtn = ({ label, onClick, active, disabled }) => {
  const [hov, setHov] = useState(false)
  return (
    <button
      style={S.pageBtn(active, !disabled && hov, disabled)}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

// ─── CatItem ──────────────────────────────────────────────────
const CatItem = ({ name, count, active, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={S.catItem(active, hov)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={S.catName(active)}>
        <span style={S.catSquare(active)} />
        {name}
      </span>
      <span style={S.catCount(active)}>{count}</span>
    </div>
  )
}

// ─── RecentItem ───────────────────────────────────────────────
const RecentItem = ({ blog }) => {
  const [hov, setHov] = useState(false)
  return (
    <Link to={`/blog/${blog.id}`} style={S.recentItem}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {blog.image
        ? <img src={`${BASE_URL}${blog.image}`} alt="" style={S.recentImg} />
        : <div style={{ ...S.recentImg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>✍</div>
      }
      <div>
        <div style={S.recentMeta}>
          <span>By {blog.author || "Admin"}</span>
          <span>·</span>
          <span style={S.recentDate}>{fmtDate(blog.createdAt)}</span>
        </div>
        <div style={S.recentTitle(hov)}>{blog.title}</div>
      </div>
    </Link>
  )
}

// ─── TagChip ──────────────────────────────────────────────────
const TagChip = ({ label, active, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <span style={S.tag(active, hov)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </span>
  )
}

// ─── Main BlogPage ────────────────────────────────────────────
const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [blogs,          setBlogs]          = useState([])
  const [categories,     setCategories]     = useState([]) // from /categories API
  const [loading,        setLoading]        = useState(true)
  const [vis,            setVis]            = useState(false)
  const [page,           setPage]           = useState(1)
  const [searchInput,    setSearchInput]    = useState("")
  const [searchQuery,    setSearchQuery]    = useState(searchParams.get("search") || "")
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "")
  const [activeTag,      setActiveTag]      = useState(searchParams.get("tag") || "")
  const [sbtnHov,        setSbtnHov]        = useState(false)
  const [clearHov,       setClearHov]       = useState(false)

  // ── Load all data ──────────────────────────────────────────
  useEffect(() => {
    ;(async () => {
      try {
        // Fetch blogs and categories in parallel
        const [blogsRes, catsRes] = await Promise.allSettled([
          API.get("/blogs"),
          API.get("/categories"),
        ])
        if (blogsRes.status === "fulfilled") {
          const data = blogsRes.value.data
          const all = Array.isArray(data) ? data : []
          setBlogs(all)
        }
        if (catsRes.status === "fulfilled") {
          const data = catsRes.value.data
          const arr = Array.isArray(data) ? data
            : Array.isArray(data?.categories) ? data.categories
            : []
          setCategories(arr.filter(c => c.status !== false)) // only active categories
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        setTimeout(() => setVis(true), 80)
      }
    })()

    // Load fonts + keyframes once
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes spin { to { transform: rotate(360deg) } }
      * { box-sizing: border-box }
      @media(max-width:860px) {
        .bl-layout { grid-template-columns: 1fr !important }
        .bl-grid   { grid-template-columns: 1fr !important }
        .bl-sidebar { position: static !important; top: auto !important }
      }
    `
    document.head.appendChild(style)
  }, [])

  // Sync filters → URL search params
  useEffect(() => {
    const p = {}
    if (searchQuery)    p.search   = searchQuery
    if (activeCategory) p.category = activeCategory
    if (activeTag)      p.tag      = activeTag
    setSearchParams(p, { replace: true })
  }, [searchQuery, activeCategory, activeTag])

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [searchQuery, activeCategory, activeTag])

  // ── Derived data ───────────────────────────────────────────

  // Category list: merge DB categories with blog category data for counts
  const categoryList = useMemo(() => {
    // Count blogs per category name (from blog data)
    const countMap = {}
    blogs.forEach(b => {
      const cat = b.category || b.Category?.name || ""
      if (cat) countMap[cat] = (countMap[cat] || 0) + 1
    })

    if (categories.length > 0) {
      // Use DB categories, attach count from blogs
      // Only show categories that have at least 1 blog
      return categories
        .map(c => ({ name: c.name, count: countMap[c.name] || 0 }))
        .filter(c => c.count > 0)
    }
    // Fallback: derive from blog data
    return Object.entries(countMap).map(([name, count]) => ({ name, count }))
  }, [blogs, categories])

  // Tags: derived from blog data
  const allTags = useMemo(() => {
    const set = new Set()
    blogs.forEach(b => {
      if (b.tags) {
        const arr = Array.isArray(b.tags)
          ? b.tags
          : String(b.tags).split(",").map(t => t.trim()).filter(Boolean)
        arr.forEach(t => set.add(t))
      }
    })
    return [...set]
  }, [blogs])

  // Recent posts: latest 5 by date
  const recentPosts = useMemo(() =>
    [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  , [blogs])

  // Filtered blogs
  const filtered = useMemo(() => {
    return blogs.filter(b => {
      // Search: title, description, author
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const inTitle  = b.title?.toLowerCase().includes(q)
        const inDesc   = b.description?.toLowerCase().includes(q)
        const inAuthor = b.author?.toLowerCase().includes(q)
        if (!inTitle && !inDesc && !inAuthor) return false
      }
      // Category filter — match by category name
      if (activeCategory) {
        const catName = b.category || b.Category?.name || ""
        if (catName.toLowerCase() !== activeCategory.toLowerCase()) return false
      }
      // Tag filter
      if (activeTag) {
        const tags = b.tags
          ? (Array.isArray(b.tags) ? b.tags : String(b.tags).split(",").map(t => t.trim()))
          : []
        if (!tags.includes(activeTag)) return false
      }
      return true
    })
  }, [blogs, searchQuery, activeCategory, activeTag])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const hasFilters = !!(searchQuery || activeCategory || activeTag)

  // ── Actions ────────────────────────────────────────────────
  const doSearch = useCallback(() => {
    setSearchQuery(searchInput.trim())
  }, [searchInput])

  const clearAll = useCallback(() => {
    setSearchInput(""); setSearchQuery("")
    setActiveCategory(""); setActiveTag("")
    setPage(1)
  }, [])

  const handleCategoryClick = useCallback((name) => {
    setActiveCategory(prev => prev === name ? "" : name)
  }, [])

  const handleTagClick = useCallback((tag) => {
    setActiveTag(prev => prev === tag ? "" : tag)
  }, [])

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      <div style={S.page}>
        <PageHeader title="Blog" breadcrumb="Blog" />

        <div style={S.section}>
          <div className="bl-layout" style={S.layout}>

            {/* ══ MAIN ══════════════════════════════════════════ */}
            <div>

              {/* Active filters strip */}
              {hasFilters && (
                <div style={S.filterBar}>
                  <span style={S.filterResultText}>
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </span>

                  {searchQuery && (
                    <span style={S.filterChip}
                      onClick={() => { setSearchQuery(""); setSearchInput("") }}>
                      🔍 "{searchQuery}" ×
                    </span>
                  )}
                  {activeCategory && (
                    <span style={S.filterChip} onClick={() => setActiveCategory("")}>
                      📂 {activeCategory} ×
                    </span>
                  )}
                  {activeTag && (
                    <span style={S.filterChip} onClick={() => setActiveTag("")}>
                      🏷 #{activeTag} ×
                    </span>
                  )}
                  <button style={S.clearBtn(clearHov)} onClick={clearAll}
                    onMouseEnter={() => setClearHov(true)} onMouseLeave={() => setClearHov(false)}>
                    ✕ Clear all
                  </button>
                </div>
              )}

              {/* Content states */}
              {loading ? (
                <div style={S.center}>
                  <div style={S.spinner} />
                  <div style={{ fontSize: "14px", fontWeight: "700", color: T.muted }}>
                    Loading posts…
                  </div>
                </div>

              ) : paginated.length === 0 ? (
                <div style={{
                  ...S.center, background: T.white,
                  borderRadius: T.radius, border: `1px solid ${T.border}`,
                  padding: "80px 24px",
                }}>
                  <div style={{ fontSize: "52px", marginBottom: "16px" }}>✍</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: T.serif, color: T.dark, marginBottom: "8px" }}>
                    No posts found
                  </div>
                  <div style={{ fontSize: "14px", color: T.muted, marginBottom: "24px" }}>
                    {hasFilters ? "Try a different search or filter" : "No blog posts yet"}
                  </div>
                  {hasFilters && (
                    <button onClick={clearAll} style={{
                      padding: "12px 28px", borderRadius: "50px", border: "none",
                      background: "linear-gradient(135deg,#e8613a,#f0855e)",
                      color: "#fff", fontSize: "13px", fontWeight: "800",
                      cursor: "pointer", boxShadow: "0 8px 24px rgba(232,97,58,0.3)",
                    }}>
                      Clear Filters
                    </button>
                  )}
                </div>

              ) : (
                <>
                  {/* Grid */}
                  <div className="bl-grid" style={S.grid}>
                    {paginated.map((blog, i) => (
                      <BlogCard key={blog.id} blog={blog} index={i} vis={vis} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div style={S.pagination}>
                      <PageBtn
                        label="‹"
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                      />
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PageBtn
                          key={i}
                          label={String(i + 1).padStart(2, "0")}
                          active={page === i + 1}
                          onClick={() => setPage(i + 1)}
                        />
                      ))}
                      <PageBtn
                        label="›"
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ══ SIDEBAR ════════════════════════════════════════ */}
            <aside
              className="bl-sidebar"
              style={{
                ...S.sidebar,
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease 0.25s",
              }}
            >

              {/* Search */}
              <div style={S.sideCard}>
                <div style={S.sideHeader}>
                  <div style={S.sideDot} />
                  <div style={S.sideTitle}>Search</div>
                </div>
                <div style={S.sideBody}>
                  <div style={S.searchRow}>
                    <input
                      placeholder="Search posts…"
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && doSearch()}
                      style={S.searchInput}
                    />
                    <button
                      style={S.searchBtn(sbtnHov)}
                      onClick={doSearch}
                      onMouseEnter={() => setSbtnHov(true)}
                      onMouseLeave={() => setSbtnHov(false)}
                    >
                      🔍
                    </button>
                  </div>
                </div>
              </div>

              {/* Review Categories — from DB + blog counts */}
              {categoryList.length > 0 && (
                <div style={S.sideCard}>
                  <div style={S.sideHeader}>
                    <div style={S.sideDot} />
                    <div style={S.sideTitle}>Review Category</div>
                  </div>
                  <div style={S.sideBody}>
                    <CatItem
                      name="All Posts"
                      count={blogs.length}
                      active={activeCategory === ""}
                      onClick={() => setActiveCategory("")}
                    />
                    {categoryList.map(({ name, count }) => (
                      <CatItem
                        key={name}
                        name={name}
                        count={count}
                        active={activeCategory === name}
                        onClick={() => handleCategoryClick(name)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Posts */}
              {recentPosts.length > 0 && (
                <div style={S.sideCard}>
                  <div style={S.sideHeader}>
                    <div style={S.sideDot} />
                    <div style={S.sideTitle}>Recent Post</div>
                  </div>
                  <div style={{ padding: "8px 20px 14px" }}>
                    {recentPosts.map(b => <RecentItem key={b.id} blog={b} />)}
                  </div>
                </div>
              )}

              {/* Tags */}
              {allTags.length > 0 && (
                <div style={S.sideCard}>
                  <div style={S.sideHeader}>
                    <div style={S.sideDot} />
                    <div style={S.sideTitle}>Tags</div>
                  </div>
                  <div style={S.sideBody}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {allTags.map(tag => (
                        <TagChip
                          key={tag}
                          label={tag}
                          active={activeTag === tag}
                          onClick={() => handleTagClick(tag)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Total articles count */}
              <div style={{
                background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                boxShadow: "0 3px 20px rgba(0,0,0,0.04)",
                padding: "22px", textAlign: "center",
              }}>
                <div style={{
                  fontSize: "36px", fontWeight: "800",
                  fontFamily: T.serif, color: T.accent,
                  lineHeight: 1, marginBottom: "4px",
                }}>
                  {blogs.length}
                </div>
                <div style={{
                  fontSize: "10px", fontWeight: "800",
                  color: T.muted, letterSpacing: "2px", textTransform: "uppercase",
                }}>
                  Total Articles
                </div>
              </div>

            </aside>

          </div>
        </div>
      </div>

      <InstagramSection />
    </>
  )
}

export default BlogPage