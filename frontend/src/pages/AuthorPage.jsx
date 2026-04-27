import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
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

// ── Blog card (same style as BlogPage) ───────────────────────
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
        {/* Image */}
        <div style={{
          height: "200px", overflow: "hidden", position: "relative",
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

        {/* Body */}
        <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px",
            fontSize: "11px", fontWeight: "700", color: T.muted }}>
            <span>By {blog.author || "Admin"}</span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.muted }} />
            <span style={{ color: T.accent }}>{fmtDate(blog.createdAt)}</span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: hov ? T.accent : T.dark,
            fontFamily: T.serif, lineHeight: 1.45, transition: "color 0.2s ease",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {blog.title}
          </div>
          {blog.description && (
            <div style={{ fontSize: "13px", color: T.muted, lineHeight: 1.6,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
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

// ── Author card ───────────────────────────────────────────────
const AuthorCard = ({ author, active, onClick }) => {
  const [hov, setHov] = useState(false)
  const isActive = active || hov
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "12px 16px", borderRadius: "14px", cursor: "pointer",
        background: active ? "rgba(232,97,58,0.08)" : hov ? "rgba(28,20,16,0.03)" : "transparent",
        border: `1.5px solid ${active ? T.accent : "transparent"}`,
        transition: "all 0.25s ease",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {author.image
        ? <img src={`${BASE_URL}${author.image}`} alt={author.name}
            style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0,
              border: `2px solid ${active ? T.accent : "rgba(28,20,16,0.1)"}`,
              transition: "border-color 0.25s ease" }} />
        : <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
            background: active ? "rgba(232,97,58,0.15)" : "rgba(28,20,16,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
            👤
          </div>
      }
      <div>
        <div style={{ fontSize: "13px", fontWeight: "800",
          color: active ? T.accent : T.dark, transition: "color 0.25s ease" }}>
          {author.name}
        </div>
        <div style={{ fontSize: "11px", fontWeight: "600", color: T.muted }}>
          {author.role || "Author"}
        </div>
      </div>
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
        minWidth: "44px", height: "44px", padding: "0 14px",
        borderRadius: "12px",
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

// ── Main ──────────────────────────────────────────────────────
const AuthorPage = () => {
  const [authors,       setAuthors]       = useState([])
  const [blogs,         setBlogs]         = useState([])
  const [activeAuthor,  setActiveAuthor]  = useState(null) // null = all
  const [loading,       setLoading]       = useState(true)
  const [vis,           setVis]           = useState(false)
  const [page,          setPage]          = useState(1)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [authRes, blogRes] = await Promise.allSettled([
          API.get("/authors"),
          API.get("/blogs"),
        ])
        if (authRes.status === "fulfilled") {
          const data = Array.isArray(authRes.value.data) ? authRes.value.data : []
          setAuthors(data.filter(a => a.isActive !== false))
        }
        if (blogRes.status === "fulfilled") {
          setBlogs(Array.isArray(blogRes.value.data) ? blogRes.value.data : [])
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

  // Filter blogs by active author
  const filtered = useMemo(() => {
    if (!activeAuthor) return blogs
    return blogs.filter(b =>
      b.author?.toLowerCase() === activeAuthor.name?.toLowerCase()
    )
  }, [blogs, activeAuthor])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleAuthorClick = (author) => {
    setActiveAuthor(prev => prev?.id === author.id ? null : author)
    setPage(1)
    setVis(false)
    setTimeout(() => setVis(true), 60)
  }

  return (
    <>
      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>
        <PageHeader title="Author" breadcrumb="Author" />

        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "60px 24px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "40px", alignItems: "start" }}>

            {/* ══ MAIN BLOG GRID ═════════════════════════════ */}
            <div>
              {/* Active author strip */}
              {activeAuthor && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "14px 18px", borderRadius: "14px",
                  background: "rgba(232,97,58,0.06)",
                  border: `1px solid ${T.border}`,
                  marginBottom: "24px",
                }}>
                  {activeAuthor.image
                    ? <img src={`${BASE_URL}${activeAuthor.image}`} alt=""
                        style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "20px" }}>👤</span>
                  }
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: T.dark }}>
                      Posts by <span style={{ color: T.accent }}>{activeAuthor.name}</span>
                    </span>
                    <span style={{ fontSize: "12px", color: T.muted, marginLeft: "8px" }}>
                      {filtered.length} post{filtered.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => { setActiveAuthor(null); setPage(1) }}
                    style={{ background: "none", border: "none", cursor: "pointer",
                      color: T.muted, fontSize: "16px", padding: "2px 8px" }}>
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
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✍</div>
                  <div style={{ fontSize: "18px", fontWeight: "800", fontFamily: T.serif, color: T.dark, marginBottom: "8px" }}>
                    No posts found
                  </div>
                  <div style={{ fontSize: "14px", color: T.muted }}>
                    {activeAuthor ? "This author has no posts yet" : "No blog posts yet"}
                  </div>
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

            {/* ══ SIDEBAR ════════════════════════════════════ */}
            <aside style={{
              position: "sticky", top: "24px",
              display: "flex", flexDirection: "column", gap: "20px",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 0.25s",
            }}>

              {/* Authors list */}
              <div style={{
                background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                boxShadow: "0 3px 20px rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}>
                <div style={{
                  padding: "16px 20px 14px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
                  <div style={{ fontSize: "14px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
                    Authors
                  </div>
                </div>
                <div style={{ padding: "10px 10px" }}>
                  {/* All */}
                  <div
                    onClick={() => { setActiveAuthor(null); setPage(1) }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 12px", borderRadius: "10px", cursor: "pointer",
                      background: !activeAuthor ? "rgba(232,97,58,0.08)" : "transparent",
                      border: `1.5px solid ${!activeAuthor ? T.accent : "transparent"}`,
                      marginBottom: "4px", transition: "all 0.25s ease",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: "700",
                      color: !activeAuthor ? T.accent : T.dark }}>
                      All Authors
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "700",
                      color: !activeAuthor ? T.accent : T.muted }}>
                      {blogs.length}
                    </span>
                  </div>

                  {authors.map(author => (
                    <AuthorCard
                      key={author.id}
                      author={author}
                      active={activeAuthor?.id === author.id}
                      onClick={() => handleAuthorClick(author)}
                    />
                  ))}
                </div>
              </div>

              {/* Active author bio */}
              {activeAuthor && activeAuthor.bio && (
                <div style={{
                  background: T.white, borderRadius: T.radius,
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 3px 20px rgba(0,0,0,0.04)",
                  padding: "20px",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                    textAlign: "center", gap: "10px", marginBottom: "14px" }}>
                    {activeAuthor.image
                      ? <img src={`${BASE_URL}${activeAuthor.image}`} alt=""
                          style={{ width: "70px", height: "70px", borderRadius: "50%",
                            objectFit: "cover", border: `2px solid ${T.border}` }} />
                      : <div style={{ width: "70px", height: "70px", borderRadius: "50%",
                          background: "rgba(232,97,58,0.08)", display: "flex",
                          alignItems: "center", justifyContent: "center", fontSize: "28px" }}>👤</div>
                    }
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
                        {activeAuthor.name}
                      </div>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: T.accent }}>
                        {activeAuthor.role || "Author"}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: T.muted, lineHeight: 1.7, margin: 0 }}>
                    {activeAuthor.bio}
                  </p>
                  {activeAuthor.email && (
                    <div style={{ fontSize: "12px", color: T.muted, marginTop: "10px", fontWeight: "600" }}>
                      ✉ {activeAuthor.email}
                    </div>
                  )}
                </div>
              )}

              {/* Total posts count */}
              <div style={{
                background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                padding: "22px", textAlign: "center",
              }}>
                <div style={{ fontSize: "36px", fontWeight: "800",
                  fontFamily: T.serif, color: T.accent, lineHeight: 1, marginBottom: "4px" }}>
                  {filtered.length}
                </div>
                <div style={{ fontSize: "10px", fontWeight: "800",
                  color: T.muted, letterSpacing: "2px", textTransform: "uppercase" }}>
                  Total Posts
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

export default AuthorPage