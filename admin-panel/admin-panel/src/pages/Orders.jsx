import { useEffect, useState } from "react"
import API from "../services/api"

const STATUS_CONFIG = {
  pending:    { color: "#f5a623", bg: "rgba(245,166,35,0.12)",   icon: "⏳" },
  processing: { color: "#5b8dee", bg: "rgba(91,141,238,0.12)",   icon: "⚙️" },
  shipped:    { color: "#a78bfa", bg: "rgba(167,139,250,0.12)",  icon: "🚚" },
  completed:  { color: "#34d399", bg: "rgba(52,211,153,0.12)",   icon: "✓"  },
  cancelled:  { color: "#e8613a", bg: "rgba(232,97,58,0.12)",    icon: "✕"  },
}

const S = {
  page: {
    background: "linear-gradient(160deg, #0f0f18 0%, #13111e 60%, #0f1520 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
    padding: "28px",
    color: "#e8e4f0",
  },
  topRow: {
    display: "flex", alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: "28px", flexWrap: "wrap", gap: "16px",
  },
  eyebrow: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
    textTransform: "uppercase", color: "#e8613a", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(22px,3vw,32px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff",
    letterSpacing: "-0.5px", margin: 0,
  },
  refreshBtn: (hov) => ({
    padding: "10px 22px", borderRadius: "50px",
    border: `1px solid ${hov ? "#a78bfa" : "rgba(167,139,250,0.25)"}`,
    background: hov ? "rgba(167,139,250,0.12)" : "transparent",
    color: "#a78bfa", fontSize: "12px", fontWeight: "800",
    letterSpacing: "1px", cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex", alignItems: "center", gap: "8px",
  }),
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(5,1fr)",
    gap: "14px", marginBottom: "24px",
  },
  statCard: (color) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${color}30`,
    borderRadius: "18px", padding: "18px 20px", textAlign: "center",
  }),
  statNum: (color) => ({
    fontSize: "26px", fontWeight: "800",
    fontFamily: "'Lora', serif", color, lineHeight: 1, marginBottom: "4px",
  }),
  statLabel: {
    fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.35)",
  },
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
    fontSize: "14px", fontWeight: "800", color: "#fff",
    fontFamily: "'Lora', serif",
  },
  countBadge: {
    background: "rgba(232,97,58,0.12)", color: "#e8613a",
    borderRadius: "50px", padding: "4px 14px",
    fontSize: "12px", fontWeight: "800",
  },
  // 8-col grid: ID | Avatar+Name | Email | Total | Payment | Status | Date | Del
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "60px 180px 1fr 90px 110px 150px 110px 50px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "60px 180px 1fr 90px 110px 150px 110px 50px",
    padding: "14px 24px", gap: "12px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  idBadge: {
    background: "rgba(232,97,58,0.12)", color: "#e8613a",
    borderRadius: "8px", padding: "4px 10px",
    fontSize: "12px", fontWeight: "800", textAlign: "center",
  },
  avatarWrap: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: (letter) => ({
    width: "34px", height: "34px", borderRadius: "50%",
    background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", fontWeight: "800", color: "#fff",
    flexShrink: 0,
    boxShadow: "0 3px 10px rgba(167,139,250,0.3)",
  }),
  userName: { fontSize: "13px", fontWeight: "700", color: "#e8e4f0" },
  emailText: { fontSize: "12px", color: "rgba(232,228,240,0.45)", fontWeight: "600" },
  amount: { fontSize: "14px", fontWeight: "800", color: "#fff" },
  payBadge: (m) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: "800",
    background: m === "cod" ? "rgba(245,166,35,0.12)" : m === "paypal" ? "rgba(91,141,238,0.12)" : "rgba(52,211,153,0.12)",
    color: m === "cod" ? "#f5a623" : m === "paypal" ? "#5b8dee" : "#34d399",
  }),
  statusSelect: (s) => ({
    padding: "6px 10px", borderRadius: "10px",
    border: `1.5px solid ${STATUS_CONFIG[s]?.color || "#888"}50`,
    background: STATUS_CONFIG[s]?.bg || "transparent",
    color: STATUS_CONFIG[s]?.color || "#888",
    fontSize: "12px", fontWeight: "800",
    cursor: "pointer", outline: "none", width: "100%",
    fontFamily: "'Nunito Sans', sans-serif",
  }),
  dateText: { fontSize: "12px", color: "rgba(232,228,240,0.45)", fontWeight: "600" },
  deleteBtn: (hov) => ({
    width: "34px", height: "34px", borderRadius: "10px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.4)",
    fontSize: "15px", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s ease",
  }),
  center: { textAlign: "center", padding: "60px 24px", color: "rgba(232,228,240,0.25)" },
  spinner: {
    width: "38px", height: "38px", borderRadius: "50%",
    border: "3px solid rgba(167,139,250,0.15)",
    borderTop: "3px solid #a78bfa",
    animation: "spin 0.9s linear infinite",
    margin: "0 auto 14px",
  },
  errorCard: {
    background: "rgba(232,97,58,0.08)", border: "1px solid rgba(232,97,58,0.2)",
    borderRadius: "14px", padding: "14px 20px",
    color: "#e8613a", fontWeight: "700", fontSize: "13px",
    marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px",
  },
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
}

// ── helpers ──────────────────────────────────────────────────

// Safely extract user name from order — handles multiple API shapes:
// order.User.name | order.user.name | order.userName | order.customerName
const getUserName = (order) =>
  order?.User?.name || order?.user?.name ||
  order?.userName || order?.customerName || "Unknown"

// Safely extract email
const getUserEmail = (order) =>
  order?.User?.email || order?.user?.email ||
  order?.userEmail || order?.email || "—"

// Avatar initials
const initials = (name) =>
  name && name !== "Unknown"
    ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?"

// ── OrderRow ─────────────────────────────────────────────────

const OrderRow = ({ order, onDelete, onUpdateStatus, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [dh, setDh] = useState(false)
  const status = order.status || "pending"
  const name = getUserName(order)
  const email = getUserEmail(order)

  return (
    <div style={{
      ...S.tableRow(hov),
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(10px)",
      transition: `all 0.4s ease ${index * 0.04}s`,
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* ID */}
      <div style={S.idBadge}>#{order.id}</div>

      {/* Customer name + avatar */}
      <div style={S.avatarWrap}>
        <div style={S.avatar()}>{initials(name)}</div>
        <span style={S.userName}>{name}</span>
      </div>

      {/* Email */}
      <div style={S.emailText}>{email}</div>

      {/* Amount */}
      <div style={S.amount}>${Number(order.totalAmount || 0).toFixed(2)}</div>

      {/* Payment */}
      <div>
        <span style={S.payBadge(order.payment)}>
          {order.payment === "cod" ? "💵 COD"
            : order.payment === "paypal" ? "🅿 PayPal"
            : "🏦 Bank"}
        </span>
      </div>

      {/* Status dropdown */}
      <select value={status} style={S.statusSelect(status)}
        onChange={e => onUpdateStatus(order.id, e.target.value)}>
        {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
          <option key={val} value={val}>
            {cfg.icon} {val.charAt(0).toUpperCase() + val.slice(1)}
          </option>
        ))}
      </select>

      {/* Date */}
      <div style={S.dateText}>
        {order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "N/A"}
      </div>

      {/* Delete */}
      <button style={S.deleteBtn(dh)} onClick={() => onDelete(order.id)}
        onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vis, setVis] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [cancelHov, setCancelHov] = useState(false)
  const [confirmHov, setConfirmHov] = useState(false)
  const [refreshHov, setRefreshHov] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: "", ok: true })

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }

  const fetchOrders = async () => {
    try {
      setLoading(true); setError(null); setVis(false)
      const res = await API.get("/orders")
      // API may return array directly or wrapped: { orders: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data?.orders || []
      setOrders(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load orders. Please try again.")
    } finally {
      setLoading(false)
      setTimeout(() => setVis(true), 80)
    }
  }

  useEffect(() => {
    fetchOrders()
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const deleteOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`)
      setOrders(prev => prev.filter(o => o.id !== id))
      setConfirmId(null)
      showToast("Order deleted successfully.")
    } catch (err) {
      console.error(err)
      showToast("Failed to delete order.", false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status })
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
      showToast(`Status updated to ${status}.`)
    } catch (err) {
      console.error(err)
      showToast("Failed to update status.", false)
    }
  }

  const countByStatus = (s) => orders.filter(o => (o.status || "pending") === s).length
  const totalRevenue = orders.reduce((a, o) => a + Number(o.totalAmount || 0), 0)

  return (
    <div style={S.page}>

      {/* Toast */}
      <div style={S.toast(toast.show, toast.ok)}>
        {toast.ok ? "✓" : "✕"} {toast.msg}
      </div>

      {/* Delete Confirm Modal */}
      {confirmId && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={{ fontSize: "40px", marginBottom: "14px" }}>🗑</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", fontFamily: "'Lora',serif", marginBottom: "8px" }}>
              Delete Order?
            </div>
            <div style={{ fontSize: "13px", color: "rgba(232,228,240,0.4)", marginBottom: "26px", lineHeight: 1.6 }}>
              This will permanently remove order <strong style={{ color: "#e8613a" }}>#{confirmId}</strong> and cannot be undone.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setConfirmId(null)}
                style={{ flex: 1, padding: "12px", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.1)", background: cancelHov ? "rgba(255,255,255,0.06)" : "transparent", color: "rgba(232,228,240,0.5)", fontSize: "13px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}>
                Cancel
              </button>
              <button onClick={() => deleteOrder(confirmId)}
                style={{ flex: 1, padding: "12px", borderRadius: "50px", border: "none", background: confirmHov ? "linear-gradient(135deg,#c0422a,#e8613a)" : "linear-gradient(135deg,#e8613a,#f0855e)", color: "#fff", fontSize: "13px", fontWeight: "800", cursor: "pointer", transition: "all 0.3s ease", boxShadow: confirmHov ? "0 8px 24px rgba(232,97,58,0.4)" : "none" }}
                onMouseEnter={() => setConfirmHov(true)} onMouseLeave={() => setConfirmHov(false)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={{ ...S.topRow, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>🛍 Commerce</div>
          <h1 style={S.pageTitle}>All Orders</h1>
        </div>
        <button style={S.refreshBtn(refreshHov)} onClick={fetchOrders}
          onMouseEnter={() => setRefreshHov(true)} onMouseLeave={() => setRefreshHov(false)}>
          ↺ Refresh
        </button>
      </div>

      {/* Stats */}
      <div style={{ ...S.statsRow, opacity: vis ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
        {[
          { label: "Total Orders", val: orders.length,                                        color: "#a78bfa" },
          { label: "Pending",      val: countByStatus("pending"),                              color: "#f5a623" },
          { label: "In Progress",  val: countByStatus("processing") + countByStatus("shipped"), color: "#5b8dee" },
          { label: "Completed",    val: countByStatus("completed"),                            color: "#34d399" },
          { label: "Revenue",      val: `$${totalRevenue.toFixed(0)}`,                         color: "#e8613a" },
        ].map((s, i) => (
          <div key={i} style={S.statCard(s.color)}>
            <div style={S.statNum(s.color)}>{s.val}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && <div style={S.errorCard}>⚠ {error}</div>}

      {/* Table */}
      <div style={{ ...S.tableCard, opacity: vis ? 1 : 0, transition: "all 0.5s ease 0.2s" }}>
        <div style={S.tableTopBar}>
          <div style={S.tableTopTitle}>Order Management</div>
          <span style={S.countBadge}>{orders.length} orders</span>
        </div>

        {loading ? (
          <div style={S.center}>
            <div style={S.spinner} />
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#a78bfa" }}>Loading orders…</div>
          </div>
        ) : orders.length === 0 ? (
          <div style={S.center}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>📦</div>
            <div style={{ fontSize: "15px", fontWeight: "700" }}>No orders yet</div>
          </div>
        ) : (
          <>
            <div style={S.tableHeader}>
              <span>ID</span>
              <span>Customer</span>
              <span>Email</span>
              <span>Total</span>
              <span>Payment</span>
              <span>Status</span>
              <span>Date</span>
              <span></span>
            </div>
            {orders.map((order, i) => (
              <OrderRow key={order.id} order={order} index={i} vis={vis}
                onDelete={(id) => setConfirmId(id)}
                onUpdateStatus={updateStatus}
              />
            ))}
          </>
        )}
      </div>

    </div>
  )
}

export default Orders