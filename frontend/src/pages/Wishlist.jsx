import { useEffect, useState } from "react"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const S = {
  page: {
    background: "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  section: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "64px 24px 96px",
  },
  headerRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "12px",
  },
  eyebrow: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#e8613a",
    marginBottom: "6px",
  },
  pageTitle: {
    fontSize: "clamp(26px, 4vw, 40px)",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: "#1c1410",
    letterSpacing: "-0.5px",
    lineHeight: 1.1,
    margin: 0,
  },
  countBadge: {
    background: "rgba(232,97,58,0.1)",
    color: "#e8613a",
    borderRadius: "50px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  // Grid layout
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
    gap: "24px",
  },
  card: (hov) => ({
    background: "#fff",
    borderRadius: "22px",
    border: `1px solid ${hov ? "rgba(232,97,58,0.2)" : "rgba(232,97,58,0.08)"}`,
    boxShadow: hov ? "0 20px 56px rgba(232,97,58,0.14)" : "0 4px 24px rgba(0,0,0,0.05)",
    overflow: "hidden",
    transform: hov ? "translateY(-6px)" : "translateY(0)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    position: "relative",
  }),
  imgWrap: {
    height: "210px",
    background: "linear-gradient(135deg, #fef5f0, #fff5f2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
    position: "relative",
    overflow: "hidden",
  },
  img: (hov) => ({
    maxHeight: "155px",
    maxWidth: "100%",
    objectFit: "contain",
    transform: hov ? "scale(1.08)" : "scale(1)",
    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
  }),
  heartBtn: (active, hov) => ({
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: active ? "linear-gradient(135deg,#e8613a,#f0855e)" : "#fff",
    border: `1.5px solid ${active ? "transparent" : "rgba(232,97,58,0.25)"}`,
    color: active ? "#fff" : "#e8613a",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: hov ? "0 6px 20px rgba(232,97,58,0.3)" : "0 2px 8px rgba(0,0,0,0.08)",
    transform: hov ? "scale(1.15)" : "scale(1)",
    transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
    lineHeight: 1,
  }),
  cardBody: {
    padding: "20px 22px 22px",
  },
  productName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1c1410",
    lineHeight: 1.4,
    marginBottom: "8px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  price: {
    fontSize: "22px",
    fontWeight: "800",
    background: "linear-gradient(135deg,#e8613a,#f0855e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "18px",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
  },
  btnCart: (hov) => ({
    flex: 1,
    padding: "11px 0",
    borderRadius: "50px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg,#d4542e,#e8613a)"
      : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 10px 28px rgba(232,97,58,0.4)" : "0 4px 14px rgba(232,97,58,0.25)",
    transform: hov ? "translateY(-1px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  }),
  btnRemove: (hov) => ({
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: `1.5px solid ${hov ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: hov ? "rgba(232,97,58,0.06)" : "transparent",
    color: hov ? "#e8613a" : "rgba(28,20,16,0.35)",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.25s ease",
  }),
  // Empty state
  empty: {
    textAlign: "center",
    padding: "80px 24px",
    background: "#fff",
    borderRadius: "26px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    display: "block",
  },
  emptyTitle: {
    fontSize: "22px",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: "#1c1410",
    marginBottom: "8px",
  },
  emptyText: {
    fontSize: "14px",
    color: "rgba(28,20,16,0.45)",
    marginBottom: "28px",
    fontWeight: "600",
  },
  shopBtn: (hov) => ({
    display: "inline-block",
    padding: "13px 32px",
    borderRadius: "50px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg,#d4542e,#e8613a)"
      : "linear-gradient(135deg,#e8613a,#f0855e)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 12px 32px rgba(232,97,58,0.45)" : "0 6px 20px rgba(232,97,58,0.3)",
    transform: hov ? "translateY(-2px)" : "none",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    textDecoration: "none",
  }),
  toast: (show, type) => ({
    position: "fixed",
    bottom: "32px",
    right: "32px",
    background: "#fff",
    border: `1px solid ${type === "cart" ? "rgba(91,141,238,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "16px",
    padding: "16px 24px",
    color: type === "cart" ? "#5b8dee" : "#e8613a",
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

const WishCard = ({ item, onRemove, onAddToCart, index, visible }) => {
  const [hov, setHov] = useState(false)
  const [heartHov, setHeartHov] = useState(false)
  const [cartHov, setCartHov] = useState(false)
  const [removeHov, setRemoveHov] = useState(false)

  return (
    <div
      style={{
        ...S.card(hov),
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hov ? "translateY(-6px)" : "translateY(0)")
          : "translateY(28px)",
        transition: visible
          ? "all 0.4s cubic-bezier(0.23,1,0.32,1)"
          : `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={S.imgWrap}>
        <img src={BASE_URL + item.image} alt={item.title} style={S.img(hov)} />
        <button
          style={S.heartBtn(true, heartHov)}
          onClick={() => onRemove(item.id)}
          onMouseEnter={() => setHeartHov(true)}
          onMouseLeave={() => setHeartHov(false)}
          title="Remove from wishlist"
        >
          ♥
        </button>
      </div>

      <div style={S.cardBody}>
        <div style={S.productName}>{item.title}</div>
        <div style={S.price}>${item.price}</div>

        <div style={S.btnRow}>
          <button
            style={S.btnCart(cartHov)}
            onClick={() => onAddToCart(item)}
            onMouseEnter={() => setCartHov(true)}
            onMouseLeave={() => setCartHov(false)}
          >
            🛒 Add to Cart
          </button>
          <button
            style={S.btnRemove(removeHov)}
            onClick={() => onRemove(item.id)}
            onMouseEnter={() => setRemoveHov(true)}
            onMouseLeave={() => setRemoveHov(false)}
            title="Remove"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [visible, setVisible] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: "", type: "cart" })
  const [shopBtnHov, setShopBtnHov] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || []
    setWishlist(stored)
    setTimeout(() => setVisible(true), 80)

    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}`
    document.head.appendChild(style)
  }, [])

  const showToast = (msg, type = "cart") => {
    setToast({ show: true, msg, type })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }

  const removeItem = (id) => {
    const updated = wishlist.filter(item => item.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    showToast("Removed from wishlist", "remove")
  }

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const exist = cart.find(item => item.id === product.id)
    if (exist) { exist.qty += 1 } else { cart.push({ ...product, qty: 1 }) }
    localStorage.setItem("cart", JSON.stringify(cart))
    showToast("Added to cart!", "cart")
  }

  return (
    <>
      <div style={S.page}>
        <PageHeader title="Wishlist" breadcrumb="Wishlist" />

        {/* Toast */}
        <div style={S.toast(toast.show, toast.type)}>
          {toast.type === "cart" ? "🛒" : "✕"} {toast.msg}
        </div>

        <div style={{
          ...S.section,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}>

          {/* Header */}
          <div style={S.headerRow}>
            <div>
              <div style={S.eyebrow}>♡ Saved Items</div>
              <h1 style={S.pageTitle}>My Wishlist</h1>
            </div>
            {wishlist.length > 0 && (
              <span style={S.countBadge}>{wishlist.length} item{wishlist.length !== 1 ? "s" : ""}</span>
            )}
          </div>

          {/* Empty State */}
          {wishlist.length === 0 ? (
            <div style={S.empty}>
              <span style={S.emptyIcon}>♡</span>
              <div style={S.emptyTitle}>Your wishlist is empty</div>
              <div style={S.emptyText}>Save items you love and come back to them anytime.</div>
              <a
                href="/shop"
                style={S.shopBtn(shopBtnHov)}
                onMouseEnter={() => setShopBtnHov(true)}
                onMouseLeave={() => setShopBtnHov(false)}
              >
                Browse Products →
              </a>
            </div>
          ) : (
            <div style={S.grid}>
              {wishlist.map((item, i) => (
                <WishCard
                  key={item.id}
                  item={item}
                  index={i}
                  visible={visible}
                  onRemove={removeItem}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <InstagramSection />
    </>
  )
}

export default Wishlist