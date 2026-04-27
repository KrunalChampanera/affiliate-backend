import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f0f18 0%, #13111e 60%, #0f1520 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  // Decorative background glows
  glow1: {
    position: "absolute",
    top: "-150px", left: "-150px",
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glow2: {
    position: "absolute",
    bottom: "-150px", right: "-100px",
    width: "400px", height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(232,97,58,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  // Card
  card: {
    width: "100%",
    maxWidth: "440px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    overflow: "hidden",
    backdropFilter: "blur(20px)",
    boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
    position: "relative",
    zIndex: 1,
  },
  // Top accent
  cardTop: {
    background: "linear-gradient(135deg, #1a1530, #13111e)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "36px 40px 32px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  topGlow: {
    position: "absolute",
    top: "-60px", left: "50%",
    transform: "translateX(-50%)",
    width: "200px", height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  logoWrap: {
    width: "64px", height: "64px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "28px",
    margin: "0 auto 18px",
    boxShadow: "0 12px 32px rgba(167,139,250,0.4)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: "#fff",
    letterSpacing: "-0.4px",
    marginBottom: "6px",
  },
  cardSub: {
    fontSize: "13px",
    color: "rgba(232,228,240,0.4)",
    fontWeight: "600",
  },
  // Form
  formBody: {
    padding: "32px 40px 36px",
  },
  fieldWrap: {
    marginBottom: "18px",
  },
  label: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.8px",
    textTransform: "uppercase",
    color: "rgba(232,228,240,0.35)",
    marginBottom: "8px",
    display: "block",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    fontSize: "15px",
    pointerEvents: "none",
    zIndex: 1,
  },
  input: (focus) => ({
    width: "100%",
    padding: "14px 16px 14px 44px",
    borderRadius: "14px",
    border: `1.5px solid ${focus ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.08)"}`,
    background: focus ? "rgba(167,139,250,0.07)" : "rgba(255,255,255,0.04)",
    color: "#e8e4f0",
    fontSize: "15px",
    fontFamily: "'Nunito Sans', sans-serif",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(167,139,250,0.12)" : "none",
    transition: "all 0.25s ease",
  }),
  eyeBtn: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    color: "rgba(232,228,240,0.3)",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  rememberRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "8px 0 24px",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "rgba(232,228,240,0.4)",
    fontWeight: "600",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#a78bfa",
    cursor: "pointer",
  },
  forgotLink: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#a78bfa",
    textDecoration: "none",
    letterSpacing: "0.3px",
  },
  loginBtn: (hov, loading) => ({
    width: "100%",
    padding: "16px",
    borderRadius: "50px",
    border: "none",
    background: loading
      ? "rgba(167,139,250,0.3)"
      : hov
        ? "linear-gradient(135deg, #8b5cf6, #a78bfa)"
        : "linear-gradient(135deg, #a78bfa, #c4b5fd)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: loading ? "not-allowed" : "pointer",
    boxShadow: hov && !loading ? "0 16px 40px rgba(167,139,250,0.45)" : "0 6px 24px rgba(167,139,250,0.25)",
    transform: hov && !loading ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }),
  // Error toast
  errorBox: (show) => ({
    background: "rgba(232,97,58,0.1)",
    border: "1px solid rgba(232,97,58,0.25)",
    borderRadius: "13px",
    padding: "13px 16px",
    marginBottom: "20px",
    color: "#f0855e",
    fontSize: "13px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: show ? "auto" : "none",
    maxHeight: show ? "60px" : "0px",
    overflow: "hidden",
  }),
  // Bottom strip
  cardBottom: {
    padding: "16px 40px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  secureText: {
    fontSize: "11px",
    color: "rgba(232,228,240,0.2)",
    fontWeight: "600",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [btnHov, setBtnHov] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [passFocus, setPassFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [vis, setVis] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setVis(true), 60)
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await API.post("/admin/login", { email, password })
      localStorage.setItem("adminToken", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Invalid email or password. Please try again.")
      } else if (err.response?.status === 403) {
        setError("Access denied. You are not an admin.")
      } else {
        setError(err.response?.data?.message || "Server not responding. Try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={S.page}>
      <div style={S.glow1} />
      <div style={S.glow2} />
      <div style={S.grid} />

      <div style={{
        ...S.card,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
      }}>

        {/* Top branding */}
        <div style={S.cardTop}>
          <div style={S.topGlow} />
          <div style={S.logoWrap}>⚡</div>
          <div style={S.cardTitle}>Admin Panel</div>
          <div style={S.cardSub}>Sign in to your management console</div>
        </div>

        {/* Form */}
        <div style={S.formBody}>

          {/* Error box */}
          <div style={S.errorBox(!!error)}>
            <span>⚠</span> {error}
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Email Address</label>
              <div style={S.inputWrap}>
                <span style={S.inputIcon}>✉</span>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={S.input(emailFocus)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Password</label>
              <div style={S.inputWrap}>
                <span style={S.inputIcon}>🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={S.input(passFocus)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  required
                />
                <button
                  type="button"
                  style={S.eyeBtn}
                  onClick={() => setShowPass(s => !s)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div style={S.rememberRow}>
              <label style={S.checkLabel}>
                <input
                  type="checkbox"
                  style={S.checkbox}
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" style={S.forgotLink}>Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={S.loginBtn(btnHov, loading)}
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div style={{
                    width: "16px", height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Signing In…
                </>
              ) : (
                <>Sign In →</>
              )}
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div style={S.cardBottom}>
          <div style={S.secureText}>
            🔒 Secured with end-to-end encryption
          </div>
        </div>

      </div>
    </div>
  )
}