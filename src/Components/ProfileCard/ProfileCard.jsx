import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });
      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const fallback = {
      name: sessionStorage.getItem("name") || (sessionStorage.getItem("email") || "").split("@")[0],
      phone: sessionStorage.getItem("phone") || "",
      email: sessionStorage.getItem("email") || "",
    };
    setUserDetails(fallback);
    setUpdatedDetails(fallback);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(updatedDetails),
      });
    } catch (error) {
      console.error(error);
    }

    sessionStorage.setItem("name", updatedDetails.name);
    sessionStorage.setItem("phone", updatedDetails.phone);
    setUserDetails(updatedDetails);
    setEditMode(false);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>

            <div className="form-group">
              <label htmlFor="profile-email">Email</label>
              <input
                id="profile-email"
                type="email"
                name="email"
                value={updatedDetails.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-name">Name</label>
              <input
                id="profile-name"
                type="text"
                name="name"
                value={updatedDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-phone">Phone</label>
              <input
                id="profile-phone"
                type="tel"
                name="phone"
                value={updatedDetails.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="profile-card__actions">
              <button
                type="submit"
                className="profile-card__btn profile-card__btn--primary"
              >
                Save
              </button>
              <button
                type="button"
                className="profile-card__btn profile-card__btn--secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h1>Welcome, {userDetails.name}</h1>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone || "Not set"}</p>
            <div className="profile-card__actions">
              <button
                className="profile-card__btn profile-card__btn--primary"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;