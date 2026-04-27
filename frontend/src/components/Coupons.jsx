import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Card, Alert, Spinner, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const Coupons = () => {
  const navigate = useNavigate()
  const [coupons, setCoupons] = useState([])
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState(null)
  const [selectedCoupon, setSelectedCoupon] = useState(null)

  useEffect(() => {
    fetchCoupons()
    fetchProducts()
  }, [])

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/coupons")
      setCoupons(res.data)
      setError(null)
    } catch (err) {
      console.error("Fetch Coupons Error:", err)
      setError("Failed to load coupons")
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products")
      setProducts(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error("Fetch Products Error:", err)
      setProducts([])
    }
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getDiscountLabel = (discountType, discountValue) => {
    if (discountType === "percentage") {
      return `${discountValue}%`
    }
    return `$${discountValue}`
  }

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false
    return new Date() > new Date(expiryDate)
  }

  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getProductsForCoupon = (couponId) => {
    return products.filter(p => p.couponId === couponId)
  }

  const calculateDiscount = (price, discountType, discountValue) => {
    if (discountType === "percentage") {
      return (price * discountValue) / 100
    }
    return discountValue
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  if (loading) {
    return (
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)",
        padding: "80px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Container>
          <div style={{
            textAlign: "center",
            padding: "80px 40px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
          }}>
            <Spinner animation="border" style={{ color: "#ff6b35", marginBottom: "20px" }} />
            <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
              Loading amazing deals...
            </p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)",
      padding: "80px 20px",
      position: "relative"
    }}>
      {/* Background Gradient */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 78, 137, 0.05) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            color: "#1a1a1a",
            marginBottom: "15px",
            letterSpacing: "-1px",
            lineHeight: "1.1"
          }}>
            <span style={{ color: "#ff6b35", position: "relative", display: "inline-block" }}>
              Exclusive
              <div style={{
                position: "absolute",
                bottom: "-8px",
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #ff6b35, #ffd60a)",
                borderRadius: "2px"
              }}></div>
            </span>
            {" "}Deals & Offers
          </h1>
          <p style={{
            fontSize: "1.2rem",
            color: "#666",
            fontWeight: "400",
            marginBottom: 0
          }}>
            Get exclusive discounts on top products
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" style={{
            background: "linear-gradient(135deg, #ffeaea 0%, #ffe0e0 100%)",
            border: "1px solid #d62828",
            borderLeft: "4px solid #d62828",
            marginBottom: "30px"
          }}>
            ⚠️ {error}
          </Alert>
        )}

        {/* Coupons Grid */}
        {coupons.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px 40px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎁</div>
            <h3 style={{ fontSize: "1.8rem", color: "#1a1a1a", marginBottom: "10px", fontWeight: "700" }}>
              No Active Coupons
            </h3>
            <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
              Check back soon for exclusive offers!
            </p>
          </div>
        ) : (
          <div>
            {coupons.map((coupon, index) => {
              const daysLeft = getDaysLeft(coupon.expiryDate)
              const expired = isExpired(coupon.expiryDate)
              const couponProducts = getProductsForCoupon(coupon.id)

              return (
                <div key={coupon.id} style={{
                  marginBottom: "50px",
                  animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                }}>
                  <style>{`
                    @keyframes slideIn {
                      from {
                        opacity: 0;
                        transform: translateY(30px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>

                  {/* Coupon Header Card */}
                  <Card style={{
                    background: "linear-gradient(135deg, #ff6b35, #e85a2a)",
                    color: "white",
                    border: "none",
                    borderRadius: "16px",
                    marginBottom: "30px",
                    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.3)",
                    overflow: "hidden"
                  }}>
                    <Card.Body style={{ padding: "30px" }}>
                      <Row style={{ alignItems: "center" }}>
                        <Col lg={8}>
                          <h3 style={{ marginBottom: "10px", fontWeight: "700" }}>
                            {getDiscountLabel(coupon.discountType, coupon.discountValue)} Discount
                          </h3>
                          <div style={{ fontSize: "1.8rem", fontWeight: "900", fontFamily: "'Courier New', monospace", marginBottom: "15px" }}>
                            {coupon.code}
                          </div>
                          <div>
                            {expired ? (
                              <Badge bg="danger">Expired</Badge>
                            ) : daysLeft <= 3 ? (
                              <Badge bg="warning" text="dark">{daysLeft} day{daysLeft !== 1 ? "s" : ""} left</Badge>
                            ) : (
                              <Badge bg="success">{daysLeft} day{daysLeft !== 1 ? "s" : ""} left</Badge>
                            )}
                          </div>
                        </Col>
                        <Col lg={4} style={{ textAlign: "right" }}>
                          <Button
                            onClick={() => !expired && copyCode(coupon.code)}
                            disabled={expired}
                            style={{
                              background: expired ? "#cccccc" : copiedCode === coupon.code ? "#06a77d" : "white",
                              color: expired ? "white" : copiedCode === coupon.code ? "white" : "#ff6b35",
                              border: "none",
                              borderRadius: "10px",
                              padding: "12px 30px",
                              fontSize: "1rem",
                              fontWeight: "600",
                              cursor: expired ? "not-allowed" : "pointer",
                              opacity: expired ? 0.6 : 1
                            }}
                          >
                            {copiedCode === coupon.code ? "✓ Copied!" : expired ? "Expired" : "Copy Code"}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  {/* Products with this Coupon */}
                  {couponProducts.length > 0 ? (
                    <div>
                      <h5 style={{ marginBottom: "20px", color: "#1a1a1a", fontWeight: "700" }}>
                        🛍️ Available Products ({couponProducts.length})
                      </h5>
                      <Row style={{ gap: "20px" }}>
                        {couponProducts.map((product) => {
                          const discount = calculateDiscount(
                            product.price,
                            coupon.discountType,
                            coupon.discountValue
                          )
                          const finalPrice = product.price - discount

                          return (
                            <Col lg={3} md={6} sm={12} key={product.id} style={{
                              marginBottom: "20px"
                            }}>
                              <Card 
                                style={{
                                  background: "white",
                                  borderRadius: "12px",
                                  overflow: "hidden",
                                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                                  transition: "all 0.3s ease",
                                  border: "1px solid rgba(0, 0, 0, 0.05)",
                                  height: "100%",
                                  cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "translateY(-5px)"
                                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12)"
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "translateY(0)"
                                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)"
                                }}
                                onClick={() => handleProductClick(product.id)}
                              >
                                {/* Product Image */}
                                <div style={{
                                  position: "relative",
                                  height: "200px",
                                  overflow: "hidden",
                                  background: "#f0f2f5"
                                }}>
                                  {product.image ? (
                                    <img
                                      src={`${BASE_URL}${product.image}`}
                                      alt={product.title}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                      }}
                                      onError={(e) => {
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f2f5' width='200' height='200'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"
                                      }}
                                    />
                                  ) : (
                                    <div style={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      background: "#f0f2f5",
                                      color: "#999",
                                      fontSize: "14px"
                                    }}>
                                      No Image
                                    </div>
                                  )}
                                  {product.isNew && (
                                    <Badge bg="success" style={{ position: "absolute", top: "10px", left: "10px" }}>
                                      NEW
                                    </Badge>
                                  )}
                                  {product.isTopDeal && (
                                    <Badge bg="danger" style={{ position: "absolute", top: "10px", right: "10px" }}>
                                      TOP DEAL
                                    </Badge>
                                  )}
                                </div>

                                {/* Product Info */}
                                <Card.Body style={{ padding: "15px" }}>
                                  <h6 style={{
                                    fontSize: "0.95rem",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "10px",
                                    lineHeight: "1.3",
                                    minHeight: "40px"
                                  }}>
                                    {product.title}
                                  </h6>

                                  {/* Price */}
                                  <div style={{ marginBottom: "10px" }}>
                                    <span style={{
                                      fontSize: "1.3rem",
                                      fontWeight: "700",
                                      color: "#06a77d"
                                    }}>
                                      ${finalPrice.toFixed(2)}
                                    </span>
                                    <span style={{
                                      fontSize: "0.85rem",
                                      color: "#999",
                                      textDecoration: "line-through",
                                      marginLeft: "10px"
                                    }}>
                                      ${product.price.toFixed(2)}
                                    </span>
                                  </div>

                                  {/* Discount Info */}
                                  <div style={{
                                    background: "#fff3cd",
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    color: "#f77f00",
                                    textAlign: "center"
                                  }}>
                                    Save ${discount.toFixed(2)}
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                        })}
                      </Row>
                    </div>
                  ) : (
                    <div style={{
                      background: "white",
                      padding: "30px",
                      borderRadius: "12px",
                      textAlign: "center",
                      color: "#666",
                      marginBottom: "30px"
                    }}>
                      No products available for this coupon
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}

export default Coupons