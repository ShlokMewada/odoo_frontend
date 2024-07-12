import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css"
import { Link } from "react-router-dom";

const Header = ({user,setUser}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://odoo.detrace.systems/users/protected/",
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
        navigate("/login");
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
    navigate("/login");
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
          <Link to="/login">Log in</Link>
        </nav>
        <div className="logo">Dummy</div>
        <div className="right-nav">
          <a href="#user profile" className="user">
            Hello, User
          </a>
          <div className="cart">
            <a href="#cart" className="cart-details">
              <i className="cart-icon">🛒</i>
            </a>
            <a href="#cart" className="cart-details">
              <span className="cart-count">0</span>
            </a>
          </div>
        </div>
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
