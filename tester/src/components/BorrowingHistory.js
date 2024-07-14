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
      const updatedHistory = result.map(entry => ({
        ...entry,
        lateFee: calculateLateFee(entry.due_date, entry.return_date)
      }));
      setBorrowingHistory(updatedHistory);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateLateFee = (dueDate, returnDate) => {
    const due = new Date(dueDate);
    const returned = returnDate ? new Date(returnDate) : new Date();
    const diffTime = Math.max(returned - due, 0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const feePerDay = 1; // Assume $1 per day late fee
    return diffDays * feePerDay;
  };

  const handleReturnBook = async (bookId) => {
    try {
      const response = await fetch(`https://odoo.detrace.systems/api/lib/borrowings/${bookId}/return/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Refresh the borrowing history after returning the book
      fetchBorrowingHistory();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="borrowing-history-container p-4">
      <h2 className="text-2xl font-bold mb-4">Borrowing History</h2>
      {borrowingHistory.length === 0 ? (
        <p>No borrowing history available.</p>
      ) : (
        <table className="borrowing-history-table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Book Title</th>
              <th className="p-2">Borrowed Date</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Returned Date</th>
              <th className="p-2">Late Fee ($)</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowingHistory.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="p-2">{entry.id}</td>
                <td className="p-2">{entry.book}</td>
                <td className="p-2">{entry.borrow_date}</td>
                <td className="p-2">{entry.due_date}</td>
                <td className="p-2">{entry.return_date ? entry.return_date : "Not Returned"}</td>
                <td className="p-2">{entry.lateFee.toFixed(2)}</td>
                <td className="p-2">{entry.return_date ? "Returned" : "Borrowed"}</td>
                <td className="p-2">
                  {!entry.return_date && (
                    <button 
                      onClick={() => handleReturnBook(entry.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowingHistory;