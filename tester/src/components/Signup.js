import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);


  const handleSignup = async (e) => {
    e.preventDefault();
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

        // Handle login error
        console.error("Signup failed");
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Handle network errors
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSignup}>
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
        </div>
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
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
