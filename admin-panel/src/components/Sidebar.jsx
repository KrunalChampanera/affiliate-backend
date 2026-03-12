import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaTags,
  FaList
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4 className="mb-4">Admin Panel</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/dashboard">
            <FaTachometerAlt className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/users">
            <FaUsers className="me-2" />
            Users
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/categories">
            <FaList className="me-2" />
            Categories
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/adminuser">
            <FaList className="me-2" />
            User List
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/blog">
            <FaList className="me-2" />
            Blog
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/banners">
            <FaList className="me-2" />
            Banners
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/products">
            <FaBox className="me-2" />
            Products
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/orders">
            <FaClipboardList className="me-2" />
            Orders
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/coupons">
            <FaTags className="me-2" />
            Coupons
          </Link>
        </li>

      </ul>
    </div>
  );
}