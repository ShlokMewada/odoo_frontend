import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://odoo.detrace.systems/users/api/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Assuming the response contains the tokens
    const { access, refresh } = data;

    // Save tokens to localStorage or use context API for state management
    localStorage.setItem("access_token", access);
    // localStorage.setItem("refresh_Token", refresh);

    console.log("Login successful", data);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="links">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/sign-up">Create A New Account?</a>
      </div>
    </div>
  );
};

export default Login;
