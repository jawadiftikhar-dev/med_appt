import React, { useState } from "react";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";
import "./BookingConsultation.css";

const doctorsData = [
  {
    name: "Dr. Jiao Yang",
    speciality: "Dentist",
    experience: 9,
    ratings: 4.8,
  },
  {
    name: "Dr. Denis Raj",
    speciality: "Dentist",
    experience: 24,
    ratings: 4.9,
  },
  {
    name: "Dr. Ahmed Khan",
    speciality: "General Physician",
    experience: 10,
    ratings: 4.8,
  },
  {
    name: "Dr. Imran Malik",
    speciality: "Cardiologist",
    experience: 12,
    ratings: 4.9,
  },
  {
    name: "Dr. Ayesha Siddiqui",
    speciality: "Dermatologist",
    experience: 8,
    ratings: 4.7,
  },
  {
    name: "Dr. Faisal Raza",
    speciality: "Pediatrician",
    experience: 9,
    ratings: 4.8,
  },
  {
    name: "Dr. Sarah Jenkins",
    speciality: "Gynecologist/obstetrician",
    experience: 14,
    ratings: 4.9,
  },
  {
    name: "Dr. Tariq Mehmood",
    speciality: "Orthopedic",
    experience: 11,
    ratings: 4.7,
  },
];

const BookingConsultation = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredDoctors(doctorsData);
      return;
    }
    const filtered = doctorsData.filter(
      (doctor) =>
        doctor.speciality.toLowerCase().includes(text.toLowerCase()) ||
        doctor.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="booking-consultation">
      <div className="booking-consultation__header">
        <h1>Find a Doctor & Book Appointment</h1>
        <p>Search by speciality or doctor name and book a scheduled visit.</p>
      </div>

      <FindDoctorSearch onSearch={handleSearch} />

      {filteredDoctors.length > 0 ? (
        <>
          <p style={{ color: "#475569", fontSize: "14px", fontWeight: 500 }}>
            Showing {filteredDoctors.length} doctor(s)
            {searchText ? ` for "${searchText}"` : ""}
          </p>
          <div className="booking-consultation__grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.name}
                name={doctor.name}
                speciality={doctor.speciality}
                experience={doctor.experience}
                ratings={doctor.ratings}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="booking-consultation__empty">
          No doctors found matching "{searchText}". Try another speciality.
        </div>
      )}
    </div>
  );
};

export default BookingConsultation;