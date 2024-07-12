import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);

  //   const handleChange = (e) => {
  //     const { username ,name, email} = e.target.value;
  //     setUser({

  //     });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("User Profile:", user);
    // setUser(user)

    try {
      const response = await fetch(
        "https://odoo.detrace.systems/api/users/update_profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.ok) {
        //   localStorage.setItem("access_token", data.tokens.access);
        //   setUser(data.user);
        //   const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        //   localStorage.removeItem("redirectAfterLogin");
        //   navigate(redirectPath);
      } else {
        //   alert(data.detail);

        // Handle login error
        console.error("Login failed");
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle network errors
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => {
              setUser((user.username = e.target.value));
            }}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => {
              setUser((user.name = e.target.value));
            }}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser((user.email = e.target.value));
            }}
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
