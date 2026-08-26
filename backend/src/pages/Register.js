import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("danger");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill all required fields");
      setMessageType("danger");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("danger");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await API.post("/auth/register", form);

      navigate("/login", {
        state: {
          message: "Registration successful. Please login to continue.",
          type: "success",
        },
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="text-center mb-2">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Register to use Smart Parking
        </p>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <label className="form-label">Name</label>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />

          <label className="form-label">Email</label>
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <label className="form-label">Password</label>
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <label className="form-label">Role</label>
          <select
            className="form-control mb-4"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn btn-success w-100" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
