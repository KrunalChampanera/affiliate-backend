import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { FaUser, FaShoppingCart, FaSearch, FaChevronDown } from "react-icons/fa"
import { useState } from "react"

const categories = [
"Women's Fashion",
"Health & Beauty",
"Watches, Bags, Jewellery",
"Men's Fashion",
"Groceries & Pets",
"Electronic Devices",
"TV & Home Appliances",
"Electronic Accessories",
"Babies & Toys",
"Home & Lifestyle",
"Sports & Outdoor",
"Automotive & Motorbike"
]

const Header = () => {

const { cartCount, cartTotal } = useCart()
const { user } = useAuth()
const navigate = useNavigate()

const [search, setSearch] = useState("")
const [showCategory, setShowCategory] = useState(false)


const handleUserClick = () => {
  if (user) {
    navigate("/profile")
  } else {
    navigate("/account")
  }
}

const handleCartClick = () => {
  if (user) {
    navigate("/cart")
  } else {
    navigate("/account")
  }
}


const handleMyAccountNav = (e) => {
  e.preventDefault()
  if (user) {
    navigate("/profile")
  } else {
    navigate("/account")
  }
}

  return (
    <>

      <style>
        {`
          .navbar .dropdown:hover > .dropdown-menu {
            display: block;
            margin-top: 0;
          }
        `}
      </style>


      <div className="bg-light py-2 border-bottom">
        <div className="container d-flex justify-content-between align-items-center small">
          <div>Extra 10% Off First Order</div>

          <div className="d-flex align-items-center gap-4">

            <div
              className="d-flex align-items-center gap-1"
              style={{ cursor: "pointer" }}
              onClick={handleUserClick}
            >
              <FaUser />

              <span>{user ? `Hello, ${user.name}` : "Hello, Sign In"}</span>
            </div>

            <div
              className="position-relative d-flex align-items-center gap-1"
              style={{ cursor: "pointer" }}
              onClick={handleCartClick}
            >
              <FaShoppingCart />
              <span>My Cart</span>
              {cartCount > 0 && (
                <span
                  className="badge bg-danger position-absolute"
                  style={{ top: "-6px", right: "-10px", fontSize: "10px" }}
                >
                  {cartCount}
                </span>
              )}
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div>English</div>
            <div>USD</div>

          </div>
        </div>
      </div>


      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">

          <Link to="/" className="navbar-brand">
            <img
              src="/images/logo.svg"
              alt="Torado Logo"
              style={{ height: "45px", objectFit: "contain" }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav mx-auto">

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Home +
                </a>
                <ul className="dropdown-menu shadow border-0 rounded-0">
                  <li><Link className="dropdown-item" to="/">Home Demo - 1</Link></li>
                  <li><Link className="dropdown-item" to="/demo2">Home Demo - 2</Link></li>
                  <li><Link className="dropdown-item" to="/demo3">Home Demo - 3</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Pages +
                </a>
                <ul className="dropdown-menu shadow border-0 rounded-0">
                  <li><Link className="dropdown-item" to="/about">About Us</Link></li>
                  <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleMyAccountNav}
                    >
                      {user ? "My Profile" : "My Account"}
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Shop +
                </a>
                <ul className="dropdown-menu shadow border-0 rounded-0">
                  <li><Link className="dropdown-item" to="/shop">Shop</Link></li>
                  <li><Link className="dropdown-item" to="/reviews">Reviews</Link></li>
                  <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                  <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
                  <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/coupon">Coupon</Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Blog +
                </a>
                <ul className="dropdown-menu shadow border-0 rounded-0">
                  <li><Link className="dropdown-item" to="/blog">Blog</Link></li>
                  <li><Link className="dropdown-item" to="/author">Author</Link></li>
                  <li><Link className="dropdown-item" to="/categories">Categories</Link></li>
                  <li><Link className="dropdown-item" to="/tags">Tags</Link></li>
                  <li><Link className="dropdown-item" to="/blog/:id">Blog Details</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>

            </ul>

            <div className="input-group" style={{ maxWidth: 300 }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger">
                <FaSearch />
              </button>
            </div>

          </div>
        </div>
      </nav>


      <div className="container position-relative mt-3">
        <div style={{ width: "250px" }}>
          <button
            className="btn w-100 text-white fw-semibold d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#ff3c2f", borderRadius: 0 }}
            onClick={() => setShowCategory(!showCategory)}
          >
            Category
            <FaChevronDown />
          </button>

          {showCategory && (
            <div
              className="bg-white shadow border position-absolute"
              style={{ width: "250px", zIndex: 9999 }}
            >
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="px-3 py-2 border-bottom"
                  style={{ cursor: "pointer" }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Header