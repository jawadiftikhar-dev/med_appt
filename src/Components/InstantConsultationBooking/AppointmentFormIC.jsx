import React, { useState } from "react";
import "./AppointmentFormIC.css";

const AppointmentFormIC = ({ doctorName, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter a valid name.");
      return;
    }
    if (!/^[0-9]{7,15}$/.test(phone)) {
      setError("Please enter a valid phone number (7–15 digits).");
      return;
    }

    setBooked(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 1500);
  };

  if (booked) {
    return (
      <div className="appointment-form-ic">
        <div className="ic-success">
          <h3>✓ Appointment Confirmed!</h3>
          <p>
            {name}, your instant consultation with <strong>{doctorName}</strong> is booked.
          </p>
          <p>We’ll contact you at {phone} shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-form-ic">
      <h3>Instant Consultation with {doctorName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ic-name">Name</label>
          <input
            id="ic-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ic-phone">Phone Number</label>
          <input
            id="ic-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        {error && <div className="ic-error">{error}</div>}

        <div className="ic-buttons">
          <button type="submit" className="btn-primary">Confirm Booking</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentFormIC;