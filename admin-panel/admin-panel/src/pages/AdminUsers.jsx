import { useEffect, useState } from "react"
import API from "../services/api"

const ROLE_CONFIG = {
  admin: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", icon: "👑" },
  user:  { color: "#5b8dee", bg: "rgba(91,141,238,0.12)",  icon: "👤" },
}
const AVATAR_COLORS = ["#5b8dee","#a78bfa","#e8613a","#34d399","#f5a623","#fb7185","#38bdf8"]
const avatarColor   = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length]
const initials      = (name) => name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2) : "?"

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
    textTransform: "uppercase", color: "#5b8dee", marginBottom: "4px",
  },
  pageTitle: {
    fontSize: "clamp(22px,3vw,32px)", fontWeight: "800",
    fontFamily: "'Lora', serif", color: "#fff", letterSpacing: "-0.5px", margin: 0,
  },
  refreshBtn: (hov) => ({
    display: "flex", alignItems: "center", gap: "8px",
    padding: "10px 20px", borderRadius: "50px",
    border: `1px solid ${hov ? "rgba(91,141,238,0.5)" : "rgba(91,141,238,0.25)"}`,
    background: hov ? "rgba(91,141,238,0.12)" : "transparent",
    color: "#5b8dee", fontSize: "12px", fontWeight: "800",
    letterSpacing: "0.8px", cursor: "pointer", transition: "all 0.25s ease",
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
    width: "40px", height: "40px", borderRadius: "11px",
    background: `${color}18`, border: `1px solid ${color}25`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", flexShrink: 0,
  }),
  statNum: (color) => ({
    fontSize: "24px", fontWeight: "800", fontFamily: "'Lora', serif",
    color, lineHeight: 1, marginBottom: "2px",
  }),
  statLabel: { fontSize: "10px", fontWeight: "700", color: "rgba(232,228,240,0.35)" },
  // Section title
  sectionTitle: {
    fontSize: "10px", fontWeight: "800", letterSpacing: "2.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.25)",
    marginBottom: "14px", marginTop: "32px",
    display: "flex", alignItems: "center", gap: "10px",
  },
  titleLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" },
  // Table card
  tableCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "22px", overflow: "hidden", marginBottom: "8px",
  },
  tableTopBar: {
    padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  tableTopTitle: { fontSize: "14px", fontWeight: "800", color: "#fff", fontFamily: "'Lora', serif" },
  countBadge: (color) => ({
    background: `${color}18`, color,
    borderRadius: "50px", padding: "4px 14px", fontSize: "12px", fontWeight: "800",
  }),
  // Users table — ID | Avatar+Name | Email | Role | Actions
  usersHeader: {
    display: "grid",
    gridTemplateColumns: "60px 200px 1fr 120px 80px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  usersRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "60px 200px 1fr 120px 80px",
    padding: "14px 24px", gap: "12px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  // Logs table — # | UserID | Email | Login Time | Status
  logsHeader: {
    display: "grid",
    gridTemplateColumns: "44px 80px 1fr 180px 90px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  logsRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "44px 80px 1fr 180px 90px",
    padding: "13px 24px", gap: "12px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.03)" : "transparent",
    transition: "background 0.2s ease",
  }),
  idBadge: (color) => ({
    background: `${color}18`, color,
    borderRadius: "8px", padding: "4px 10px",
    fontSize: "12px", fontWeight: "800", textAlign: "center",
  }),
  avatarWrap: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: (color) => ({
    width: "34px", height: "34px", borderRadius: "50%",
    background: `linear-gradient(135deg,${color},${color}bb)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: "800", color: "#fff",
    flexShrink: 0, boxShadow: `0 3px 10px ${color}40`,
  }),
  nameText: { fontSize: "13px", fontWeight: "700", color: "#e8e4f0" },
  emailText: { fontSize: "12px", color: "rgba(232,228,240,0.4)", fontWeight: "600" },
  roleBadge: (role) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "5px 12px", borderRadius: "50px",
    background: ROLE_CONFIG[role]?.bg || "rgba(255,255,255,0.06)",
    color: ROLE_CONFIG[role]?.color || "#e8e4f0",
    fontSize: "11px", fontWeight: "800",
    border: `1px solid ${ROLE_CONFIG[role]?.color || "#fff"}25`,
  }),
  deleteBtn: (hov) => ({
    padding: "7px 11px", borderRadius: "9px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.4)",
    fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  logIndex: { fontSize: "12px", fontWeight: "700", color: "rgba(232,228,240,0.25)", textAlign: "center" },
  logUserId: {
    background: "rgba(56,189,248,0.12)", color: "#38bdf8",
    borderRadius: "8px", padding: "3px 8px", fontSize: "11px", fontWeight: "800",
    textAlign: "center",
  },
  logEmail: { fontSize: "12px", fontWeight: "600", color: "rgba(232,228,240,0.6)" },
  logTime: { fontSize: "11px", fontWeight: "600", color: "rgba(232,228,240,0.35)" },
  onlineDot: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    fontSize: "10px", fontWeight: "800", color: "#34d399",
    background: "rgba(52,211,153,0.12)", borderRadius: "50px",
    padding: "4px 10px", border: "1px solid rgba(52,211,153,0.25)",
  },
  center: { textAlign: "center", padding: "50px 24px", color: "rgba(232,228,240,0.25)" },
  spinner: {
    width: "36px", height: "36px", borderRadius: "50%",
    border: "3px solid rgba(91,141,238,0.15)",
    borderTop: "3px solid #5b8dee",
    animation: "spin 0.9s linear infinite", margin: "0 auto 14px",
  },
  // Error card
  errorCard: (color) => ({
    background: `${color}0a`, border: `1px solid ${color}25`,
    borderRadius: "14px", padding: "14px 20px",
    color, fontWeight: "700", fontSize: "13px",
    marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px",
  }),
  // Delete modal
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

// ── UserRow ───────────────────────────────────────────────────
const UserRow = ({ user, onDelete, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [dh,  setDh]  = useState(false)
  const color = avatarColor(user.id)
  const role  = user.role || "user"
  return (
    <div style={{ ...S.usersRow(hov), opacity: vis?1:0, transform: vis?"none":"translateY(10px)", transition: `all 0.4s ease ${index*0.04}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.idBadge("#5b8dee")}>#{user.id}</div>
      <div style={S.avatarWrap}>
        <div style={S.avatar(color)}>{initials(user.name)}</div>
        <span style={S.nameText}>{user.name || "—"}</span>
      </div>
      <div style={S.emailText}>{user.email || "—"}</div>
      <div><span style={S.roleBadge(role)}>{ROLE_CONFIG[role]?.icon || "👤"} {role.charAt(0).toUpperCase()+role.slice(1)}</span></div>
      <button style={S.deleteBtn(dh)} onClick={() => onDelete(user.id)}
        onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>🗑</button>
    </div>
  )
}

// ── LogRow ────────────────────────────────────────────────────
const LogRow = ({ log, index, vis }) => {
  const [hov, setHov] = useState(false)
  const loginDate = log.loginTime ? new Date(log.loginTime) : null
  const isRecent  = loginDate && (Date.now() - loginDate.getTime()) < 1000 * 60 * 60 // within 1hr
  return (
    <div style={{ ...S.logsRow(hov), opacity: vis?1:0, transform: vis?"none":"translateY(8px)", transition: `all 0.4s ease ${index*0.03}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.logIndex}>{index + 1}</div>
      <div style={S.logUserId}>#{log.userId}</div>
      <div style={S.logEmail}>{log.email || "—"}</div>
      <div style={S.logTime}>
        {loginDate
          ? loginDate.toLocaleString("en-US", { month:"short", day:"numeric", year:"numeric", hour:"2-digit", minute:"2-digit" })
          : "N/A"}
      </div>
      <div>
        {isRecent
          ? <span style={S.onlineDot}><span style={{ fontSize:"8px" }}>●</span> Recent</span>
          : <span style={{ fontSize:"11px", fontWeight:"600", color:"rgba(232,228,240,0.2)" }}>—</span>
        }
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────
const AdminUsers = () => {
  const [users,    setUsers]    = useState([])
  const [logs,     setLogs]     = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [logsError,setLogsError]= useState(null)
  const [vis,      setVis]      = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [refreshHov, setRefreshHov] = useState(false)
  const [cmHov, setCmHov] = useState(false)
  const [cdHov, setCdHov] = useState(false)
  const [toast,    setToast]    = useState({ show: false, msg: "", ok: true })

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }

  const loadUsers = async () => {
    try {
      const res = await API.get("/admin/users")
      setUsers(Array.isArray(res.data) ? res.data : [])
      setError(null)
    } catch (err) {
      console.error(err); setError("Failed to load users.")
    }
  }

  const loadLogs = async () => {
    try {
      const res = await API.get("/admin/logins")
      setLogs(Array.isArray(res.data) ? res.data : [])
      setLogsError(null)
    } catch (err) {
      console.error(err); setLogsError("Failed to load login activity.")
    }
  }

  const fetchAll = async () => {
    setLoading(true); setVis(false)
    await Promise.all([loadUsers(), loadLogs()])
    setLoading(false)
    setTimeout(() => setVis(true), 80)
  }

  useEffect(() => {
    fetchAll()
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"; document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const handleDelete = async () => {
    try {
      await API.delete(`/admin/users/${deleteId}`)
      setUsers(prev => prev.filter(u => u.id !== deleteId))
      setDeleteId(null); showToast("User deleted.")
    } catch (err) {
      console.error(err); showToast("Failed to delete user.", false)
    }
  }

  const admins    = users.filter(u => u.role === "admin").length
  const customers = users.filter(u => u.role !== "admin").length
  const recentLogs = logs.filter(l => l.loginTime && (Date.now() - new Date(l.loginTime).getTime()) < 86400000).length

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
            <div style={{ fontSize:"18px", fontWeight:"800", color:"#fff", fontFamily:"'Lora',serif", marginBottom:"8px" }}>Delete User?</div>
            <div style={{ fontSize:"13px", color:"rgba(232,228,240,0.4)", marginBottom:"26px", lineHeight:1.6 }}>
              This will permanently remove the user and all their data.
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
          <div style={S.eyebrow}>👥 Administration</div>
          <h1 style={S.pageTitle}>User List</h1>
        </div>
        <button style={S.refreshBtn(refreshHov)} onClick={fetchAll}
          onMouseEnter={() => setRefreshHov(true)} onMouseLeave={() => setRefreshHov(false)}>
          ↺ Refresh
        </button>
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <div style={{ ...S.statsRow, opacity: vis?1:0, transition:"all 0.5s ease 0.08s" }}>
        {[
          { label:"Total Users",   val: users.length, icon:"👥", color:"#5b8dee" },
          { label:"Admins",        val: admins,        icon:"👑", color:"#a78bfa" },
          { label:"Customers",     val: customers,     icon:"🛍", color:"#e8613a" },
          { label:"Active Today",  val: recentLogs,    icon:"🟢", color:"#34d399" },
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

      {/* ── Error banners ──────────────────────────────────── */}
      {error     && <div style={S.errorCard("#e8613a")}>⚠ {error}</div>}
      {logsError && <div style={S.errorCard("#f5a623")}>⚠ {logsError}</div>}

      {/* ── Loading ────────────────────────────────────────── */}
      {loading ? (
        <div style={S.center}>
          <div style={S.spinner} />
          <div style={{ fontSize:"14px", fontWeight:"700", color:"#5b8dee" }}>Loading data…</div>
        </div>
      ) : (
        <>
          {/* ══ Registered Users ════════════════════════════ */}
          <div style={S.sectionTitle}>
            <span>Registered Users</span>
            <div style={S.titleLine} />
          </div>

          <div style={{ ...S.tableCard, opacity: vis?1:0, transition:"all 0.5s ease 0.15s", marginBottom:"32px" }}>
            <div style={S.tableTopBar}>
              <div style={S.tableTopTitle}>All Registered Users</div>
              <span style={S.countBadge("#5b8dee")}>{users.length} users</span>
            </div>

            {users.length === 0 ? (
              <div style={S.center}>
                <div style={{ fontSize:"44px", marginBottom:"12px" }}>👥</div>
                <div style={{ fontSize:"15px", fontWeight:"700" }}>No users found</div>
              </div>
            ) : (
              <>
                <div style={S.usersHeader}>
                  <span>ID</span><span>Name</span><span>Email</span>
                  <span>Role</span><span></span>
                </div>
                {users.map((user, i) => (
                  <UserRow key={user.id} user={user} index={i} vis={vis}
                    onDelete={(id) => setDeleteId(id)} />
                ))}
              </>
            )}
          </div>

          {/* ══ Login Activity ═══════════════════════════════ */}
          <div style={S.sectionTitle}>
            <span>Login Activity</span>
            <div style={S.titleLine} />
          </div>

          <div style={{ ...S.tableCard, opacity: vis?1:0, transition:"all 0.5s ease 0.25s" }}>
            <div style={S.tableTopBar}>
              <div style={S.tableTopTitle}>Login Logs</div>
              <span style={S.countBadge("#38bdf8")}>{logs.length} entries</span>
            </div>

            {logs.length === 0 ? (
              <div style={S.center}>
                <div style={{ fontSize:"44px", marginBottom:"12px" }}>📋</div>
                <div style={{ fontSize:"15px", fontWeight:"700" }}>No login activity</div>
              </div>
            ) : (
              <>
                <div style={S.logsHeader}>
                  <span>#</span><span>User ID</span><span>Email</span>
                  <span>Login Time</span><span>Status</span>
                </div>
                {logs.map((log, i) => (
                  <LogRow key={log.id ?? i} log={log} index={i} vis={vis} />
                ))}
              </>
            )}
          </div>
        </>
      )}

    </div>
  )
}

export default AdminUsers