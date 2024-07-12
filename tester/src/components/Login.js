import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://odoo.detrace.systems/users/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
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
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="Username"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;