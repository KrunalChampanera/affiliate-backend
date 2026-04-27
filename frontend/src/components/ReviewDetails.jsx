import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import API from "../services/api"
import InstagramSection from "./InstagramSection"
import PageHeader from "./PageHeader"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const S = {
  page: {
    background: "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  wrap: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "64px 24px 96px",
  },
  // Meta row
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },
  badge: (color) => ({
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: "50px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    background: color === "orange"
      ? "linear-gradient(135deg, #e8613a, #f0855e)"
      : "rgba(232,97,58,0.1)",
    color: color === "orange" ? "#fff" : "#e8613a",
  }),
  dot: {
    width: "4px", height: "4px", borderRadius: "50%",
    background: "rgba(28,20,16,0.2)",
  },
  metaText: {
    fontSize: "13px",
    color: "rgba(28,20,16,0.45)",
    fontWeight: "600",
  },
  title: {
    fontSize: "clamp(28px, 5vw, 46px)",
    fontWeight: "800",
    color: "#1c1410",
    lineHeight: 1.15,
    letterSpacing: "-0.8px",
    fontFamily: "'Lora', serif",
    marginBottom: "10px",
  },
  stars: {
    color: "#f5a623",
    fontSize: "18px",
    letterSpacing: "3px",
    marginBottom: "32px",
    display: "block",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(232,97,58,0.2), transparent)",
    margin: "36px 0",
  },
  // Image
  imgCard: {
    borderRadius: "24px",
    overflow: "hidden",
    background: "linear-gradient(135deg, #fef5f0, #fff5f2)",
    border: "1px solid rgba(232,97,58,0.1)",
    boxShadow: "0 20px 60px rgba(232,97,58,0.12)",
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    minHeight: "340px",
  },
  img: (hov) => ({
    maxWidth: "100%",
    maxHeight: "320px",
    objectFit: "contain",
    transform: hov ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  description: {
    fontSize: "16px",
    color: "rgba(28,20,16,0.65)",
    lineHeight: 1.9,
    marginBottom: "40px",
  },
  // Spec table
  specCard: {
    background: "#fff",
    borderRadius: "22px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
    padding: "32px",
    marginBottom: "32px",
  },
  specTitle: {
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#e8613a",
    marginBottom: "24px",
  },
  qualityGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  qualityItem: (hov) => ({
    padding: "20px 22px",
    borderRadius: "16px",
    background: hov ? "rgba(232,97,58,0.06)" : "rgba(232,97,58,0.03)",
    border: `1.5px solid ${hov ? "rgba(232,97,58,0.25)" : "rgba(232,97,58,0.08)"}`,
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    cursor: "default",
  }),
  qualityIcon: {
    fontSize: "16px",
    color: "#e8613a",
    marginBottom: "8px",
    display: "block",
    fontWeight: "800",
  },
  qualityLabel: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#1c1410",
    marginBottom: "6px",
    fontFamily: "'Lora', serif",
  },
  qualityDesc: {
    fontSize: "13px",
    color: "rgba(28,20,16,0.55)",
    lineHeight: 1.65,
  },
  // Form
  formCard: {
    background: "#fff",
    borderRadius: "22px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
    padding: "36px",
    marginBottom: "48px",
  },
  formTitle: {
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#e8613a",
    marginBottom: "8px",
  },
  formSubtitle: {
    fontSize: "22px",
    fontWeight: "700",
    fontFamily: "'Lora', serif",
    color: "#1c1410",
    marginBottom: "28px",
  },
  inputRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  input: (focus) => ({
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: "#fff",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  textarea: (focus) => ({
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: "#fff",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
    marginBottom: "16px",
  }),
  submitBtn: (hov) => ({
    background: hov
      ? "linear-gradient(135deg, #d4542e, #e8613a)"
      : "linear-gradient(135deg, #e8613a, #f0855e)",
    border: "none",
    color: "#fff",
    borderRadius: "50px",
    padding: "14px 36px",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 12px 36px rgba(232,97,58,0.45)" : "0 6px 24px rgba(232,97,58,0.3)",
    transform: hov ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  // Top products
  topSection: {
    background: "#fff",
    borderRadius: "22px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
    padding: "32px",
  },
  topTitle: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#e8613a",
    marginBottom: "24px",
    textAlign: "center",
  },
  topItem: (hov) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px",
    borderRadius: "14px",
    background: hov ? "rgba(232,97,58,0.05)" : "transparent",
    transition: "all 0.25s ease",
    cursor: "pointer",
    marginBottom: "4px",
  }),
  topImgWrap: {
    width: "54px", height: "54px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #fef5f0, #fff5f2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, padding: "6px", overflow: "hidden",
  },
  topImg: { width: "100%", height: "100%", objectFit: "contain" },
  topItemTitle: {
    fontSize: "13px", fontWeight: "600", color: "#1c1410",
    lineHeight: 1.35, marginBottom: "4px",
  },
  topStars: { color: "#f5a623", fontSize: "12px", letterSpacing: "1.5px" },
  successToast: (show) => ({
    position: "fixed", bottom: "32px", right: "32px",
    background: "#fff",
    border: "1px solid rgba(0,180,80,0.3)",
    borderRadius: "16px", padding: "16px 24px",
    color: "#00a84f", fontWeight: "700", fontSize: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
    zIndex: 9999,
    display: "flex", alignItems: "center", gap: "10px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: show ? "auto" : "none",
  }),
}

const qualityPoints = [
  { icon: "✦", label: "Premium Quality", desc: "Crafted with the finest materials to ensure long-lasting durability and top-tier performance." },
  { icon: "✦", label: "Verified Product", desc: "Every product is tested and verified by our expert review team before being listed." },
  { icon: "✦", label: "Customer Approved", desc: "Highly rated by hundreds of satisfied customers who trust this product for daily use." },
  { icon: "✦", label: "Best Value", desc: "Exceptional quality at a competitive price — unmatched value in its category." },
]

const TopItem = ({ item }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={S.topItem(hov)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.topImgWrap}>
        <img src={BASE_URL + item.image} alt={item.title} style={S.topImg} />
      </div>
      <div>
        <div style={S.topItemTitle}>{item.title?.substring(0, 36)}{item.title?.length > 36 ? "…" : ""}</div>
        <div style={S.topStars}>★★★★★</div>
      </div>
    </div>
  )
}

const QualityItem = ({ item }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={S.qualityItem(hov)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={S.qualityIcon}>{item.icon}</span>
      <div style={S.qualityLabel}>{item.label}</div>
      <div style={S.qualityDesc}>{item.desc}</div>
    </div>
  )
}

const ReviewDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [topProducts, setTopProducts] = useState([])
  const [imgHov, setImgHov] = useState(false)
  const [vis, setVis] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", desc: "" })
  const [focus, setFocus] = useState({})
  const [btnHov, setBtnHov] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [res, all] = await Promise.all([
        API.get(`/products/${id}`),
        API.get("/products"),
      ])
      setProduct(res.data)
      setTopProducts(all.data.slice(0, 4))
      setTimeout(() => setVis(true), 80)
    }
    load()
  }, [id])

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,700;0,800;1,700&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setToast(true)
    setForm({ name: "", email: "", desc: "" })
    setTimeout(() => setToast(false), 3000)
  }

  if (!product) return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#e8613a", fontFamily: "'Nunito Sans', sans-serif" }}>Loading review…</div>
      </div>
    </div>
  )

  return (
    <>
      <div style={S.page}>
        <PageHeader title="Review Details" breadcrumb="Review Details" />

        {/* Success toast */}
        <div style={S.successToast(toast)}>✓ Review posted successfully!</div>

        <div style={{
          ...S.wrap,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}>

          {/* Meta + Title */}
          <div style={S.metaRow}>
            <span style={S.badge("orange")}>Review</span>
            <div style={S.dot} />
            <span style={S.metaText}>By Admin</span>
            <div style={S.dot} />
            <span style={S.metaText}>{product.category || "General"}</span>
          </div>

          <h1 style={S.title}>{product.title}</h1>
          <span style={S.stars}>★★★★★</span>

          {/* Hero Image */}
          <div
            style={S.imgCard}
            onMouseEnter={() => setImgHov(true)}
            onMouseLeave={() => setImgHov(false)}
          >
            <img src={BASE_URL + product.image} alt={product.title} style={S.img(imgHov)} />
          </div>
         

          <div style={S.divider} />

          {/* Quality Section */}
          <div style={{ ...S.specCard, animation: vis ? "fadeUp 0.6s ease 0.2s both" : "none" }}>
            <div style={S.specTitle}>★ Why This Product Stands Out</div>
            <div style={S.qualityGrid}>
              {qualityPoints.map((q, i) => (
                <QualityItem key={i} item={q} />
              ))}
            </div>
          </div>

          {/* Review Form */}
          <div style={{ ...S.formCard, animation: vis ? "fadeUp 0.6s ease 0.3s both" : "none" }}>
            <div style={S.formTitle}>✍ Share Your Thoughts</div>
            <div style={S.formSubtitle}>Leave Your Opinion</div>

            <form onSubmit={handleSubmit}>
              <div style={S.inputRow}>
                <input
                  style={S.input(focus.name)}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocus(f => ({ ...f, name: true }))}
                  onBlur={() => setFocus(f => ({ ...f, name: false }))}
                  required
                />
                <input
                  style={S.input(focus.email)}
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocus(f => ({ ...f, email: true }))}
                  onBlur={() => setFocus(f => ({ ...f, email: false }))}
                  required
                />
              </div>
              <textarea
                style={S.textarea(focus.desc)}
                placeholder="Write your review…"
                value={form.desc}
                onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                onFocus={() => setFocus(f => ({ ...f, desc: true }))}
                onBlur={() => setFocus(f => ({ ...f, desc: false }))}
                required
              />
              <button
                type="submit"
                style={S.submitBtn(btnHov)}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
              >
                Post Review →
              </button>
            </form>
          </div>

          {/* Top Products */}
          {topProducts.length > 0 && (
            <div style={{ ...S.topSection, animation: vis ? "fadeUp 0.6s ease 0.4s both" : "none" }}>
              <div style={S.topTitle}>⭐ Top Reviewed Products</div>
              {topProducts.map(item => <TopItem key={item.id} item={item} />)}
            </div>
          )}

        </div>
      </div>
      <InstagramSection />
    </>
  )
}

export default ReviewDetails