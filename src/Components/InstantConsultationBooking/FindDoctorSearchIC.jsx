import React, { useState } from "react";
import "./FindDoctorSearchIC.css";

const specialities = [
  "General Physician",
  "Dentist",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Gynecologist",
  "Orthopedic",
];

const FindDoctorSearchIC = ({ onSearch }) => {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
    onSearch(e.target.value);
  };

  const handleSelect = (s) => {
    setText(s);
    onSearch(s);
    setFocused(false);
  };

  const filtered = specialities.filter((s) =>
    s.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <div className="find-doctor-search-ic">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="Search by speciality (e.g. Dentist, Cardiologist)"
        className="find-doctor-search-ic__input"
      />

      {focused && filtered.length > 0 && (
        <ul className="find-doctor-search-ic__list">
          {filtered.map((s) => (
            <li key={s} onMouseDown={() => handleSelect(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindDoctorSearchIC;