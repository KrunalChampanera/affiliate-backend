import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import AboutUs from "./pages/Aboutus"
import Faq from "./pages/Faq"
import MyAccount from "./pages/MyAccount"
import Profile from "./pages/Profile"
import Terms from "./components/Terms"
import Shop from "./components/Shop"
import Details from "./components/SingleProduct"
import Reviews from "./components/Reviews"
import ReviewDetails from "./components/ReviewDetails"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails.js"
import Wishlist from "./pages/Wishlist.jsx"
import Checkout from "./pages/Checkout.jsx"
import Coupons from "./components/Coupons.jsx"
import Contact from "./pages/Contact.jsx"
import BlogPage from "./pages/BlogPage.jsx"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/Faq" element={<Faq/>} />
            <Route path="/account" element={<MyAccount/>} />
            <Route path="/terms" element={<Terms/>} />
            <Route path="/profile" element={<Profile/>} />

            <Route path="/shop" element={<Shop/>} />
            <Route path="/product" element={<Details />} />
            <Route path="/reviews" element={<Reviews/>}  />
            <Route path="/review/:id" element={<ReviewDetails/>}/>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/product/:id" element={<ProductDetails/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/coupon" element={<Coupons/>} />
            <Route path="/coupons" element={<Coupons/>} />

            <Route path="/contact" element={<Contact/>} />

            <Route path="/blog" element={<BlogPage/>} />
          </Routes>

          <Footer/>

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App