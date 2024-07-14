import React, { useEffect, useState } from "react";
import "./BorrowingSystem.css";

const BorrowingSystem = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchAvailableBooks();
    fetchUserHistory();
  }, []);

  const fetchAvailableBooks = async () => {
    // Replace with your API endpoint to fetch available books
    const response = await fetch("https://odoo.detrace.systems/api/lib/books");
    const data = await response.json();
    setAvailableBooks(data);
  };

  const fetchUserHistory = async () => {
    // Replace with your API endpoint to fetch user history
    const response = await fetch(
      "https://odoo.detrace.systems/api/users/borrow_history",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await response.json();
    setUserHistory(data);
  };

  const handleCheckout = () => {
    if (selectedBook && dueDate) {
      const borrowedBook = {
        ...selectedBook,
        dueDate: new Date(dueDate).toLocaleDateString(),
        checkoutDate: new Date().toLocaleDateString(),
      };
      setBorrowedBooks([...borrowedBooks, borrowedBook]);
      setAvailableBooks(availableBooks.filter((book) => book.id !== selectedBook.id));
      setSelectedBook(null);
      setDueDate("");
    }
  };

  const handleReturn = (book) => {
    const returnDate = new Date();
    const dueDate = new Date(book.dueDate);
    const lateDays = Math.max((returnDate - dueDate) / (1000 * 60 * 60 * 24), 0);
    const lateFee = lateDays * 1; // Assuming $1 per late day

    const returnedBook = {
      ...book,
      returnDate: returnDate.toLocaleDateString(),
      lateFee,
    };
    setReturnedBooks([...returnedBooks, returnedBook]);
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== book.id));
    setUserHistory([...userHistory, returnedBook]);
  };

  return (
    <div className="borrowing-system-container">
      <h2>Borrowing System</h2>
      <div className="checkout-section">
        <h3>Checkout Book</h3>
        <select onChange={(e) => setSelectedBook(JSON.parse(e.target.value))} value={JSON.stringify(selectedBook)}>
          <option value={null}>Select a book</option>
          {availableBooks.map((book) => (
            <option key={book.id} value={JSON.stringify(book)}>
              {book.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due Date"
        />
        <button onClick={handleCheckout} disabled={!selectedBook || !dueDate}>
          Checkout
        </button>
      </div>
      <div className="borrowed-books-section">
        <h3>Borrowed Books</h3>
        {borrowedBooks.length > 0 ? (
          <ul>
            {borrowedBooks.map((book) => (
              <li key={book.id}>
                {book.title} (Due: {book.dueDate}){" "}
                <button onClick={() => handleReturn(book)}>Return</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No borrowed books</p>
        )}
      </div>
      <div className="history-section">
        <h3>Borrowing History</h3>
        {userHistory.length > 0 ? (
          <ul>
            {userHistory.map((book, index) => (
              <li key={index}>
                {book.title} - Checked out: {book.checkoutDate}, Returned: {book.returnDate}, Late Fee: ${book.lateFee}
              </li>
            ))}
          </ul>
        ) : (
          <p>No borrowing history</p>
        )}
      </div>
    </div>
  );
};

export default BorrowingSystem;
