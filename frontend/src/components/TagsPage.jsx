import { useEffect, useState, useMemo } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import API from "../services/api"
import PageHeader from "../components/PageHeader"
import InstagramSection from "../components/InstagramSection"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"
const PER_PAGE = 9

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

const fmtDate = (d) => {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

// ── Blog Card ─────────────────────────────────────────────────
const BlogCard = ({ blog, index, vis }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(18px)",
      transition: `all 0.5s ease ${(index % PER_PAGE) * 0.06}s`,
    }}>
      <Link to={`/blog/${blog.id}`} style={{
        background: T.white, borderRadius: T.radius, textDecoration: "none",
        border: `1px solid ${hov ? "rgba(232,97,58,0.2)" : T.border}`,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: hov ? "0 20px 56px rgba(232,97,58,0.12)" : "0 3px 16px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
      }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div style={{
          height: "200px", overflow: "hidden",
          background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {blog.image
            ? <img src={`${BASE_URL}${blog.image}`} alt={blog.title}
                style={{ width: "100%", height: "100%", objectFit: "cover",
                  transform: hov ? "scale(1.07)" : "scale(1)",
                  transition: "transform 0.45s ease" }} />
            : <div style={{ fontSize: "40px", opacity: 0.25 }}>✍</div>
          }
        </div>
        <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px",
            fontSize: "11px", fontWeight: "700", color: T.muted }}>
            <span>By {blog.author || "Admin"}</span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.muted }} />
            <span style={{ color: T.accent }}>{fmtDate(blog.createdAt)}</span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: hov ? T.accent : T.dark,
            fontFamily: T.serif, lineHeight: 1.45, transition: "color 0.2s ease",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {blog.title}
          </div>
          {blog.description && (
            <div style={{ fontSize: "13px", color: T.muted, lineHeight: 1.6,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {blog.description}
            </div>
          )}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px",
            fontSize: "12px", fontWeight: "800", color: T.accent, marginTop: "auto",
            opacity: hov ? 1 : 0.7,
            transform: hov ? "translateX(4px)" : "none",
            transition: "all 0.2s ease" }}>
            Read More <span style={{ fontSize: "14px" }}>→</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ── Tag chip ──────────────────────────────────────────────────
const TagChip = ({ label, count, active, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "7px 14px", borderRadius: "10px", cursor: "pointer",
        background: active ? "rgba(232,97,58,0.08)" : hov ? "rgba(28,20,16,0.03)" : "transparent",
        border: `1.5px solid ${active ? T.accent : "transparent"}`,
        transition: "all 0.22s ease", marginBottom: "6px", marginRight: "4px",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize: "13px", fontWeight: active ? "700" : "600",
        color: active ? T.accent : T.dark }}>
        # {label}
      </span>
      <span style={{ fontSize: "10px", fontWeight: "800",
        color: active ? T.accent : "rgba(28,20,16,0.3)",
        background: active ? "rgba(232,97,58,0.12)" : "rgba(28,20,16,0.06)",
        borderRadius: "50px", padding: "1px 7px" }}>
        {count}
      </span>
    </div>
  )
}

// ── Page btn ──────────────────────────────────────────────────
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
        fontSize: "14px", fontWeight: "700",
        cursor: disabled ? "not-allowed" : "pointer",
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

// ── Sidebar card wrapper ──────────────────────────────────────
const SideCard = ({ title, children }) => (
  <div style={{
    background: T.white, borderRadius: T.radius,
    border: `1px solid ${T.border}`,
    boxShadow: "0 3px 20px rgba(0,0,0,0.04)",
    overflow: "hidden",
  }}>
    <div style={{
      padding: "16px 20px 14px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%",
        background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
      <div style={{ fontSize: "14px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
        {title}
      </div>
    </div>
    <div style={{ padding: "16px 20px" }}>{children}</div>
  </div>
)

// ── Recent post item ──────────────────────────────────────────
const RecentItem = ({ blog }) => {
  const [hov, setHov] = useState(false)
  return (
    <Link to={`/blog/${blog.id}`} style={{
      display: "flex", alignItems: "flex-start", gap: "12px",
      padding: "10px 0", borderBottom: `1px solid rgba(28,20,16,0.05)`,
      textDecoration: "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {blog.image
        ? <img src={`${BASE_URL}${blog.image}`} alt="" style={{
            width: "56px", height: "44px", borderRadius: "10px",
            objectFit: "cover", flexShrink: 0,
            background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
          }} />
        : <div style={{ width: "56px", height: "44px", borderRadius: "10px",
            background: "rgba(232,97,58,0.08)", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>✍</div>
      }
      <div>
        <div style={{ fontSize: "10px", fontWeight: "700", color: T.accent, marginBottom: "3px" }}>
          {fmtDate(blog.createdAt)}
        </div>
        <div style={{ fontSize: "12px", fontWeight: "700", color: hov ? T.accent : T.dark,
          lineHeight: 1.4, transition: "color 0.2s ease",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {blog.title}
        </div>
      </div>
    </Link>
  )
}

// ── Main ──────────────────────────────────────────────────────
const TagsPage = () => {
  const { tag: tagParam }               = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [blogs,       setBlogs]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [vis,         setVis]         = useState(false)
  const [page,        setPage]        = useState(1)
  const [activeTag,   setActiveTag]   = useState(
    tagParam || searchParams.get("tag") || ""
  )
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await API.get("/blogs")
        setBlogs(Array.isArray(res.data) ? res.data : [])
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

  // Sync URL
  useEffect(() => {
    const p = {}
    if (activeTag)    p.tag    = activeTag
    if (searchQuery)  p.search = searchQuery
    setSearchParams(p, { replace: true })
    setPage(1)
    setVis(false)
    setTimeout(() => setVis(true), 60)
  }, [activeTag, searchQuery])

  // All tags derived from blogs
  const allTags = useMemo(() => {
    const map = {}
    blogs.forEach(b => {
      if (b.tags) {
        const arr = Array.isArray(b.tags)
          ? b.tags
          : String(b.tags).split(",").map(t => t.trim()).filter(Boolean)
        arr.forEach(t => { map[t] = (map[t] || 0) + 1 })
      }
    })
    return Object.entries(map).map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [blogs])

  // Recent posts
  const recentPosts = useMemo(() =>
    [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  , [blogs])

  // Filtered blogs
  const filtered = useMemo(() => {
    let list = [...blogs]
    if (activeTag) {
      list = list.filter(b => {
        if (!b.tags) return false
        const arr = Array.isArray(b.tags)
          ? b.tags
          : String(b.tags).split(",").map(t => t.trim())
        return arr.includes(activeTag)
      })
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(b =>
        b.title?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
      )
    }
    return list
  }, [blogs, activeTag, searchQuery])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleTagClick = (tag) => {
    setActiveTag(prev => prev === tag ? "" : tag)
  }

  return (
    <>
      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>
        <PageHeader
          title={activeTag ? `#${activeTag}` : "Tags"}
          breadcrumb={activeTag ? `Tags / ${activeTag}` : "Tags"}
        />

        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "60px 24px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "40px", alignItems: "start" }}>

            {/* ══ MAIN ═══════════════════════════════════════ */}
            <div>

              {/* Active tag strip */}
              {activeTag && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 18px", borderRadius: "13px",
                  background: "rgba(232,97,58,0.06)",
                  border: `1px solid ${T.border}`,
                  marginBottom: "24px",
                }}>
                  <span style={{ fontSize: "18px" }}>🏷</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: T.dark }}>
                      Posts tagged <span style={{ color: T.accent }}>#{activeTag}</span>
                    </span>
                    <span style={{ fontSize: "12px", color: T.muted, marginLeft: "8px" }}>
                      {filtered.length} post{filtered.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTag("")}
                    style={{ background: "none", border: "none", cursor: "pointer",
                      color: T.muted, fontSize: "18px", padding: "0 4px" }}>
                    ×
                  </button>
                </div>
              )}

              {/* Loading */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%",
                    border: "3px solid rgba(232,97,58,0.15)",
                    borderTop: "3px solid #e8613a",
                    animation: "spin 0.9s linear infinite", margin: "0 auto 16px" }} />
                  <div style={{ fontSize: "14px", fontWeight: "700", color: T.muted }}>Loading posts…</div>
                </div>

              ) : paginated.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 24px",
                  background: T.white, borderRadius: T.radius, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏷</div>
                  <div style={{ fontSize: "18px", fontWeight: "800", fontFamily: T.serif,
                    color: T.dark, marginBottom: "8px" }}>
                    No posts found
                  </div>
                  <div style={{ fontSize: "14px", color: T.muted, marginBottom: "24px" }}>
                    {activeTag ? `No posts tagged #${activeTag}` : "No blog posts yet"}
                  </div>
                  {activeTag && (
                    <button onClick={() => setActiveTag("")} style={{
                      padding: "12px 28px", borderRadius: "50px", border: "none",
                      background: "linear-gradient(135deg,#e8613a,#f0855e)",
                      color: "#fff", fontSize: "13px", fontWeight: "800",
                      cursor: "pointer", boxShadow: "0 8px 24px rgba(232,97,58,0.3)",
                    }}>
                      View All Posts
                    </button>
                  )}
                </div>

              ) : (
                <>
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "22px", marginBottom: "40px",
                  }}>
                    {paginated.map((blog, i) => (
                      <BlogCard key={blog.id} blog={blog} index={i} vis={vis} />
                    ))}
                  </div>

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

            {/* ══ SIDEBAR ════════════════════════════════════ */}
            <aside style={{
              position: "sticky", top: "24px",
              display: "flex", flexDirection: "column", gap: "20px",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 0.25s",
            }}>

              {/* Search */}
              <SideCard title="Search">
                <div style={{ display: "flex", borderRadius: "12px", overflow: "hidden",
                  border: "1.5px solid rgba(28,20,16,0.1)" }}>
                  <input
                    placeholder="Search posts…"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && setSearchQuery(searchInput.trim())}
                    style={{ flex: 1, padding: "11px 14px", border: "none",
                      background: "#fafafa", fontSize: "13px",
                      fontFamily: T.sans, color: T.dark, outline: "none" }}
                  />
                  <button
                    onClick={() => setSearchQuery(searchInput.trim())}
                    style={{ padding: "11px 16px", border: "none",
                      background: T.accent, color: "#fff",
                      fontSize: "14px", cursor: "pointer" }}>
                    🔍
                  </button>
                </div>
              </SideCard>

              {/* All Tags */}
              {allTags.length > 0 && (
                <SideCard title="All Tags">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <TagChip
                      label="All"
                      count={blogs.length}
                      active={activeTag === ""}
                      onClick={() => setActiveTag("")}
                    />
                    {allTags.map(({ name, count }) => (
                      <TagChip
                        key={name}
                        label={name}
                        count={count}
                        active={activeTag === name}
                        onClick={() => handleTagClick(name)}
                      />
                    ))}
                  </div>
                </SideCard>
              )}

              {/* Recent Posts */}
              {recentPosts.length > 0 && (
                <SideCard title="Recent Posts">
                  <div>
                    {recentPosts.map(b => <RecentItem key={b.id} blog={b} />)}
                  </div>
                </SideCard>
              )}

              {/* Stats card */}
              <div style={{
                background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                padding: "22px", textAlign: "center",
              }}>
                <div style={{ fontSize: "36px", fontWeight: "800",
                  fontFamily: T.serif, color: T.accent,
                  lineHeight: 1, marginBottom: "4px" }}>
                  {filtered.length}
                </div>
                <div style={{ fontSize: "10px", fontWeight: "800",
                  color: T.muted, letterSpacing: "2px", textTransform: "uppercase" }}>
                  {activeTag ? `Posts with #${activeTag}` : "Total Posts"}
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

export default TagsPage