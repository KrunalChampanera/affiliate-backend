import { useEffect, useState } from "react"
import API from "../services/api"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const POSITIONS = [
  { value: "hero",           label: "🏠 Hero",                 color: "#a78bfa" },
  { value: "right",          label: "➡ Right Banner",          color: "#5b8dee" },
  { value: "promo",          label: "📣 Promo Full Width",      color: "#e8613a" },
  { value: "top-deals",      label: "🔥 Top Deals Banner",      color: "#f5a623" },
  { value: "popular-left",   label: "⭐ Popular Left",          color: "#34d399" },
  { value: "popular-right",  label: "⭐ Popular Right",         color: "#fb7185" },
  { value: "top-seller",     label: "🏆 Top Seller",            color: "#fbbf24" },
]

const posConfig = (pos) => POSITIONS.find(p => p.value === pos) || { color: "#888", label: pos }

const INIT = {
  title: "", subtitle: "", buttonText: "",
  backgroundColor: "#1ca7c9", position: "hero", image: null,
}

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
    textTransform: "uppercase", color: "#34d399", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(22px,3vw,32px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff", letterSpacing: "-0.5px", margin: 0,
  },
  addBtn: (hov) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 22px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#22c55e,#34d399)" : "linear-gradient(135deg,#34d399,#6ee7b7)",
    color: "#0f0f18", fontSize: "13px", fontWeight: "800",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(52,211,153,0.4)" : "0 4px 16px rgba(52,211,153,0.2)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  // Form card
  formCard: (open) => ({
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px", overflow: "hidden", marginBottom: "24px",
    maxHeight: open ? "1000px" : "0px",
    opacity: open ? 1 : 0,
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  formTopBar: {
    background: "linear-gradient(135deg,rgba(52,211,153,0.1),rgba(52,211,153,0.03))",
    borderBottom: "1px solid rgba(52,211,153,0.12)",
    padding: "18px 28px", display: "flex", alignItems: "center",
  },
  formTopTitle: {
    fontSize: "15px", fontWeight: "800", color: "#34d399",
    fontFamily: "'Lora', serif", display: "flex", alignItems: "center", gap: "10px",
  },
  formBody: {
    padding: "28px",
    display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px",
  },
  fullWidth: { gridColumn: "1 / -1" },
  fieldWrap: { display: "flex", flexDirection: "column", gap: "7px" },
  label: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.35)",
  },
  input: (focus) => ({
    padding: "12px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(52,211,153,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(52,211,153,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  select: {
    padding: "12px 14px", borderRadius: "12px",
    border: "1.5px solid rgba(255,255,255,0.08)",
    background: "#1a1826", color: "#e8e4f0", fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    outline: "none", cursor: "pointer", width: "100%",
  },
  colorRow: {
    display: "flex", alignItems: "center", gap: "12px",
  },
  colorSwatch: (color) => ({
    width: "42px", height: "42px", borderRadius: "12px",
    background: color, flexShrink: 0,
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow: `0 4px 14px ${color}60`,
  }),
  colorInput: {
    width: "100%", height: "42px", borderRadius: "12px",
    border: "1.5px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    cursor: "pointer", padding: "2px",
  },
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
    background: hov ? "linear-gradient(135deg,#22c55e,#34d399)" : "linear-gradient(135deg,#34d399,#6ee7b7)",
    color: "#0f0f18", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(52,211,153,0.4)" : "0 4px 14px rgba(52,211,153,0.2)",
    transform: hov ? "translateY(-1px)" : "none", transition: "all 0.3s ease",
  }),
  cancelBtn: (hov) => ({
    padding: "13px 24px", borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: hov ? "rgba(255,255,255,0.06)" : "transparent",
    color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.25s ease",
  }),
  // Banners grid
  bannersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  bannerCard: (hov) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "20px", overflow: "hidden",
    transition: "all 0.3s ease",
    transform: hov ? "translateY(-3px)" : "none",
    boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.2)" : "none",
  }),
  bannerImgWrap: {
    height: "140px", overflow: "hidden",
    position: "relative", background: "rgba(255,255,255,0.04)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  bannerImg: (hov) => ({
    width: "100%", height: "100%", objectFit: "cover",
    transition: "transform 0.4s ease",
    transform: hov ? "scale(1.05)" : "scale(1)",
  }),
  colorDot: (color) => ({
    position: "absolute", top: "12px", right: "12px",
    width: "28px", height: "28px", borderRadius: "50%",
    background: color, border: "2px solid rgba(255,255,255,0.3)",
    boxShadow: `0 3px 10px ${color}80`,
  }),
  bannerBody: { padding: "18px 20px" },
  bannerTitle: {
    fontSize: "14px", fontWeight: "800", color: "#fff",
    fontFamily: "'Lora', serif", marginBottom: "5px",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  bannerSub: {
    fontSize: "12px", color: "rgba(232,228,240,0.4)", fontWeight: "600",
    marginBottom: "12px",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  posBadge: (color) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "4px 12px", borderRadius: "50px",
    background: `${color}18`, color,
    fontSize: "11px", fontWeight: "800",
    border: `1px solid ${color}30`,
    marginBottom: "14px",
  }),
  cardActions: { display: "flex", gap: "8px", flexWrap: "wrap" },
  editCardBtn: (hov) => ({
    padding: "7px 15px", borderRadius: "9px",
    border: `1px solid ${hov ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.2)"}`,
    background: hov ? "rgba(167,139,250,0.15)" : "transparent",
    color: hov ? "#a78bfa" : "rgba(167,139,250,0.5)",
    fontSize: "11px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease",
  }),
  deleteCardBtn: (hov) => ({
    padding: "7px 10px", borderRadius: "9px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.4)",
    fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  topSellerBtn: (active, hov) => ({
    padding: "7px 12px", borderRadius: "9px",
    border: `1px solid ${active ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.1)"}`,
    background: active ? "rgba(251,191,36,0.12)" : hov ? "rgba(255,255,255,0.05)" : "transparent",
    color: active ? "#fbbf24" : "rgba(232,228,240,0.3)",
    fontSize: "12px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease",
    marginLeft: "auto",
  }),
  // Table header
  tableCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "22px", overflow: "hidden", marginTop: "28px",
  },
  tableTopBar: {
    padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  tableTitle: { fontSize: "14px", fontWeight: "800", color: "#fff", fontFamily: "'Lora', serif" },
  countBadge: {
    background: "rgba(52,211,153,0.12)", color: "#34d399",
    borderRadius: "50px", padding: "4px 14px", fontSize: "12px", fontWeight: "800",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "80px 1fr 100px 200px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "80px 1fr 100px 200px",
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
  rowActions: { display: "flex", gap: "6px", alignItems: "center" },
  center: { textAlign: "center", padding: "60px 24px", color: "rgba(232,228,240,0.25)" },
  // Modal
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

// ── Small helpers ─────────────────────────────────────────────

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

const BannerRow = ({ b, onEdit, onDelete, onToggle, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [eh, setEh]   = useState(false)
  const [dh, setDh]   = useState(false)
  const [th, setTh]   = useState(false)
  const cfg = posConfig(b.position)
  const isTop = b.position === "top-seller"

  return (
    <div style={{ ...S.tableRow(hov), opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: `all 0.4s ease ${index * 0.05}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {b.image
        ? <img src={`${BASE_URL}${b.image}`} alt="" style={S.rowImg} />
        : <div style={{ ...S.rowImg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px" }}>🖼</div>
      }
      <div style={S.rowTitle}>{b.title || "—"}</div>
      <div><span style={S.posBadge(cfg.color)}>{cfg.label}</span></div>
      <div style={S.rowActions}>
        <button style={S.editCardBtn(eh)} onClick={() => onEdit(b)}
          onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
        <button style={S.deleteCardBtn(dh)} onClick={() => onDelete(b.id)}
          onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
        <button style={S.topSellerBtn(isTop, th)} onClick={() => onToggle(b)}
          onMouseEnter={() => setTh(true)} onMouseLeave={() => setTh(false)}>
          {isTop ? "🏆 Top Seller" : "☆ Top"}
        </button>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────

const Banners = () => {
  const [banners,   setBanners]   = useState([])
  const [editId,    setEditId]    = useState(null)
  const [preview,   setPreview]   = useState(null)
  const [form,      setForm]      = useState(INIT)
  const [showForm,  setShowForm]  = useState(false)
  const [deleteId,  setDeleteId]  = useState(null)
  const [vis,       setVis]       = useState(false)
  const [toast,     setToast]     = useState({ show: false, msg: "", ok: true })
  const [addHov,    setAddHov]    = useState(false)
  const [subHov,    setSubHov]    = useState(false)
  const [canHov,    setCanHov]    = useState(false)
  const [cmHov,     setCmHov]     = useState(false)
  const [cdHov,     setCdHov]     = useState(false)

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2600)
  }

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banners")
      setBanners(Array.isArray(res.data) ? res.data : [])
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchBanners()
    setTimeout(() => setVis(true), 80)
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
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
    Object.keys(form).forEach(k => { if (form[k] !== null) fd.append(k, form[k]) })
    try {
      if (editId) {
        await API.put(`/banners/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } })
        showToast("Banner updated!")
      } else {
        await API.post("/banners", fd, { headers: { "Content-Type": "multipart/form-data" } })
        showToast("Banner created!")
      }
      resetForm(); fetchBanners()
    } catch (err) {
      showToast("Operation failed.", false)
    }
  }

  const resetForm = () => {
    setEditId(null); setForm(INIT); setPreview(null); setShowForm(false)
  }

  const handleEdit = (b) => {
    setEditId(b.id)
    setForm({ title: b.title||"", subtitle: b.subtitle||"", buttonText: b.buttonText||"", backgroundColor: b.backgroundColor||"#1ca7c9", position: b.position||"hero", image: null })
    setPreview(b.image ? `${BASE_URL}${b.image}` : null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/banners/${deleteId}`)
      setBanners(prev => prev.filter(b => b.id !== deleteId))
      setDeleteId(null)
      showToast("Banner deleted.")
    } catch (err) { showToast("Error deleting.", false) }
  }

  const toggleTopSeller = async (b) => {
    try {
      const fd = new FormData()
      fd.append("title", b.title); fd.append("subtitle", b.subtitle)
      fd.append("buttonText", b.buttonText); fd.append("backgroundColor", b.backgroundColor)
      fd.append("position", b.position === "top-seller" ? "hero" : "top-seller")
      await API.put(`/banners/${b.id}`, fd)
      fetchBanners()
      showToast(b.position === "top-seller" ? "Removed from Top Seller." : "Set as Top Seller! 🏆")
    } catch (err) { showToast("Error updating.", false) }
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
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", fontFamily: "'Lora',serif", marginBottom: "8px" }}>Delete Banner?</div>
            <div style={{ fontSize: "13px", color: "rgba(232,228,240,0.4)", marginBottom: "26px", lineHeight: 1.6 }}>This will permanently remove the banner.</div>
            <div style={{ display: "flex", gap: "12px" }}>
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
          <div style={S.eyebrow}>🖼 Content</div>
          <h1 style={S.pageTitle}>Banners</h1>
        </div>
        <button style={S.addBtn(addHov)}
          onClick={() => { setShowForm(s => !s); if (editId) resetForm() }}
          onMouseEnter={() => setAddHov(true)} onMouseLeave={() => setAddHov(false)}>
          {showForm ? "✕ Close" : "+ Add Banner"}
        </button>
      </div>

      {/* Form */}
      <div style={S.formCard(showForm)}>
        <div style={S.formTopBar}>
          <div style={S.formTopTitle}>
            <span>{editId ? "✏" : "+"}</span>
            {editId ? "Edit Banner" : "Add New Banner"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={S.formBody}>

            <Field label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Banner headline" />
            <Field label="Subtitle" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Banner subtext" />
            <Field label="Button Text" name="buttonText" value={form.buttonText} onChange={handleChange} placeholder="e.g. Shop Now" />

            {/* Background Color */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Background Color</label>
              <div style={S.colorRow}>
                <div style={S.colorSwatch(form.backgroundColor)} />
                <input type="color" name="backgroundColor" value={form.backgroundColor}
                  onChange={handleChange} style={S.colorInput} />
              </div>
            </div>

            {/* Position */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Position</label>
              <select name="position" value={form.position} onChange={handleChange} style={S.select}>
                {POSITIONS.filter(p => p.value !== "top-seller").map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Image upload */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Banner Image</label>
              <div style={S.imgUploadWrap}>
                {preview && <img src={preview} alt="preview" style={S.previewImg} />}
                <div>
                  <input type="file" onChange={handleImageChange}
                    style={{ color:"rgba(232,228,240,0.5)", fontSize:"13px", background:"transparent", border:"none", outline:"none" }} />
                  {!preview && <div style={{ fontSize:"12px", color:"rgba(232,228,240,0.25)", marginTop:"4px" }}>PNG, JPG recommended</div>}
                </div>
              </div>
            </div>

            <div style={S.formBtns}>
              <button type="submit" style={S.submitBtn(subHov)}
                onMouseEnter={() => setSubHov(true)} onMouseLeave={() => setSubHov(false)}>
                {editId ? "✓ Update Banner" : "+ Create Banner"}
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

      {/* Banner Cards Grid */}
      {banners.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(232,228,240,0.25)", marginBottom: "16px" }}>
            BANNER PREVIEWS
          </div>
          <div style={S.bannersGrid}>
            {banners.map((b, i) => {
              const cfg = posConfig(b.position)
              const isTop = b.position === "top-seller"
              return (
                <BannerCardPreview key={b.id} b={b} cfg={cfg} isTop={isTop}
                  vis={vis} index={i}
                  onEdit={handleEdit}
                  onDelete={() => setDeleteId(b.id)}
                  onToggle={toggleTopSeller}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ ...S.tableCard, opacity: vis?1:0, transition:"all 0.5s ease 0.2s" }}>
        <div style={S.tableTopBar}>
          <div style={S.tableTitle}>All Banners</div>
          <span style={S.countBadge}>{banners.length} banners</span>
        </div>

        {banners.length === 0 ? (
          <div style={S.center}>
            <div style={{ fontSize:"44px", marginBottom:"12px" }}>🖼</div>
            <div style={{ fontSize:"15px", fontWeight:"700" }}>No banners yet</div>
          </div>
        ) : (
          <>
            <div style={S.tableHeader}>
              <span>Image</span><span>Title</span><span>Position</span><span>Actions</span>
            </div>
            {banners.map((b, i) => (
              <BannerRow key={b.id} b={b} index={i} vis={vis}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onToggle={toggleTopSeller}
              />
            ))}
          </>
        )}
      </div>

    </div>
  )
}

// ── Banner preview card ───────────────────────────────────────

const BannerCardPreview = ({ b, cfg, isTop, vis, index, onEdit, onDelete, onToggle }) => {
  const [hov, setHov]   = useState(false)
  const [eh, setEh]     = useState(false)
  const [dh, setDh]     = useState(false)
  const [th, setTh]     = useState(false)

  return (
    <div style={{ ...S.bannerCard(hov), opacity: vis?1:0, transform: vis?(hov?"translateY(-3px)":"none"):"translateY(14px)", transition: `all 0.4s ease ${index * 0.06}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.bannerImgWrap}>
        {b.image
          ? <img src={`${BASE_URL}${b.image}`} alt={b.title} style={S.bannerImg(hov)} />
          : <div style={{ fontSize:"32px", opacity:0.3 }}>🖼</div>
        }
        <div style={S.colorDot(b.backgroundColor || "#1ca7c9")} />
        {isTop && (
          <div style={{ position:"absolute", top:"12px", left:"12px", background:"rgba(251,191,36,0.15)", border:"1px solid rgba(251,191,36,0.4)", color:"#fbbf24", fontSize:"10px", fontWeight:"800", padding:"3px 10px", borderRadius:"50px" }}>
            🏆 Top Seller
          </div>
        )}
      </div>
      <div style={S.bannerBody}>
        <div style={S.bannerTitle}>{b.title || "Untitled Banner"}</div>
        <div style={S.bannerSub}>{b.subtitle || "No subtitle"}</div>
        <div style={S.posBadge(cfg.color)}>{cfg.label}</div>
        <div style={S.cardActions}>
          <button style={S.editCardBtn(eh)} onClick={() => onEdit(b)}
            onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
          <button style={S.deleteCardBtn(dh)} onClick={() => onDelete(b.id)}
            onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
          <button style={S.topSellerBtn(isTop, th)} onClick={() => onToggle(b)}
            onMouseEnter={() => setTh(true)} onMouseLeave={() => setTh(false)}>
            {isTop ? "🏆 Remove" : "☆ Top Seller"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banners