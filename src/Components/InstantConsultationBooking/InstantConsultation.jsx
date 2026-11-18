import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FindDoctorSearchIC from "./FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC";
import "./InstantConsultation.css";

const InstantConsultation = () => {
  const [speciality, setSpeciality] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const doctors = [
    { name: "Dr. Ahmed Khan", speciality: "General Physician", experience: "10 years", rating: 4.8 },
    { name: "Dr. Sara Ali", speciality: "Dentist", experience: "7 years", rating: 4.6 },
    { name: "Dr. Imran Malik", speciality: "Cardiologist", experience: "12 years", rating: 4.9 },
    { name: "Dr. Ayesha Siddiqui", speciality: "Dermatologist", experience: "8 years", rating: 4.7 },
    { name: "Dr. Faisal Raza", speciality: "Pediatrician", experience: "9 years", rating: 4.8 },
  ];

  const handleSearch = (text) => {
    setSpeciality(text);
    if (text.trim() === "") {
      setFilteredDoctors([]);
      setIsOpen(false);
      return;
    }
    const filtered = doctors.filter((doc) =>
      doc.speciality.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsOpen(filtered.length > 0);
  };

  return (
    <div className="instant-consultation">
      <h1>Instant Consultation</h1>
      <p>Connect with a doctor right now — no appointment needed.</p>

      <FindDoctorSearchIC onSearch={handleSearch} />

      <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right center"
        closeOnDocumentClick
        contentStyle={{ padding: 0, border: "none", borderRadius: 12 }}
      >
        <div className="instant-popup">
          <h3>Available Doctors</h3>
          {filteredDoctors.map((doc, i) => (
            <DoctorCardIC key={i} doctor={doc} />
          ))}
        </div>
      </Popup>

      {filteredDoctors.length > 0 && !isOpen && (
        <div className="instant-results">
          {filteredDoctors.map((doc, i) => (
            <DoctorCardIC key={i} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InstantConsultation;