// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);

//   const fetchUsers = async () => {
//     const res = await API.get("/admin/users");
//     setUsers(res.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     await API.delete(`/admin/users/${id}`);
//     fetchUsers();
//   };

//   const updateUser = async () => {
//     await API.put(`/admin/users/${editUser.id}`, {
//       name: editUser.name,
//       email: editUser.email,
//     });
//     setEditUser(null);
//     fetchUsers();
//   };

//   return (
//     <div>
//       <h4 className="mb-4">Users</h4>

//       <table className="table table-bordered table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th width="180">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-warning me-2"
//                   onClick={() => setEditUser(user)}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => deleteUser(user.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Modal */}
//       {editUser && (
//         <div className="card p-3 mt-4">
//           <h5>Edit User</h5>

//           <input
//             className="form-control mb-2"
//             value={editUser.name}
//             onChange={(e) =>
//               setEditUser({ ...editUser, name: e.target.value })
//             }
//           />

//           <input
//             className="form-control mb-2"
//             value={editUser.email}
//             onChange={(e) =>
//               setEditUser({ ...editUser, email: e.target.value })
//             }
//           />

//           <button className="btn btn-success me-2" onClick={updateUser}>
//             Save
//           </button>

//           <button
//             className="btn btn-secondary"
//             onClick={() => setEditUser(null)}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react"
import API from "../services/api"

const ROLE_CONFIG = {
  admin: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", icon: "👑" },
  user:  { color: "#5b8dee", bg: "rgba(91,141,238,0.12)",  icon: "👤" },
}

const AVATAR_COLORS = ["#5b8dee","#a78bfa","#e8613a","#34d399","#f5a623","#fb7185","#38bdf8"]

const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length]
const initials    = (name) => name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2) : "?"

const S = {
  page: {
    background: "linear-gradient(160deg, #0f0f18 0%, #13111e 60%, #0f1520 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
    padding: "28px", color: "#e8e4f0",
  },
  topRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
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
  // Stats
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(3,1fr)",
    gap: "14px", marginBottom: "22px",
  },
  statCard: (color) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${color}30`,
    borderRadius: "18px", padding: "18px 22px",
    display: "flex", alignItems: "center", gap: "14px",
  }),
  statIcon: (color) => ({
    width: "44px", height: "44px", borderRadius: "12px",
    background: `${color}18`, border: `1px solid ${color}25`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px", flexShrink: 0,
  }),
  statNum: (color) => ({
    fontSize: "26px", fontWeight: "800",
    fontFamily: "'Lora', serif", color, lineHeight: 1, marginBottom: "2px",
  }),
  statLabel: {
    fontSize: "11px", fontWeight: "700",
    color: "rgba(232,228,240,0.35)", letterSpacing: "0.3px",
  },
  // Search
  searchWrap: {
    position: "relative", marginBottom: "20px",
  },
  searchIcon: {
    position: "absolute", left: "14px", top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px", color: "rgba(232,228,240,0.3)", pointerEvents: "none",
  },
  searchInput: (focus) => ({
    width: "100%", padding: "12px 14px 12px 40px",
    borderRadius: "14px",
    border: `1.5px solid ${focus ? "rgba(91,141,238,0.45)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(91,141,238,0.06)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif", outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(91,141,238,0.1)" : "none",
    transition: "all 0.25s ease",
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
  tableTopTitle: {
    fontSize: "14px", fontWeight: "800",
    color: "#fff", fontFamily: "'Lora', serif",
  },
  countBadge: {
    background: "rgba(91,141,238,0.12)", color: "#5b8dee",
    borderRadius: "50px", padding: "4px 14px",
    fontSize: "12px", fontWeight: "800",
  },
  // ID | Avatar+Name | Email | Role | Actions
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "60px 220px 1fr 120px 140px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
    textTransform: "uppercase", color: "rgba(232,228,240,0.3)",
    gap: "12px", alignItems: "center",
  },
  tableRow: (hov) => ({
    display: "grid",
    gridTemplateColumns: "60px 220px 1fr 120px 140px",
    padding: "14px 24px", gap: "12px", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.2s ease",
  }),
  idBadge: {
    background: "rgba(91,141,238,0.12)", color: "#5b8dee",
    borderRadius: "8px", padding: "4px 10px",
    fontSize: "12px", fontWeight: "800", textAlign: "center",
  },
  avatarWrap: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: (color) => ({
    width: "36px", height: "36px", borderRadius: "50%",
    background: `linear-gradient(135deg, ${color}, ${color}bb)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", fontWeight: "800", color: "#fff",
    flexShrink: 0, boxShadow: `0 3px 10px ${color}40`,
  }),
  nameText: { fontSize: "13px", fontWeight: "700", color: "#e8e4f0" },
  emailText: { fontSize: "13px", color: "rgba(232,228,240,0.45)", fontWeight: "600" },
  roleBadge: (role) => ({
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "5px 12px", borderRadius: "50px",
    background: ROLE_CONFIG[role]?.bg || "rgba(255,255,255,0.06)",
    color: ROLE_CONFIG[role]?.color || "#e8e4f0",
    fontSize: "11px", fontWeight: "800",
    border: `1px solid ${ROLE_CONFIG[role]?.color || "#fff"}25`,
  }),
  actionBtns: { display: "flex", gap: "8px" },
  editBtn: (hov) => ({
    padding: "7px 16px", borderRadius: "9px",
    border: `1px solid ${hov ? "rgba(91,141,238,0.6)" : "rgba(91,141,238,0.2)"}`,
    background: hov ? "rgba(91,141,238,0.15)" : "transparent",
    color: hov ? "#5b8dee" : "rgba(91,141,238,0.55)",
    fontSize: "11px", fontWeight: "800", cursor: "pointer", transition: "all 0.2s ease",
  }),
  deleteBtn: (hov) => ({
    padding: "7px 11px", borderRadius: "9px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.2)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.45)",
    fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
  }),
  center: { textAlign: "center", padding: "60px 24px", color: "rgba(232,228,240,0.25)" },
  spinner: {
    width: "36px", height: "36px", borderRadius: "50%",
    border: "3px solid rgba(91,141,238,0.15)",
    borderTop: "3px solid #5b8dee",
    animation: "spin 0.9s linear infinite", margin: "0 auto 14px",
  },
  // Modals
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
    zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#1a1826", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px", padding: "36px",
    maxWidth: "400px", width: "90%",
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
    width: "100%", padding: "11px 14px", borderRadius: "12px",
    border: `1.5px solid ${focus ? "rgba(91,141,238,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(91,141,238,0.07)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0", fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif", outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(91,141,238,0.1)" : "none",
    transition: "all 0.25s ease", marginBottom: "16px",
  }),
  saveBtn: (hov) => ({
    flex: 1, padding: "12px", borderRadius: "50px", border: "none",
    background: hov ? "linear-gradient(135deg,#3a6fd8,#5b8dee)" : "linear-gradient(135deg,#5b8dee,#7ba6f0)",
    color: "#fff", fontSize: "13px", fontWeight: "800",
    cursor: "pointer", transition: "all 0.3s ease",
    boxShadow: hov ? "0 8px 24px rgba(91,141,238,0.4)" : "none",
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

// ── Small helpers ─────────────────────────────────────────────

const ModalInput = ({ label, value, onChange, type = "text" }) => {
  const [f, setF] = useState(false)
  return (
    <div>
      <label style={S.modalLabel}>{label}</label>
      <input type={type} value={value} onChange={onChange}
        style={S.modalInput(f)}
        onFocus={() => setF(true)} onBlur={() => setF(false)} />
    </div>
  )
}

const UserRow = ({ user, onEdit, onDelete, vis, index }) => {
  const [hov, setHov] = useState(false)
  const [eh, setEh]   = useState(false)
  const [dh, setDh]   = useState(false)
  const color = avatarColor(user.id)
  const role  = user.role || "user"

  return (
    <div
      style={{
        ...S.tableRow(hov),
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(10px)",
        transition: `all 0.4s ease ${index * 0.05}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.idBadge}>#{user.id}</div>

      <div style={S.avatarWrap}>
        <div style={S.avatar(color)}>{initials(user.name)}</div>
        <span style={S.nameText}>{user.name || "—"}</span>
      </div>

      <div style={S.emailText}>{user.email || "—"}</div>

      <div>
        <span style={S.roleBadge(role)}>
          {ROLE_CONFIG[role]?.icon || "👤"}&nbsp;
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </div>

      <div style={S.actionBtns}>
        <button style={S.editBtn(eh)} onClick={() => onEdit(user)}
          onMouseEnter={() => setEh(true)} onMouseLeave={() => setEh(false)}>
          Edit
        </button>
        <button style={S.deleteBtn(dh)} onClick={() => onDelete(user.id)}
          onMouseEnter={() => setDh(true)} onMouseLeave={() => setDh(false)}>
          🗑
        </button>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────

export default function Users() {
  const [users,    setUsers]    = useState([])
  const [editUser, setEditUser] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [vis,      setVis]      = useState(false)
  const [search,   setSearch]   = useState("")
  const [searchFocus, setSearchFocus] = useState(false)
  const [toast,    setToast]    = useState({ show: false, msg: "", ok: true })

  // button hover states
  const [saveHov,    setSaveHov]    = useState(false)
  const [cancelHov,  setCancelHov]  = useState(false)
  const [cmHov,      setCmHov]      = useState(false)
  const [cdHov,      setCdHov]      = useState(false)

  const showToast = (msg, ok = true) => {
    setToast({ show: true, msg, ok })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await API.get("/admin/users")          // ← correct endpoint
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error(err)
      showToast("Failed to load users.", false)
    } finally {
      setLoading(false)
      setTimeout(() => setVis(true), 80)
    }
  }

  useEffect(() => {
    fetchUsers()
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  // ── Update user (same fields as original) ────────────────
  const updateUser = async () => {
    try {
      await API.put(`/admin/users/${editUser.id}`, {  // ← correct endpoint
        name:  editUser.name,
        email: editUser.email,
      })
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...editUser } : u))
      setEditUser(null)
      showToast("User updated successfully!")
    } catch (err) {
      console.error(err)
      showToast("Failed to update user.", false)
    }
  }

  // ── Delete user ──────────────────────────────────────────
  const deleteUser = async () => {
    try {
      await API.delete(`/admin/users/${deleteId}`)     // ← correct endpoint
      setUsers(prev => prev.filter(u => u.id !== deleteId))
      setDeleteId(null)
      showToast("User deleted.")
    } catch (err) {
      console.error(err)
      showToast("Failed to delete user.", false)
    }
  }

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const admins   = users.filter(u => u.role === "admin").length
  const customers = users.filter(u => u.role !== "admin").length

  return (
    <div style={S.page}>

      {/* Toast */}
      <div style={S.toast(toast.show, toast.ok)}>
        {toast.ok ? "✓" : "✕"} {toast.msg}
      </div>

      {/* ── Edit Modal ──────────────────────────────────────── */}
      {editUser && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalTitle}>✏ Edit User</div>

            <ModalInput
              label="Name"
              value={editUser.name || ""}
              onChange={e => setEditUser(u => ({ ...u, name: e.target.value }))}
            />
            <ModalInput
              label="Email"
              type="email"
              value={editUser.email || ""}
              onChange={e => setEditUser(u => ({ ...u, email: e.target.value }))}
            />

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button style={S.cancelBtn(cancelHov)} onClick={() => setEditUser(null)}
                onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}>
                Cancel
              </button>
              <button style={S.saveBtn(saveHov)} onClick={updateUser}
                onMouseEnter={() => setSaveHov(true)} onMouseLeave={() => setSaveHov(false)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────── */}
      {deleteId && (
        <div style={S.overlay}>
          <div style={{ ...S.modal, textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "14px" }}>🗑</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", fontFamily: "'Lora',serif", marginBottom: "8px" }}>
              Delete User?
            </div>
            <div style={{ fontSize: "13px", color: "rgba(232,228,240,0.4)", marginBottom: "26px", lineHeight: 1.6 }}>
              This will permanently remove the user and all their data. This cannot be undone.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button style={S.cancelBtn(cmHov)} onClick={() => setDeleteId(null)}
                onMouseEnter={() => setCmHov(true)} onMouseLeave={() => setCmHov(false)}>
                Cancel
              </button>
              <button style={S.confirmBtn(cdHov)} onClick={deleteUser}
                onMouseEnter={() => setCdHov(true)} onMouseLeave={() => setCdHov(false)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Header ──────────────────────────────────────── */}
      <div style={{ ...S.topRow, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "all 0.5s ease" }}>
        <div>
          <div style={S.eyebrow}>👥 Management</div>
          <h1 style={S.pageTitle}>Users</h1>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────── */}
      <div style={{ ...S.statsRow, opacity: vis ? 1 : 0, transition: "all 0.5s ease 0.08s" }}>
        {[
          { label: "Total Users", val: users.length, icon: "👥", color: "#5b8dee" },
          { label: "Admins",      val: admins,        icon: "👑", color: "#a78bfa" },
          { label: "Customers",   val: customers,     icon: "🛍", color: "#e8613a" },
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

      {/* ── Search ───────────────────────────────────────────── */}
      <div style={S.searchWrap}>
        <span style={S.searchIcon}>🔍</span>
        <input
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={S.searchInput(searchFocus)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <div style={{ ...S.tableCard, opacity: vis ? 1 : 0, transition: "all 0.5s ease 0.18s" }}>
        <div style={S.tableTopBar}>
          <div style={S.tableTopTitle}>All Users</div>
          <span style={S.countBadge}>{filtered.length} users</span>
        </div>

        {loading ? (
          <div style={S.center}>
            <div style={S.spinner} />
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#5b8dee" }}>Loading users…</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={S.center}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>👥</div>
            <div style={{ fontSize: "15px", fontWeight: "700" }}>No users found</div>
          </div>
        ) : (
          <>
            <div style={S.tableHeader}>
              <span>ID</span>
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Actions</span>
            </div>
            {filtered.map((user, i) => (
              <UserRow
                key={user.id}
                user={user}
                index={i}
                vis={vis}
                onEdit={setEditUser}
                onDelete={setDeleteId}
              />
            ))}
          </>
        )}
      </div>

    </div>
  )
}