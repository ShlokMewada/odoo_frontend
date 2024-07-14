import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BorrowButton = ({ bookId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBorrowBook = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://odoo.detrace.systems/api/lib/books/${bookId}/borrow/`, {
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
          throw new Error(data.message || "Failed to borrow the book");
        }
      }
      alert("Book borrowed successfully!");
      // Optionally, handle success actions like updating UI
    } catch (error) {
      setError(error.message || "An error occurred while borrowing the book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="borrow-book-button">
      <button onClick={handleBorrowBook} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? "Borrowing..." : "Borrow Book"}
      </button>
      {error && <p className="error-message text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BorrowButton;