import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    setRole("");
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setShowerr("");
  };

  const register = async (e) => {
    e.preventDefault();
    setShowerr("");

    // Basic client-side validation
    if (!role) { setShowerr("Please select a role."); return; }
    if (name.length < 2) { setShowerr("Please enter your full name."); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setShowerr("Please enter a valid email."); return; }
    if (phone.length < 7) { setShowerr("Please enter a valid phone number."); return; }
    if (password.length < 6) { setShowerr("Password must be at least 6 characters."); return; }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone, role }),
    });

    const json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) setShowerr(error.msg);
      } else {
        setShowerr(json.error || "Registration failed.");
      }
    }
  };

  return (
    <div className="container">
      <div className="signup-grid">
        <div className="signup-form">
          <h2>Create Your Account</h2>
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role" className="form-control" required>
                <option value="">-- Select Role --</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" minLength="6" required />
            </div>

            {showerr && <div className="err" style={{ color: "red", marginBottom: "10px" }}>{showerr}</div>}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
            </div>

            <p style={{ marginTop: "15px" }}>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;