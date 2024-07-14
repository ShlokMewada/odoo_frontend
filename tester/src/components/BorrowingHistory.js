import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BorrowingHistory = () => {
  const [borrowingHistory, setBorrowingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBorrowingHistory();
  }, []);

  const fetchBorrowingHistory = async () => {
    try {
      const response = await fetch("https://odoo.detrace.systems/api/lib/borrowings/history/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          localStorage.setItem("redirectAfterLogin", window.location.pathname);
          navigate("/login");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const result = await response.json();
      setBorrowingHistory(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="borrowing-history-container">
      <h2>Borrowing History</h2>
      {borrowingHistory.length === 0 ? (
        <p>No borrowing history available.</p>
      ) : (
        <table className="borrowing-history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Title</th>
              <th>Borrowed Date</th>
              <th>Due Date</th>
              <th>Returned Date</th>
              <th>Late Fee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {borrowingHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.id}</td>
                <td>{entry.book}</td>
                <td>{entry.borrow_date}</td>
                <td>{entry.due_date}</td>
                <td>{entry.return_date ? entry.return_date : "Not Returned"}</td>
                <td>{entry.late_fee}</td>
                <td>{entry.return_date ? "Returned" : "Borrowed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowingHistory;
