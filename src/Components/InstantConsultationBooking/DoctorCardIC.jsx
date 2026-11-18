import React, { useState } from "react";
import AppointmentFormIC from "./AppointmentFormIC";
import "./DoctorCardIC.css";

const DoctorCardIC = ({ doctor }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="doctor-card-ic">
      <div className="doctor-card-ic__info">
        <div className="doctor-card-ic__avatar">
          {doctor.name.split(" ")[1]?.[0] || "D"}
        </div>
        <div>
          <h4>{doctor.name}</h4>
          <p className="doctor-card-ic__speciality">{doctor.speciality}</p>
          <p className="doctor-card-ic__meta">
            {doctor.experience} · ⭐ {doctor.rating}
          </p>
        </div>
      </div>

      {!showForm ? (
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          Consult Now
        </button>
      ) : (
        <AppointmentFormIC
          doctorName={doctor.name}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default DoctorCardIC;