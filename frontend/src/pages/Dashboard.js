import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    totalReservations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats({
        totalSlots: res.data.totalSlots || 0,
        availableSlots: res.data.availableSlots || 0,
        occupiedSlots: res.data.occupiedSlots || 0,
        totalReservations: res.data.totalReservations || 0,
      });
      setError("");
    } catch (error) {
      console.log("Dashboard Error:", error);
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container page-shell">
        <div className="alert alert-info">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container page-shell">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Quick overview of parking slot availability and reservations.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card app-card dashboard-card shadow-sm border-primary text-center">
            <div className="card-body">
              <h5 className="card-title text-primary">Total Slots</h5>
              <h2>{stats.totalSlots}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card app-card dashboard-card shadow-sm border-success text-center">
            <div className="card-body">
              <h5 className="card-title text-success">Available Slots</h5>
              <h2>{stats.availableSlots}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card app-card dashboard-card shadow-sm border-danger text-center">
            <div className="card-body">
              <h5 className="card-title text-danger">Occupied Slots</h5>
              <h2>{stats.occupiedSlots}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card app-card dashboard-card shadow-sm border-warning text-center">
            <div className="card-body">
              <h5 className="card-title text-warning">Total Reservations</h5>
              <h2>{stats.totalReservations}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;