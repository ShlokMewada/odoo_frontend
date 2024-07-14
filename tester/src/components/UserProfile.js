import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const UserProfile = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const userData = localStorage.getItem("user");
  const getObjectFromLocalStorage = (key) => {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      return JSON.parse(storedItem);
    }
    return null;
  };

  // Example usage
  const storedUser = getObjectFromLocalStorage("user");
  console.log(storedUser);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "https://odoo.detrace.systems/api/users/update_profile/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Update user context with new data
        setUser(data.user);
        setFormData(data.user);
      } else if (response.status === 403) {
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        navigate("/login");
      } else {
        alert(data.message || "Failed to fetch user profile");
      }
    } catch (error) {
      alert("An error occurred while fetching user profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://odoo.detrace.systems/api/users/update_profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        // Update user context with new data
        setUser(data.user);
        setFormData(data.user);
        alert("Profile updated successfully!");
      } else if (response.status === 403) {
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        navigate("/login");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred while updating the profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">User Profile</h2>
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder={user.username || "Enter username"}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder={user.name || "Enter name"}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder={user.email || "Enter email"}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Role: </label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            placeholder={user.role || "Enter role"}
            className="form-input"
            readOnly // Optional: Make the role field read-only
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );

  // return (
  //   <div style={{ padding: "20px", position: "relative", marginTop: "150px" }}>
  //     <h2>User Profile</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Username: </label>
  //         <input
  //           type="text"
  //           name="username"
  //           value={formData.username || ""}
  //           onChange={handleChange}
  //           placeholder={user.username || "Enter username"}
  //         />
  //       </div>
  //       <div>
  //         <label>Name: </label>
  //         <input
  //           type="text"
  //           name="name"
  //           value={formData.name || ""}
  //           onChange={handleChange}
  //           placeholder={user.name || "Enter name"}
  //         />
  //       </div>
  //       <div>
  //         <label>Email: </label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email || ""}
  //           onChange={handleChange}
  //           placeholder={user.email || "Enter email"}
  //         />
  //       </div>
  //       <div>
  //         <label>Role: </label>
  //         <input
  //           type="text"
  //           name="role"
  //           value={formData.role || ""}
  //           onChange={handleChange}
  //           placeholder={user.role || "Enter role"}
  //           readOnly // Optional: Make the role field read-only
  //         />
  //       </div>
  //       <button type="submit" disabled={loading}>
  //         {loading ? "Saving..." : "Save Profile"}
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default UserProfile;
