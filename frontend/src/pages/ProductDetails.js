import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap"
import API from "../services/api"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const styles = {
  page: {
    background: "linear-gradient(145deg, #fdf6f0 0%, #fff8f4 40%, #f5f0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1220",
  },
  heroSection: {
    padding: "80px 0 60px",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "absolute",
    top: "-200px",
    right: "-200px",
    width: "700px",
    height: "700px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,90,50,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgGlow2: {
    position: "absolute",
    bottom: "-150px",
    left: "-100px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,100,255,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    background: "#fff0e8",
    border: "1px solid rgba(255,120,60,0.15)",
    boxShadow: "0 40px 80px rgba(200,100,50,0.15)",
    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
    cursor: "zoom-in",
  },
  productImage: {
    width: "100%",
    display: "block",
    transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(255,90,50,0.05) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  infoCol: {
    position: "relative",
    zIndex: 1,
    paddingLeft: "40px",
  },
  categoryBadge: {
    display: "inline-block",
    background: "rgba(255,90,50,0.15)",
    color: "#ff5a32",
    border: "1px solid rgba(255,90,50,0.3)",
    borderRadius: "100px",
    padding: "6px 16px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  productTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: "800",
    lineHeight: "1.15",
    color: "#1a1220",
    letterSpacing: "-0.5px",
  },
  priceWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
  },
  price: {
    fontSize: "38px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ff5a32, #ff9a6c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: "'DM Sans', sans-serif",
  },
  originalPrice: {
    fontSize: "20px",
    color: "rgba(26,18,32,0.35)",
    textDecoration: "line-through",
    fontWeight: "400",
  },
  discountBadge: {
    background: "rgba(0,180,80,0.12)",
    color: "#00a84f",
    border: "1px solid rgba(0,180,80,0.25)",
    borderRadius: "8px",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: "700",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, rgba(255,90,50,0.2), transparent)",
    margin: "24px 0",
  },
  description: {
    color: "rgba(26,18,32,0.6)",
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "32px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "32px",
  },
  stars: {
    color: "#f5a623",
    fontSize: "16px",
    letterSpacing: "2px",
  },
  ratingText: {
    color: "rgba(26,18,32,0.4)",
    fontSize: "13px",
  },
  btnGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  btnCart: {
    background: "#fff",
    border: "1px solid rgba(26,18,32,0.15)",
    color: "#1a1220",
    borderRadius: "14px",
    padding: "14px 28px",
    fontWeight: "600",
    fontSize: "14px",
    letterSpacing: "0.3px",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  btnWishlist: {
    background: "rgba(255,90,50,0.06)",
    border: "1px solid rgba(255,90,50,0.4)",
    color: "#ff5a32",
    borderRadius: "14px",
    padding: "14px 20px",
    fontWeight: "600",
    fontSize: "18px",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    lineHeight: "1",
  },
  btnBuyNow: {
    background: "linear-gradient(135deg, #ff5a32, #ff8a5c)",
    border: "none",
    color: "#fff",
    borderRadius: "14px",
    padding: "14px 32px",
    fontWeight: "700",
    fontSize: "14px",
    letterSpacing: "0.5px",
    boxShadow: "0 8px 32px rgba(255,90,50,0.35)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "36px",
  },
  featureItem: {
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,90,50,0.1)",
    borderRadius: "14px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(255,90,50,0.06)",
  },
  featureIcon: {
    fontSize: "22px",
    marginBottom: "8px",
    display: "block",
  },
  featureLabel: {
    fontSize: "11px",
    color: "rgba(26,18,32,0.5)",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  relatedSection: {
    padding: "60px 0",
    borderTop: "1px solid rgba(255,90,50,0.1)",
    position: "relative",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#ff5a32",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: "clamp(22px, 3vw, 32px)",
    fontWeight: "800",
    fontFamily: "'Playfair Display', serif",
    color: "#1a1220",
    marginBottom: "40px",
    letterSpacing: "-0.3px",
  },
  relatedCard: {
    background: "#fff",
    border: "1px solid rgba(255,90,50,0.1)",
    borderRadius: "20px",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  relatedCardImgWrap: {
    overflow: "hidden",
    position: "relative",
    height: "220px",
    background: "#fdf0ea",
  },
  relatedCardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
  },
  relatedCardBody: {
    padding: "18px 20px 20px",
  },
  relatedCardTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1220",
    marginBottom: "8px",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  relatedCardPrice: {
    fontSize: "18px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ff5a32, #ff9a6c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  relatedCardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, transparent 50%, rgba(10,10,15,0.7) 100%)",
    pointerEvents: "none",
    transition: "opacity 0.3s",
  },
  toast: {
    position: "fixed",
    bottom: "32px",
    right: "32px",
    background: "linear-gradient(135deg, #fff, #fdf6f0)",
    border: "1px solid rgba(0,180,80,0.3)",
    borderRadius: "16px",
    padding: "16px 24px",
    color: "#00a84f",
    fontWeight: "700",
    fontSize: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
  },
  skeletonBox: {
    background: "linear-gradient(90deg, #f0e8e2 25%, #fdf0ea 50%, #f0e8e2 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "12px",
  },
}

const Toast = ({ message, show }) => (
  <div style={{
    ...styles.toast,
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
    pointerEvents: show ? "auto" : "none",
  }}>
    <span>✓</span> {message}
  </div>
)

const RelatedCard = ({ p }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        ...styles.relatedCard,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,90,50,0.15)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.relatedCardImgWrap}>
        <img
          src={BASE_URL + p.image}
          alt={p.title}
          style={{
            ...styles.relatedCardImg,
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div style={styles.relatedCardOverlay} />
      </div>
      <div style={styles.relatedCardBody}>
        <div style={styles.relatedCardTitle}>{p.title}</div>
        <div style={styles.relatedCardPrice}>${p.price}</div>
      </div>
    </div>
  )
}

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [toast, setToast] = useState({ show: false, message: "" })
  const [imageHovered, setImageHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [wishlistActive, setWishlistActive] = useState(false)
  const [btnCartHover, setBtnCartHover] = useState(false)
  const [btnBuyHover, setBtnBuyHover] = useState(false)
  const [btnWishHover, setBtnWishHover] = useState(false)

  useEffect(() => {
    fetchProduct()
    // Google Fonts
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    // CSS keyframes
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      @keyframes fadeSlideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    `
    document.head.appendChild(style)
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`)
      setProduct(res.data)
      const all = await API.get("/products")
      const relatedProducts = all.data.filter(
        p => p.CategoryId === res.data.CategoryId && p.id !== res.data.id
      )
      setRelated(relatedProducts.slice(0, 4))
      setTimeout(() => setVisible(true), 80)
    } catch (e) {
      console.error(e)
    }
  }

  const showToast = (msg) => {
    setToast({ show: true, message: msg })
    setTimeout(() => setToast({ show: false, message: "" }), 2800)
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const exist = cart.find(item => item.id === product.id)
    if (exist) { exist.qty += 1 } else { cart.push({ ...product, qty: 1 }) }
    localStorage.setItem("cart", JSON.stringify(cart))
    showToast("Added to cart!")
  }

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    const exist = wishlist.find(item => item.id === product.id)
    if (!exist) { wishlist.push(product) }
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    setWishlistActive(true)
    showToast("Saved to wishlist!")
  }

  const buyNow = () => {
    addToCart()
    window.location.href = "/cart"
  }

  if (!product) return (
    <div style={styles.page}>
      <div style={{ ...styles.heroSection }}>
        <Container>
          <Row>
            <Col md={6}>
              <div style={{ ...styles.skeletonBox, height: "480px", borderRadius: "24px" }} />
            </Col>
            <Col md={6} style={styles.infoCol}>
              <div style={{ ...styles.skeletonBox, height: "20px", width: "100px", marginBottom: "24px" }} />
              <div style={{ ...styles.skeletonBox, height: "48px", marginBottom: "16px" }} />
              <div style={{ ...styles.skeletonBox, height: "48px", width: "60%", marginBottom: "28px" }} />
              <div style={{ ...styles.skeletonBox, height: "46px", width: "140px", marginBottom: "12px" }} />
              <div style={{ ...styles.skeletonBox, height: "80px", marginBottom: "28px" }} />
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ ...styles.skeletonBox, height: "52px", flex: 1 }} />
                <div style={{ ...styles.skeletonBox, height: "52px", width: "52px" }} />
                <div style={{ ...styles.skeletonBox, height: "52px", flex: 1 }} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )

  return (
    <div style={styles.page}>
      <Toast message={toast.message} show={toast.show} />

      {/* Hero Product Section */}
      <section style={styles.heroSection}>
        <div style={styles.bgGlow} />
        <div style={styles.bgGlow2} />

        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row className="align-items-center">

            {/* Image */}
            <Col md={6} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <div
                style={{
                  ...styles.imageWrapper,
                  transform: imageHovered ? "scale(1.015) rotate(-0.5deg)" : "scale(1) rotate(0deg)",
                }}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                <img
                  src={BASE_URL + product.image}
                  alt={product.title}
                  style={{
                    ...styles.productImage,
                    transform: imageHovered ? "scale(1.06)" : "scale(1)",
                  }}
                />
                <div style={styles.imageOverlay} />
              </div>
            </Col>

            {/* Info */}
            <Col md={6} style={{
              ...styles.infoCol,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.15s",
            }}>
              <div style={styles.categoryBadge}>✦ New Arrival</div>

              <h1 style={styles.productTitle}>{product.title}</h1>

              <div style={styles.ratingRow}>
                <span style={styles.stars}>★★★★★</span>
                <span style={styles.ratingText}>4.9 · 128 Reviews</span>
              </div>

              <div style={styles.priceWrapper}>
                <span style={styles.price}>${product.price}</span>
                <span style={styles.originalPrice}>${(parseFloat(product.price) * 1.3).toFixed(2)}</span>
                <span style={styles.discountBadge}>-24%</span>
              </div>

              <div style={styles.divider} />

              <p style={styles.description}>{product.description}</p>

              <div style={styles.btnGroup}>
                <button
                  style={{
                    ...styles.btnCart,
                    background: btnCartHover ? "#fff8f4" : "#fff",
                    borderColor: btnCartHover ? "rgba(255,90,50,0.3)" : "rgba(26,18,32,0.15)",
                    color: "#1a1220",
                    transform: btnCartHover ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: btnCartHover ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                  }}
                  onClick={addToCart}
                  onMouseEnter={() => setBtnCartHover(true)}
                  onMouseLeave={() => setBtnCartHover(false)}
                >
                  🛒 Add to Cart
                </button>

                <button
                  style={{
                    ...styles.btnWishlist,
                    background: wishlistActive ? "rgba(255,90,50,0.15)" : "transparent",
                    borderColor: wishlistActive ? "#ff5a32" : "rgba(255,90,50,0.4)",
                    transform: btnWishHover ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)",
                    boxShadow: btnWishHover ? "0 8px 24px rgba(255,90,50,0.2)" : "none",
                  }}
                  onClick={addToWishlist}
                  onMouseEnter={() => setBtnWishHover(true)}
                  onMouseLeave={() => setBtnWishHover(false)}
                >
                  {wishlistActive ? "♥" : "♡"}
                </button>

                <button
                  style={{
                    ...styles.btnBuyNow,
                    transform: btnBuyHover ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
                    boxShadow: btnBuyHover
                      ? "0 16px 48px rgba(255,90,50,0.45)"
                      : "0 8px 32px rgba(255,90,50,0.3)",
                  }}
                  onClick={buyNow}
                  onMouseEnter={() => setBtnBuyHover(true)}
                  onMouseLeave={() => setBtnBuyHover(false)}
                >
                  Buy Now →
                </button>
              </div>

              {/* Feature Pills */}
              <div style={styles.featuresGrid}>
                {[
                  { icon: "🚚", label: "Free Delivery" },
                  { icon: "↩️", label: "Easy Returns" },
                  { icon: "🔒", label: "Secure Pay" },
                ].map((f, i) => (
                  <div key={i} style={{
                    ...styles.featureItem,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${0.4 + i * 0.08}s`,
                  }}>
                    <span style={styles.featureIcon}>{f.icon}</span>
                    <div style={styles.featureLabel}>{f.label}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={styles.relatedSection}>
          <Container>
            <div style={styles.sectionLabel}>You Might Also Like</div>
            <div style={styles.sectionTitle}>Related Products</div>

            <Row className="g-4">
              {related.map((p, i) => (
                <Col md={3} sm={6} key={p.id} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `all 0.7s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.1}s`,
                }}>
                  <RelatedCard p={p} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <InstagramSection />
    </div>
  )
}

export default ProductDetails