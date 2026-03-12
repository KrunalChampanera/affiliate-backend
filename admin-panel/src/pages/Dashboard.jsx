import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body">
              <h6>Total Users</h6>
              <h3>{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 bg-success text-white">
            <div className="card-body">
              <h6>Total Products</h6>
              <h3>{stats.totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 bg-warning text-white">
            <div className="card-body">
              <h6>Total Orders</h6>
              <h3>{stats.totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 bg-danger text-white">
            <div className="card-body">
              <h6>Total Categories</h6>
              <h3>{stats.totalCategories}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}