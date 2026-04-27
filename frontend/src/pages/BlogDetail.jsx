import { useEffect, useState, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import API from "../services/api"
import PageHeader from "../components/PageHeader"
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

const fmtDate = (d) => {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

// ── Sidebar card ──────────────────────────────────────────────
const SideCard = ({ title, children }) => (
  <div style={{
    background: T.white, borderRadius: T.radius,
    border: `1px solid ${T.border}`,
    boxShadow: "0 3px 20px rgba(0,0,0,0.04)",
    overflow: "hidden", marginBottom: "20px",
  }}>
    <div style={{
      padding: "14px 20px 12px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%",
        background: "linear-gradient(135deg,#e8613a,#f0855e)", flexShrink: 0 }} />
      <div style={{ fontSize: "14px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
        {title}
      </div>
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
)

// ── Recent post item ──────────────────────────────────────────
const RecentItem = ({ blog }) => {
  const [hov, setHov] = useState(false)
  return (
    <Link to={`/blog/${blog.id}`} style={{
      display: "flex", gap: "12px", padding: "10px 0",
      borderBottom: "1px solid rgba(28,20,16,0.05)",
      textDecoration: "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {blog.image
        ? <img src={`${BASE_URL}${blog.image}`} alt=""
            style={{ width: "64px", height: "52px", borderRadius: "10px",
              objectFit: "cover", flexShrink: 0 }} />
        : <div style={{ width: "64px", height: "52px", borderRadius: "10px",
            background: "rgba(232,97,58,0.08)", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "20px", flexShrink: 0 }}>✍</div>
      }
      <div>
        <div style={{ fontSize: "10px", fontWeight: "700", color: T.accent, marginBottom: "3px" }}>
          By {blog.author || "Admin"} · {fmtDate(blog.createdAt)}
        </div>
        <div style={{ fontSize: "12px", fontWeight: "700",
          color: hov ? T.accent : T.dark, lineHeight: 1.4,
          transition: "color 0.2s ease",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {blog.title}
        </div>
      </div>
    </Link>
  )
}

// ── Category item ─────────────────────────────────────────────
const CatItem = ({ name, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "8px 0", cursor: "pointer",
      borderBottom: "1px solid rgba(28,20,16,0.05)",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        width: "8px", height: "8px", borderRadius: "2px", flexShrink: 0,
        background: hov ? T.accent : "rgba(28,20,16,0.2)",
        transition: "background 0.2s ease",
      }} />
      <span style={{ fontSize: "13px", fontWeight: "600",
        color: hov ? T.accent : T.dark, transition: "color 0.2s ease" }}>
        {name}
      </span>
    </div>
  )
}

// ── Tag chip ──────────────────────────────────────────────────
const TagChip = ({ label }) => {
  const [hov, setHov] = useState(false)
  return (
    <Link to={`/tags/${label}`} style={{
      padding: "6px 14px", borderRadius: "8px",
      border: `1px solid ${hov ? T.accent : "rgba(28,20,16,0.1)"}`,
      background: hov ? "rgba(232,97,58,0.08)" : "#fafafa",
      color: hov ? T.accent : T.muted,
      fontSize: "12px", fontWeight: "700",
      textDecoration: "none",
      transition: "all 0.2s ease",
      display: "inline-block",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </Link>
  )
}

// ── Share button ──────────────────────────────────────────────
const ShareBtn = ({ icon, color, href }) => {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      width: "36px", height: "36px", borderRadius: "50%",
      background: hov ? color : "rgba(28,20,16,0.06)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "14px", textDecoration: "none",
      transition: "all 0.25s ease",
      transform: hov ? "translateY(-2px)" : "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {icon}
    </a>
  )
}

// ── Comment form field ────────────────────────────────────────
const FormField = ({ label, placeholder, textarea, name, value, onChange }) => {
  const [focus, setFocus] = useState(false)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label style={{ fontSize: "11px", fontWeight: "700",
        color: T.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</label>}
      {textarea
        ? <textarea placeholder={placeholder} name={name} value={value} onChange={onChange}
            style={{ padding: "13px 16px", borderRadius: "13px", resize: "vertical",
              minHeight: "110px", fontFamily: T.sans, fontSize: "14px", color: T.dark,
              border: `1.5px solid ${focus ? T.accent : "rgba(28,20,16,0.1)"}`,
              background: focus ? "#fffaf8" : "#fafafa", outline: "none",
              boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
              transition: "all 0.25s ease" }}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        : <input placeholder={placeholder} name={name} value={value} onChange={onChange}
            style={{ padding: "13px 16px", borderRadius: "13px", fontFamily: T.sans,
              fontSize: "14px", color: T.dark,
              border: `1.5px solid ${focus ? T.accent : "rgba(28,20,16,0.1)"}`,
              background: focus ? "#fffaf8" : "#fafafa", outline: "none",
              boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
              transition: "all 0.25s ease" }}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
      }
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
const BlogDetail = () => {
  const { id } = useParams()

  const [blog,       setBlog]       = useState(null)
  const [allBlogs,   setAllBlogs]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [vis,        setVis]        = useState(false)
  const [searchInput,setSearchInput]= useState("")
  const [sbtnHov,    setSbtnHov]    = useState(false)
  const [submitHov,  setSubmitHov]  = useState(false)
  const [saveInfo,   setSaveInfo]   = useState(false)
  const [comment,    setComment]    = useState({ name: "", email: "", comment: "" })
  const [submitted,  setSubmitted]  = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [blogRes, allRes, catRes] = await Promise.allSettled([
          API.get(`/blogs/${id}`),
          API.get("/blogs"),
          API.get("/categories"),
        ])
        if (blogRes.status === "fulfilled") setBlog(blogRes.value.data)
        if (allRes.status === "fulfilled") {
          setAllBlogs(Array.isArray(allRes.value.data) ? allRes.value.data : [])
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
    window.scrollTo({ top: 0, behavior: "smooth" })

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `*{box-sizing:border-box}@keyframes spin{to{transform:rotate(360deg)}}`
    document.head.appendChild(style)
  }, [id])

  const recentPosts = useMemo(() =>
    [...allBlogs]
      .filter(b => b.id !== parseInt(id))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4)
  , [allBlogs, id])

  const tags = useMemo(() => {
    if (!blog?.tags) return []
    return Array.isArray(blog.tags)
      ? blog.tags
      : String(blog.tags).split(",").map(t => t.trim()).filter(Boolean)
  }, [blog])

  const allTags = useMemo(() => {
    const set = new Set()
    allBlogs.forEach(b => {
      if (b.tags) {
        const arr = Array.isArray(b.tags) ? b.tags
          : String(b.tags).split(",").map(t => t.trim()).filter(Boolean)
        arr.forEach(t => set.add(t))
      }
    })
    return [...set]
  }, [allBlogs])

  const handleComment = (e) => {
    const { name, value } = e.target
    setComment(c => ({ ...c, [name]: value }))
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!comment.name || !comment.comment) return
    setSubmitted(true)
    setComment({ name: "", email: "", comment: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const pageUrl = window.location.href

  if (loading) return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%",
        border: "3px solid rgba(232,97,58,0.15)",
        borderTop: "3px solid #e8613a",
        animation: "spin 0.9s linear infinite" }} />
    </div>
  )

  if (!blog) return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <div style={{ fontSize: "48px" }}>✍</div>
      <div style={{ fontSize: "20px", fontWeight: "800", fontFamily: T.serif, color: T.dark }}>
        Blog post not found
      </div>
      <Link to="/blog" style={{ color: T.accent, fontWeight: "700", textDecoration: "none" }}>
        ← Back to Blog
      </Link>
    </div>
  )

  return (
    <>
      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>
        <PageHeader title="Blog Details" breadcrumb="Blog Details" />

        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px 24px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "40px", alignItems: "start" }}>

            {/* ══ MAIN CONTENT ═══════════════════════════════ */}
            <article style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease",
            }}>

              {/* Hero image */}
              {blog.image && (
                <div style={{ borderRadius: T.radius, overflow: "hidden",
                  marginBottom: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
                  <img src={`${BASE_URL}${blog.image}`} alt={blog.title}
                    style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }} />
                </div>
              )}

              {/* Meta row */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px",
                fontSize: "12px", fontWeight: "700", color: T.muted, marginBottom: "14px" }}>
                <span>By {blog.author || "Admin"}</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.muted }} />
                <span style={{ color: T.accent }}>{fmtDate(blog.createdAt)}</span>
                {blog.Category?.name && (
                  <>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.muted }} />
                    <span style={{
                      background: "rgba(232,97,58,0.1)", color: T.accent,
                      padding: "2px 10px", borderRadius: "50px",
                      border: `1px solid ${T.border}`,
                    }}>
                      {blog.Category.name}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: "800",
                fontFamily: T.serif, color: T.dark, lineHeight: 1.3,
                marginBottom: "20px", letterSpacing: "-0.5px" }}>
                {blog.title}
              </h1>

              {/* Description / content */}
              {blog.description && (
                <div style={{ fontSize: "15px", color: T.muted, lineHeight: 1.85,
                  marginBottom: "32px" }}>
                  {blog.description}
                </div>
              )}

              {/* Pull quote */}
              {blog.description && (
                <blockquote style={{
                  borderLeft: `4px solid ${T.accent}`,
                  paddingLeft: "24px", margin: "32px 0",
                  background: "rgba(232,97,58,0.04)",
                  borderRadius: "0 14px 14px 0",
                  padding: "22px 24px",
                }}>
                  <p style={{ fontSize: "15px", fontStyle: "italic",
                    color: T.dark, lineHeight: 1.8, margin: 0,
                    fontFamily: T.serif, fontWeight: "700" }}>
                    "{blog.description.slice(0, 180)}{blog.description.length > 180 ? "…" : ""}"
                  </p>
                </blockquote>
              )}

              {/* Image grid (if multiple images or placeholder) */}
              {blog.image && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "16px", marginBottom: "32px" }}>
                  <div style={{ borderRadius: "14px", overflow: "hidden", height: "200px" }}>
                    <img src={`${BASE_URL}${blog.image}`} alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ borderRadius: "14px", overflow: "hidden", height: "200px",
                    background: "linear-gradient(135deg,#fef5f0,#fff8f5)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={`${BASE_URL}${blog.image}`} alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "hue-rotate(15deg) saturate(0.9)" }} />
                  </div>
                </div>
              )}

              {/* ── Tags + Share row ─────────────────────── */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 0", borderTop: `1px solid ${T.border}`,
                borderBottom: `1px solid ${T.border}`, marginBottom: "36px",
                flexWrap: "wrap", gap: "12px",
              }}>
                {/* Tags */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: T.dark }}>Tags :</span>
                  {tags.length > 0
                    ? tags.map(t => <TagChip key={t} label={t} />)
                    : <span style={{ fontSize: "13px", color: T.muted }}>No tags</span>
                  }
                </div>

                {/* Share */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: T.dark, marginRight: "4px" }}>
                    Share :
                  </span>
                  <ShareBtn icon="f" color="#1877f2" href={`https://facebook.com/sharer/sharer.php?u=${pageUrl}`} />
                  <ShareBtn icon="𝕏" color="#000" href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodeURIComponent(blog.title)}`} />
                  <ShareBtn icon="in" color="#0077b5" href={`https://linkedin.com/sharing/share-offsite/?url=${pageUrl}`} />
                  <ShareBtn icon="g+" color="#ea4335" href="#" />
                </div>
              </div>

              {/* ── Comments section ────────────────────── */}
              <div style={{ background: T.white, borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                padding: "32px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", fontFamily: T.serif,
                  color: T.dark, marginBottom: "24px", letterSpacing: "-0.3px" }}>
                  Comments Reply
                </h3>

                {submitted && (
                  <div style={{ padding: "14px 18px", borderRadius: "13px",
                    background: "rgba(52,211,153,0.08)",
                    border: "1px solid rgba(52,211,153,0.25)",
                    color: "#059669", fontSize: "14px", fontWeight: "700",
                    marginBottom: "20px" }}>
                    ✓ Your comment has been submitted!
                  </div>
                )}

                <form onSubmit={handleSubmitComment}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "16px", marginBottom: "16px" }}>
                    <FormField placeholder="Name" name="name"
                      value={comment.name} onChange={handleComment} />
                    <FormField placeholder="Email" name="email"
                      value={comment.email} onChange={handleComment} />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <FormField placeholder="Comment…" textarea name="comment"
                      value={comment.comment} onChange={handleComment} />
                  </div>

                  {/* Save info checkbox */}
                  <label style={{ display: "flex", alignItems: "center", gap: "10px",
                    fontSize: "13px", fontWeight: "600", color: T.muted,
                    cursor: "pointer", marginBottom: "20px" }}>
                    <div
                      onClick={() => setSaveInfo(v => !v)}
                      style={{
                        width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0,
                        border: `2px solid ${saveInfo ? T.accent : "rgba(28,20,16,0.2)"}`,
                        background: saveInfo ? T.accent : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.2s ease",
                      }}>
                      {saveInfo && <span style={{ color: "#fff", fontSize: "10px" }}>✓</span>}
                    </div>
                    Save my info for the next comment
                  </label>

                  <button type="submit"
                    onMouseEnter={() => setSubmitHov(true)}
                    onMouseLeave={() => setSubmitHov(false)}
                    style={{
                      padding: "13px 36px", borderRadius: "50px", border: "none",
                      background: submitHov
                        ? "linear-gradient(135deg,#d4542e,#e8613a)"
                        : "linear-gradient(135deg,#e8613a,#f0855e)",
                      color: "#fff", fontSize: "14px", fontWeight: "800",
                      cursor: "pointer", fontFamily: T.sans,
                      boxShadow: submitHov
                        ? "0 12px 36px rgba(232,97,58,0.45)"
                        : "0 6px 22px rgba(232,97,58,0.28)",
                      transform: submitHov ? "translateY(-2px)" : "translateY(0)",
                      transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                    }}>
                    Post Comment →
                  </button>
                </form>
              </div>

            </article>

            {/* ══ SIDEBAR ════════════════════════════════════ */}
            <aside style={{
              position: "sticky", top: "24px",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 0.2s",
            }}>

              {/* Search */}
              <SideCard title="Search">
                <div style={{ display: "flex", borderRadius: "12px", overflow: "hidden",
                  border: "1.5px solid rgba(28,20,16,0.1)" }}>
                  <input
                    placeholder="Search…"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && searchInput.trim()) {
                        window.location.href = `/blog?search=${searchInput.trim()}`
                      }
                    }}
                    style={{ flex: 1, padding: "10px 13px", border: "none",
                      background: "#fafafa", fontSize: "13px",
                      fontFamily: T.sans, color: T.dark, outline: "none" }}
                  />
                  <button
                    onClick={() => { if (searchInput.trim()) window.location.href = `/blog?search=${searchInput.trim()}` }}
                    onMouseEnter={() => setSbtnHov(true)}
                    onMouseLeave={() => setSbtnHov(false)}
                    style={{ padding: "10px 14px", border: "none",
                      background: sbtnHov ? "#d4542e" : T.accent,
                      color: "#fff", fontSize: "14px", cursor: "pointer",
                      transition: "background 0.2s ease" }}>
                    🔍
                  </button>
                </div>
              </SideCard>

              {/* Review Category */}
              {categories.length > 0 && (
                <SideCard title="Review Category">
                  {categories.slice(0, 6).map(c => (
                    <CatItem
                      key={c.id}
                      name={c.name}
                      onClick={() => window.location.href = `/blog?category=${c.name}`}
                    />
                  ))}
                </SideCard>
              )}

              {/* Recent Post */}
              {recentPosts.length > 0 && (
                <SideCard title="Recent Post">
                  {recentPosts.map(b => <RecentItem key={b.id} blog={b} />)}
                </SideCard>
              )}

              {/* Tags */}
              {allTags.length > 0 && (
                <SideCard title="Tags">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {allTags.map(tag => <TagChip key={tag} label={tag} />)}
                  </div>
                </SideCard>
              )}

            </aside>
          </div>
        </div>
      </div>
      <InstagramSection />
    </>
  )
}

export default BlogDetail