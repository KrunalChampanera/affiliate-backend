import { useState } from "react"
import InstagramSection from "./InstagramSection"

const T = {
  bg:     "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
  white:  "#ffffff",
  accent: "#e8613a",
  dark:   "#1c1410",
  muted:  "rgba(28,20,16,0.45)",
  border: "rgba(232,97,58,0.1)",
  serif:  "'Lora', serif",
  sans:   "'Nunito Sans', sans-serif",
  radius: "18px",
}

const S = {
  section: {
    background: T.bg,
    padding: "64px 0 80px",
    fontFamily: T.sans,
  },
  container: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0 24px",
  },

  // ── Tab bar ──
  tabBar: {
    display: "flex",
    gap: "6px",
    marginBottom: "36px",
    borderBottom: `2px solid ${T.border}`,
    paddingBottom: "0",
    flexWrap: "wrap",
  },
  tab: (active, hov) => ({
    padding: "12px 24px",
    fontSize: "13px",
    fontWeight: "700",
    fontFamily: T.sans,
    color: active ? T.accent : hov ? T.dark : T.muted,
    background: "transparent",
    border: "none",
    borderBottom: `2px solid ${active ? T.accent : "transparent"}`,
    marginBottom: "-2px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    letterSpacing: "0.3px",
    whiteSpace: "nowrap",
  }),

  // ── Content card ──
  contentCard: {
    background: T.white,
    borderRadius: T.radius,
    border: `1px solid ${T.border}`,
    boxShadow: "0 4px 32px rgba(232,97,58,0.06)",
    padding: "40px",
  },

  // ── Description ──
  h5: {
    fontSize: "20px",
    fontWeight: "800",
    fontFamily: T.serif,
    color: T.dark,
    marginBottom: "16px",
    letterSpacing: "-0.3px",
  },
  h6: {
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: T.serif,
    color: T.dark,
    marginTop: "28px",
    marginBottom: "14px",
  },
  p: {
    fontSize: "15px",
    color: T.muted,
    lineHeight: "1.8",
    marginBottom: "0",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: "0",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  li: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: T.dark,
    fontWeight: "600",
    padding: "10px 14px",
    background: "rgba(232,97,58,0.04)",
    borderRadius: "10px",
    border: `1px solid ${T.border}`,
  },
  liBullet: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: T.accent,
    flexShrink: 0,
  },

  // ── Spec ──
  specGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "0",
  },
  specRow: (alt) => ({
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    padding: "14px 18px",
    background: alt ? "rgba(232,97,58,0.03)" : T.white,
    borderRadius: "10px",
    gap: "20px",
    alignItems: "center",
  }),
  specLabel: {
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: T.accent,
  },
  specValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: T.dark,
  },

  // ── Review form ──
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  inputWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },
  inputLabel: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: T.muted,
  },
  input: (focus) => ({
    padding: "13px 16px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? T.accent : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: T.sans,
    color: T.dark,
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
    width: "100%",
  }),
  textarea: (focus) => ({
    padding: "13px 16px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? T.accent : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: T.sans,
    color: T.dark,
    outline: "none",
    resize: "vertical",
    minHeight: "100px",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
    width: "100%",
  }),
  submitBtn: (hov) => ({
    marginTop: "20px",
    padding: "14px 36px",
    borderRadius: "50px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg,#d4542e,#e8613a)"
      : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    cursor: "pointer",
    boxShadow: hov
      ? "0 12px 36px rgba(232,97,58,0.45)"
      : "0 6px 22px rgba(232,97,58,0.28)",
    transform: hov ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),

  // ── Price cards ──
  priceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  priceCard: (hov) => ({
    background: hov
      ? "linear-gradient(135deg,#e8613a,#f0855e)"
      : T.white,
    borderRadius: T.radius,
    border: `1px solid ${hov ? "transparent" : T.border}`,
    padding: "32px 24px",
    textAlign: "center",
    cursor: "default",
    boxShadow: hov
      ? "0 20px 56px rgba(232,97,58,0.3)"
      : "0 3px 16px rgba(0,0,0,0.05)",
    transform: hov ? "translateY(-6px)" : "translateY(0)",
    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
  }),
  priceNum: (hov) => ({
    fontSize: "44px",
    fontWeight: "800",
    fontFamily: T.serif,
    color: hov ? "#fff" : T.accent,
    lineHeight: 1,
    marginBottom: "8px",
    letterSpacing: "-1px",
  }),
  priceLabel: (hov) => ({
    fontSize: "13px",
    fontWeight: "600",
    color: hov ? "rgba(255,255,255,0.8)" : T.muted,
  }),

  // ── Star rating ──
  starsRow: {
    display: "flex",
    gap: "4px",
    marginBottom: "20px",
    alignItems: "center",
  },
  starBtn: (active, hov) => ({
    fontSize: "22px",
    cursor: "pointer",
    color: active || hov ? "#f5a623" : "rgba(28,20,16,0.15)",
    background: "none",
    border: "none",
    padding: "2px",
    transition: "color 0.15s ease",
    lineHeight: 1,
  }),
  ratingLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: T.muted,
    marginLeft: "8px",
  },
}

// ── Sub-components ────────────────────────────────────────────

const TabBtn = ({ label, active, onClick }) => {
  const [hov, setHov] = useState(false)
  return (
    <button
      style={S.tab(active, hov)}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </button>
  )
}

const InputField = ({ label, placeholder, textarea }) => {
  const [focus, setFocus] = useState(false)
  return (
    <div style={S.inputWrap}>
      <label style={S.inputLabel}>{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          style={S.textarea(focus)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      ) : (
        <input
          placeholder={placeholder}
          style={S.input(focus)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      )}
    </div>
  )
}

const PriceCard = ({ num, label }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={S.priceCard(hov)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.priceNum(hov)}>{num}</div>
      <div style={S.priceLabel(hov)}>{label}</div>
    </div>
  )
}

const StarRating = () => {
  const [rating, setRating]   = useState(0)
  const [hovered, setHovered] = useState(0)
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"]
  return (
    <div style={S.starsRow}>
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          style={S.starBtn(n <= rating, n <= hovered)}
          onClick={() => setRating(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
        >★</button>
      ))}
      {(rating > 0 || hovered > 0) && (
        <span style={S.ratingLabel}>
          {labels[(hovered || rating) - 1]}
        </span>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────
const TABS = [
  { key: "description", label: "Description" },
  { key: "spec",        label: "Full Specification" },
  { key: "reviews",     label: "Reviews" },
  { key: "price",       label: "Price History" },
]

const SPECS = [
  { label: "Network",      value: "GSM / HSPA / LTE" },
  { label: "Launch",       value: "Released 2025, March" },
  { label: "Body",         value: "152.2 × 78.7 × 7.5 mm" },
  { label: "Display",      value: "Super AMOLED touchscreen" },
  { label: "Platform",     value: "Android 5.1 (Lollipop)" },
  { label: "Memory",       value: "Internal 16GB, 3GB RAM" },
  { label: "Main Camera",  value: "13 MP" },
]

const ProductTabsSection = () => {
  const [activeTab, setActiveTab] = useState("description")
  const [submitHov, setSubmitHov] = useState(false)

  return (
    <>
      <section style={S.section}>
        <div style={S.container}>

          {/* ── Tab bar ───────────────────────────────── */}
          <div style={S.tabBar}>
            {TABS.map(t => (
              <TabBtn
                key={t.key}
                label={t.label}
                active={activeTab === t.key}
                onClick={() => setActiveTab(t.key)}
              />
            ))}
          </div>

          {/* ── Content card ──────────────────────────── */}
          <div style={S.contentCard}>

            {/* ── DESCRIPTION ─────────────────────────── */}
            {activeTab === "description" && (
              <div>
                <h5 style={S.h5}>Quality Of Bullet Combs</h5>
                <p style={S.p}>
                  Architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <h6 style={S.h6}>Are You In Danger Of Becoming Addicted To Television?</h6>
                <ul style={S.ul}>
                  {[
                    "APPLE 10.9″ iPad Air (2020) – 256 GB, Sky Blue",
                    "Water-Soluble, High Absorption",
                    "Full-Spectrum",
                    "WP My Cloud Home NAS Drive",
                    "EU Sourced Hemp",
                    "BEATZ Studio 3 Wireless Bluetooth Headphones",
                  ].map((item, i) => (
                    <li key={i} style={S.li}>
                      <span style={S.liBullet} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── SPECIFICATION ───────────────────────── */}
            {activeTab === "spec" && (
              <div>
                <h5 style={S.h5}>Full Specification</h5>
                <div style={S.specGrid}>
                  {SPECS.map((row, i) => (
                    <div key={i} style={S.specRow(i % 2 === 1)}>
                      <span style={S.specLabel}>{row.label}</span>
                      <span style={S.specValue}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── REVIEWS ─────────────────────────────── */}
            {activeTab === "reviews" && (
              <div>
                <h5 style={S.h5}>Leave Your Opinion Here</h5>

                {/* Star rating */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ ...S.inputLabel, marginBottom: "10px" }}>Your Rating</div>
                  <StarRating />
                </div>

                <div style={S.formGrid}>
                  <InputField label="Your Name" placeholder="e.g. John Doe" />
                  <InputField label="Email Address" placeholder="email@example.com" />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <InputField label="Description" placeholder="Share your experience with this product…" textarea />
                </div>

                <div style={S.formGrid}>
                  <InputField label="Pros" placeholder="What did you like?" textarea />
                  <InputField label="Cons" placeholder="What could be better?" textarea />
                </div>

                <button
                  style={S.submitBtn(submitHov)}
                  onMouseEnter={() => setSubmitHov(true)}
                  onMouseLeave={() => setSubmitHov(false)}
                >
                  Post Review →
                </button>
              </div>
            )}

            {/* ── PRICE HISTORY ───────────────────────── */}
            {activeTab === "price" && (
              <div>
                <h5 style={S.h5}>Price History & Chart</h5>
                <p style={{ ...S.p, marginBottom: "32px" }}>
                  Track how the price of this product has changed over time.
                </p>
                <div style={S.priceGrid}>
                  <PriceCard num="50%" label="Since Last Month" />
                  <PriceCard num="15%" label="Last 10 Days" />
                  <PriceCard num="90%" label="Since Last Year" />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <InstagramSection />
    </>
  )
}

export default ProductTabsSection