import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
      <h5 className="mb-0">Dashboard</h5>
      <button className="btn btn-danger btn-sm" onClick={logout}>
        Logout
      </button>
    </div>
  );
}