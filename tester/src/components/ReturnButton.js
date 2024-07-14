import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnButton = ({ bookId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleReturnBook = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://odoo.detrace.systems/api/lib/borrowings/${bookId}/return/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          localStorage.setItem("redirectAfterLogin", window.location.pathname);
          navigate("/login");
        } else {
          throw new Error(data.message || "Failed to return the book");
        }
      }
      alert("Book returned successfully!");
      // Optionally, handle success actions like updating UI
    } catch (error) {
      setError(error.message || "An error occurred while returning the book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-book-button">
      <button 
        onClick={handleReturnBook} 
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Returning..." : "Return Book"}
      </button>
      {error && <p className="error-message text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ReturnButton;