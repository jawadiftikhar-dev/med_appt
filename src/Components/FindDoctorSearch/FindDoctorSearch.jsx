import React, { useState } from "react";
import "./FindDoctorSearch.css";

const initSpecialities = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Cardiologist",
  "Pediatrician",
  "Orthopedic",
];

const FindDoctorSearch = ({ onSearch }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [specialities] = useState(initSpecialities);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    if (onSearch) onSearch(speciality);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchDoctor(val);
    if (onSearch) onSearch(val);
  };

  const filteredSpecialities = specialities.filter((s) =>
    s.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <div className="find-doctor-search">
      <input
        type="text"
        className="find-doctor-search__input"
        placeholder="Search doctors, clinics, hospitals, or specialities..."
        value={searchDoctor}
        onFocus={() => setDoctorResultHidden(false)}
        onBlur={() => setTimeout(() => setDoctorResultHidden(true), 150)}
        onChange={handleInputChange}
      />

      {!doctorResultHidden && filteredSpecialities.length > 0 && (
        <ul className="find-doctor-search__list">
          {filteredSpecialities.map((speciality) => (
            <li
              key={speciality}
              onMouseDown={() => handleDoctorSelect(speciality)}
            >
              <span>{speciality}</span>
              <span className="find-doctor-search__tag">Speciality</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindDoctorSearch;