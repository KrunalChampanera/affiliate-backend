import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/admin/login", { email, password });

    localStorage.setItem("adminToken", res.data.token);
    navigate("/dashboard");

  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        alert("Invalid email or password");
      } else if (error.response.status === 403) {s
        alert("Access denied. You are not an admin.");
      } else {
        alert(error.response.data.message || "Login failed");
      }
    } else {
      alert("Server not responding");
    }
  }
};

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "420px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">Admin Panel Login</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
  type="email"
  className="form-control form-control-lg"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
             <input
  type="password"
  className="form-control form-control-lg"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
            </div>

            <button className="btn btn-primary w-100 btn-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}