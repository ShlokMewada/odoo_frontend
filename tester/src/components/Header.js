import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>{message}</h1>
    </div>
  );
};

export default Header;