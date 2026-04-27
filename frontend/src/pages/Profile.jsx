import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const S = {
  page: {
    background: "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
    padding: "48px 24px 96px",
  },
  wrap: {
    maxWidth: "1060px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "clamp(28px,4vw,42px)",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: "#1c1410",
    letterSpacing: "-0.6px",
    marginBottom: "6px",
  },
  pageSub: {
    fontSize: "14px",
    color: "rgba(28,20,16,0.45)",
    marginBottom: "40px",
    fontWeight: "600",
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "24px",
    marginBottom: "32px",
    alignItems: "start",
  },
  card: {
    background: "#fff",
    borderRadius: "22px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 6px 32px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #e8613a, #f0a07a)",
    padding: "28px 28px 24px",
    position: "relative",
  },
  avatarCircle: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    marginBottom: "12px",
    border: "2px solid rgba(255,255,255,0.4)",
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Lora', serif",
    marginBottom: "2px",
  },
  profileEmail: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.75)",
    fontWeight: "600",
  },
  cardBody: {
    padding: "24px 28px",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid rgba(28,20,16,0.05)",
  },
  infoIcon: { fontSize: "15px", marginTop: "1px", flexShrink: 0 },
  infoLabel: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.35)",
    marginBottom: "2px",
  },
  infoVal: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1c1410",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  btnEdit: (hov) => ({
    flex: 1,
    padding: "12px",
    borderRadius: "50px",
    border: "none",
    background: hov ? "linear-gradient(135deg,#d4542e,#e8613a)" : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(232,97,58,0.4)" : "0 4px 16px rgba(232,97,58,0.25)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  btnLogout: (hov) => ({
    flex: 1,
    padding: "12px",
    borderRadius: "50px",
    border: "1.5px solid rgba(28,20,16,0.1)",
    background: hov ? "rgba(28,20,16,0.05)" : "transparent",
    color: hov ? "#1c1410" : "rgba(28,20,16,0.5)",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.25s ease",
  }),
  // Stats
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  statCard: (color) => ({
    background: "#fff",
    borderRadius: "18px",
    border: `1px solid ${color}22`,
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    padding: "22px 20px",
    textAlign: "center",
  }),
  statNum: (color) => ({
    fontSize: "32px",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: color,
    lineHeight: 1,
    marginBottom: "4px",
  }),
  statLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.4)",
  },
  // Tabs
  tabBar: {
    display: "flex",
    gap: "4px",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "50px",
    padding: "5px",
    width: "fit-content",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "24px",
  },
  tab: (active) => ({
    padding: "10px 24px",
    borderRadius: "50px",
    border: "none",
    background: active ? "linear-gradient(135deg,#e8613a,#f0855e)" : "transparent",
    color: active ? "#fff" : "rgba(28,20,16,0.5)",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.3px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    boxShadow: active ? "0 4px 16px rgba(232,97,58,0.3)" : "none",
  }),
  tableCard: {
    background: "#fff",
    borderRadius: "22px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 6px 32px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  tableHead: {
    display: "grid",
    padding: "14px 24px",
    background: "rgba(232,97,58,0.04)",
    borderBottom: "1px solid rgba(232,97,58,0.08)",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.4)",
  },
  tableRow: (hov) => ({
    display: "grid",
    padding: "14px 24px",
    alignItems: "center",
    borderBottom: "1px solid rgba(28,20,16,0.04)",
    background: hov ? "rgba(232,97,58,0.02)" : "transparent",
    transition: "background 0.2s ease",
  }),
  productImg: {
    width: "52px",
    height: "52px",
    objectFit: "contain",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#fef5f0,#fff5f2)",
    padding: "4px",
  },
  productName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1c1410",
    lineHeight: 1.35,
  },
  price: {
    fontSize: "15px",
    fontWeight: "800",
    background: "linear-gradient(135deg,#e8613a,#f0855e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  removeBtn: (hov) => ({
    padding: "7px 16px",
    borderRadius: "50px",
    border: hov ? "none" : "1.5px solid rgba(232,97,58,0.25)",
    background: hov ? "linear-gradient(135deg,#e8613a,#f0855e)" : "transparent",
    color: hov ? "#fff" : "#e8613a",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  }),
  empty: {
    textAlign: "center",
    padding: "56px 24px",
    color: "rgba(28,20,16,0.3)",
  },
  emptyIcon: { fontSize: "40px", marginBottom: "12px" },
  emptyText: { fontSize: "15px", fontWeight: "700" },
  // Edit form
  fieldWrap: { marginBottom: "16px" },
  label: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.4)",
    marginBottom: "7px",
    display: "block",
  },
  input: (focus) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: "#fafafa",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  toast: (show, success) => ({
    position: "fixed", bottom: "32px", right: "32px",
    background: "#fff",
    border: `1px solid ${success ? "rgba(0,180,80,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "16px", padding: "16px 24px",
    color: success ? "#00a84f" : "#e8613a",
    fontWeight: "700", fontSize: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    zIndex: 9999,
    display: "flex", alignItems: "center", gap: "10px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: "none",
  }),
  orderBadge: (method) => ({
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "50px",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    background: method === "COD" ? "rgba(245,166,35,0.12)" : "rgba(91,141,238,0.12)",
    color: method === "COD" ? "#c8870a" : "#5b8dee",
  }),
}

const InputField = ({ label, name, value, onChange }) => {
  const [focus, setFocus] = useState(false)
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={S.input(focus)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}

const TableRow = ({ children, cols }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{ ...S.tableRow(hov), gridTemplateColumns: cols }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </div>
  )
}

const RemoveBtn = ({ onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <button
      style={S.removeBtn(hov)}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      Remove
    </button>
  )
}

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")))
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [orders, setOrders] = useState([])
  const [editing, setEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("cart")
  const [form, setForm] = useState({ name: "", email: "", address: "" })
  const [vis, setVis] = useState(false)
  const [editBtnHov, setEditBtnHov] = useState(false)
  const [logoutBtnHov, setLogoutBtnHov] = useState(false)
  const [saveBtnHov, setSaveBtnHov] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: "", success: true })

  useEffect(() => {
    if (!user) { navigate("/account"); return }
    setForm({ name: user.name || "", email: user.email || "", address: user.address || "" })
    setCart(JSON.parse(localStorage.getItem("cart")) || [])
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || [])
    setOrders(JSON.parse(localStorage.getItem("orders")) || [])
    setTimeout(() => setVis(true), 60)

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}@media(max-width:760px){.profile-top{grid-template-columns:1fr!important}}`
    document.head.appendChild(style)
  }, [])

  const showToast = (msg, success = true) => {
    setToast({ show: true, msg, success })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2800)
  }

  const saveProfile = () => {
    const updated = { ...user, ...form }
    localStorage.setItem("user", JSON.stringify(updated))
    setUser(updated)
    setEditing(false)
    showToast("Profile updated successfully!")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/account")
  }

  const removeCart = (id) => {
    const updated = cart.filter(i => i.id !== id)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    showToast("Item removed from cart.")
  }

  const removeWishlist = (id) => {
    const updated = wishlist.filter(i => i.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    showToast("Item removed from wishlist.")
  }

  if (!user) return null

  const tabs = [
    { key: "cart", label: `🛒 Cart (${cart.length})` },
    { key: "wishlist", label: `♡ Wishlist (${wishlist.length})` },
    { key: "orders", label: `📦 Orders (${orders.length})` },
  ]

  return (
    <div style={S.page}>
      <div style={S.toast(toast.show, toast.success)}>{toast.success ? "✓" : "✕"} {toast.msg}</div>

      <div style={{
        ...S.wrap,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
      }}>
        <div style={S.pageTitle}>My Account</div>
        <div style={S.pageSub}>Manage your profile, cart, wishlist and orders</div>

        {/* Top grid: profile card + stats */}
        <div className="profile-top" style={S.topGrid}>

          {/* Profile Card */}
          <div style={S.card}>
            <div style={S.cardHeader}>
              <div style={S.avatarCircle}>👤</div>
              <div style={S.profileName}>{user.name}</div>
              <div style={S.profileEmail}>{user.email}</div>
            </div>

            <div style={S.cardBody}>
              {editing ? (
                <>
                  <InputField label="Name" name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <InputField label="Email" name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  <InputField label="Address" name="address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                  <div style={S.btnRow}>
                    <button
                      style={S.btnEdit(saveBtnHov)}
                      onClick={saveProfile}
                      onMouseEnter={() => setSaveBtnHov(true)}
                      onMouseLeave={() => setSaveBtnHov(false)}
                    >
                      Save Changes
                    </button>
                    <button
                      style={S.btnLogout(false)}
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={S.infoRow}>
                    <span style={S.infoIcon}>👤</span>
                    <div>
                      <div style={S.infoLabel}>Full Name</div>
                      <div style={S.infoVal}>{user.name}</div>
                    </div>
                  </div>
                  <div style={S.infoRow}>
                    <span style={S.infoIcon}>✉</span>
                    <div>
                      <div style={S.infoLabel}>Email</div>
                      <div style={S.infoVal}>{user.email}</div>
                    </div>
                  </div>
                  <div style={{ ...S.infoRow, borderBottom: "none" }}>
                    <span style={S.infoIcon}>📍</span>
                    <div>
                      <div style={S.infoLabel}>Address</div>
                      <div style={S.infoVal}>{user.address || "Not added yet"}</div>
                    </div>
                  </div>
                  <div style={S.btnRow}>
                    <button
                      style={S.btnEdit(editBtnHov)}
                      onClick={() => setEditing(true)}
                      onMouseEnter={() => setEditBtnHov(true)}
                      onMouseLeave={() => setEditBtnHov(false)}
                    >
                      Edit Profile
                    </button>
                    <button
                      style={S.btnLogout(logoutBtnHov)}
                      onClick={handleLogout}
                      onMouseEnter={() => setLogoutBtnHov(true)}
                      onMouseLeave={() => setLogoutBtnHov(false)}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div>
            <div style={S.statsGrid}>
              {[
                { label: "Cart Items", num: cart.length, color: "#e8613a" },
                { label: "Wishlist", num: wishlist.length, color: "#5b8dee" },
                { label: "Orders", num: orders.length, color: "#00a84f" },
              ].map(s => (
                <div key={s.label} style={S.statCard(s.color)}>
                  <div style={S.statNum(s.color)}>{s.num}</div>
                  <div style={S.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={S.tabBar}>
          {tabs.map(t => (
            <button
              key={t.key}
              style={S.tab(activeTab === t.key)}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div style={S.tableCard}>
            <div style={{ ...S.tableHead, gridTemplateColumns: "64px 1fr 100px 90px" }}>
              <span>Image</span><span>Product</span><span>Price</span><span></span>
            </div>
            {cart.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>🛒</div>
                <div style={S.emptyText}>Your cart is empty</div>
              </div>
            ) : cart.map(item => (
              <TableRow key={item.id} cols="64px 1fr 100px 90px">
                <img src={BASE_URL + item.image} alt={item.title} style={S.productImg} />
                <div style={S.productName}>{item.title}</div>
                <div style={S.price}>${item.price}</div>
                <RemoveBtn onClick={() => removeCart(item.id)} />
              </TableRow>
            ))}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div style={S.tableCard}>
            <div style={{ ...S.tableHead, gridTemplateColumns: "64px 1fr 100px 90px" }}>
              <span>Image</span><span>Product</span><span>Price</span><span></span>
            </div>
            {wishlist.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>♡</div>
                <div style={S.emptyText}>Your wishlist is empty</div>
              </div>
            ) : wishlist.map(item => (
              <TableRow key={item.id} cols="64px 1fr 100px 90px">
                <img src={BASE_URL + item.image} alt={item.title} style={S.productImg} />
                <div style={S.productName}>{item.title}</div>
                <div style={S.price}>${item.price}</div>
                <RemoveBtn onClick={() => removeWishlist(item.id)} />
              </TableRow>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div style={S.tableCard}>
            <div style={{ ...S.tableHead, gridTemplateColumns: "1fr 100px 130px 1fr" }}>
              <span>Date</span><span>Total</span><span>Payment</span><span>Address</span>
            </div>
            {orders.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>📦</div>
                <div style={S.emptyText}>No orders yet</div>
              </div>
            ) : orders.map((order, i) => (
              <TableRow key={i} cols="1fr 100px 130px 1fr">
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#1c1410" }}>
                  {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <div style={S.price}>${order.total}</div>
                <div><span style={S.orderBadge(order.payment)}>{order.payment}</span></div>
                <div style={{ fontSize: "13px", color: "rgba(28,20,16,0.55)" }}>{order.customer?.address}</div>
              </TableRow>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile