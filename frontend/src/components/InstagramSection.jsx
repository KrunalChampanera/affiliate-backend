import { useState } from "react"

const T = {
  white:  "#ffffff",
  accent: "#e8613a",
  dark:   "#1c1410",
  muted:  "rgba(28,20,16,0.45)",
  border: "rgba(232,97,58,0.1)",
  serif:  "'Lora', serif",
  sans:   "'Nunito Sans', sans-serif",
}

const IMAGES = [
  "/images/instagram-img-1.png",
  "/images/instagram-img-2.png",
  "/images/instagram-img-3.png",
  "/images/instagram-img-4.png",
  "/images/instagram-img-5.png",
  "/images/instagram-img-6.png",
]

const InstaCard = ({ src, index }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: "16px",
        aspectRatio: "1 / 1",
        cursor: "pointer",
        boxShadow: hov ? "0 16px 40px rgba(232,97,58,0.2)" : "0 3px 14px rgba(0,0,0,0.07)",
        transform: hov ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={src}
        alt={`Instagram post ${index + 1}`}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
          display: "block",
        }}
      />

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(232,97,58,0.75), rgba(240,133,94,0.6))",
        opacity: hov ? 1 : 0,
        transition: "opacity 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: "6px",
      }}>
        <div style={{ fontSize: "28px" }}>📸</div>
        <div style={{
          color: "#fff", fontSize: "12px", fontWeight: "800",
          letterSpacing: "1px", textTransform: "uppercase",
          fontFamily: T.sans,
        }}>
          View Post
        </div>
      </div>
    </div>
  )
}

const InstagramSection = () => (
  <section style={{ padding: "80px 0", background: T.white, fontFamily: T.sans }}>
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "44px" }}>
        <div style={{
          fontSize: "10px", fontWeight: "800", letterSpacing: "3px",
          textTransform: "uppercase", color: T.accent, marginBottom: "10px",
        }}>
          📸 Follow Us
        </div>
        <h2 style={{
          fontSize: "clamp(22px,3vw,36px)", fontWeight: "800",
          fontFamily: T.serif, color: T.dark,
          letterSpacing: "-0.5px", margin: 0,
        }}>
          Torado's Instagram
        </h2>
        <div style={{
          width: "48px", height: "3px", borderRadius: "50px",
          background: "linear-gradient(135deg,#e8613a,#f0855e)",
          margin: "14px auto 0",
        }} />
        <p style={{
          fontSize: "14px", color: T.muted, marginTop: "14px",
          fontWeight: "600", letterSpacing: "0.3px",
        }}>
          @torado.marketing
        </p>
      </div>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(232,97,58,0.2), transparent)",
        marginBottom: "40px",
      }} />

      {/* Image grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "14px",
      }}>
        {IMAGES.map((img, i) => (
          <InstaCard key={i} src={img} index={i} />
        ))}
      </div>

      {/* Follow button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "13px 32px", borderRadius: "50px",
            background: "linear-gradient(135deg,#e8613a,#f0855e)",
            color: "#fff", fontSize: "13px", fontWeight: "800",
            textDecoration: "none", fontFamily: T.sans, letterSpacing: "0.5px",
            boxShadow: "0 8px 28px rgba(232,97,58,0.3)",
            transition: "all 0.3s ease",
          }}
        >
          Follow on Instagram →
        </a>
      </div>

    </div>
  </section>
)

export default InstagramSection