import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="top-bar">
        <nav className="top-nav">
          {userData != null ? (
            <div onClick={handleLogout} className="header-div">
              logout
            </div>
          ) : (
            <div style={{display:"flex"}}>
              <Link to="/login"><button className="login">Login</button></Link>
              <Link to="/signup"><button className="login">SignUp</button></Link>
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
        {userData != null ? <Link to="/userprofile">UserProfile</Link> : ""}
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
