import { useEffect, useState } from "react"
import API from "../services/api"

const STATS_CONFIG = [
  { key: "totalUsers",      label: "Total Users",      icon: "👥", color: "#5b8dee", sub: "Registered accounts" },
  { key: "totalProducts",   label: "Total Products",   icon: "📦", color: "#fbbf24", sub: "Active listings"     },
  { key: "totalOrders",     label: "Total Orders",     icon: "🛍", color: "#e8613a", sub: "All time orders"     },
  { key: "totalCategories", label: "Categories",       icon: "📂", color: "#a78bfa", sub: "Product groups"      },
  { key: "totalRevenue",    label: "Total Revenue",    icon: "💰", color: "#34d399", sub: "Gross earnings",  prefix: "$" },
  { key: "pendingOrders",   label: "Pending Orders",   icon: "⏳", color: "#f5a623", sub: "Awaiting action"     },
  { key: "totalCoupons",    label: "Coupons",          icon: "🏷", color: "#fb7185", sub: "Active discounts"    },
  { key: "totalBlogs",      label: "Blog Posts",       icon: "✍",  color: "#38bdf8", sub: "Published articles"  },
]

const RECENT_ACTIVITY = [
  { icon: "🛍", text: "New order placed",      time: "2 min ago",  color: "#e8613a" },
  { icon: "👤", text: "New user registered",   time: "14 min ago", color: "#5b8dee" },
  { icon: "📦", text: "Product stock updated", time: "1 hr ago",   color: "#fbbf24" },
  { icon: "✓",  text: "Order #142 completed",  time: "3 hrs ago",  color: "#34d399" },
  { icon: "🏷", text: "Coupon SAVE20 created", time: "5 hrs ago",  color: "#fb7185" },
]

const S = {
  page: {
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#e8e4f0",
    padding: "28px",
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f0f18 0%, #13111e 60%, #0f1520 100%)",
  },
  // Welcome banner
  welcomeBanner: {
    background: "linear-gradient(135deg, #1a1530 0%, #13111e 100%)",
    border: "1px solid rgba(167,139,250,0.15)",
    borderRadius: "22px",
    padding: "28px 32px",
    marginBottom: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    position: "relative",
    overflow: "hidden",
  },
  bannerGlow: {
    position: "absolute",
    top: "-60px", right: "-60px",
    width: "250px", height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  welcomeTitle: {
    fontSize: "clamp(20px,3vw,28px)",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: "#fff",
    letterSpacing: "-0.4px",
    marginBottom: "4px",
  },
  welcomeSub: {
    fontSize: "13px",
    color: "rgba(232,228,240,0.45)",
    fontWeight: "600",
  },
  welcomeBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 18px",
    borderRadius: "50px",
    background: "rgba(167,139,250,0.12)",
    border: "1px solid rgba(167,139,250,0.25)",
    color: "#a78bfa",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  pulseDot: {
    width: "8px", height: "8px",
    borderRadius: "50%",
    background: "#34d399",
    boxShadow: "0 0 8px #34d39980",
    animation: "pulse 2s ease infinite",
  },
  // Stats grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "28px",
  },
  statCard: (color, hov) => ({
    background: hov
      ? `linear-gradient(135deg, ${color}18, ${color}0a)`
      : "rgba(255,255,255,0.03)",
    border: `1px solid ${hov ? color + "40" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "20px",
    padding: "22px 22px 20px",
    cursor: "default",
    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
    transform: hov ? "translateY(-4px)" : "translateY(0)",
    boxShadow: hov ? `0 16px 40px ${color}18` : "none",
    position: "relative",
    overflow: "hidden",
  }),
  statGlow: (color) => ({
    position: "absolute",
    top: "-30px", right: "-30px",
    width: "100px", height: "100px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
    pointerEvents: "none",
  }),
  statIconWrap: (color) => ({
    width: "46px", height: "46px",
    borderRadius: "13px",
    background: `linear-gradient(135deg, ${color}25, ${color}10)`,
    border: `1px solid ${color}30`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px",
    marginBottom: "16px",
  }),
  statNum: (color) => ({
    fontSize: "32px",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: color,
    lineHeight: 1,
    marginBottom: "4px",
    letterSpacing: "-0.5px",
  }),
  statLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#e8e4f0",
    marginBottom: "3px",
  },
  statSub: {
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(232,228,240,0.3)",
    letterSpacing: "0.3px",
  },
  statTrend: (color) => ({
    position: "absolute",
    top: "18px", right: "18px",
    fontSize: "10px",
    fontWeight: "800",
    color: color,
    background: `${color}18`,
    padding: "3px 9px",
    borderRadius: "50px",
    letterSpacing: "0.5px",
  }),
  // Bottom row
  bottomRow: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "20px",
  },
  // Activity card
  activityCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    overflow: "hidden",
  },
  cardTop: {
    padding: "20px 24px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Lora', serif",
  },
  cardBadge: (color) => ({
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
    color: color,
    background: `${color}18`,
    padding: "4px 12px",
    borderRadius: "50px",
  }),
  activityItem: (hov) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? "rgba(255,255,255,0.03)" : "transparent",
    transition: "background 0.2s ease",
  }),
  activityIcon: (color) => ({
    width: "36px", height: "36px",
    borderRadius: "10px",
    background: `${color}18`,
    border: `1px solid ${color}25`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  }),
  activityText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(232,228,240,0.75)",
    flex: 1,
  },
  activityTime: {
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(232,228,240,0.25)",
    whiteSpace: "nowrap",
  },
  // Quick actions
  quickCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    overflow: "hidden",
  },
  quickItem: (hov, color) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: hov ? `${color}0d` : "transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
  }),
  quickIcon: (color) => ({
    width: "34px", height: "34px",
    borderRadius: "10px",
    background: `${color}18`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "15px", flexShrink: 0,
  }),
  quickLabel: (hov, color) => ({
    fontSize: "13px",
    fontWeight: "700",
    color: hov ? "#fff" : "rgba(232,228,240,0.6)",
    transition: "color 0.2s ease",
  }),
  quickArrow: (hov, color) => ({
    marginLeft: "auto",
    fontSize: "14px",
    color: hov ? color : "rgba(232,228,240,0.15)",
    transition: "all 0.2s ease",
    transform: hov ? "translateX(2px)" : "none",
  }),
  // Skeleton
  skeleton: {
    background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "10px",
  },
}

const QUICK_ACTIONS = [
  { label: "Add Product",   icon: "📦", color: "#fbbf24", to: "/products" },
  { label: "View Orders",   icon: "🛍", color: "#e8613a", to: "/orders"   },
  { label: "Manage Users",  icon: "👥", color: "#5b8dee", to: "/users"    },
  { label: "Create Coupon", icon: "🏷", color: "#fb7185", to: "/coupons"  },
  { label: "Write Blog",    icon: "✍",  color: "#38bdf8", to: "/blog"     },
]

const ActivityItem = ({ item, index, vis }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{
        ...S.activityItem(hov),
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-12px)",
        transition: `all 0.5s ease ${0.3 + index * 0.07}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.activityIcon(item.color)}>{item.icon}</div>
      <span style={S.activityText}>{item.text}</span>
      <span style={S.activityTime}>{item.time}</span>
    </div>
  )
}

const QuickItem = ({ item }) => {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={item.to}
      style={S.quickItem(hov, item.color)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.quickIcon(item.color)}>{item.icon}</div>
      <span style={S.quickLabel(hov, item.color)}>{item.label}</span>
      <span style={S.quickArrow(hov, item.color)}>→</span>
    </a>
  )
}

const StatCard = ({ cfg, value, index, vis }) => {
  const [hov, setHov] = useState(false)
  const [count, setCount] = useState(0)
  const num = Number(value) || 0

  useEffect(() => {
    if (!vis || !num) return
    let start = 0
    const step = Math.ceil(num / 30)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(start)
    }, 30)
    return () => clearInterval(timer)
  }, [vis, num])

  return (
    <div
      style={{
        ...S.statCard(cfg.color, hov),
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        transition: vis
          ? "all 0.35s cubic-bezier(0.23,1,0.32,1)"
          : `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.statGlow(cfg.color)} />
      <div style={S.statTrend(cfg.color)}>↑ Live</div>
      <div style={S.statIconWrap(cfg.color)}>{cfg.icon}</div>
      <div style={S.statNum(cfg.color)}>
        {cfg.prefix || ""}{count.toLocaleString()}
      </div>
      <div style={S.statLabel}>{cfg.label}</div>
      <div style={S.statSub}>{cfg.sub}</div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    API.get("/admin/dashboard")
      .then(res => { setStats(res.data); setLoading(false); setTimeout(() => setVis(true), 80) })
      .catch(() => { setLoading(false); setTimeout(() => setVis(true), 80) })

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      *{box-sizing:border-box}
      @media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}.bottom-row{grid-template-columns:1fr!important}}
    `
    document.head.appendChild(style)
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <div style={S.page}>

      {/* Welcome Banner */}
      <div style={{
        ...S.welcomeBanner,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
      }}>
        <div style={S.bannerGlow} />
        <div>
          <div style={S.welcomeTitle}>{greeting}, Admin 👋</div>
          <div style={S.welcomeSub}>Here's what's happening in your store today.</div>
        </div>
        <div style={S.welcomeBadge}>
          <div style={S.pulseDot} />
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={S.statsGrid}>
        {STATS_CONFIG.map((cfg, i) => (
          <StatCard
            key={cfg.key}
            cfg={cfg}
            value={loading ? 0 : (stats[cfg.key] ?? 0)}
            index={i}
            vis={vis}
          />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="bottom-row" style={S.bottomRow}>

        {/* Recent Activity */}
        <div style={S.activityCard}>
          <div style={S.cardTop}>
            <div style={S.cardTitle}>Recent Activity</div>
            <span style={S.cardBadge("#34d399")}>● Live</span>
          </div>
          {RECENT_ACTIVITY.map((item, i) => (
            <ActivityItem key={i} item={item} index={i} vis={vis} />
          ))}
        </div>

        {/* Quick Actions */}
        <div style={S.quickCard}>
          <div style={S.cardTop}>
            <div style={S.cardTitle}>Quick Actions</div>
          </div>
          {QUICK_ACTIONS.map((item, i) => (
            <QuickItem key={i} item={item} />
          ))}
        </div>

      </div>
    </div>
  )
}