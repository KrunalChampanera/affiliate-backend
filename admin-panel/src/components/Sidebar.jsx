import { Link, useLocation } from "react-router-dom"
import {
  FaTachometerAlt, FaUsers, FaBox,
  FaClipboardList, FaTags, FaList
} from "react-icons/fa"
import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { to: "/dashboard",  icon: FaTachometerAlt, label: "Dashboard",  color: "#a78bfa" },
  { to: "/users",      icon: FaUsers,         label: "Users",       color: "#5b8dee" },
  { to: "/categories", icon: FaList,           label: "Categories",  color: "#f5a623" },
  { to: "/adminuser",  icon: FaUsers,          label: "User List",   color: "#38bdf8" },
  { to: "/blog",       icon: FaList,           label: "Blog",        color: "#fb7185" },
  { to: "/authors",    icon: FaUsers,          label: "Authors",     color: "#f472b6" },
  { to: "/banners",    icon: FaList,           label: "Banners",     color: "#34d399" },
  { to: "/products",   icon: FaBox,            label: "Products",    color: "#fbbf24" },
  { to: "/orders",     icon: FaClipboardList,  label: "Orders",      color: "#e8613a" },
  { to: "/coupons",    icon: FaTags,           label: "Coupons",     color: "#c084fc" },
]

const S = {
  sidebar: {
    width: "260px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f0f18 0%, #13111e 100%)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Nunito Sans', sans-serif",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },
  // Top branding
  brand: {
    padding: "28px 24px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  brandIcon: {
    width: "42px",
    height: "42px",
    background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "12px",
    boxShadow: "0 8px 24px rgba(167,139,250,0.3)",
  },
  brandTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Lora', serif",
    letterSpacing: "-0.3px",
    marginBottom: "2px",
  },
  brandSub: {
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(232,228,240,0.35)",
    letterSpacing: "0.5px",
  },
  // Nav
  nav: {
    padding: "20px 16px",
    flex: 1,
  },
  navLabel: {
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "rgba(232,228,240,0.25)",
    padding: "0 10px",
    marginBottom: "10px",
    marginTop: "8px",
  },
  navItem: (active, hov, color) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "13px",
    marginBottom: "4px",
    cursor: "pointer",
    textDecoration: "none",
    background: active
      ? `linear-gradient(135deg, ${color}22, ${color}12)`
      : hov ? "rgba(255,255,255,0.05)" : "transparent",
    border: `1px solid ${active ? color + "35" : "transparent"}`,
    transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
    position: "relative",
    overflow: "hidden",
  }),
  activeBar: (color) => ({
    position: "absolute",
    left: 0,
    top: "20%",
    bottom: "20%",
    width: "3px",
    borderRadius: "0 3px 3px 0",
    background: color,
    boxShadow: `0 0 10px ${color}80`,
  }),
  iconWrap: (active, hov, color) => ({
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: active
      ? `linear-gradient(135deg, ${color}, ${color}bb)`
      : hov ? `${color}20` : "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: active ? "#fff" : hov ? color : "rgba(232,228,240,0.4)",
    flexShrink: 0,
    transition: "all 0.25s ease",
    boxShadow: active ? `0 4px 14px ${color}40` : "none",
  }),
  navText: (active, color) => ({
    fontSize: "13px",
    fontWeight: active ? "800" : "600",
    color: active ? "#fff" : "rgba(232,228,240,0.55)",
    letterSpacing: "0.2px",
    transition: "all 0.2s ease",
    flex: 1,
  }),
  activeDot: (color) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: color,
    boxShadow: `0 0 8px ${color}`,
    flexShrink: 0,
  }),
  // Bottom
  bottom: {
    padding: "16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  versionBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "13px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  versionDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#34d399",
    boxShadow: "0 0 8px #34d39980",
    flexShrink: 0,
    animation: "pulse 2s ease infinite",
  },
  versionText: {
    fontSize: "12px",
    fontWeight: "700",
    color: "rgba(232,228,240,0.4)",
  },
  versionNum: {
    marginLeft: "auto",
    fontSize: "11px",
    fontWeight: "800",
    color: "rgba(232,228,240,0.2)",
    letterSpacing: "0.5px",
  },
}

const NavItem = ({ item, active }) => {
  const [hov, setHov] = useState(false)
  const Icon = item.icon

  return (
    <Link
      to={item.to}
      style={S.navItem(active, hov, item.color)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {active && <div style={S.activeBar(item.color)} />}
      <div style={S.iconWrap(active, hov, item.color)}>
        <Icon />
      </div>
      <span style={S.navText(active, item.color)}>{item.label}</span>
      {active && <div style={S.activeDot(item.color)} />}
    </Link>
  )
}

export default function Sidebar() {
  const location = useLocation()
  const [vis, setVis] = useState(false)

  useEffect(() => {
    setTimeout(() => setVis(true), 60)
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      @keyframes fadeSlide { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <div style={{
      ...S.sidebar,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateX(0)" : "translateX(-16px)",
      transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
    }}>

      {/* Brand */}
      <div style={S.brand}>
        <div style={S.brandIcon}>⚡</div>
        <div style={S.brandTitle}>Admin Panel</div>
        <div style={S.brandSub}>Management Console</div>
      </div>

      {/* Nav */}
      <nav style={S.nav}>
        <div style={S.navLabel}>Main Menu</div>
        {NAV_ITEMS.slice(0, 3).map((item, i) => (
          <div key={item.to} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateX(0)" : "translateX(-12px)",
            transition: `all 0.5s ease ${0.1 + i * 0.06}s`,
          }}>
            <NavItem item={item} active={location.pathname === item.to} />
          </div>
        ))}

        <div style={{ ...S.navLabel, marginTop: "20px" }}>Content</div>
        {NAV_ITEMS.slice(3, 6).map((item, i) => (
          <div key={item.to} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateX(0)" : "translateX(-12px)",
            transition: `all 0.5s ease ${0.28 + i * 0.06}s`,
          }}>
            <NavItem item={item} active={location.pathname === item.to} />
          </div>
        ))}

        <div style={{ ...S.navLabel, marginTop: "20px" }}>Commerce</div>
        {NAV_ITEMS.slice(6).map((item, i) => (
          <div key={item.to} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateX(0)" : "translateX(-12px)",
            transition: `all 0.5s ease ${0.46 + i * 0.06}s`,
          }}>
            <NavItem item={item} active={location.pathname === item.to} />
          </div>
        ))}
      </nav>

      {/* Bottom status */}
      <div style={S.bottom}>
        <div style={S.versionBadge}>
          <div style={S.versionDot} />
          <span style={S.versionText}>System Online</span>
          <span style={S.versionNum}>v2.0</span>
        </div>
      </div>

    </div>
  )
}