import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

const PAGE_TITLES = {
  "/dashboard":  { label: "Dashboard",   icon: "⚡", sub: "Overview & analytics" },
  "/users":      { label: "Users",        icon: "👥", sub: "Manage user accounts" },
  "/categories": { label: "Categories",   icon: "📂", sub: "Product categories" },
  "/adminuser":  { label: "User List",    icon: "🗂", sub: "All registered users" },
  "/blog":       { label: "Blog",         icon: "✍", sub: "Posts & articles" },
  "/banners":    { label: "Banners",      icon: "🖼", sub: "Homepage banners" },
  "/products":   { label: "Products",     icon: "📦", sub: "Inventory management" },
  "/orders":     { label: "Orders",       icon: "🛍", sub: "Customer orders" },
  "/coupons":    { label: "Coupons",      icon: "🏷", sub: "Discount codes" },
}

const S = {
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 28px",
    background: "rgba(15,15,24,0.95)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'Nunito Sans', sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 100,
    gap: "16px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  pageIconWrap: (color) => ({
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${color}22, ${color}12)`,
    border: `1px solid ${color}30`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  }),
  pageTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Lora', serif",
    letterSpacing: "-0.3px",
    lineHeight: 1.1,
    marginBottom: "2px",
  },
  pageSub: {
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(232,228,240,0.35)",
    letterSpacing: "0.3px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  // Search
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "13px",
    color: "rgba(232,228,240,0.3)",
    pointerEvents: "none",
  },
  searchInput: (focus) => ({
    padding: "9px 14px 9px 34px",
    borderRadius: "50px",
    border: `1px solid ${focus ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(167,139,250,0.07)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0",
    fontSize: "13px",
    fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    width: focus ? "220px" : "160px",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    boxShadow: focus ? "0 0 0 3px rgba(167,139,250,0.1)" : "none",
  }),
  // Divider
  divider: {
    width: "1px",
    height: "28px",
    background: "rgba(255,255,255,0.07)",
  },
  // Clock / date
  dateWrap: {
    textAlign: "right",
  },
  dateTime: {
    fontSize: "13px",
    fontWeight: "700",
    color: "rgba(232,228,240,0.6)",
    letterSpacing: "0.3px",
  },
  dateDay: {
    fontSize: "10px",
    fontWeight: "600",
    color: "rgba(232,228,240,0.25)",
    letterSpacing: "0.5px",
    marginTop: "1px",
  },
  // Admin chip
  adminChip: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "7px 14px 7px 8px",
    borderRadius: "50px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  adminAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "800",
    color: "#fff",
    boxShadow: "0 3px 10px rgba(167,139,250,0.35)",
  },
  adminName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "rgba(232,228,240,0.7)",
    letterSpacing: "0.2px",
  },
  // Logout
  logoutBtn: (hov) => ({
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 18px",
    borderRadius: "50px",
    border: `1px solid ${hov ? "#e8613a" : "rgba(232,97,58,0.3)"}`,
    background: hov ? "rgba(232,97,58,0.15)" : "transparent",
    color: hov ? "#e8613a" : "rgba(232,97,58,0.6)",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
    boxShadow: hov ? "0 4px 16px rgba(232,97,58,0.2)" : "none",
  }),
  // Notification bell
  bellBtn: (hov) => ({
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    border: `1px solid ${hov ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
    background: hov ? "rgba(167,139,250,0.1)" : "rgba(255,255,255,0.04)",
    color: hov ? "#a78bfa" : "rgba(232,228,240,0.35)",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    position: "relative",
  }),
  bellDot: {
    position: "absolute",
    top: "7px",
    right: "7px",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#e8613a",
    border: "1.5px solid #0f0f18",
  },
}

const PAGE_COLORS = {
  "/dashboard": "#a78bfa",
  "/users":     "#5b8dee",
  "/categories":"#f5a623",
  "/adminuser": "#38bdf8",
  "/blog":      "#fb7185",
  "/banners":   "#34d399",
  "/products":  "#fbbf24",
  "/orders":    "#e8613a",
  "/coupons":   "#c084fc",
}

export default function Topbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [logoutHov, setLogoutHov] = useState(false)
  const [bellHov, setBellHov] = useState(false)
  const [searchFocus, setSearchFocus] = useState(false)
  const [search, setSearch] = useState("")
  const [time, setTime] = useState(new Date())

  const page = PAGE_TITLES[location.pathname] || { label: "Admin Panel", icon: "⚡", sub: "Management console" }
  const color = PAGE_COLORS[location.pathname] || "#a78bfa"

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    const tick = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  const logout = () => {
    localStorage.removeItem("adminToken")
    navigate("/")
  }

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  return (
    <div style={S.topbar}>

      {/* Left — page title */}
      <div style={S.left}>
        <div style={S.pageIconWrap(color)}>{page.icon}</div>
        <div>
          <div style={S.pageTitle}>{page.label}</div>
          <div style={S.pageSub}>{page.sub}</div>
        </div>
      </div>

      {/* Right — actions */}
      <div style={S.right}>

        {/* Search */}
        <div style={S.searchWrap}>
          <span style={S.searchIcon}>🔍</span>
          <input
            style={S.searchInput(searchFocus)}
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </div>

        <div style={S.divider} />

        {/* Clock */}
        <div style={S.dateWrap}>
          <div style={S.dateTime}>{formatTime(time)}</div>
          <div style={S.dateDay}>{formatDate(time)}</div>
        </div>

        <div style={S.divider} />

        {/* Bell */}
        <button
          style={S.bellBtn(bellHov)}
          onMouseEnter={() => setBellHov(true)}
          onMouseLeave={() => setBellHov(false)}
        >
          🔔
          <div style={S.bellDot} />
        </button>

        {/* Admin chip */}
        <div style={S.adminChip}>
          <div style={S.adminAvatar}>A</div>
          <span style={S.adminName}>Admin</span>
        </div>

        {/* Logout */}
        <button
          style={S.logoutBtn(logoutHov)}
          onClick={logout}
          onMouseEnter={() => setLogoutHov(true)}
          onMouseLeave={() => setLogoutHov(false)}
        >
          <span>↩</span> Logout
        </button>

      </div>
    </div>
  )
}