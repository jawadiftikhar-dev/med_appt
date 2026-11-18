import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ children }) => {
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  const loadAppointmentState = () => {
    const storedUsername = sessionStorage.getItem("email") || "";
    const storedDoctor = JSON.parse(localStorage.getItem("doctorData") || "null");

    setUsername(storedUsername);
    setDoctorData(storedDoctor);

    if (storedDoctor?.name) {
      const storedAppt = JSON.parse(
        localStorage.getItem(storedDoctor.name) || "null"
      );
      if (Array.isArray(storedAppt) && storedAppt.length > 0) {
        setAppointmentData(storedAppt[0]);
      } else {
        setAppointmentData(null);
      }
    } else {
      setAppointmentData(null);
    }
  };

  useEffect(() => {
    loadAppointmentState();
    window.addEventListener("appointmentUpdated", loadAppointmentState);
    window.addEventListener("storage", loadAppointmentState);

    return () => {
      window.removeEventListener("appointmentUpdated", loadAppointmentState);
      window.removeEventListener("storage", loadAppointmentState);
    };
  }, []);

  return (
    <>
      {children}
      {doctorData && appointmentData && (
        <div className="notification-banner">
          <h3 className="notification-banner__title">Appointment Details</h3>
          <p className="notification-banner__message">
            <strong>Doctor:</strong> {doctorData.name} ({doctorData.speciality})
          </p>
          <p className="notification-banner__message">
            <strong>Patient:</strong> {appointmentData.name || username}
          </p>
          <p className="notification-banner__message">
            <strong>Phone:</strong> {appointmentData.phoneNumber}
          </p>
          <p className="notification-banner__message">
            <strong>Date:</strong> {appointmentData.date}
          </p>
          <p className="notification-banner__message">
            <strong>Time Slot:</strong> {appointmentData.time}
          </p>
        </div>
      )}
    </>
  );
};

export default Notification;