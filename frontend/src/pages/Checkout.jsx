import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import API from "../services/api"

const S = {
  page: {
    background: "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  section: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "64px 24px 96px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "32px",
    alignItems: "start",
  },
  // Left — billing
  billingCard: {
    background: "#fff",
    borderRadius: "26px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 6px 36px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  cardTopBar: {
    background: "linear-gradient(135deg, #e8613a, #f0a07a)",
    padding: "24px 32px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  cardTopIcon: {
    width: "42px",
    height: "42px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  cardTopTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Lora', serif",
    letterSpacing: "-0.3px",
  },
  cardTopSub: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.75)",
    fontWeight: "600",
    marginTop: "2px",
  },
  formBody: {
    padding: "32px",
  },
  sectionLabel: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#e8613a",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  labelLine: {
    flex: 1,
    height: "1px",
    background: "rgba(232,97,58,0.12)",
  },
  formGrid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  formGrid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
  },
  fieldWrap: {
    marginBottom: "16px",
  },
  label: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.4)",
    marginBottom: "7px",
    display: "block",
  },
  required: {
    color: "#e8613a",
    marginLeft: "3px",
  },
  inputWrap: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
    pointerEvents: "none",
    zIndex: 1,
  },
  input: (focus) => ({
    width: "100%",
    padding: "13px 16px 13px 40px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  inputNoIcon: (focus) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  textarea: (focus) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "13px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    resize: "vertical",
    minHeight: "100px",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(232,97,58,0.12), transparent)",
    margin: "28px 0",
  },

  // Right — order summary
  summaryCard: {
    background: "#fff",
    borderRadius: "26px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 6px 36px rgba(0,0,0,0.06)",
    overflow: "hidden",
    position: "sticky",
    top: "24px",
  },
  summaryTopBar: {
    background: "linear-gradient(135deg, #1c1410, #2e2018)",
    padding: "22px 28px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  summaryTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "'Lora', serif",
  },
  summaryBody: {
    padding: "24px 28px",
  },
  orderItem: (hov) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px",
    borderRadius: "14px",
    background: hov ? "rgba(232,97,58,0.04)" : "transparent",
    transition: "background 0.2s ease",
    marginBottom: "6px",
  }),
  orderImgWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#fef5f0,#fff5f2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    flexShrink: 0,
    overflow: "hidden",
  },
  orderImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  orderItemName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#1c1410",
    lineHeight: 1.35,
    flex: 1,
  },
  orderQtyBadge: {
    background: "rgba(232,97,58,0.1)",
    color: "#e8613a",
    borderRadius: "50px",
    padding: "2px 9px",
    fontSize: "11px",
    fontWeight: "800",
    flexShrink: 0,
  },
  orderItemPrice: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#1c1410",
    flexShrink: 0,
  },
  summaryDivider: {
    height: "1px",
    background: "rgba(28,20,16,0.06)",
    margin: "16px 0",
  },
  summaryRow: (bold) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: bold ? "16px" : "13px",
    fontWeight: bold ? "800" : "600",
    color: bold ? "#1c1410" : "rgba(28,20,16,0.5)",
  }),
  totalPrice: {
    fontSize: "22px",
    fontWeight: "800",
    background: "linear-gradient(135deg,#e8613a,#f0855e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  // Payment
  paymentSection: {
    marginTop: "20px",
  },
  paymentLabel: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.4)",
    marginBottom: "14px",
    display: "block",
  },
  paymentOption: (active, hov) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 16px",
    borderRadius: "14px",
    border: `1.5px solid ${active ? "#e8613a" : hov ? "rgba(232,97,58,0.2)" : "rgba(28,20,16,0.08)"}`,
    background: active ? "rgba(232,97,58,0.05)" : hov ? "rgba(232,97,58,0.02)" : "#fafafa",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
    boxShadow: active ? "0 4px 16px rgba(232,97,58,0.12)" : "none",
  }),
  paymentDot: (active) => ({
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: `2px solid ${active ? "#e8613a" : "rgba(28,20,16,0.2)"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s ease",
  }),
  paymentDotInner: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#e8613a",
  },
  paymentIcon: {
    fontSize: "20px",
    flexShrink: 0,
  },
  paymentText: (active) => ({
    fontSize: "14px",
    fontWeight: active ? "700" : "600",
    color: active ? "#1c1410" : "rgba(28,20,16,0.55)",
    transition: "all 0.2s ease",
  }),
  placeOrderBtn: (hov) => ({
    width: "100%",
    padding: "17px",
    borderRadius: "50px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg,#d4542e,#e8613a)"
      : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 16px 48px rgba(232,97,58,0.5)" : "0 8px 28px rgba(232,97,58,0.3)",
    transform: hov ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }),
  secureNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginTop: "14px",
    fontSize: "12px",
    color: "rgba(28,20,16,0.35)",
    fontWeight: "600",
  },
  // Toast
  toast: (show, success) => ({
    position: "fixed",
    bottom: "32px",
    right: "32px",
    background: "#fff",
    border: `1px solid ${success ? "rgba(0,180,80,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "16px",
    padding: "16px 24px",
    color: success ? "#00a84f" : "#e8613a",
    fontWeight: "700",
    fontSize: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: "none",
  }),
}

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const Field = ({ label, name, value, onChange, icon, required: req, type = "text", half }) => {
  const [focus, setFocus] = useState(false)
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>
        {label}{req && <span style={S.required}>*</span>}
      </label>
      <div style={icon ? S.inputWrap : undefined}>
        {icon && <span style={S.inputIcon}>{icon}</span>}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          style={icon ? S.input(focus) : S.inputNoIcon(focus)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
    </div>
  )
}

const PaymentOption = ({ value, label, icon, selected, onSelect }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={S.paymentOption(selected, hov)}
      onClick={() => onSelect(value)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.paymentDot(selected)}>
        {selected && <div style={S.paymentDotInner} />}
      </div>
      <span style={S.paymentIcon}>{icon}</span>
      <span style={S.paymentText(selected)}>{label}</span>
    </div>
  )
}

const OrderItem = ({ item }) => {
  const [hov, setHov] = useState(false)
  return (
    <div style={S.orderItem(hov)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={S.orderImgWrap}>
        <img src={BASE_URL + item.image} alt={item.title} style={S.orderImg} />
      </div>
      <div style={S.orderItemName}>{item.title?.substring(0, 32)}{item.title?.length > 32 ? "…" : ""}</div>
      <span style={S.orderQtyBadge}>×{item.qty}</span>
      <div style={S.orderItemPrice}>${(item.price * item.qty).toFixed(2)}</div>
    </div>
  )
}

const Checkout = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [payment, setPayment] = useState("bank")
  const [vis, setVis] = useState(false)
  const [btnHov, setBtnHov] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: "", success: true })

  const user = JSON.parse(localStorage.getItem("user"))

  const [form, setForm] = useState({
    firstName: "", lastName: "", country: "", company: "",
    address: "", city: "", state: "", zip: "",
    email: user?.email || "", phone: "", notes: ""
  })

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    if (!currentUser) { navigate("/account"); return }
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    if (storedCart.length === 0) { navigate("/cart"); return }
    setCart(storedCart)
    setTimeout(() => setVis(true), 80)

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}@media(max-width:860px){.checkout-layout{grid-template-columns:1fr!important}}`
    document.head.appendChild(style)
  }, [navigate])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shipping = 5
  const total = subtotal + shipping

  const showToast = (msg, success = true) => {
    setToast({ show: true, msg, success })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000)
  }

  const placeOrder = async () => {
    if (!form.firstName || !form.lastName || !form.address || !form.phone) {
      showToast("Please fill all required fields.", false)
      return
    }

    // Build address string from form fields — stored in DB `address` column
    const addressString = [form.address, form.city, form.state, form.zip, form.country]
      .filter(Boolean).join(", ")

    // Payload matches DB columns: totalAmount | status | userId | payment | address | phone
    const payload = {
      userId:      user.id,
      totalAmount: total,
      status:      "pending",
      payment:     payment,
      address:     addressString,
      phone:       form.phone,
      items: cart.map(item => ({
        productId: item.id,
        quantity:  item.qty,
        price:     item.price,
      })),
    }

    try {
      // Explicitly send token in header — ensures auth even if interceptor misses it
      const token = localStorage.getItem("token")
      await API.post("/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      localStorage.removeItem("cart")
      showToast("🎉 Order placed successfully!")
      setTimeout(() => navigate("/profile"), 2000)
    } catch (err) {
      console.error("Order error:", err)
      if (err.response?.status === 401) {
        showToast("Session expired. Please log in again.", false)
        setTimeout(() => navigate("/account"), 1500)
      } else {
        showToast(err.response?.data?.message || "Failed to place order. Try again.", false)
      }
    }
  }

  const [notesFocus, setNotesFocus] = useState(false)

  return (
    <>
      <div style={S.page}>
        <PageHeader title="Checkout" breadcrumb="Checkout" />

        <div style={S.toast(toast.show, toast.success)}>
          {toast.success ? "✓" : "✕"} {toast.msg}
        </div>

        <div style={{
          ...S.section,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}>
          <div className="checkout-layout" style={S.layout}>

            {/* LEFT — Billing Form */}
            <div style={S.billingCard}>
              <div style={S.cardTopBar}>
                <div style={S.cardTopIcon}>📋</div>
                <div>
                  <div style={S.cardTopTitle}>Billing Details</div>
                  <div style={S.cardTopSub}>Fields marked * are required</div>
                </div>
              </div>

              <div style={S.formBody}>

                {/* Name */}
                <div style={S.sectionLabel}>
                  <span>Personal Info</span>
                  <div style={S.labelLine} />
                </div>
                <div style={S.formGrid2}>
                  <Field label="First Name" name="firstName" icon="👤" value={form.firstName} onChange={handleChange} required />
                  <Field label="Last Name" name="lastName" icon="👤" value={form.lastName} onChange={handleChange} required />
                </div>
                <Field label="Company Name" name="company" icon="🏢" value={form.company} onChange={handleChange} />

                <div style={S.divider} />

                {/* Address */}
                <div style={S.sectionLabel}>
                  <span>Shipping Address</span>
                  <div style={S.labelLine} />
                </div>
                <Field label="Country" name="country" icon="🌍" value={form.country} onChange={handleChange} />
                <Field label="Street Address" name="address" icon="📍" value={form.address} onChange={handleChange} required />
                <div style={S.formGrid3}>
                  <Field label="City" name="city" value={form.city} onChange={handleChange} />
                  <Field label="State" name="state" value={form.state} onChange={handleChange} />
                  <Field label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} />
                </div>

                <div style={S.divider} />

                {/* Contact */}
                <div style={S.sectionLabel}>
                  <span>Contact</span>
                  <div style={S.labelLine} />
                </div>
                <div style={S.formGrid2}>
                  <Field label="Email" name="email" icon="✉" type="email" value={form.email} onChange={handleChange} />
                  <Field label="Phone" name="phone" icon="📞" value={form.phone} onChange={handleChange} required />
                </div>

                <div style={S.fieldWrap}>
                  <label style={S.label}>Order Notes</label>
                  <textarea
                    name="notes"
                    placeholder="Special instructions for delivery…"
                    value={form.notes}
                    onChange={handleChange}
                    style={S.textarea(notesFocus)}
                    onFocus={() => setNotesFocus(true)}
                    onBlur={() => setNotesFocus(false)}
                  />
                </div>

              </div>
            </div>

            {/* RIGHT — Order Summary */}
            <div style={S.summaryCard}>
              <div style={S.summaryTopBar}>
                <span style={{ fontSize: "20px" }}>🛍</span>
                <div style={S.summaryTitle}>Your Order</div>
                <span style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  borderRadius: "50px",
                  padding: "3px 12px",
                  fontSize: "12px",
                  fontWeight: "800",
                }}>
                  {cart.length} item{cart.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div style={S.summaryBody}>

                {/* Items */}
                {cart.map(item => <OrderItem key={item.id} item={item} />)}

                <div style={S.summaryDivider} />

                {/* Totals */}
                <div style={S.summaryRow(false)}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={S.summaryRow(false)}>
                  <span>Shipping</span>
                  <span style={{ color: "#00a84f", fontWeight: "700" }}>+${shipping.toFixed(2)}</span>
                </div>

                <div style={{ ...S.summaryDivider, margin: "16px 0 14px" }} />

                <div style={S.summaryRow(true)}>
                  <span>Total</span>
                  <span style={S.totalPrice}>${total.toFixed(2)}</span>
                </div>

                {/* Payment */}
                <div style={S.paymentSection}>
                  <span style={S.paymentLabel}>Payment Method</span>
                  <PaymentOption value="bank" label="Direct Bank Transfer" icon="🏦" selected={payment === "bank"} onSelect={setPayment} />
                  <PaymentOption value="paypal" label="PayPal" icon="🅿" selected={payment === "paypal"} onSelect={setPayment} />
                  <PaymentOption value="cod" label="Cash On Delivery" icon="💵" selected={payment === "cod"} onSelect={setPayment} />
                </div>

                {/* Place Order */}
                <button
                  style={S.placeOrderBtn(btnHov)}
                  onClick={placeOrder}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                >
                  <span>Place Order</span>
                  <span style={{ fontSize: "18px" }}>→</span>
                </button>

                <div style={S.secureNote}>
                  🔒 Secure & encrypted checkout
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout