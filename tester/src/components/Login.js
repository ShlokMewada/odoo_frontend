import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { UserContext } from './UserContext';
import { useContext } from "react";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://odoo.detrace.systems/api/users/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("user",JSON.stringify(data.user))
        setUser(data.user);
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        alert(data.message);

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
    <div className="login-container">
      <div style={{display:"flex"}}>
        <p className="title">BookNest</p>
        <button className="home-button">Home</button>
      </div>
      <hr className="horizontal" />
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username" className="credential-title" >Username:</label>
          <input
            type="text"
            className="credentials"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="credential-title">Password:</label>
          <input
            type="password"
            className="credentials"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
          />
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>
      <div>
        <GoogleAuth/>
      </div>
    </div>
  );
};

export default Login;

