import React, { useState } from "react";
import "./GiveReviews.css";

const initialDoctors = [
  { id: 1, name: "Dr. John Doe", speciality: "Cardiology" },
  { id: 2, name: "Dr. Jane Smith", speciality: "Dermatology" },
  { id: 3, name: "Dr. Ahmed Khan", speciality: "General Physician" },
];

const GiveReviews = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const handleOpenForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowWarning(false);
    setFormData({
      name: sessionStorage.getItem("name") || "",
      review: "",
      rating: 0,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim() || formData.rating === 0) {
      setShowWarning(true);
      return;
    }

    setSubmittedReviews((prev) => ({
      ...prev,
      [selectedDoctor.id]: { ...formData },
    }));
    setShowWarning(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>

      <div className="reviews-table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {initialDoctors.map((doc, index) => {
              const reviewEntry = submittedReviews[doc.id];
              const isReviewed = Boolean(reviewEntry);

              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.speciality}</td>
                  <td>
                    <button
                      type="button"
                      className="review-btn"
                      disabled={isReviewed}
                      onClick={() => handleOpenForm(doc)}
                    >
                      {isReviewed ? "Review Submitted" : "Click Here"}
                    </button>
                  </td>
                  <td>
                    {isReviewed ? (
                      <div>
                        <strong>{reviewEntry.rating}/5 ★</strong> — {reviewEntry.review}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedDoctor && (
        <form onSubmit={handleSubmit} className="give-review-form">
          <h2>Give Your Review for {selectedDoctor.name}</h2>

          {showWarning && (
            <p className="review-warning">
              Please fill out your name, review, and select a rating.
            </p>
          )}

          <div className="form-group">
            <label htmlFor="review-name">Name:</label>
            <input
              type="text"
              id="review-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-text">Review:</label>
            <textarea
              id="review-text"
              name="review"
              rows="4"
              value={formData.review}
              onChange={handleChange}
              placeholder="Share your consultation experience"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`rating-star ${formData.rating >= star ? "active" : ""}`}
                  onClick={() => handleRating(star)}
                  role="button"
                  tabIndex={0}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="review-btn"
            disabled={Boolean(submittedReviews[selectedDoctor.id])}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default GiveReviews;