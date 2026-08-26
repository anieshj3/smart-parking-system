import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login", {
      state: {
        message: "Logged out successfully",
        type: "success",
      },
    });
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to={token ? "/dashboard" : "/login"}>
          Smart Parking
        </Link>

        <div className="d-flex align-items-center flex-wrap gap-2">
          {!token && (
            <>
              <Link
                className={
                  location.pathname === "/register"
                    ? "btn btn-warning"
                    : "btn btn-light"
                }
                to="/register"
              >
                Register
              </Link>

              <Link
                className={
                  location.pathname === "/login"
                    ? "btn btn-warning"
                    : "btn btn-light"
                }
                to="/login"
              >
                Login
              </Link>
            </>
          )}

          {token && (
            <>
              <Link
                className={
                  location.pathname === "/dashboard"
                    ? "btn btn-warning"
                    : "btn btn-outline-light"
                }
                to="/dashboard"
              >
                Dashboard
              </Link>

              {role === "user" && (
                <Link
                  className={
                    location.pathname === "/reservation"
                      ? "btn btn-warning"
                      : "btn btn-outline-light"
                  }
                  to="/reservation"
                >
                  Reservation
                </Link>
              )}

              {role === "admin" && (
                <Link
                  className={
                    location.pathname === "/slots"
                      ? "btn btn-warning"
                      : "btn btn-outline-light"
                  }
                  to="/slots"
                >
                  Manage Slots
                </Link>
              )}

              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
