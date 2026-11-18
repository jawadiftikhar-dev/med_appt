import React, { useState } from "react";
import "./AppointmentForm.css";

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:30 PM",
];

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit, onCancel }) => {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem("phone") || "");
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter a valid patient name.");
      return;
    }
    if (!/^[0-9]{7,15}$/.test(phoneNumber)) {
      setError("Please enter a valid phone number (7–15 digits).");
      return;
    }
    if (!date) {
      setError("Please select an appointment date.");
      return;
    }
    if (!selectedSlot) {
      setError("Please select an appointment time slot.");
      return;
    }

    onSubmit({
      name: name.trim(),
      phoneNumber,
      date,
      time: selectedSlot,
      doctorName,
      doctorSpeciality,
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3>Book Appointment with {doctorName}</h3>

      <div className="form-group">
        <label htmlFor="appt-name">Name:</label>
        <input
          type="text"
          id="appt-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter patient name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appt-phone">Phone Number:</label>
        <input
          type="tel"
          id="appt-phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appt-date">Date of Appointment:</label>
        <input
          type="date"
          id="appt-date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appt-time">Book Time Slot:</label>
        <select
          id="appt-time"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">-- Select a time slot --</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="appointment-form__error">{error}</div>}

      <div className="appointment-form__actions">
        <button type="submit" className="btn-primary">
          Book Now
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Close
          </button>
        )}
      </div>
    </form>
  );
};

export default AppointmentForm;