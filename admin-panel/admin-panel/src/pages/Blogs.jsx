import { useEffect, useState } from "react"
import API from "../services/api"

const BASE_URL = "http://localhost:5000/uploads/"

const S = {
  page: {
    background: "linear-gradient(160deg, #0f0f18 0%, #13111e 60%, #0f1520 100%)",
    minHeight: "100vh", fontFamily: "'Nunito Sans', sans-serif",
    padding: "28px", color: "#e8e4f0",
  },
  topRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: "28px", flexWrap: "wrap", gap: "14px",
  },
  eyebrow: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
    textTransform: "uppercase", color: "#fb7185", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(22px,3vw,32px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff", letterSpacing: "-0.5px", margin: 0,
  },
  addBtn: (hov) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 22px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#e11d48,#fb7185)" : "linear-gradient(135deg,#fb7185,#fda4af)",
    color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(251,113,133,0.45)" : "0 4px 16px rgba(251,113,133,0.2)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  formCard: (open) => ({
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px", overflow: "hidden", marginBottom: "24px",
    maxHeight: open ? "800px" : "0px",
    opacity: open ? 1 : 0,
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  formTopBar: {
    background: "linear-gradient(135deg,rgba(251,113,133,0.1),rgba(251,113,133,0.03))",
    borderBottom: "1px solid rgba(251,113,133,0.12)",
    padding: "18px 28px", display: "flex", alignItems: "center",
  },
  formTopTitle: {
    fontSize: "15px", fontWeight: "800", color: "#fb7185",
    fontFamily: "'Lora', serif", display: "flex", alignItems: "center", gap: "10px",
  },
  formBody: {
    padding: "28px",
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px",
  },
  fullWidth: { gridColumn: "1 / -1" },
  fieldWrap: { display: "flex", flexDirection: "column", gap: "7px" },
  label: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.35)",
  },
  input: (focus) => ({
    padding: "12px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(251,113,133,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(251,113,133,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(251,113,133,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  textarea: (focus) => ({
    padding: "12px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(251,113,133,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(251,113,133,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none", resize: "vertical", minHeight: "90px",
    boxShadow: focus ? "0 0 0 3px rgba(251,113,133,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  imgUploadWrap: {
    border: "2px dashed rgba(255,255,255,0.1)",
    borderRadius: "14px", padding: "18px",
    display: "flex", alignItems: "center", gap: "14px",
    background: "rgba(255,255,255,0.02)",
  },
  previewImg: {
    width: "80px", height: "56px", borderRadius: "10px",
    objectFit: "cover", flexShrink: 0,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  formBtns: {
    gridColumn: "1 / -1", display: "flex", gap: "12px", paddingTop: "4px",
  },
  submitBtn: (hov) => ({
    padding: "13px 28px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#e11d48,#fb7185)" : "linear-gradient(135deg,#fb7185,#fda4af)",
    color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(251,113,133,0.4)" : "0 4px 14px rgba(251,113,133,0.2)",
    transform: hov ? "translateY(-1px)" : "none", transition: "all 0.3s ease",
  }),
  cancelBtn: (hov) => ({
    padding: "13px 24px", borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: hov ? "rgba(255,255,255,0.06)" : "transparent",
    color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.25s ease",
  }),
  blogsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px", marginBottom: "28px",
  },
  blogCard: (hov) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hov ? "rgba(251,113,133,0.25)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "20px", overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    transform: hov ? "translateY(-4px)" : "none",
    boxShadow: hov ? "0 16px 40px rgba(251,113,133,0.1)" : "none",
  }),
  blogImgWrap: {
    height: "160px", overflow: "hidden", position: "relative",
    background: "rgba(255,255,255,0.04)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  blogImg: (hov) => ({
    width: "100%", height: "100%", objectFit: "cover",
    transition: "transform 0.4s ease",
    transform: hov ? "scale(1.06)" : "scale(1)",
  }),
  blogBody: { padding: "18px 20px" },
  blogTitle: {
    fontSize: "14px", fontWeight: "800", color: "#fff",
    fontFamily: "'Lora', serif", marginBottom: "6px",
    display: "-webkit-box", WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4,
  },
  blogDesc: {
    fontSize: "12px", color: "rgba(232,228,240,0.4)", fontWeight: "600",
    marginBottom: "12px", lineHeight: 1.5,
    display: "-webkit-box", WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical", overflow: "hidden",
  },
  blogMeta: {
    display: "flex", alignItems: "center", gap: "10px",
    marginBottom: "14px", flexWrap: "wrap",
  },
  authorBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    background: "rgba(251,113,133,0.12)", color: "#fb7185",
    borderRadius: "50px", padding: "4px 12px",
    fontSize: "11px", fontWeight: "800",
    border: "1px solid rgba(251,113,133,0.25)",
  },
  dateBadge: {
    fontSize: "11px", fontWeight: "600", color: "rgba(232,228,240,0.3)",
  },
  cardActions: { display: "flex", gap: "8px" },
  editCardBtn: (hov) => ({
    flex: 1, padding: "8px", borderRadius: "10px",
    border: `1px solid ${hov ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.2)"}`,
    background: hov ? "rgba(167,139,250,0.15)" : "transparent",
    color: hov ? "#a78bfa" : "rgba(167,139,250,0.5)",
    fontSize: "11px", fontWeight: "800", cursor: "pointer",
    transition: "all 0.2s ease", textAlign: "center",
  }),
  deleteCardBtn: (hov) => ({
    padding: "8px 12px", borderRadius: "10px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.4)",
    fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  tableCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "22px", overflow: "hidden",
  },
  tableTopBar: {
    padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  tableTopTitle: { fontSize: "14px", fontWeight: "800", color: "#fff", fontFamily: "'Lora', serif" },
  countBadge: {
    background: "rgba(251,113,133,0.12)", color: "#fb7185",
    borderRadius: "50px", padding: "4px 14px", fontSize: "12px", fontWeight: "800",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "80px 1.5fr 120px 100px 140px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "80px 1.5fr 120px 100px 140px",
    padding: "14px 24px", gap: "12px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  rowImg: {
    width: "68px", height: "44px", objectFit: "cover",
    borderRadius: "10px", background: "rgba(255,255,255,0.06)",
  },
  rowTitle: { fontSize: "13px", fontWeight: "700", color: "#e8e4f0" },
  rowAuthor: {
    display: "inline-flex", alignItems: "center", gap: "4px",
    background: "rgba(251,113,133,0.1)", color: "#fb7185",
    borderRadius: "8px", padding: "3px 10px",
    fontSize: "11px", fontWeight: "800",
  },
  rowDate: { fontSize: "12px", color: "rgba(232,228,240,0.35)", fontWeight: "600" },
  rowActions: { display: "flex", gap: "6px" },
  editBtn: (hov) => ({
    padding: "6px 14px", borderRadius: "9px",
    border: `1px solid ${hov ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.2)"}`,
    background: hov ? "rgba(167,139,250,0.15)" : "transparent",
    color: hov ? "#a78bfa" : "rgba(167,139,250,0.5)",
    fontSize: "11px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease",
  }),
  deleteBtn: (hov) => ({
    padding: "6px 10px", borderRadius: "9px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.4)",
    fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  center: { textAlign: "center", padding: "60px 24px", color: "rgba(232,228,240,0.25)" },
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
    zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#1a1826", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px", padding: "36px", maxWidth: "360px", width: "90%",
    textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
  },
  toast: (show, ok) => ({
    position: "fixed", bottom: "32px", right: "32px",
    background: ok ? "rgba(52,211,153,0.1)" : "rgba(232,97,58,0.1)",
    border: `1px solid ${ok ? "rgba(52,211,153,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "14px", padding: "14px 22px",
    color: ok ? "#34d399" : "#e8613a",
    fontWeight: "700", fontSize: "13px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
    zIndex: 9999, display: "flex", alignItems: "center", gap: "8px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(12px)",
    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: "none",
  }),
}

// ── Field helper ──────────────────────────────────────────────
const Field = ({ label, name, value, onChange, placeholder }) => {
  const [f, setF] = useState(false)
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>{label}</label>
      <input name={name} placeholder={placeholder} value={value} onChange={onChange}
        style={S.input(f)} onFocus={() => setF(true)} onBlur={() => setF(false)} />
    </div>
  )
}

// ── Blog Card ─────────────────────────────────────────────────
const BlogCard = ({ blog, onEdit, onDelete, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [eh,  setEh]  = useState(false)
  const [dh,  setDh]  = useState(false)
  return (
    <div style={{ ...S.blogCard(hov), opacity: vis?1:0, transform: vis?(hov?"translateY(-4px)":"none"):"translateY(14px)", transition: `all 0.4s ease ${index*0.06}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.blogImgWrap}>
        {blog.image
          ? <img src={`${BASE_URL}${blog.image}`} alt={blog.title} style={S.blogImg(hov)} />
          : <div style={{ fontSize:"32px", opacity:0.2 }}>✍</div>
        }
      </div>
      <div style={S.blogBody}>
        <div style={S.blogTitle}>{blog.title}</div>
        <div style={S.blogDesc}>{blog.description}</div>
        <div style={S.blogMeta}>
          <span style={S.authorBadge}>✍ {blog.author || "Admin"}</span>
          <span style={S.dateBadge}>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "—"}</span>
        </div>
        <div style={S.cardActions}>
          <button style={S.editCardBtn(eh)} onClick={() => onEdit(blog)}
            onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
          <button style={S.deleteCardBtn(dh)} onClick={() => onDelete(blog.id)}
            onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
        </div>
      </div>
    </div>
  )
}

// ── Table Row ─────────────────────────────────────────────────
const BlogRow = ({ blog, onEdit, onDelete, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [eh,  setEh]  = useState(false)
  const [dh,  setDh]  = useState(false)
  return (
    <div style={{ ...S.tableRow(hov), opacity: vis?1:0, transform: vis?"none":"translateY(10px)", transition: `all 0.4s ease ${index*0.04}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {blog.image
        ? <img src={`${BASE_URL}${blog.image}`} alt="" style={S.rowImg} />
        : <div style={{ ...S.rowImg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>✍</div>
      }
      <div style={S.rowTitle}>{blog.title}</div>
      <div><span style={S.rowAuthor}>✍ {blog.author || "Admin"}</span></div>
      <div style={S.rowDate}>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "—"}</div>
      <div style={S.rowActions}>
        <button style={S.editBtn(eh)} onClick={() => onEdit(blog)}
          onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
        <button style={S.deleteBtn(dh)} onClick={() => onDelete(blog.id)}
          onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
const Blogs = () => {
  const [blogs,    setBlogs]    = useState([])
  const [editId,   setEditId]   = useState(null)
  const [preview,  setPreview]  = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [view,     setView]     = useState("grid")
  const [vis,      setVis]      = useState(false)
  const [toast,    setToast]    = useState({ show:false, msg:"", ok:true })
  const [addHov,   setAddHov]   = useState(false)
  const [subHov,   setSubHov]   = useState(false)
  const [canHov,   setCanHov]   = useState(false)
  const [cmHov,    setCmHov]    = useState(false)
  const [cdHov,    setCdHov]    = useState(false)
  const [descFocus,setDescFocus]= useState(false)

  const [form, setForm] = useState({
    title: "", description: "", author: "Admin", image: null,
  })

  const showToast = (msg, ok=true) => {
    setToast({ show:true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show:false })), 2500)
  }

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs")
      setBlogs(Array.isArray(res.data) ? res.data : [])
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchBlogs()
    setTimeout(() => setVis(true), 80)
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"; document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(f => ({ ...f, image: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append("title",       form.title)
    fd.append("description", form.description)
    fd.append("author",      form.author)
    if (form.image) fd.append("image", form.image)
    try {
      if (editId) {
        await API.put(`/blogs/${editId}`, fd, { headers:{ "Content-Type":"multipart/form-data" } })
        showToast("Blog updated!")
      } else {
        await API.post("/blogs", fd, { headers:{ "Content-Type":"multipart/form-data" } })
        showToast("Blog created!")
      }
      resetForm(); fetchBlogs()
    } catch (err) { showToast("Operation failed.", false) }
  }

  const resetForm = () => {
    setEditId(null); setShowForm(false); setPreview(null)
    setForm({ title:"", description:"", author:"Admin", image:null })
  }

  const handleEdit = (blog) => {
    setEditId(blog.id)
    setForm({
      title:       blog.title || "",
      description: blog.description || "",
      author:      blog.author || "Admin",
      image:       null,
    })
    if (blog.image) setPreview(`${BASE_URL}${blog.image}`)
    setShowForm(true)
    window.scrollTo({ top:0, behavior:"smooth" })
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/blogs/${deleteId}`)
      setBlogs(prev => prev.filter(b => b.id !== deleteId))
      setDeleteId(null); showToast("Blog deleted.")
    } catch (err) { showToast("Error deleting.", false) }
  }

  return (
    <div style={S.page}>

      {/* Toast */}
      <div style={S.toast(toast.show, toast.ok)}>
        {toast.ok ? "✓" : "✕"} {toast.msg}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={{ fontSize:"40px", marginBottom:"14px" }}>🗑</div>
            <div style={{ fontSize:"18px", fontWeight:"800", color:"#fff", fontFamily:"'Lora',serif", marginBottom:"8px" }}>Delete Blog?</div>
            <div style={{ fontSize:"13px", color:"rgba(232,228,240,0.4)", marginBottom:"26px", lineHeight:1.6 }}>
              This will permanently remove the blog post.
            </div>
            <div style={{ display:"flex", gap:"12px" }}>
              <button onClick={() => setDeleteId(null)}
                style={{ flex:1, padding:"12px", borderRadius:"50px", border:"1px solid rgba(255,255,255,0.1)", background: cmHov?"rgba(255,255,255,0.06)":"transparent", color:"rgba(232,228,240,0.5)", fontSize:"13px", fontWeight:"800", cursor:"pointer", transition:"all 0.2s ease" }}
                onMouseEnter={() => setCmHov(true)} onMouseLeave={() => setCmHov(false)}>Cancel</button>
              <button onClick={handleDelete}
                style={{ flex:1, padding:"12px", borderRadius:"50px", border:"none", background: cdHov?"linear-gradient(135deg,#c0422a,#e8613a)":"linear-gradient(135deg,#e8613a,#f0855e)", color:"#fff", fontSize:"13px", fontWeight:"800", cursor:"pointer", transition:"all 0.3s ease", boxShadow: cdHov?"0 8px 24px rgba(232,97,58,0.4)":"none" }}
                onMouseEnter={() => setCdHov(true)} onMouseLeave={() => setCdHov(false)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ ...S.topRow, opacity: vis?1:0, transform: vis?"none":"translateY(16px)", transition:"all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>✍ Content</div>
          <h1 style={S.pageTitle}>Blog Posts</h1>
        </div>
        <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
          <div style={{ display:"flex", background:"rgba(255,255,255,0.04)", borderRadius:"12px", border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden" }}>
            {["grid","table"].map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding:"8px 16px", border:"none", background: view===v?"rgba(251,113,133,0.15)":"transparent", color: view===v?"#fb7185":"rgba(232,228,240,0.3)", fontSize:"12px", fontWeight:"800", cursor:"pointer", transition:"all 0.2s ease" }}>
                {v === "grid" ? "⊞ Grid" : "≡ Table"}
              </button>
            ))}
          </div>
          <button style={S.addBtn(addHov)}
            onClick={() => { setShowForm(s => !s); if (editId) resetForm() }}
            onMouseEnter={() => setAddHov(true)} onMouseLeave={() => setAddHov(false)}>
            {showForm ? "✕ Close" : "+ Add Post"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div style={S.formCard(showForm)}>
        <div style={S.formTopBar}>
          <div style={S.formTopTitle}>
            <span>{editId ? "✏" : "+"}</span>
            {editId ? "Edit Blog Post" : "Write New Post"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={S.formBody}>
            <Field label="Blog Title *" name="title" value={form.title} onChange={handleChange} placeholder="Post headline" />
            <Field label="Author" name="author" value={form.author} onChange={handleChange} placeholder="e.g. Admin" />

            {/* Image upload */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Cover Image</label>
              <div style={S.imgUploadWrap}>
                {preview && <img src={preview} alt="preview" style={S.previewImg} />}
                <div>
                  <input type="file" accept="image/*" onChange={handleImageChange}
                    style={{ color:"rgba(232,228,240,0.5)", fontSize:"13px", background:"transparent", border:"none", outline:"none" }} />
                  {!preview && <div style={{ fontSize:"12px", color:"rgba(232,228,240,0.25)", marginTop:"4px" }}>PNG, JPG recommended</div>}
                </div>
              </div>
            </div>

            {/* Description full width */}
            <div style={{ ...S.fieldWrap, ...S.fullWidth }}>
              <label style={S.label}>Description / Content</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Write your blog content here…"
                style={S.textarea(descFocus)}
                onFocus={() => setDescFocus(true)} onBlur={() => setDescFocus(false)} />
            </div>

            <div style={S.formBtns}>
              <button type="submit" style={S.submitBtn(subHov)}
                onMouseEnter={() => setSubHov(true)} onMouseLeave={() => setSubHov(false)}>
                {editId ? "✓ Update Post" : "+ Publish Post"}
              </button>
              {editId && (
                <button type="button" style={S.cancelBtn(canHov)} onClick={resetForm}
                  onMouseEnter={() => setCanHov(true)} onMouseLeave={() => setCanHov(false)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:"14px", marginBottom:"22px", opacity: vis?1:0, transition:"all 0.5s ease 0.1s" }}>
        {[
          { label:"Total Posts", val: blogs.length, color:"#fb7185" },
          { label:"This Month",  val: blogs.filter(b => b.createdAt && new Date(b.createdAt).getMonth() === new Date().getMonth()).length, color:"#a78bfa" },
        ].map((s,i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${s.color}30`, borderRadius:"14px", padding:"14px 20px", display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ fontSize:"22px", fontWeight:"800", fontFamily:"'Lora',serif", color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:"11px", fontWeight:"700", color:"rgba(232,228,240,0.35)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      {blogs.length === 0 ? (
        <div style={{ ...S.center, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"22px" }}>
          <div style={{ fontSize:"44px", marginBottom:"12px" }}>✍</div>
          <div style={{ fontSize:"15px", fontWeight:"700" }}>No blog posts yet</div>
          <div style={{ fontSize:"12px", marginTop:"6px" }}>Click "+ Add Post" to get started</div>
        </div>
      ) : view === "grid" ? (
        <div style={{ ...S.blogsGrid, opacity: vis?1:0, transition:"all 0.5s ease 0.18s" }}>
          {blogs.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} vis={vis}
              onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} />
          ))}
        </div>
      ) : (
        <div style={{ ...S.tableCard, opacity: vis?1:0, transition:"all 0.5s ease 0.18s" }}>
          <div style={S.tableTopBar}>
            <div style={S.tableTopTitle}>All Blog Posts</div>
            <span style={S.countBadge}>{blogs.length} posts</span>
          </div>
          <div style={S.tableHeader}>
            <span>Image</span><span>Title</span><span>Author</span>
            <span>Date</span><span>Actions</span>
          </div>
          {blogs.map((blog, i) => (
            <BlogRow key={blog.id} blog={blog} index={i} vis={vis}
              onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Blogs