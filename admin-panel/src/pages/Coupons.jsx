import { useEffect, useState } from "react"
import API from "../services/api"

const DISCOUNT_TYPES = [
  { value: "percentage", label: "Percentage %",  color: "#a78bfa", icon: "%" },
  { value: "fixed",      label: "Fixed Amount $", color: "#34d399", icon: "$" },
]

const STATUS_CONFIG = {
  active:   { color: "#34d399", bg: "rgba(52,211,153,0.12)",  label: "Active"   },
  inactive: { color: "#f5a623", bg: "rgba(245,166,35,0.12)",  label: "Inactive" },
  expired:  { color: "#e8613a", bg: "rgba(232,97,58,0.12)",   label: "Expired"  },
}

const getStatus = (coupon) => {
  if (!coupon.isActive) return "inactive"
  if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) return "expired"
  return "active"
}

const INIT = {
  code: "", discountType: "percentage", discountValue: "",
  minOrderAmount: "", maxUses: "", expiryDate: "", isActive: true,
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
    textTransform: "uppercase", color: "#c084fc", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(22px,3vw,32px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff", letterSpacing: "-0.5px", margin: 0,
  },
  addBtn: (hov) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "11px 22px", borderRadius: "50px", border: "none",
    background: hov
      ? "linear-gradient(135deg,#9333ea,#c084fc)"
      : "linear-gradient(135deg,#c084fc,#d8b4fe)",
    color: "#fff", fontSize: "13px", fontWeight: "800",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(192,132,252,0.45)" : "0 4px 16px rgba(192,132,252,0.2)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  // Stats
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
    gap: "14px", marginBottom: "24px",
  },
  statCard: (color) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${color}30`,
    borderRadius: "16px", padding: "16px 20px",
    display: "flex", alignItems: "center", gap: "14px",
  }),
  statIcon: (color) => ({
    width: "42px", height: "42px", borderRadius: "12px",
    background: `${color}18`, border: `1px solid ${color}25`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", flexShrink: 0,
  }),
  statNum: (color) => ({
    fontSize: "24px", fontWeight: "800", fontFamily: "'Lora', serif",
    color, lineHeight: 1, marginBottom: "2px",
  }),
  statLabel: { fontSize: "11px", fontWeight: "700", color: "rgba(232,228,240,0.35)" },
  // Form card
  formCard: (open) => ({
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px", overflow: "hidden", marginBottom: "24px",
    maxHeight: open ? "900px" : "0px",
    opacity: open ? 1 : 0,
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  formTopBar: {
    background: "linear-gradient(135deg,rgba(192,132,252,0.1),rgba(192,132,252,0.03))",
    borderBottom: "1px solid rgba(192,132,252,0.12)",
    padding: "18px 28px", display: "flex", alignItems: "center",
  },
  formTopTitle: {
    fontSize: "15px", fontWeight: "800", color: "#c084fc",
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
    border: `1.5px solid ${focus ? "rgba(192,132,252,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(192,132,252,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px", fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(192,132,252,0.1)" : "none",
    transition: "all 0.25s ease", width: "100%",
  }),
  select: {
    padding: "12px 14px", borderRadius: "12px",
    border: "1.5px solid rgba(255,255,255,0.08)",
    background: "#1a1826", color: "#e8e4f0", fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    outline: "none", cursor: "pointer", width: "100%",
  },
  // Discount type toggles
  typeRow: {
    display: "flex", gap: "10px",
  },
  typeBtn: (active, color) => ({
    flex: 1, padding: "11px 14px", borderRadius: "12px",
    border: `1.5px solid ${active ? `${color}50` : "rgba(255,255,255,0.08)"}`,
    background: active ? `${color}12` : "rgba(255,255,255,0.03)",
    color: active ? color : "rgba(232,228,240,0.35)",
    fontSize: "12px", fontWeight: "800", cursor: "pointer",
    transition: "all 0.25s ease", textAlign: "center",
    boxShadow: active ? `0 4px 14px ${color}20` : "none",
  }),
  // Toggle switch
  toggleRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 14px", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
  },
  toggleLabel: { fontSize: "13px", fontWeight: "700", color: "rgba(232,228,240,0.6)" },
  toggle: (on) => ({
    width: "44px", height: "24px", borderRadius: "50px",
    background: on ? "linear-gradient(135deg,#34d399,#059669)" : "rgba(255,255,255,0.1)",
    position: "relative", cursor: "pointer",
    transition: "all 0.3s ease", border: "none", outline: "none",
    boxShadow: on ? "0 3px 10px rgba(52,211,153,0.4)" : "none",
    flexShrink: 0,
  }),
  toggleThumb: (on) => ({
    position: "absolute", top: "3px",
    left: on ? "23px" : "3px",
    width: "18px", height: "18px", borderRadius: "50%",
    background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  formBtns: {
    gridColumn: "1 / -1", display: "flex", gap: "12px", paddingTop: "4px",
  },
  submitBtn: (hov) => ({
    padding: "13px 28px", borderRadius: "50px", border: "none",
    background: hov
      ? "linear-gradient(135deg,#9333ea,#c084fc)"
      : "linear-gradient(135deg,#c084fc,#d8b4fe)",
    color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(192,132,252,0.4)" : "0 4px 14px rgba(192,132,252,0.2)",
    transform: hov ? "translateY(-1px)" : "none", transition: "all 0.3s ease",
  }),
  cancelBtn: (hov) => ({
    padding: "13px 24px", borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: hov ? "rgba(255,255,255,0.06)" : "transparent",
    color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.25s ease",
  }),
  // Coupon cards grid
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "18px", marginBottom: "28px",
  },
  couponCard: (hov, color) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${hov ? `${color}30` : "rgba(255,255,255,0.07)"}`,
    borderRadius: "20px", overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    transform: hov ? "translateY(-4px)" : "none",
    boxShadow: hov ? `0 16px 40px ${color}12` : "none",
    position: "relative",
  }),
  couponTop: (color) => ({
    background: `linear-gradient(135deg, ${color}18, ${color}08)`,
    borderBottom: `1px solid ${color}20`,
    padding: "20px 22px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  }),
  couponCodeWrap: { display: "flex", alignItems: "center", gap: "10px" },
  couponCode: (color) => ({
    fontSize: "18px", fontWeight: "800", color,
    fontFamily: "'Lora', serif", letterSpacing: "1px",
  }),
  copyBtn: (hov, color) => ({
    padding: "4px 10px", borderRadius: "8px",
    border: `1px solid ${hov ? `${color}60` : `${color}25`}`,
    background: hov ? `${color}20` : "transparent",
    color: hov ? color : `${color}80`,
    fontSize: "10px", fontWeight: "800", cursor: "pointer",
    letterSpacing: "0.5px", transition: "all 0.2s ease",
  }),
  discountBig: (color) => ({
    fontSize: "28px", fontWeight: "800",
    fontFamily: "'Lora', serif", color,
    lineHeight: 1,
  }),
  discountSub: (color) => ({
    fontSize: "10px", fontWeight: "700", color: `${color}80`,
    letterSpacing: "1px", textTransform: "uppercase",
  }),
  couponBody: { padding: "16px 22px" },
  couponMeta: { display: "flex", flexDirection: "column", gap: "7px", marginBottom: "14px" },
  metaRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  metaLabel: { fontSize: "11px", fontWeight: "600", color: "rgba(232,228,240,0.3)" },
  metaVal: { fontSize: "12px", fontWeight: "700", color: "rgba(232,228,240,0.65)" },
  statusBadge: (status) => ({
    display: "inline-flex", alignItems: "center", gap: "4px",
    padding: "4px 12px", borderRadius: "50px",
    background: STATUS_CONFIG[status]?.bg,
    color: STATUS_CONFIG[status]?.color,
    fontSize: "10px", fontWeight: "800",
    border: `1px solid ${STATUS_CONFIG[status]?.color}30`,
  }),
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
  tableTitle: { fontSize: "14px", fontWeight: "800", color: "#fff", fontFamily: "'Lora', serif" },
  countBadge: {
    background: "rgba(192,132,252,0.12)", color: "#c084fc",
    borderRadius: "50px", padding: "4px 14px", fontSize: "12px", fontWeight: "800",
  },
  // Code | Type | Value | MinOrder | MaxUses | Used | Expiry | Status | Actions
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "130px 110px 80px 100px 80px 60px 110px 90px 120px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "10px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "130px 110px 80px 100px 80px 60px 110px 90px 120px",
    padding: "13px 24px", gap: "10px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  codeChip: (color) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    background: `${color}14`, color,
    borderRadius: "9px", padding: "5px 12px",
    fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px",
    border: `1px solid ${color}30`,
    fontFamily: "monospace",
  }),
  typePill: (color) => ({
    display: "inline-flex", alignItems: "center", gap: "4px",
    background: `${color}10`, color,
    borderRadius: "8px", padding: "4px 10px",
    fontSize: "11px", fontWeight: "800",
  }),
  valText: { fontSize: "14px", fontWeight: "800", color: "#fff" },
  dimText: { fontSize: "12px", fontWeight: "600", color: "rgba(232,228,240,0.4)" },
  rowActions: { display: "flex", gap: "6px" },
  editBtn: (hov) => ({
    padding: "6px 13px", borderRadius: "9px",
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
const Field = ({ label, name, value, onChange, type = "text", placeholder }) => {
  const [f, setF] = useState(false)
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={value}
        onChange={onChange} style={S.input(f)}
        onFocus={() => setF(true)} onBlur={() => setF(false)} />
    </div>
  )
}

// ── Coupon Card ───────────────────────────────────────────────
const CouponCard = ({ coupon, onEdit, onDelete, vis, index }) => {
  const [hov,    setHov]    = useState(false)
  const [eh,     setEh]     = useState(false)
  const [dh,     setDh]     = useState(false)
  const [copyHov,setCopyHov]= useState(false)
  const [copied, setCopied] = useState(false)

  const isPercent = coupon.discountType === "percentage"
  const color     = isPercent ? "#a78bfa" : "#34d399"
  const status    = getStatus(coupon)

  const copyCode = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(coupon.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ ...S.couponCard(hov, color), opacity: vis?1:0, transform: vis?(hov?"translateY(-4px)":"none"):"translateY(14px)", transition: `all 0.4s ease ${index*0.06}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Top section */}
      <div style={S.couponTop(color)}>
        <div style={S.couponCodeWrap}>
          <div style={S.couponCode(color)}>{coupon.code}</div>
          <button style={S.copyBtn(copyHov, color)} onClick={copyCode}
            onMouseEnter={() => setCopyHov(true)} onMouseLeave={() => setCopyHov(false)}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={S.discountBig(color)}>
            {isPercent ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
          </div>
          <div style={S.discountSub(color)}>{isPercent ? "off" : "off order"}</div>
        </div>
      </div>

      {/* Body */}
      <div style={S.couponBody}>
        <div style={S.couponMeta}>
          {coupon.minOrderAmount && (
            <div style={S.metaRow}>
              <span style={S.metaLabel}>Min Order</span>
              <span style={S.metaVal}>${coupon.minOrderAmount}</span>
            </div>
          )}
          {coupon.maxUses && (
            <div style={S.metaRow}>
              <span style={S.metaLabel}>Uses</span>
              <span style={S.metaVal}>{coupon.usedCount || 0} / {coupon.maxUses}</span>
            </div>
          )}
          {coupon.expiryDate && (
            <div style={S.metaRow}>
              <span style={S.metaLabel}>Expires</span>
              <span style={S.metaVal}>{new Date(coupon.expiryDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
            </div>
          )}
          <div style={S.metaRow}>
            <span style={S.metaLabel}>Status</span>
            <span style={S.statusBadge(status)}>
              <span style={{ fontSize:"8px" }}>●</span>
              {STATUS_CONFIG[status].label}
            </span>
          </div>
        </div>

        <div style={S.cardActions}>
          <button style={S.editCardBtn(eh)} onClick={() => onEdit(coupon)}
            onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
          <button style={S.deleteCardBtn(dh)} onClick={() => onDelete(coupon.id)}
            onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
        </div>
      </div>

      {/* Decorative dashed divider (coupon style) */}
      <div style={{ position:"absolute", left:"50%", top:"calc(50% - 1px)", transform:"translateX(-50%)", width:"calc(100% - 32px)", borderTop:"1.5px dashed rgba(255,255,255,0.06)", pointerEvents:"none" }} />
    </div>
  )
}

// ── Table Row ─────────────────────────────────────────────────
const CouponRow = ({ coupon, onEdit, onDelete, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [eh,  setEh]  = useState(false)
  const [dh,  setDh]  = useState(false)
  const isPercent = coupon.discountType === "percentage"
  const color     = isPercent ? "#a78bfa" : "#34d399"
  const status    = getStatus(coupon)

  return (
    <div style={{ ...S.tableRow(hov), opacity: vis?1:0, transform: vis?"none":"translateY(10px)", transition: `all 0.4s ease ${index*0.04}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div><span style={S.codeChip(color)}>{coupon.code}</span></div>
      <div><span style={S.typePill(color)}>{isPercent ? "%" : "$"} {isPercent ? "Percent" : "Fixed"}</span></div>
      <div style={S.valText}>{isPercent ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}</div>
      <div style={S.dimText}>{coupon.minOrderAmount ? `$${coupon.minOrderAmount}` : "—"}</div>
      <div style={S.dimText}>{coupon.maxUses || "∞"}</div>
      <div style={S.dimText}>{coupon.usedCount || 0}</div>
      <div style={S.dimText}>{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}) : "—"}</div>
      <div><span style={S.statusBadge(status)}><span style={{ fontSize:"8px" }}>●</span>{STATUS_CONFIG[status].label}</span></div>
      <div style={S.rowActions}>
        <button style={S.editBtn(eh)} onClick={() => onEdit(coupon)}
          onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>Edit</button>
        <button style={S.deleteBtn(dh)} onClick={() => onDelete(coupon.id)}
          onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
const Coupons = () => {
  const [coupons,  setCoupons]  = useState([])
  const [editId,   setEditId]   = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [view,     setView]     = useState("grid")
  const [deleteId, setDeleteId] = useState(null)
  const [vis,      setVis]      = useState(false)
  const [toast,    setToast]    = useState({ show:false, msg:"", ok:true })
  const [form,     setForm]     = useState(INIT)

  // button hover states
  const [addHov, setAddHov]   = useState(false)
  const [subHov, setSubHov]   = useState(false)
  const [canHov, setCanHov]   = useState(false)
  const [cmHov,  setCmHov]    = useState(false)
  const [cdHov,  setCdHov]    = useState(false)

  const showToast = (msg, ok=true) => {
    setToast({ show:true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show:false })), 2500)
  }

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/coupons")
      setCoupons(Array.isArray(res.data) ? res.data : [])
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchCoupons()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.code.trim() || !form.discountValue) {
      showToast("Code and discount value are required.", false); return
    }
    try {
      if (editId) {
        await API.put(`/coupons/${editId}`, form)
        showToast("Coupon updated!")
      } else {
        await API.post("/coupons", form)
        showToast("Coupon created!")
      }
      resetForm(); fetchCoupons()
    } catch (err) {
      showToast(err.response?.data?.message || "Operation failed.", false)
    }
  }

  const resetForm = () => {
    setEditId(null); setShowForm(false); setForm(INIT)
  }

  const handleEdit = (coupon) => {
    setEditId(coupon.id)
    setForm({
      code:            coupon.code || "",
      discountType:    coupon.discountType || "percentage",
      discountValue:   coupon.discountValue || "",
      minOrderAmount:  coupon.minOrderAmount || "",
      maxUses:         coupon.maxUses || "",
      expiryDate:      coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "",
      isActive:        coupon.isActive ?? true,
    })
    setShowForm(true)
    window.scrollTo({ top:0, behavior:"smooth" })
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/coupons/${deleteId}`)
      setCoupons(prev => prev.filter(c => c.id !== deleteId))
      setDeleteId(null); showToast("Coupon deleted.")
    } catch (err) { showToast("Error deleting.", false) }
  }

  // Stats
  const activeCount  = coupons.filter(c => getStatus(c) === "active").length
  const expiredCount = coupons.filter(c => getStatus(c) === "expired").length
  const totalUses    = coupons.reduce((a, c) => a + (c.usedCount || 0), 0)

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
            <div style={{ fontSize:"40px", marginBottom:"14px" }}>🏷</div>
            <div style={{ fontSize:"18px", fontWeight:"800", color:"#fff", fontFamily:"'Lora',serif", marginBottom:"8px" }}>Delete Coupon?</div>
            <div style={{ fontSize:"13px", color:"rgba(232,228,240,0.4)", marginBottom:"26px", lineHeight:1.6 }}>
              This will permanently remove the coupon code.
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

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ ...S.topRow, opacity: vis?1:0, transform: vis?"none":"translateY(16px)", transition:"all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>🏷 Promotions</div>
          <h1 style={S.pageTitle}>Coupons</h1>
        </div>
        <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
          {/* View toggle */}
          <div style={{ display:"flex", background:"rgba(255,255,255,0.04)", borderRadius:"12px", border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden" }}>
            {["grid","table"].map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding:"8px 16px", border:"none", background: view===v?"rgba(192,132,252,0.15)":"transparent", color: view===v?"#c084fc":"rgba(232,228,240,0.3)", fontSize:"12px", fontWeight:"800", cursor:"pointer", transition:"all 0.2s ease" }}>
                {v === "grid" ? "⊞ Grid" : "≡ Table"}
              </button>
            ))}
          </div>
          <button style={S.addBtn(addHov)}
            onClick={() => { setShowForm(s => !s); if (editId) resetForm() }}
            onMouseEnter={() => setAddHov(true)} onMouseLeave={() => setAddHov(false)}>
            {showForm ? "✕ Close" : "+ Add Coupon"}
          </button>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <div style={{ ...S.statsRow, opacity: vis?1:0, transition:"all 0.5s ease 0.08s" }}>
        {[
          { label:"Total Coupons", val: coupons.length, icon:"🏷", color:"#c084fc" },
          { label:"Active",        val: activeCount,    icon:"✓",  color:"#34d399" },
          { label:"Expired",       val: expiredCount,   icon:"⏰", color:"#e8613a" },
          { label:"Total Uses",    val: totalUses,      icon:"🛍", color:"#f5a623" },
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

      {/* ── Form ───────────────────────────────────────────── */}
      <div style={S.formCard(showForm)}>
        <div style={S.formTopBar}>
          <div style={S.formTopTitle}>
            <span>{editId ? "✏" : "+"}</span>
            {editId ? "Edit Coupon" : "Create New Coupon"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={S.formBody}>

            <Field label="Coupon Code *" name="code" value={form.code} onChange={handleChange} placeholder="e.g. SAVE20" />
            <Field label="Discount Value *" name="discountValue" type="number" value={form.discountValue} onChange={handleChange} placeholder="e.g. 20" />
            <Field label="Min Order Amount" name="minOrderAmount" type="number" value={form.minOrderAmount} onChange={handleChange} placeholder="e.g. 50" />
            <Field label="Max Uses" name="maxUses" type="number" value={form.maxUses} onChange={handleChange} placeholder="Leave blank for unlimited" />
            <Field label="Expiry Date" name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} />

            {/* Discount Type */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Discount Type</label>
              <div style={S.typeRow}>
                {DISCOUNT_TYPES.map(dt => (
                  <button key={dt.value} type="button"
                    style={S.typeBtn(form.discountType === dt.value, dt.color)}
                    onClick={() => setForm(f => ({ ...f, discountType: dt.value }))}>
                    <div style={{ fontSize:"16px", marginBottom:"2px" }}>{dt.icon}</div>
                    <div style={{ fontSize:"11px" }}>{dt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active toggle */}
            <div style={{ ...S.fieldWrap, justifyContent:"flex-end" }}>
              <label style={S.label}>Status</label>
              <div style={S.toggleRow}>
                <span style={S.toggleLabel}>{form.isActive ? "✓ Active" : "○ Inactive"}</span>
                <button type="button" style={S.toggle(form.isActive)}
                  onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}>
                  <div style={S.toggleThumb(form.isActive)} />
                </button>
              </div>
            </div>

            <div style={S.formBtns}>
              <button type="submit" style={S.submitBtn(subHov)}
                onMouseEnter={() => setSubHov(true)} onMouseLeave={() => setSubHov(false)}>
                {editId ? "✓ Update Coupon" : "+ Create Coupon"}
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

      {/* ── Content ────────────────────────────────────────── */}
      {coupons.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 24px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"22px", color:"rgba(232,228,240,0.25)" }}>
          <div style={{ fontSize:"44px", marginBottom:"12px" }}>🏷</div>
          <div style={{ fontSize:"15px", fontWeight:"700" }}>No coupons yet</div>
          <div style={{ fontSize:"12px", marginTop:"6px" }}>Click "+ Add Coupon" to create your first discount code</div>
        </div>
      ) : view === "grid" ? (
        <div style={{ ...S.cardsGrid, opacity: vis?1:0, transition:"all 0.5s ease 0.18s" }}>
          {coupons.map((coupon, i) => (
            <CouponCard key={coupon.id} coupon={coupon} index={i} vis={vis}
              onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} />
          ))}
        </div>
      ) : (
        <div style={{ ...S.tableCard, opacity: vis?1:0, transition:"all 0.5s ease 0.18s", overflowX:"auto" }}>
          <div style={S.tableTopBar}>
            <div style={S.tableTitle}>All Coupons</div>
            <span style={S.countBadge}>{coupons.length} coupons</span>
          </div>
          <div style={{ minWidth:"900px" }}>
            <div style={S.tableHeader}>
              <span>Code</span><span>Type</span><span>Value</span><span>Min Order</span>
              <span>Max Uses</span><span>Used</span><span>Expires</span>
              <span>Status</span><span>Actions</span>
            </div>
            {coupons.map((coupon, i) => (
              <CouponRow key={coupon.id} coupon={coupon} index={i} vis={vis}
                onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Coupons