import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Coupons from "./pages/Coupons";
import Banners from "./pages/Banners";
import Blogs from "./pages/Blogs";

import "bootstrap/dist/css/bootstrap.min.css";
import AdminUsers from "./pages/AdminUsers";
import Authors from "./pages/Authors";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="banners" element={<Banners/>} />
          <Route path="adminuser" element={<AdminUsers/>} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="authors" element={<Authors/>} />
          <Route path="/blog" element={<Blogs/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;