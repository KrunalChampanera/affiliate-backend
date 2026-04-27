import { useState, useEffect } from "react"
import { Container, Row, Col, Button, Table, Alert, Spinner, Card, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"
import API from "../services/api"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const Cart = () => {

  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [showLoginMsg, setShowLoginMsg] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [coupons, setCoupons] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || []
    setCart(stored)
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/coupons")
      setCoupons(res.data || [])
    } catch (err) {
      console.error("Error fetching coupons:", err)
    }
  }

  const updateQty = (id, type) => {

    let updated = cart.map(item => {

      if (item.id === id) {

        if (type === "inc") item.qty += 1

        if (type === "dec" && item.qty > 1) item.qty -= 1

      }

      return item

    })

    setCart(updated)

    localStorage.setItem("cart", JSON.stringify(updated))

  }

  const removeItem = (id) => {

    const updated = cart.filter(item => item.id !== id)

    setCart(updated)

    localStorage.setItem("cart", JSON.stringify(updated))

    // Reset discount if no eligible products
    if (appliedCoupon) {
      validateCoupon(appliedCoupon.code, updated)
    }

  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const shipping = 30

  const total = subtotal + shipping - discount

  const handleCheckout = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {

      setShowLoginMsg(true)

    } else {

      window.location.href = "/checkout"

    }

  }

  const validateCoupon = (couponCode, cartItems = cart) => {
    
    // Check if coupon exists
    const foundCoupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase())

    if (!foundCoupon) {
      setError("❌ Invalid coupon code")
      setSuccess("")
      setDiscount(0)
      setAppliedCoupon(null)
      return false
    }

    // Check if coupon is active
    if (!foundCoupon.isActive) {
      setError("❌ This coupon is not active")
      setSuccess("")
      setDiscount(0)
      setAppliedCoupon(null)
      return false
    }

    // Check if coupon is expired
    if (foundCoupon.expiryDate && new Date() > new Date(foundCoupon.expiryDate)) {
      setError("❌ This coupon has expired")
      setSuccess("")
      setDiscount(0)
      setAppliedCoupon(null)
      return false
    }

    // Find eligible products (products with this coupon)
    const eligibleProducts = cartItems.filter(item => item.couponId === foundCoupon.id)

    if (eligibleProducts.length === 0) {
      setError("❌ This coupon is not applicable to any products in your cart")
      setSuccess("")
      setDiscount(0)
      setAppliedCoupon(null)
      return false
    }

    // Calculate discount only on eligible products
    const eligibleSubtotal = eligibleProducts.reduce((acc, item) => acc + item.price * item.qty, 0)
    
    let discountAmount = 0
    
    if (foundCoupon.discountType === "percentage") {
      discountAmount = (eligibleSubtotal * foundCoupon.discountValue) / 100
    } else {
      discountAmount = foundCoupon.discountValue
    }

    setDiscount(discountAmount)
    setAppliedCoupon(foundCoupon)
    setError("")
    setSuccess(`✅ Coupon "${couponCode}" applied! Save $${discountAmount.toFixed(2)}`)

    return true
  }

  const applyCoupon = async () => {

    if (!coupon.trim()) {
      setError("❌ Please enter a coupon code")
      setSuccess("")
      return
    }

    setLoading(true)

    try {
      validateCoupon(coupon.trim())
    } catch (err) {
      setError("❌ Error applying coupon")
      setSuccess("")
    } finally {
      setLoading(false)
    }

  }

  const removeCoupon = () => {
    setCoupon("")
    setDiscount(0)
    setAppliedCoupon(null)
    setError("")
    setSuccess("")
  }

  const continueShopping = () => {
    navigate("/shop")
  }

  return (
    <>
      <PageHeader title="Shopping Cart" breadcrumb="Cart" />

      <section style={{
        padding: "10px 20px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh"
      }}>

        <Container fluid style={{ maxWidth: "1200px" }}>

          {cart.length === 0 ? (
            // Empty Cart View
            <Row style={{ marginBottom: "60px" }}>
              <Col lg={8} className="mx-auto">
                <Card style={{
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  padding: "60px 40px",
                  textAlign: "center"
                }}>
                  <div style={{ marginBottom: "30px" }}>
                    <div style={{
                      fontSize: "4rem",
                      marginBottom: "20px"
                    }}>🛒</div>
                    <h2 style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "10px"
                    }}>
                      Your Cart is Empty
                    </h2>
                    <p style={{
                      fontSize: "1.1rem",
                      color: "#666",
                      marginBottom: "30px"
                    }}>
                      Add some amazing products to get started!
                    </p>
                  </div>

                  <Button
                    onClick={continueShopping}
                    style={{
                      background: "linear-gradient(135deg, #ff6b35, #e85a2a)",
                      border: "none",
                      padding: "14px 50px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)"
                      e.target.style.boxShadow = "0 8px 20px rgba(255, 107, 53, 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = "none"
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <Row style={{ gap: "30px" }}>

                {/* Cart Items */}
                <Col lg={8}>
                  <Card style={{
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                    overflow: "hidden"
                  }}>

                    {/* Cart Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #ff6b35, #e85a2a)",
                      color: "white",
                      padding: "20px 25px",
                      borderBottom: "none"
                    }}>
                      <h5 style={{ margin: 0, fontWeight: "600" }}>
                        Shopping Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})
                      </h5>
                    </div>

                    {/* Cart Items */}
                    <div style={{ overflowX: "auto" }}>
                      <Table responsive style={{ margin: 0 }}>
                        <thead style={{ background: "#f8f9fa" }}>
                          <tr>
                            <th style={{ fontWeight: "600", color: "#333", border: "none", padding: "15px" }}>Product</th>
                            <th style={{ fontWeight: "600", color: "#333", border: "none", padding: "15px" }}>Name</th>
                            <th style={{ fontWeight: "600", color: "#333", border: "none", padding: "15px" }}>Price</th>
                            <th style={{ fontWeight: "600", color: "#333", border: "none", padding: "15px" }}>Quantity</th>
                            <th style={{ fontWeight: "600", color: "#333", border: "none", padding: "15px" }}>Total</th>
                            <th style={{ fontWeight: "600", color: "#333", border: "none", padding: "15px" }}>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cart.map((item, index) => (
                            <tr key={item.id} style={{
                              borderBottom: index < cart.length - 1 ? "1px solid #f0f0f0" : "none",
                              transition: "background-color 0.2s ease"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                            >
                              {/* Product Image */}
                              <td style={{ padding: "15px", border: "none" }}>
                                {item.image && (
                                  <img
                                    src={BASE_URL + item.image}
                                    alt={item.title}
                                    style={{
                                      width: "70px",
                                      height: "70px",
                                      borderRadius: "8px",
                                      objectFit: "contain",
                                      background: "#f0f2f5",
                                      padding: "5px"
                                    }}
                                  />
                                )}
                              </td>

                              {/* Product Name */}
                              <td style={{
                                padding: "15px",
                                border: "none",
                                fontWeight: "500",
                                color: "#1a1a1a"
                              }}>
                                {item.title}
                              </td>

                              {/* Price */}
                              <td style={{
                                padding: "15px",
                                border: "none",
                                fontWeight: "600",
                                color: "#ff6b35"
                              }}>
                                ${item.price?.toFixed(2)}
                              </td>

                              {/* Quantity */}
                              <td style={{ padding: "15px", border: "none" }}>
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px"
                                }}>
                                  <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => updateQty(item.id, "dec")}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      padding: "0",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: "600"
                                    }}
                                  >
                                    −
                                  </Button>
                                  <span style={{
                                    minWidth: "30px",
                                    textAlign: "center",
                                    fontWeight: "600"
                                  }}>
                                    {item.qty}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => updateQty(item.id, "inc")}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      padding: "0",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: "600"
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                              </td>

                              {/* Total */}
                              <td style={{
                                padding: "15px",
                                border: "none",
                                fontWeight: "700",
                                color: "#1a1a1a"
                              }}>
                                ${(item.price * item.qty)?.toFixed(2)}
                              </td>

                              {/* Remove Button */}
                              <td style={{ padding: "15px", border: "none" }}>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  style={{
                                    fontWeight: "600",
                                    padding: "6px 16px"
                                  }}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </Table>
                    </div>
                  </Card>

                  {/* Coupon Section */}
                  <Card style={{
                    marginTop: "25px",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)"
                  }}>
                    <Card.Body style={{ padding: "25px" }}>
                      <h5 style={{
                        marginBottom: "20px",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        fontSize: "1.1rem"
                      }}>
                        🎁 Apply Coupon Code
                      </h5>

                      <div style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "15px"
                      }}>
                        <input
                          type="text"
                          placeholder="Enter coupon code (e.g., SAVE20)"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                          onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                          className="form-control"
                          disabled={appliedCoupon !== null}
                          style={{
                            padding: "12px 15px",
                            fontSize: "0.95rem",
                            borderRadius: "8px",
                            border: "1px solid #ddd"
                          }}
                        />

                        <Button
                          onClick={applyCoupon}
                          disabled={loading || appliedCoupon !== null}
                          style={{
                            background: "#007bff",
                            border: "none",
                            padding: "12px 30px",
                            fontWeight: "600",
                            borderRadius: "8px",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {loading ? <Spinner animation="border" size="sm" /> : "Apply"}
                        </Button>

                        {appliedCoupon && (
                          <Button
                            variant="outline-danger"
                            onClick={removeCoupon}
                            style={{
                              fontWeight: "600",
                              borderRadius: "8px",
                              padding: "12px 20px"
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      {/* Error Message */}
                      {error && (
                        <Alert variant="danger" style={{
                          marginBottom: "0",
                          borderRadius: "8px",
                          border: "none"
                        }}>
                          {error}
                        </Alert>
                      )}

                      {/* Success Message */}
                      {success && (
                        <Alert variant="success" style={{
                          marginBottom: "0",
                          borderRadius: "8px",
                          border: "none"
                        }}>
                          {success}
                        </Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                {/* Cart Summary Sidebar */}
                <Col lg={4}>
                  <Card style={{
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                    position: "sticky",
                    top: "20px"
                  }}>
                    {/* Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #1a1a1a, #333)",
                      color: "white",
                      padding: "20px 25px",
                      borderBottom: "none",
                      borderRadius: "12px 12px 0 0"
                    }}>
                      <h5 style={{ margin: 0, fontWeight: "700" }}>Order Summary</h5>
                    </div>

                    <Card.Body style={{ padding: "25px" }}>
                      {/* Subtotal */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "15px",
                        paddingBottom: "15px",
                        borderBottom: "1px solid #f0f0f0"
                      }}>
                        <span style={{ color: "#666", fontWeight: "500" }}>Subtotal:</span>
                        <span style={{ fontWeight: "600", color: "#1a1a1a" }}>${subtotal.toFixed(2)}</span>
                      </div>

                      {/* Shipping */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "15px",
                        paddingBottom: "15px",
                        borderBottom: "1px solid #f0f0f0"
                      }}>
                        <span style={{ color: "#666", fontWeight: "500" }}>Shipping:</span>
                        <span style={{ fontWeight: "600", color: "#1a1a1a" }}>${shipping}</span>
                      </div>

                      {/* Discount */}
                      {discount > 0 && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                          paddingBottom: "15px",
                          borderBottom: "1px solid #f0f0f0",
                          color: "#28a745"
                        }}>
                          <span style={{ fontWeight: "500" }}>
                            Discount {appliedCoupon && `(${appliedCoupon.code})`}:
                          </span>
                          <span style={{ fontWeight: "700" }}>-${discount.toFixed(2)}</span>
                        </div>
                      )}

                      {/* Total */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "25px",
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        paddingTop: "15px"
                      }}>
                        <span style={{ color: "#1a1a1a" }}>Total:</span>
                        <span style={{ color: "#ff6b35" }}>${total.toFixed(2)}</span>
                      </div>

                      {/* Checkout Button */}
                      <Button
                        onClick={handleCheckout}
                        style={{
                          width: "100%",
                          background: "linear-gradient(135deg, #28a745, #1e7e34)",
                          border: "none",
                          padding: "14px",
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "white",
                          borderRadius: "8px",
                          marginBottom: "12px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)"
                          e.target.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.3)"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)"
                          e.target.style.boxShadow = "none"
                        }}
                      >
                        Proceed to Checkout
                      </Button>

                      {/* Continue Shopping Button */}
                      <Button
                        variant="outline-secondary"
                        onClick={continueShopping}
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          borderRadius: "8px"
                        }}
                      >
                        Continue Shopping
                      </Button>

                      {/* Login Message */}
                      {showLoginMsg && (
                        <Alert variant="warning" style={{
                          marginTop: "15px",
                          marginBottom: "0",
                          borderRadius: "8px",
                          border: "none"
                        }}>
                          <strong style={{ color: "#856404" }}>⚠️ Login Required</strong>
                          <p style={{
                            margin: "8px 0 0 0",
                            color: "#856404",
                            fontSize: "0.9rem"
                          }}>
                            Sign in to place your order
                          </p>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate("/account")}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              fontWeight: "600"
                            }}
                          >
                            Go to Account
                          </Button>
                        </Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

              </Row>
            </>
          )}

        </Container>

      </section>

      <InstagramSection />

    </>
  )

}

export default Cart