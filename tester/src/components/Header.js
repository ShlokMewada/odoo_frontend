import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  // let user = localStorage.getItem("user");
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
  const [userData, setUserData] = useState(storedUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://odoo.detrace.systems/api/users/protected/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.status === 403) {
        // Unauthorized, redirect to login
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        // navigate("/login");
        return;
      }

      const json = await response.json();
      setMessage(json.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      // If there's a network error or other issues, you might want to show an error message
      setMessage("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUserData(null);
    // navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // <div>
    //   <button onClick={handleLogout}>Logout</button>
    //   <h1>{message}</h1>
    // </div>

    <header className="header">
      <div className="top-bar">
        <nav className="top-nav">
          {userData != null ? (
            <div onClick={handleLogout} className="header-div">
              logout
            </div>
          ) : (
            <div>
              <Link to="/login">login</Link>/<Link to="/signup">signup</Link>
            </div>
          )}
        </nav>
        <div className="logo">Dummy</div>
        {userData != null ? (
          <div className="right-nav">
            <div className="user">Hello {userData.name}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search millions of photos, fonts, graphics, and more..."
        />
      </div>
      <nav className="bottom-nav">
        <a href="">Home</a>
        <Link to="/userprofile">UserProfile</Link>
        <a href="">About Us</a>
        <a href="">Contact Us</a>
        <a href="">Cart</a>
        <div className="more-dropdown">
          <a href="#more">More</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
