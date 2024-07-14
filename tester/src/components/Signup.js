import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    role: "Customer",
  });
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!credentials.username) {
      newErrors.username = "Username is required";
    } else if (credentials.username.length < 6 || credentials.username.length > 16) {
      newErrors.username = "Username must be between 6 and 16 characters";
    }
    if (!credentials.password) newErrors.password = "Password is required";
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!credentials.name) {
      newErrors.name = "Name is required";
    } else if (credentials.name.length <= 2) {
      newErrors.name = "Name must be greater than 2 characters";
    }
    if (!credentials.role) {
      newErrors.role = "Role is required";
    }

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(
        "https://odoo.detrace.systems/api/users/signup/",
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
        setUser(data.user)
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        // alert(data.detail);
        //setErrors(data.errors || {});
        // Handle login error
        //console.error("Signup failed",data.errors);
        // You might want to show an error message to the user
        // Handle backend validation errors
        const backendErrors = data.errors || {};

        // Add general error message if available
        if (data.message && data.message.includes("Key (username)")) {
          backendErrors.username = "User already exists";
        } else {
          backendErrors.general = data.message;
        }

        setErrors(backendErrors);
        console.error("Signup failed", backendErrors);
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Handle network errors
      setErrors({ network: "Network error, please try again later." });
    }
  };

  return (
    <div className="signup-container">
      <p className="title">SIGNUP</p>
      
      <form onSubmit={handleSignup}>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            placeholder="Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            placeholder="Username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={credentials.role}
            onChange={(e) =>
              setCredentials({ ...credentials, role: e.target.value })
            }
          >
            <option value="Customer">User</option>
            <option value="Librarian">Librarian</option>
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>
        {errors.network && <span className="error">{errors.network}</span>}
        {errors.general && <span className="error">{errors.general}</span>}
        <button type="submit" className="login">SignUp</button>
      </form>
    </div>
    
  );
};

export default Signup;
