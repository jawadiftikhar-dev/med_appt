import React from "react";
import { Link } from "react-router-dom";
import "./Landing_Page.css";

const Landing_Page = () => {
  return (
    <main>
      <section className="hero">
        <h1>Book Your Doctor's Appointment Online</h1>
        <p>Access top medical specialists anytime, anywhere. Simple. Secure. Reliable.</p>
        <div className="hero__cta">
          <Link to="/signup" className="btn btn--primary">Get Started</Link>
          <Link to="/login" className="btn btn--outline">Login</Link>
        </div>
      </section>
    </main>
  );
};

export default Landing_Page;