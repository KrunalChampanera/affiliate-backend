import { useEffect, useState } from "react"
import API from "../services/api"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

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
    textTransform: "uppercase", color: "#38bdf8", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(22px,3vw,32px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff", letterSpacing: "-0.5px", margin: 0,
  },
  addBtn: (hov) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 22px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#0ea5e9,#38bdf8)" : "linear-gradient(135deg,#38bdf8,#7dd3fc)",
    color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(56,189,248,0.45)" : "0 4px 16px rgba(56,189,248,0.2)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  formCard: (open) => ({
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px", overflow: "hidden", marginBottom: "24px",
    maxHeight: open ? "900px" : "0px",
    opacity: open ? 1 : 0,
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  formTopBar: {
    background: "linear-gradient(135deg,rgba(56,189,248,0.1),rgba(56,189,248,0.03))",
    borderBottom: "1px solid rgba(56,189,248,0.12)",
    padding: "18px 28px", display: "flex", alignItems: "center",
  },
  formTopTitle: {
    fontSize: "15px", fontWeight: "800", color: "#38bdf8",
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
    border: `1.5px solid ${focus ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(56,189,248,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  textarea: (focus) => ({
    padding: "12px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none", resize: "vertical", minHeight: "90px",
    boxShadow: focus ? "0 0 0 3px rgba(56,189,248,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  imgUploadWrap: {
    border: "2px dashed rgba(255,255,255,0.1)",
    borderRadius: "14px", padding: "18px",
    display: "flex", alignItems: "center", gap: "14px",
    background: "rgba(255,255,255,0.02)",
  },
  previewImg: {
    width: "70px", height: "70px", borderRadius: "50%",
    objectFit: "cover", flexShrink: 0,
    border: "2px solid rgba(56,189,248,0.3)",
  },
  formBtns: { gridColumn: "1 / -1", display: "flex", gap: "12px", paddingTop: "4px" },
  submitBtn: (hov) => ({
    padding: "13px 28px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#0ea5e9,#38bdf8)" : "linear-gradient(135deg,#38bdf8,#7dd3fc)",
    color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(56,189,248,0.4)" : "0 4px 14px rgba(56,189,248,0.2)",
    transform: hov ? "translateY(-1px)" : "none", transition: "all 0.3s ease",
  }),
  cancelBtn: (hov) => ({
    padding: "13px 24px", borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: hov ? "rgba(255,255,255,0.06)" : "transparent",
    color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.25s ease",
  }),
  // Grid
  authorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  authorCard: (hov) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hov ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "20px", overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    transform: hov ? "translateY(-4px)" : "none",
    boxShadow: hov ? "0 16px 40px rgba(56,189,248,0.1)" : "none",
  }),
  cardTop: {
    padding: "24px 20px 16px",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "12px", textAlign: "center",
    background: "linear-gradient(180deg,rgba(56,189,248,0.05),transparent)",
  },
  avatar: {
    width: "80px", height: "80px", borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid rgba(56,189,248,0.3)",
  },
  avatarPlaceholder: {
    width: "80px", height: "80px", borderRadius: "50%",
    background: "rgba(56,189,248,0.1)",
    border: "2px solid rgba(56,189,248,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "28px",
  },
  authorName: {
    fontSize: "15px", fontWeight: "800", color: "#fff",
    fontFamily: "'Lora', serif",
  },
  roleBadge: {
    display: "inline-flex", alignItems: "center",
    background: "rgba(56,189,248,0.12)", color: "#38bdf8",
    borderRadius: "50px", padding: "3px 12px",
    fontSize: "10px", fontWeight: "800",
    border: "1px solid rgba(56,189,248,0.2)",
    textTransform: "uppercase", letterSpacing: "1px",
  },
  cardBody: { padding: "0 20px 18px" },
  authorBio: {
    fontSize: "12px", color: "rgba(232,228,240,0.4)",
    lineHeight: 1.6, marginBottom: "14px",
    display: "-webkit-box", WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical", overflow: "hidden",
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
  // Status dot
  statusDot: (active) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    fontSize: "10px", fontWeight: "800",
    color: active ? "#34d399" : "rgba(232,228,240,0.3)",
    background: active ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
    borderRadius: "50px", padding: "3px 10px",
    border: `1px solid ${active ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.07)"}`,
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

const Authors = () => {
  const [authors,  setAuthors]  = useState([])
  const [editId,   setEditId]   = useState(null)
  const [preview,  setPreview]  = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [vis,      setVis]      = useState(false)
  const [toast,    setToast]    = useState({ show: false, msg: "", ok: true })
  const [addHov,   setAddHov]   = useState(false)
  const [subHov,   setSubHov]   = useState(false)
  const [canHov,   setCanHov]   = useState(false)
  const [cmHov,    setCmHov]    = useState(false)
  const [cdHov,    setCdHov]    = useState(false)
  const [bioFocus, setBioFocus] = useState(false)

  const [form, setForm] = useState({
    name: "", email: "", bio: "", role: "Author", isActive: true, image: null,
  })

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }

  const fetchAuthors = async () => {
    try {
      const res = await API.get("/authors")
      setAuthors(Array.isArray(res.data) ? res.data : [])
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchAuthors()
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
    fd.append("name",     form.name)
    fd.append("email",    form.email)
    fd.append("bio",      form.bio)
    fd.append("role",     form.role)
    fd.append("isActive", form.isActive ? "true" : "false")
    if (form.image) fd.append("image", form.image)
    try {
      if (editId) {
        await API.put(`/authors/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } })
        showToast("Author updated!")
      } else {
        await API.post("/authors", fd, { headers: { "Content-Type": "multipart/form-data" } })
        showToast("Author created!")
      }
      resetForm(); fetchAuthors()
    } catch (err) { showToast("Operation failed.", false) }
  }

  const resetForm = () => {
    setEditId(null); setShowForm(false); setPreview(null)
    setForm({ name: "", email: "", bio: "", role: "Author", isActive: true, image: null })
  }

  const handleEdit = (author) => {
    setEditId(author.id)
    setForm({
      name:     author.name  || "",
      email:    author.email || "",
      bio:      author.bio   || "",
      role:     author.role  || "Author",
      isActive: author.isActive !== false,
      image:    null,
    })
    if (author.image) setPreview(`${BASE_URL}${author.image}`)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/authors/${deleteId}`)
      setAuthors(prev => prev.filter(a => a.id !== deleteId))
      setDeleteId(null); showToast("Author deleted.")
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
            <div style={{ fontSize: "40px", marginBottom: "14px" }}>🗑</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", fontFamily: "'Lora',serif", marginBottom: "8px" }}>Delete Author?</div>
            <div style={{ fontSize: "13px", color: "rgba(232,228,240,0.4)", marginBottom: "26px", lineHeight: 1.6 }}>
              This will permanently remove the author.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setDeleteId(null)}
                style={{ flex: 1, padding: "12px", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.1)", background: cmHov ? "rgba(255,255,255,0.06)" : "transparent", color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseEnter={() => setCmHov(true)} onMouseLeave={() => setCmHov(false)}>Cancel</button>
              <button onClick={handleDelete}
                style={{ flex: 1, padding: "12px", borderRadius: "50px", border: "none", background: cdHov ? "linear-gradient(135deg,#c0422a,#e8613a)" : "linear-gradient(135deg,#e8613a,#f0855e)", color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer", transition: "all 0.3s ease", boxShadow: cdHov ? "0 8px 24px rgba(232,97,58,0.4)" : "none" }}
                onMouseEnter={() => setCdHov(true)} onMouseLeave={() => setCdHov(false)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ ...S.topRow, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>✍ Content</div>
          <h1 style={S.pageTitle}>Authors</h1>
        </div>
        <button style={S.addBtn(addHov)}
          onClick={() => { setShowForm(s => !s); if (editId) resetForm() }}
          onMouseEnter={() => setAddHov(true)} onMouseLeave={() => setAddHov(false)}>
          {showForm ? "✕ Close" : "+ Add Author"}
        </button>
      </div>

      {/* Form */}
      <div style={S.formCard(showForm)}>
        <div style={S.formTopBar}>
          <div style={S.formTopTitle}>
            <span>{editId ? "✏" : "+"}</span>
            {editId ? "Edit Author" : "Add New Author"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={S.formBody}>
            <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Doe" />
            <Field label="Email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
            <Field label="Role" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Author, Editor" />

            {/* Image upload */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Profile Photo</label>
              <div style={S.imgUploadWrap}>
                {preview
                  ? <img src={preview} alt="preview" style={S.previewImg} />
                  : <div style={{ ...S.avatarPlaceholder, width: "60px", height: "60px" }}>👤</div>
                }
                <div>
                  <input type="file" accept="image/*" onChange={handleImageChange}
                    style={{ color: "rgba(232,228,240,0.5)", fontSize: "13px", background: "transparent", border: "none", outline: "none" }} />
                  {!preview && <div style={{ fontSize: "12px", color: "rgba(232,228,240,0.25)", marginTop: "4px" }}>PNG, JPG recommended</div>}
                </div>
              </div>
            </div>

            {/* Active toggle */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Status</label>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", borderRadius: "13px",
                background: form.isActive ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.03)",
                border: `1.5px solid ${form.isActive ? "rgba(52,211,153,0.35)" : "rgba(255,255,255,0.08)"}`,
                cursor: "pointer", transition: "all 0.25s ease",
              }} onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: form.isActive ? "#34d399" : "rgba(232,228,240,0.5)" }}>
                    {form.isActive ? "● Active" : "○ Inactive"}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(232,228,240,0.25)" }}>
                    {form.isActive ? "Visible on frontend" : "Hidden from frontend"}
                  </div>
                </div>
                <div style={{ width: "44px", height: "24px", borderRadius: "50px",
                  background: form.isActive ? "linear-gradient(135deg,#34d399,#6ee7b7)" : "rgba(255,255,255,0.1)",
                  position: "relative", transition: "all 0.3s ease" }}>
                  <div style={{ position: "absolute", top: "3px",
                    left: form.isActive ? "23px" : "3px",
                    width: "18px", height: "18px", borderRadius: "50%",
                    background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)" }} />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div style={{ ...S.fieldWrap, ...S.fullWidth }}>
              <label style={S.label}>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange}
                placeholder="Write a short bio about the author…"
                style={S.textarea(bioFocus)}
                onFocus={() => setBioFocus(true)} onBlur={() => setBioFocus(false)} />
            </div>

            <div style={S.formBtns}>
              <button type="submit" style={S.submitBtn(subHov)}
                onMouseEnter={() => setSubHov(true)} onMouseLeave={() => setSubHov(false)}>
                {editId ? "✓ Update Author" : "+ Save Author"}
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
      <div style={{ display: "flex", gap: "14px", marginBottom: "22px", opacity: vis ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
        {[
          { label: "Total Authors", val: authors.length, color: "#38bdf8" },
          { label: "Active", val: authors.filter(a => a.isActive !== false).length, color: "#34d399" },
        ].map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: "14px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Lora',serif", color: s.color, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(232,228,240,0.35)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Authors grid */}
      {authors.length === 0 ? (
        <div style={{ ...S.center, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "22px" }}>
          <div style={{ fontSize: "44px", marginBottom: "12px" }}>✍</div>
          <div style={{ fontSize: "15px", fontWeight: "700" }}>No authors yet</div>
          <div style={{ fontSize: "12px", marginTop: "6px" }}>Click "+ Add Author" to get started</div>
        </div>
      ) : (
        <div style={{ ...S.authorsGrid, opacity: vis ? 1 : 0, transition: "all 0.5s ease 0.18s" }}>
          {authors.map((author, i) => (
            <AuthorCard key={author.id} author={author} index={i} vis={vis}
              onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} />
          ))}
        </div>
      )}
    </div>
  )
}

const AuthorCard = ({ author, index, vis, onEdit, onDelete }) => {
  const [hov, setHov] = useState(false)
  const [eh,  setEh]  = useState(false)
  const [dh,  setDh]  = useState(false)
  return (
    <div style={{ ...S.authorCard(hov), opacity: vis ? 1 : 0, transform: vis ? (hov ? "translateY(-4px)" : "none") : "translateY(14px)", transition: `all 0.4s ease ${index * 0.06}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.cardTop}>
        {author.image
          ? <img src={`${BASE_URL}${author.image}`} alt={author.name} style={S.avatar} />
          : <div style={S.avatarPlaceholder}>👤</div>
        }
        <div style={S.authorName}>{author.name}</div>
        <span style={S.roleBadge}>{author.role || "Author"}</span>
        <span style={S.statusDot(author.isActive !== false)}>
          <span style={{ fontSize: "7px" }}>●</span>
          {author.isActive !== false ? "Active" : "Inactive"}
        </span>
      </div>
      <div style={S.cardBody}>
        {author.bio && <div style={S.authorBio}>{author.bio}</div>}
        {author.email && (
          <div style={{ fontSize: "11px", color: "rgba(232,228,240,0.3)", marginBottom: "12px", fontWeight: "600" }}>
            ✉ {author.email}
          </div>
        )}
        <div style={S.cardActions}>
          <button style={S.editCardBtn(eh)} onClick={() => onEdit(author)}
            onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
          <button style={S.deleteCardBtn(dh)} onClick={() => onDelete(author.id)}
            onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
        </div>
      </div>
    </div>
  )
}

export default Authors