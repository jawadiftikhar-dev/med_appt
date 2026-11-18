import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Update login state whenever component mounts
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");
    if (token) {
      setIsLoggedIn(true);
      if (email) setUserName(email.split("@")[0]);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">StayHealthy</Link>
      </div>

<ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/instant-consultation">Instant Consult</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        {isLoggedIn && <li><Link to="/reports">Reports</Link></li>}
      </ul>

      <div className="navbar__auth">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="navbar__username" style={{ textDecoration: "none" }}>
              Welcome, {userName}
            </Link>
            <button className="btn btn--primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn btn--outline">Sign Up</Link>
            <Link to="/login" className="btn btn--primary">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;