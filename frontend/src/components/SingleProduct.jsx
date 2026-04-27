import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import ProductTabsSection from "./ProductTabsSection"
import InstagramSection from "./InstagramSection"
import API from "../services/api"

const BASE_URL = "http://https://affiliate-backend-vm5i.onrender.com/uploads/"

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`)
      setProduct(res.data)
      
      // Fetch related products from same category
      const allProducts = await API.get("/products")
      const related = allProducts.data.filter(
        p => p.CategoryId === res.data.CategoryId && p.id !== res.data.id
      ).slice(0, 3)
      setRelatedProducts(related)
      
      setError(null)
    } catch (err) {
      console.error("Fetch Product Error:", err)
      setError("Product not found")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.qty += quantity
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        couponId: product.couponId,
        qty: quantity
      })
    }
    
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${product.title} added to cart!`)
    setQuantity(1)
  }

  const handleAddToWishlist = () => {
    if (!product) return
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    
    if (!wishlist.find(item => item.id === product.id)) {
      wishlist.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      })
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      alert(`${product.title} added to wishlist!`)
    } else {
      alert("Product already in wishlist!")
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate("/cart")
  }

  if (loading) {
    return (
      <section style={{
        padding: "120px 0",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Container>
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" style={{ color: "#ff6b35", marginBottom: "20px" }} />
            <p style={{ color: "#666", fontSize: "1.1rem" }}>Loading product details...</p>
          </div>
        </Container>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section style={{
        padding: "120px 0",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Container>
          <Card style={{
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            padding: "40px"
          }}>
            <Alert variant="danger" style={{
              textAlign: "center",
              margin: 0,
              border: "none",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>❌</div>
              <h4>{error || "Product not found"}</h4>
              <p style={{ marginBottom: "20px", color: "#666" }}>
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Button
                onClick={() => navigate("/shop")}
                style={{
                  background: "#ff6b35",
                  border: "none",
                  padding: "12px 30px",
                  fontWeight: "600"
                }}
              >
                Back to Shop
              </Button>
            </Alert>
          </Card>
        </Container>
      </section>
    )
  }

  return (
    <>
      {/* Product Details Section */}
      <section style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh"
      }}>
        <Container style={{ maxWidth: "1200px" }}>
          <Card style={{
            border: "none",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            marginBottom: "50px"
          }}>
            <Card.Body style={{ padding: "40px" }}>
              <Row style={{ alignItems: "center", gap: "40px" }}>
                
                {/* Product Image */}
                <Col lg={5} md={6} style={{ marginBottom: "30px" }}>
                  <Card style={{
                    border: "none",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                    background: "#fff"
                  }}>
                    <div style={{
                      width: "100%",
                      height: "450px",
                      background: "#f8f9fa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      {product.image ? (
                        <img
                          src={`${BASE_URL}${product.image}`}
                          alt={product.title}
                          style={{
                            maxWidth: "95%",
                            maxHeight: "95%",
                            objectFit: "contain"
                          }}
                          onError={(e) => {
                            e.target.style.display = "none"
                          }}
                        />
                      ) : (
                        <div style={{
                          color: "#999",
                          fontSize: "18px",
                          textAlign: "center"
                        }}>
                          📷 No Image Available
                        </div>
                      )}

                      {/* Product Badges */}
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                      }}>
                        {product.isNew && (
                          <Badge bg="success" style={{ fontSize: "0.8rem", padding: "8px 12px" }}>
                            ✨ NEW
                          </Badge>
                        )}
                        {product.isTopDeal && (
                          <Badge bg="danger" style={{ fontSize: "0.8rem", padding: "8px 12px" }}>
                            🔥 TOP DEAL
                          </Badge>
                        )}
                        {product.isPopular && (
                          <Badge bg="warning" text="dark" style={{ fontSize: "0.8rem", padding: "8px 12px" }}>
                            ⭐ POPULAR
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>

                {/* Product Info */}
                <Col lg={7} md={6}>
                  <div>
                    {/* Breadcrumb */}
                    <div style={{
                      fontSize: "0.9rem",
                      color: "#999",
                      marginBottom: "15px"
                    }}>
                      📍 {product.Category?.name || "Category"} / {product.title}
                    </div>

                    {/* Title */}
                    <h1 style={{
                      fontSize: "2.5rem",
                      fontWeight: "800",
                      color: "#1a1a1a",
                      marginBottom: "20px",
                      lineHeight: "1.2"
                    }}>
                      {product.title}
                    </h1>

                    {/* Rating and Reviews */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "25px"
                    }}>
                      <div style={{
                        fontSize: "1.3rem",
                        color: "#ffc107"
                      }}>
                        {'⭐'.repeat(Math.round(product.rating || 4))}
                      </div>
                      <span style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#1a1a1a"
                      }}>
                        {product.rating?.toFixed(1) || "4.5"} / 5.0
                      </span>
                      <span style={{
                        color: "#999",
                        fontSize: "0.9rem"
                      }}>
                        (128 reviews)
                      </span>
                    </div>

                    {/* Price Section */}
                    <div style={{
                      background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                      padding: "20px",
                      borderRadius: "12px",
                      marginBottom: "25px"
                    }}>
                      <h2 style={{
                        fontSize: "2.8rem",
                        color: "#ff6b35",
                        fontWeight: "800",
                        margin: "0 0 10px 0"
                      }}>
                        ${product.price?.toFixed(2)}
                      </h2>
                      {product.oldPrice && (
                        <p style={{
                          color: "#999",
                          textDecoration: "line-through",
                          fontSize: "1.1rem",
                          margin: 0
                        }}>
                          Old Price: ${product.oldPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div style={{
                      marginBottom: "25px",
                      paddingBottom: "25px",
                      borderBottom: "1px solid #eee"
                    }}>
                      <h5 style={{
                        fontWeight: "700",
                        marginBottom: "12px",
                        color: "#1a1a1a"
                      }}>
                        📝 Description
                      </h5>
                      <p style={{
                        color: "#666",
                        lineHeight: "1.7",
                        marginBottom: "0",
                        fontSize: "0.95rem"
                      }}>
                        {product.description || "No description available"}
                      </p>
                    </div>

                    {/* Coupon Banner */}
                    {product.Coupon && (
                      <div style={{
                        background: "linear-gradient(135deg, #fff3cd 0%, #fff9e6 100%)",
                        padding: "18px",
                        borderRadius: "10px",
                        marginBottom: "25px",
                        borderLeft: "5px solid #ffc107",
                        border: "2px solid #ffc107"
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "8px"
                        }}>
                          <span style={{ fontSize: "1.5rem" }}>💰</span>
                          <strong style={{ color: "#f77f00", fontSize: "1.1rem" }}>
                            Special Offer Available!
                          </strong>
                        </div>
                        <p style={{
                          margin: "0",
                          color: "#856404",
                          fontSize: "0.95rem"
                        }}>
                          Use coupon code: <strong style={{ fontSize: "1.1rem", fontFamily: "monospace" }}>
                            {product.Coupon.code}
                          </strong> to save{" "}
                          <strong>
                            {product.Coupon.discountType === "percentage"
                              ? `${product.Coupon.discountValue}%`
                              : `$${product.Coupon.discountValue}`}
                          </strong>
                        </p>
                      </div>
                    )}

                    {/* Quantity Selector */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginBottom: "30px"
                    }}>
                      <label style={{
                        fontWeight: "700",
                        color: "#1a1a1a",
                        fontSize: "1rem"
                      }}>
                        Quantity:
                      </label>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        overflow: "hidden",
                        background: "#f8f9fa"
                      }}>
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          style={{
                            background: "none",
                            border: "none",
                            padding: "10px 14px",
                            cursor: "pointer",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#666"
                          }}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          style={{
                            border: "none",
                            background: "white",
                            width: "60px",
                            textAlign: "center",
                            outline: "none",
                            fontSize: "1rem",
                            fontWeight: "600"
                          }}
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: "10px 14px",
                            cursor: "pointer",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#666"
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap"
                    }}>
                      <Button
                        onClick={handleAddToCart}
                        style={{
                          background: "linear-gradient(135deg, #007bff, #0056b3)",
                          border: "none",
                          padding: "14px 40px",
                          fontSize: "1.05rem",
                          fontWeight: "700",
                          borderRadius: "8px",
                          color: "white",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)"
                          e.target.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.3)"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)"
                          e.target.style.boxShadow = "none"
                        }}
                      >
                        🛒 Add To Cart
                      </Button>

                      <Button
                        onClick={handleAddToWishlist}
                        style={{
                          background: "white",
                          border: "2px solid #ff6b35",
                          color: "#ff6b35",
                          padding: "12px 38px",
                          fontSize: "1.05rem",
                          fontWeight: "700",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#fff3e0"
                          e.target.style.transform = "scale(1.02)"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "white"
                          e.target.style.transform = "scale(1)"
                        }}
                      >
                        ❤️ Wishlist
                      </Button>

                      <Button
                        onClick={handleBuyNow}
                        style={{
                          background: "linear-gradient(135deg, #28a745, #1e7e34)",
                          border: "none",
                          padding: "14px 40px",
                          fontSize: "1.05rem",
                          fontWeight: "700",
                          borderRadius: "8px",
                          color: "white",
                          cursor: "pointer",
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
                        ⚡ Buy Now
                      </Button>
                    </div>

                    {/* Product Details Grid */}
                    <div style={{
                      marginTop: "30px",
                      paddingTop: "30px",
                      borderTop: "1px solid #eee",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px"
                    }}>
                      <div>
                        <span style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "#999",
                          marginBottom: "5px"
                        }}>
                          Category
                        </span>
                        <strong style={{ color: "#1a1a1a", fontSize: "1rem" }}>
                          {product.Category?.name || "Uncategorized"}
                        </strong>
                      </div>
                      <div>
                        <span style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "#999",
                          marginBottom: "5px"
                        }}>
                          Stock Status
                        </span>
                        <strong style={{
                          color: "#28a745",
                          fontSize: "1rem"
                        }}>
                          ✓ In Stock
                        </strong>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Product Tabs Section */}
      <ProductTabsSection product={product} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{
          padding: "80px 20px",
          background: "white"
        }}>
          <Container style={{ maxWidth: "1200px" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <h2 style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#1a1a1a",
                marginBottom: "10px"
              }}>
                Related Products
              </h2>
              <p style={{
                fontSize: "1.1rem",
                color: "#666"
              }}>
                You might also like these items
              </p>
            </div>

            <Row style={{ gap: "20px", justifyContent: "center" }}>
              {relatedProducts.map((relatedProduct) => (
                <Col lg={3} md={5} sm={6} key={relatedProduct.id} style={{ marginBottom: "20px" }}>
                  <Card
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      height: "100%",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)"
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.06)"
                    }}
                  >
                    {/* Product Image */}
                    <div style={{
                      position: "relative",
                      height: "250px",
                      overflow: "hidden",
                      background: "#f8f9fa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {relatedProduct.image ? (
                        <img
                          src={`${BASE_URL}${relatedProduct.image}`}
                          alt={relatedProduct.title}
                          style={{
                            maxWidth: "95%",
                            maxHeight: "95%",
                            objectFit: "contain"
                          }}
                        />
                      ) : (
                        <div style={{ color: "#999", fontSize: "14px" }}>No Image</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <Card.Body style={{ padding: "18px" }}>
                      <h6 style={{
                        fontSize: "0.95rem",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "12px",
                        lineHeight: "1.3",
                        minHeight: "40px"
                      }}>
                        {relatedProduct.title}
                      </h6>

                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px"
                      }}>
                        <span style={{
                          fontSize: "1.2rem",
                          fontWeight: "800",
                          color: "#ff6b35"
                        }}>
                          ${relatedProduct.price?.toFixed(2)}
                        </span>
                        <span style={{
                          fontSize: "0.85rem",
                          color: "#ffc107",
                          fontWeight: "600"
                        }}>
                          ⭐ {relatedProduct.rating?.toFixed(1) || "4.5"}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const cart = JSON.parse(localStorage.getItem("cart")) || []
                          const existingItem = cart.find(item => item.id === relatedProduct.id)
                          if (existingItem) {
                            existingItem.qty += 1
                          } else {
                            cart.push({
                              id: relatedProduct.id,
                              title: relatedProduct.title,
                              price: relatedProduct.price,
                              image: relatedProduct.image,
                              couponId: relatedProduct.couponId,
                              qty: 1
                            })
                          }
                          localStorage.setItem("cart", JSON.stringify(cart))
                          alert(`${relatedProduct.title} added to cart!`)
                        }}
                        style={{
                          width: "100%",
                          background: "#007bff",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          borderRadius: "6px",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#0056b3"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#007bff"
                        }}
                      >
                        + Add to Cart
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Instagram Section */}
      <InstagramSection />
    </>
  )
}

export default Details