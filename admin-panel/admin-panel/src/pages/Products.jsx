import { useEffect, useState } from "react"
import API from "../services/api"

const BASE_URL = "http://localhost:5000/uploads/"

const S = {
  page: {
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#e8e4f0",
    padding: "28px",
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f0f18 0%, #13111e 60%, #0f1520 100%)",
  },
  topRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: "28px", flexWrap: "wrap", gap: "14px",
  },
  eyebrow: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
    textTransform: "uppercase", color: "#fbbf24", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(20px,3vw,30px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff", letterSpacing: "-0.4px", margin: 0,
  },
  addBtn: (hov) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 22px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#d97706,#fbbf24)" : "linear-gradient(135deg,#fbbf24,#fde68a)",
    color: "#1c1410", fontSize: "13px", fontWeight: "800",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(251,191,36,0.4)" : "0 4px 16px rgba(251,191,36,0.2)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  formCard: (open) => ({
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px", overflow: "hidden", marginBottom: "24px",
    maxHeight: open ? "1400px" : "0px",
    opacity: open ? 1 : 0,
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  formTopBar: {
    background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.03))",
    borderBottom: "1px solid rgba(251,191,36,0.1)",
    padding: "18px 28px",
    display: "flex", alignItems: "center",
  },
  formTopTitle: {
    fontSize: "15px", fontWeight: "800", color: "#fbbf24",
    fontFamily: "'Lora', serif", display: "flex", alignItems: "center", gap: "10px",
  },
  formBody: {
    padding: "28px",
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px",
  },
  fullWidth: { gridColumn: "1 / -1" },
  fieldWrap: { display: "flex", flexDirection: "column", gap: "7px" },
  label: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.35)",
  },
  input: (focus) => ({
    padding: "12px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(251,191,36,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  select: {
    padding: "12px 14px", borderRadius: "12px",
    border: "1.5px solid rgba(255,255,255,0.08)",
    background: "#1a1826", color: "#e8e4f0", fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif", outline: "none",
    cursor: "pointer", width: "100%",
  },
  toggleGrid: { gridColumn: "1 / -1", display: "flex", gap: "10px", flexWrap: "wrap" },
  toggleItem: (checked) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "9px 18px", borderRadius: "50px",
    border: `1.5px solid ${checked ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.08)"}`,
    background: checked ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.03)",
    cursor: "pointer", transition: "all 0.25s ease", userSelect: "none",
  }),
  toggleDot: (checked) => ({
    width: "14px", height: "14px", borderRadius: "50%",
    background: checked ? "#fbbf24" : "rgba(255,255,255,0.15)",
    boxShadow: checked ? "0 0 8px rgba(251,191,36,0.6)" : "none",
    transition: "all 0.25s ease", flexShrink: 0,
  }),
  toggleLabel: (checked) => ({
    fontSize: "12px", fontWeight: "800",
    color: checked ? "#fbbf24" : "rgba(232,228,240,0.4)",
    letterSpacing: "0.5px",
  }),
  imgWrap: {
    border: "2px dashed rgba(255,255,255,0.1)",
    borderRadius: "14px", padding: "18px",
    display: "flex", alignItems: "center", gap: "14px",
    background: "rgba(255,255,255,0.02)",
  },
  previewImg: {
    width: "64px", height: "64px", borderRadius: "10px",
    objectFit: "contain", background: "rgba(255,255,255,0.06)", padding: "4px", flexShrink: 0,
  },
  formBtns: { gridColumn: "1 / -1", display: "flex", gap: "12px", paddingTop: "4px" },
  submitBtn: (hov) => ({
    padding: "13px 28px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#d97706,#fbbf24)" : "linear-gradient(135deg,#fbbf24,#fde68a)",
    color: "#1c1410", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(251,191,36,0.4)" : "0 4px 14px rgba(251,191,36,0.2)",
    transform: hov ? "translateY(-1px)" : "none", transition: "all 0.3s ease",
  }),
  cancelBtn: (hov) => ({
    padding: "13px 24px", borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: hov ? "rgba(255,255,255,0.06)" : "transparent",
    color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.25s ease",
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
  tableTitle: { fontSize: "14px", fontWeight: "800", color: "#fff", fontFamily: "'Lora', serif" },
  countBadge: {
    background: "rgba(251,191,36,0.12)", color: "#fbbf24",
    borderRadius: "50px", padding: "4px 14px", fontSize: "12px", fontWeight: "800",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "64px 1.6fr 1fr 80px 70px 130px 65px 65px 170px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "10px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "64px 1.6fr 1fr 80px 70px 130px 65px 65px 170px",
    padding: "14px 24px", gap: "10px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  productImg: {
    width: "52px", height: "52px", objectFit: "contain",
    borderRadius: "10px", background: "rgba(255,255,255,0.06)", padding: "4px",
  },
  productName: { fontSize: "13px", fontWeight: "700", color: "#e8e4f0", lineHeight: 1.35 },
  catBadge: {
    display: "inline-block", background: "rgba(167,139,250,0.12)",
    color: "#a78bfa", borderRadius: "8px", padding: "3px 10px",
    fontSize: "11px", fontWeight: "800",
  },
  priceText: {
    fontSize: "14px", fontWeight: "800",
    background: "linear-gradient(135deg,#fbbf24,#fde68a)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  },
  ratingText: { fontSize: "13px", fontWeight: "700", color: "#f5a623" },
  couponText: { fontSize: "11px", fontWeight: "700", color: "#34d399" },
  yesNo: (yes) => ({
    fontSize: "11px", fontWeight: "800",
    color: yes ? "#34d399" : "rgba(232,228,240,0.2)",
  }),
  actionBtns: { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" },
  editBtn: (hov) => ({
    padding: "6px 13px", borderRadius: "8px",
    border: `1px solid ${hov ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.2)"}`,
    background: hov ? "rgba(167,139,250,0.15)" : "transparent",
    color: hov ? "#a78bfa" : "rgba(167,139,250,0.5)",
    fontSize: "11px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease",
  }),
  deleteBtn: (hov) => ({
    padding: "6px 10px", borderRadius: "8px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.4)",
    fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  topBtn: (isTop, hov) => ({
    padding: "6px 10px", borderRadius: "8px",
    border: `1px solid ${isTop ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.1)"}`,
    background: isTop ? "rgba(251,191,36,0.12)" : "transparent",
    color: isTop ? "#fbbf24" : "rgba(232,228,240,0.25)",
    fontSize: "14px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  empty: { textAlign: "center", padding: "60px 24px", color: "rgba(232,228,240,0.25)" },
  toast: (show, success) => ({
    position: "fixed", bottom: "32px", right: "32px",
    background: success ? "rgba(52,211,153,0.1)" : "rgba(232,97,58,0.1)",
    border: `1px solid ${success ? "rgba(52,211,153,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "14px", padding: "14px 22px",
    color: success ? "#34d399" : "#e8613a",
    fontWeight: "700", fontSize: "13px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
    zIndex: 9999, display: "flex", alignItems: "center", gap: "8px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(12px)",
    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: "none",
  }),
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
    zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#1a1826", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px", padding: "36px", maxWidth: "360px", width: "90%",
    textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
  },
}

// ─── Small reusable components ────────────────────────────────

const Field = ({ label, name, value, onChange, type = "text", placeholder, required, step }) => {
  const [focus, setFocus] = useState(false)
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>{label}</label>
      <input name={name} type={type} step={step} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        style={S.input(focus)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </div>
  )
}

const Toggle = ({ label, name, checked, onChange }) => (
  <div style={S.toggleItem(checked)}
    onClick={() => onChange({ target: { name, type: "checkbox", checked: !checked } })}>
    <div style={S.toggleDot(checked)} />
    <span style={S.toggleLabel(checked)}>{label}</span>
  </div>
)

const Row = ({ p, getCategoryName, getCouponInfo, onEdit, onDelete, onToggleTop, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [eh, setEh] = useState(false)
  const [dh, setDh] = useState(false)
  const [th, setTh] = useState(false)
  return (
    <div style={{ ...S.tableRow(hov), opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: `all 0.4s ease ${index * 0.04}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {p.image
        ? <img src={`${BASE_URL}${p.image}`} alt="" style={S.productImg} />
        : <div style={{ ...S.productImg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>📦</div>
      }
      <div style={S.productName}>{p.title}</div>
      <div><span style={S.catBadge}>{getCategoryName(p.CategoryId)}</span></div>
      <div style={S.priceText}>${p.price}</div>
      <div style={S.ratingText}>{p.rating ? `★ ${p.rating}` : "—"}</div>
      <div style={S.couponText}>{getCouponInfo(p.couponId)}</div>
      <div style={S.yesNo(p.isTopDeal)}>{p.isTopDeal ? "✓ Yes" : "No"}</div>
      <div style={S.yesNo(p.shopInShop)}>{p.shopInShop ? "✓ Yes" : "No"}</div>
      <div style={S.actionBtns}>
        <button style={S.editBtn(eh)} onClick={() => onEdit(p)}
          onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
        <button style={S.deleteBtn(dh)} onClick={() => onDelete(p.id)}
          onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
        <button style={S.topBtn(p.isTopDeal, th)} onClick={() => onToggleTop(p)}
          title={p.isTopDeal ? "Remove Top Seller" : "Add Top Seller"}
          onMouseEnter={() => setTh(true)} onMouseLeave={() => setTh(false)}>
          {p.isTopDeal ? "⭐" : "☆"}
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [coupons, setCoupons] = useState([])
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [vis, setVis] = useState(false)
  const [preview, setPreview] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [toast, setToast] = useState({ show: false, msg: "", ok: true })
  const [addHov, setAddHov] = useState(false)
  const [subHov, setSubHov] = useState(false)
  const [canHov, setCanHov] = useState(false)
  const [cmHov, setCmHov] = useState(false)
  const [cdHov, setCdHov] = useState(false)

  const [form, setForm] = useState({
    title: "", price: "", description: "", rating: "",
    CategoryId: "", isTopDeal: false, isPopular: false,
    isNew: false, shopInShop: false, couponId: "", image: null
  })

  useEffect(() => {
    fetchAll()
    setTimeout(() => setVis(true), 80)
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const fetchAll = async () => {
    try {
      const [p, c, co] = await Promise.all([API.get("/products"), API.get("/categories"), API.get("/coupons")])
      setProducts(Array.isArray(p.data) ? p.data : [])
      setCategories(Array.isArray(c.data) ? c.data : c.data?.categories || [])
      setCoupons(Array.isArray(co.data) ? co.data : [])
    } catch (err) { console.error(err) }
  }

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2800)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }))
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
    Object.keys(form).forEach(k => { if (k !== "image") fd.append(k, form[k]) })
    if (form.image) fd.append("image", form.image)
    try {
      if (editId) {
        await API.put(`/products/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } })
        showToast("Product updated!")
      } else {
        await API.post("/products", fd, { headers: { "Content-Type": "multipart/form-data" } })
        showToast("Product created!")
      }
      resetForm(); fetchAll()
    } catch (err) {
      showToast(err.response?.data?.message || "Operation failed.", false)
    }
  }

  const resetForm = () => {
    setEditId(null); setShowForm(false); setPreview(null)
    setForm({ title: "", price: "", description: "", rating: "", CategoryId: "", isTopDeal: false, isPopular: false, isNew: false, shopInShop: false, couponId: "", image: null })
  }

  const handleEdit = (p) => {
    setEditId(p.id)
    setForm({ title: p.title || "", price: p.price || "", description: p.description || "", rating: p.rating || "", CategoryId: p.CategoryId || "", isTopDeal: !!p.isTopDeal, isPopular: !!p.isPopular, isNew: !!p.isNew, shopInShop: !!p.shopInShop, couponId: p.couponId || "", image: null })
    if (p.image) setPreview(`${BASE_URL}${p.image}`)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/products/${deleteId}`)
      setProducts(prev => prev.filter(p => p.id !== deleteId))
      setDeleteId(null); showToast("Product deleted.")
    } catch { showToast("Error deleting product.", false) }
  }

  const toggleTopSeller = async (p) => {
    try {
      const fd = new FormData()
      fd.append("title", p.title); fd.append("price", p.price)
      fd.append("description", p.description); fd.append("rating", p.rating)
      fd.append("CategoryId", p.CategoryId); fd.append("couponId", p.couponId || "")
      fd.append("isTopDeal", !p.isTopDeal); fd.append("isPopular", p.isPopular)
      fd.append("isNew", p.isNew); fd.append("shopInShop", p.shopInShop)
      await API.put(`/products/${p.id}`, fd)
      fetchAll()
      showToast(p.isTopDeal ? "Removed from Top Sellers." : "Added to Top Sellers! ⭐")
    } catch { showToast("Error updating product.", false) }
  }

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || "—"
  const getCouponInfo = (id) => {
    const c = coupons.find(c => c.id === parseInt(id))
    return c ? `${c.code} (${c.discountValue}${c.discountType === "percentage" ? "%" : "$"})` : "—"
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
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", fontFamily: "'Lora',serif", marginBottom: "8px" }}>Delete Product?</div>
            <div style={{ fontSize: "13px", color: "rgba(232,228,240,0.4)", marginBottom: "26px", lineHeight: 1.6 }}>
              This will permanently remove the product and cannot be undone.
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

      {/* Page Header */}
      <div style={{ ...S.topRow, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>📦 Inventory</div>
          <h1 style={S.pageTitle}>Products</h1>
        </div>
        <button style={S.addBtn(addHov)}
          onClick={() => { setShowForm(s => !s); if (editId) resetForm() }}
          onMouseEnter={() => setAddHov(true)} onMouseLeave={() => setAddHov(false)}>
          {showForm ? "✕ Close" : "+ Add Product"}
        </button>
      </div>

      {/* Form */}
      <div style={S.formCard(showForm)}>
        <div style={S.formTopBar}>
          <div style={S.formTopTitle}>
            <span>{editId ? "✏" : "+"}</span>
            {editId ? "Edit Product" : "Add New Product"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={S.formBody}>

            <Field label="Product Title *" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Nike Air Max" required />
            <Field label="Price *" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
            <Field label="Rating" name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="4.5" />

            <div style={S.fieldWrap}>
              <label style={S.label}>Category *</label>
              <select name="CategoryId" value={form.CategoryId} onChange={handleChange} style={S.select} required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div style={S.fieldWrap}>
              <label style={S.label}>Coupon (Optional)</label>
              <select name="couponId" value={form.couponId} onChange={handleChange} style={S.select}>
                <option value="">No Coupon</option>
                {coupons.map(c => <option key={c.id} value={c.id}>{c.code} — {c.discountValue}{c.discountType === "percentage" ? "%" : "$"} OFF</option>)}
              </select>
            </div>

            <div style={S.fieldWrap}>
              <label style={S.label}>Product Image</label>
              <div style={S.imgWrap}>
                {preview && <img src={preview} alt="preview" style={S.previewImg} />}
                <div>
                  <input type="file" onChange={handleImageChange}
                    style={{ color: "rgba(232,228,240,0.5)", fontSize: "13px", background: "transparent", border: "none", outline: "none" }} />
                  {!preview && <div style={{ fontSize: "12px", color: "rgba(232,228,240,0.25)", marginTop: "4px" }}>PNG, JPG up to 5MB</div>}
                </div>
              </div>
            </div>

            <div style={{ ...S.fieldWrap, ...S.fullWidth }}>
              <label style={S.label}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Product description…"
                style={{ ...S.input(false), resize: "vertical", minHeight: "80px" }} />
            </div>

            <div style={S.toggleGrid}>
              <Toggle label="⭐ Top Deal" name="isTopDeal" checked={form.isTopDeal} onChange={handleChange} />
              <Toggle label="🛍 Show in Shop" name="shopInShop" checked={form.shopInShop} onChange={handleChange} />
              <Toggle label="🔥 Popular" name="isPopular" checked={form.isPopular} onChange={handleChange} />
              <Toggle label="✨ New Arrival" name="isNew" checked={form.isNew} onChange={handleChange} />
            </div>

            <div style={S.formBtns}>
              <button type="submit" style={S.submitBtn(subHov)}
                onMouseEnter={() => setSubHov(true)} onMouseLeave={() => setSubHov(false)}>
                {editId ? "✓ Update Product" : "+ Create Product"}
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

      {/* Table */}
      <div style={{ ...S.tableCard, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
        <div style={S.tableTopBar}>
          <div style={S.tableTitle}>All Products</div>
          <span style={S.countBadge}>{products.length} items</span>
        </div>

        {products.length === 0 ? (
          <div style={S.empty}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>📦</div>
            <div style={{ fontSize: "15px", fontWeight: "700" }}>No products yet</div>
            <div style={{ fontSize: "12px", marginTop: "6px" }}>Click "+ Add Product" to get started</div>
          </div>
        ) : (
          <>
            <div style={S.tableHeader}>
              <span>Image</span><span>Title</span><span>Category</span>
              <span>Price</span><span>Rating</span><span>Coupon</span>
              <span>Top</span><span>Shop</span><span>Actions</span>
            </div>
            {products.map((p, i) => (
              <Row key={p.id} p={p} index={i} vis={vis}
                getCategoryName={getCategoryName}
                getCouponInfo={getCouponInfo}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onToggleTop={toggleTopSeller}
              />
            ))}
          </>
        )}
      </div>

    </div>
  )
}

export default Products