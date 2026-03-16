import { useEffect, useState } from "react"
import API from "../services/api"

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
    background: hov ? "linear-gradient(135deg,#0284c7,#38bdf8)" : "linear-gradient(135deg,#38bdf8,#7dd3fc)",
    color: "#0f0f18", fontSize: "13px", fontWeight: "800",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(56,189,248,0.4)" : "0 4px 16px rgba(56,189,248,0.2)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  // Filter bar
  filterBar: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "18px", padding: "18px 22px",
    marginBottom: "22px",
    display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap",
  },
  searchWrap: { position: "relative", flex: "1", minWidth: "180px" },
  searchIcon: {
    position: "absolute", left: "13px", top: "50%",
    transform: "translateY(-50%)", fontSize: "13px",
    color: "rgba(232,228,240,0.3)", pointerEvents: "none",
  },
  searchInput: (focus) => ({
    width: "100%", padding: "11px 14px 11px 38px",
    borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "13px",
    fontFamily: "'Nunito Sans', sans-serif", outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(56,189,248,0.1)" : "none",
    transition: "all 0.25s ease",
  }),
  filterSelect: {
    padding: "11px 14px", borderRadius: "12px",
    border: "1.5px solid rgba(255,255,255,0.08)",
    background: "#1a1826", color: "#e8e4f0", fontSize: "13px",
    fontFamily: "'Nunito Sans', sans-serif", outline: "none", cursor: "pointer",
    minWidth: "140px",
  },
  // Stats
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(3,1fr)",
    gap: "14px", marginBottom: "22px",
  },
  statCard: (color) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${color}30`,
    borderRadius: "16px", padding: "16px 20px",
    display: "flex", alignItems: "center", gap: "14px",
  }),
  statIcon: (color) => ({
    width: "40px", height: "40px", borderRadius: "11px",
    background: `${color}18`, border: `1px solid ${color}25`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", flexShrink: 0,
  }),
  statNum: (color) => ({
    fontSize: "24px", fontWeight: "800",
    fontFamily: "'Lora', serif", color, lineHeight: 1, marginBottom: "2px",
  }),
  statLabel: {
    fontSize: "10px", fontWeight: "700",
    color: "rgba(232,228,240,0.35)", letterSpacing: "0.3px",
  },
  // Table
  tableCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "22px", overflow: "hidden",
  },
  tableTopBar: {
    padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  tableTopTitle: {
    fontSize: "14px", fontWeight: "800", color: "#fff", fontFamily: "'Lora', serif",
  },
  countBadge: {
    background: "rgba(56,189,248,0.12)", color: "#38bdf8",
    borderRadius: "50px", padding: "4px 14px", fontSize: "12px", fontWeight: "800",
  },
  // # | Name | Slug | Status | Created | Actions
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "44px 1fr 1fr 100px 110px 150px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "44px 1fr 1fr 100px 110px 150px",
    padding: "14px 24px", gap: "12px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  indexNum: {
    fontSize: "12px", fontWeight: "800", color: "rgba(232,228,240,0.3)",
    textAlign: "center",
  },
  nameText: { fontSize: "13px", fontWeight: "700", color: "#e8e4f0" },
  slugText: {
    fontSize: "11px", fontWeight: "600",
    color: "rgba(232,228,240,0.35)", fontFamily: "monospace",
  },
  statusBadge: (active, hov) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "5px 12px", borderRadius: "50px",
    background: active ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.06)",
    color: active ? "#34d399" : "rgba(232,228,240,0.3)",
    fontSize: "11px", fontWeight: "800",
    border: `1px solid ${active ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`,
    cursor: "pointer",
    boxShadow: hov ? (active ? "0 4px 14px rgba(52,211,153,0.2)" : "0 4px 14px rgba(0,0,0,0.2)") : "none",
    transform: hov ? "scale(1.04)" : "none",
    transition: "all 0.2s ease",
  }),
  dateText: { fontSize: "12px", color: "rgba(232,228,240,0.35)", fontWeight: "600" },
  actionBtns: { display: "flex", gap: "7px" },
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
  spinner: {
    width: "36px", height: "36px", borderRadius: "50%",
    border: "3px solid rgba(56,189,248,0.15)",
    borderTop: "3px solid #38bdf8",
    animation: "spin 0.9s linear infinite", margin: "0 auto 14px",
  },
  // Pagination
  pagination: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", padding: "20px 24px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    flexWrap: "wrap",
  },
  pageBtn: (active, hov) => ({
    minWidth: "38px", height: "38px", padding: "0 10px",
    borderRadius: "10px",
    border: `1.5px solid ${active ? "#38bdf8" : hov ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.08)"}`,
    background: active ? "linear-gradient(135deg,#0284c7,#38bdf8)" : hov ? "rgba(56,189,248,0.08)" : "transparent",
    color: active ? "#fff" : hov ? "#38bdf8" : "rgba(232,228,240,0.5)",
    fontSize: "13px", fontWeight: "700",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: active ? "0 4px 16px rgba(56,189,248,0.3)" : "none",
    transition: "all 0.2s ease",
  }),
  // Modal overlay
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
    zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#1a1826", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px", padding: "36px",
    maxWidth: "420px", width: "90%",
    boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
  },
  modalTitle: {
    fontSize: "18px", fontWeight: "800", color: "#fff",
    fontFamily: "'Lora', serif", marginBottom: "24px",
    display: "flex", alignItems: "center", gap: "10px",
  },
  modalLabel: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.35)",
    display: "block", marginBottom: "7px",
  },
  modalInput: (focus) => ({
    width: "100%", padding: "12px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif", outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(56,189,248,0.1)" : "none",
    transition: "all 0.25s ease", marginBottom: "20px",
  }),
  toggleRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 16px", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    marginBottom: "24px",
  },
  toggleLabel: {
    fontSize: "13px", fontWeight: "700", color: "rgba(232,228,240,0.7)",
  },
  toggle: (on) => ({
    width: "44px", height: "24px", borderRadius: "50px",
    background: on ? "linear-gradient(135deg,#34d399,#059669)" : "rgba(255,255,255,0.1)",
    position: "relative", cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none", outline: "none",
    boxShadow: on ? "0 3px 10px rgba(52,211,153,0.4)" : "none",
  }),
  toggleThumb: (on) => ({
    position: "absolute", top: "3px",
    left: on ? "23px" : "3px",
    width: "18px", height: "18px", borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  saveBtn: (hov) => ({
    flex: 1, padding: "12px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#0284c7,#38bdf8)" : "linear-gradient(135deg,#38bdf8,#7dd3fc)",
    color: "#0f0f18", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.3s ease",
    boxShadow: hov ? "0 8px 24px rgba(56,189,248,0.4)" : "none",
  }),
  cancelBtn: (hov) => ({
    flex: 1, padding: "12px", borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: hov ? "rgba(255,255,255,0.06)" : "transparent",
    color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.2s ease",
  }),
  confirmBtn: (hov) => ({
    flex: 1, padding: "12px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#c0422a,#e8613a)" : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.3s ease",
    boxShadow: hov ? "0 8px 24px rgba(232,97,58,0.4)" : "none",
  }),
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

// ── PageBtn ───────────────────────────────────────────────────
const PageBtn = ({ label, onClick, active, disabled }) => {
  const [hov, setHov] = useState(false)
  if (disabled) return null
  return (
    <button style={S.pageBtn(active, hov)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </button>
  )
}

// ── StatusBadge ───────────────────────────────────────────────
const StatusBadge = ({ active, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <span style={S.statusBadge(active, hov)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontSize: "8px" }}>●</span>
      {active ? "Active" : "Inactive"}
    </span>
  )
}

// ── CategoryRow ───────────────────────────────────────────────
const CategoryRow = ({ cat, index, onEdit, onDelete, onToggle, vis }) => {
  const [hov, setHov] = useState(false)
  const [eh, setEh]   = useState(false)
  const [dh, setDh]   = useState(false)

  return (
    <div style={{ ...S.tableRow(hov), opacity: vis?1:0, transform: vis?"none":"translateY(10px)", transition: `all 0.4s ease ${index * 0.04}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.indexNum}>{index + 1}</div>
      <div style={S.nameText}>{cat.name}</div>
      <div style={S.slugText}>{cat.slug || "—"}</div>
      <StatusBadge active={cat.status} onClick={() => onToggle(cat)} />
      <div style={S.dateText}>
        {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : "—"}
      </div>
      <div style={S.actionBtns}>
        <button style={S.editBtn(eh)} onClick={() => onEdit(cat)}
          onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
        <button style={S.deleteBtn(dh)} onClick={() => onDelete(cat.id)}
          onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────

const Categories = () => {
  const [categories,   setCategories]   = useState([])
  const [search,       setSearch]       = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page,         setPage]         = useState(1)
  const [totalPages,   setTotalPages]   = useState(1)
  const [loading,      setLoading]      = useState(true)
  const [vis,          setVis]          = useState(false)
  const [showModal,    setShowModal]    = useState(false)
  const [editingCat,   setEditingCat]   = useState(null)
  const [deleteId,     setDeleteId]     = useState(null)
  const [searchFocus,  setSearchFocus]  = useState(false)
  const [toast,        setToast]        = useState({ show: false, msg: "", ok: true })
  const [saveHov,      setSaveHov]      = useState(false)
  const [cancelHov,    setCancelHov]    = useState(false)
  const [cmHov,        setCmHov]        = useState(false)
  const [cdHov,        setCdHov]        = useState(false)
  const [addHov,       setAddHov]       = useState(false)
  const [nameFocus,    setNameFocus]    = useState(false)

  const [formData, setFormData] = useState({ name: "", status: true })

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await API.get("/categories", {
        params: { page, limit: 10, search, status: statusFilter }
      })
      const data = res.data
      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories); setTotalPages(data.totalPages || 1)
      } else if (Array.isArray(data)) {
        setCategories(data); setTotalPages(1)
      } else {
        setCategories([]); setTotalPages(1)
      }
    } catch (err) {
      console.error(err); setCategories([])
    } finally {
      setLoading(false)
      setTimeout(() => setVis(true), 80)
    }
  }

  useEffect(() => { fetchCategories() }, [page, search, statusFilter])

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"; document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const openAdd = () => {
    setEditingCat(null)
    setFormData({ name: "", status: true })
    setShowModal(true)
  }

  const handleEdit = (cat) => {
    setEditingCat(cat)
    setFormData({ name: cat.name || "", status: cat.status ?? true })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) { showToast("Category name is required.", false); return }
    try {
      if (editingCat) {
        await API.put(`/categories/${editingCat.id}`, formData)
        showToast("Category updated!")
      } else {
        await API.post("/categories", formData)
        showToast("Category created!")
      }
      setShowModal(false); setEditingCat(null)
      setFormData({ name: "", status: true }); fetchCategories()
    } catch (err) {
      showToast(err.response?.data?.message || "Operation failed.", false)
    }
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/categories/${deleteId}`)
      setCategories(prev => prev.filter(c => c.id !== deleteId))
      setDeleteId(null); showToast("Category deleted.")
    } catch (err) { showToast("Error deleting.", false) }
  }

  const toggleStatus = async (cat) => {
    try {
      await API.patch(`/categories/${cat.id}/status`, { status: !cat.status })
      setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, status: !c.status } : c))
      showToast(`Marked as ${!cat.status ? "Active" : "Inactive"}.`)
    } catch (err) { showToast("Error updating status.", false) }
  }

  const activeCount   = categories.filter(c => c.status).length
  const inactiveCount = categories.filter(c => !c.status).length

  return (
    <div style={S.page}>

      {/* Toast */}
      <div style={S.toast(toast.show, toast.ok)}>
        {toast.ok ? "✓" : "✕"} {toast.msg}
      </div>

      {/* ── Add / Edit Modal ──────────────────────────────── */}
      {showModal && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalTitle}>
              <span>{editingCat ? "✏" : "+"}</span>
              {editingCat ? "Edit Category" : "Add Category"}
            </div>

            <label style={S.modalLabel}>Category Name</label>
            <input
              value={formData.name}
              onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Electronics"
              style={S.modalInput(nameFocus)}
              onFocus={() => setNameFocus(true)} onBlur={() => setNameFocus(false)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              autoFocus
            />

            <div style={S.toggleRow}>
              <span style={S.toggleLabel}>Status — {formData.status ? "Active" : "Inactive"}</span>
              <button style={S.toggle(formData.status)} onClick={() => setFormData(f => ({ ...f, status: !f.status }))}>
                <div style={S.toggleThumb(formData.status)} />
              </button>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={S.cancelBtn(cancelHov)} onClick={() => setShowModal(false)}
                onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}>
                Cancel
              </button>
              <button style={S.saveBtn(saveHov)} onClick={handleSubmit}
                onMouseEnter={() => setSaveHov(true)} onMouseLeave={() => setSaveHov(false)}>
                {editingCat ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ───────────────────────────────────── */}
      {deleteId && (
        <div style={S.overlay}>
          <div style={{ ...S.modal, textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "14px" }}>🗑</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", fontFamily: "'Lora',serif", marginBottom: "8px" }}>
              Delete Category?
            </div>
            <div style={{ fontSize: "13px", color: "rgba(232,228,240,0.4)", marginBottom: "26px", lineHeight: 1.6 }}>
              This will permanently remove the category and cannot be undone.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button style={S.cancelBtn(cmHov)} onClick={() => setDeleteId(null)}
                onMouseEnter={() => setCmHov(true)} onMouseLeave={() => setCmHov(false)}>Cancel</button>
              <button style={S.confirmBtn(cdHov)} onClick={handleDelete}
                onMouseEnter={() => setCdHov(true)} onMouseLeave={() => setCdHov(false)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────── */}
      <div style={{ ...S.topRow, opacity: vis?1:0, transform: vis?"none":"translateY(16px)", transition: "all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>📂 Content</div>
          <h1 style={S.pageTitle}>Categories</h1>
        </div>
        <button style={S.addBtn(addHov)} onClick={openAdd}
          onMouseEnter={() => setAddHov(true)} onMouseLeave={() => setAddHov(false)}>
          + Add Category
        </button>
      </div>

      {/* ── Stats ─────────────────────────────────────────── */}
      <div style={{ ...S.statsRow, opacity: vis?1:0, transition: "all 0.5s ease 0.08s" }}>
        {[
          { label: "Total",    val: categories.length, icon: "📂", color: "#38bdf8" },
          { label: "Active",   val: activeCount,       icon: "✓",  color: "#34d399" },
          { label: "Inactive", val: inactiveCount,     icon: "○",  color: "#f5a623" },
        ].map((s, i) => (
          <div key={i} style={S.statCard(s.color)}>
            <div style={S.statIcon(s.color)}>{s.icon}</div>
            <div>
              <div style={S.statNum(s.color)}>{s.val}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter bar ───────────────────────────────────── */}
      <div style={{ ...S.filterBar, opacity: vis?1:0, transition: "all 0.5s ease 0.12s" }}>
        <div style={S.searchWrap}>
          <span style={S.searchIcon}>🔍</span>
          <input placeholder="Search categories…" value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            style={S.searchInput(searchFocus)}
            onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }} style={S.filterSelect}>
          <option value="">All Status</option>
          <option value="true">✓ Active</option>
          <option value="false">○ Inactive</option>
        </select>
      </div>

      {/* ── Table ────────────────────────────────────────── */}
      <div style={{ ...S.tableCard, opacity: vis?1:0, transition: "all 0.5s ease 0.18s" }}>
        <div style={S.tableTopBar}>
          <div style={S.tableTopTitle}>All Categories</div>
          <span style={S.countBadge}>{categories.length} found</span>
        </div>

        {loading ? (
          <div style={S.center}>
            <div style={S.spinner} />
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#38bdf8" }}>Loading…</div>
          </div>
        ) : categories.length === 0 ? (
          <div style={S.center}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>📂</div>
            <div style={{ fontSize: "15px", fontWeight: "700" }}>No categories found</div>
          </div>
        ) : (
          <>
            <div style={S.tableHeader}>
              <span>#</span><span>Name</span><span>Slug</span>
              <span>Status</span><span>Created</span><span>Actions</span>
            </div>
            {categories.map((cat, i) => (
              <CategoryRow key={cat.id} cat={cat} index={i} vis={vis}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onToggle={toggleStatus}
              />
            ))}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={S.pagination}>
            <PageBtn label="← Prev" onClick={() => setPage(p => p - 1)} disabled={page === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <PageBtn key={i} label={i + 1} onClick={() => setPage(i + 1)} active={page === i + 1} />
            ))}
            <PageBtn label="Next →" onClick={() => setPage(p => p + 1)} disabled={page === totalPages} />
          </div>
        )}
      </div>

    </div>
  )
}

export default Categories