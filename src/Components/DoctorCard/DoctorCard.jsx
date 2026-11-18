import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AppointmentForm from "../AppointmentFormIC/AppointmentForm";
import "./DoctorCard.css";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppt = localStorage.getItem(name);
    if (storedAppt) {
      setAppointments(JSON.parse(storedAppt));
    }
  }, [name]);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
    };
    const updatedAppointments = [newAppointment];
    setAppointments(updatedAppointments);

    localStorage.setItem("doctorData", JSON.stringify({ name, speciality }));
    localStorage.setItem(name, JSON.stringify(updatedAppointments));
    window.dispatchEvent(new Event("appointmentUpdated"));

    setShowModal(false);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appt) => appt.id !== appointmentId
    );
    setAppointments(updatedAppointments);

    if (updatedAppointments.length === 0) {
      localStorage.removeItem(name);
      const currentDoc = JSON.parse(localStorage.getItem("doctorData") || "null");
      if (currentDoc?.name === name) {
        localStorage.removeItem("doctorData");
      }
    } else {
      localStorage.setItem(name, JSON.stringify(updatedAppointments));
    }
    window.dispatchEvent(new Event("appointmentUpdated"));
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card__header">
        <div className="doctor-card__avatar">
          {name.split(" ")[1]?.[0] || name[0]}
        </div>
        <div>
          <h4 className="doctor-card__name">{name}</h4>
          <p className="doctor-card__speciality">{speciality}</p>
          <p className="doctor-card__meta">
            {experience} years experience · Ratings: ⭐ {ratings}
          </p>
        </div>
      </div>

      {appointments.length > 0 ? (
        <div>
          {appointments.map((appt) => (
            <div key={appt.id} className="doctor-card__booked-info">
              <p><strong>Booked for:</strong> {appt.name}</p>
              <p><strong>Phone:</strong> {appt.phoneNumber}</p>
              <p><strong>Date:</strong> {appt.date} at {appt.time}</p>
            </div>
          ))}
          <button
            className="doctor-card__btn doctor-card__btn--cancel"
            onClick={() => handleCancel(appointments[0].id)}
          >
            Cancel Appointment
          </button>
        </div>
      ) : (
        <Popup
          open={showModal}
          onClose={() => setShowModal(false)}
          modal
          nested
          contentStyle={{
            padding: 0,
            border: "none",
            borderRadius: "12px",
            maxWidth: "460px",
            width: "92%",
          }}
        >
          <AppointmentForm
            doctorName={name}
            doctorSpeciality={speciality}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowModal(false)}
          />
        </Popup>
      )}

      {appointments.length === 0 && (
        <button
          className="doctor-card__btn doctor-card__btn--book"
          onClick={() => setShowModal(true)}
        >
          Book Appointment (No Booking Fee)
        </button>
      )}
    </div>
  );
};

export default DoctorCard;