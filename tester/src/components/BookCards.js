import React from 'react';
import { Link } from 'react-router-dom';

const BookCards = ({ data }) => {
  // Ensure data is an array
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="books-container">
      {data.map((book, index) => {
        const { id, title, authors, description, small_thumbnail } = book;

        return (
          <div key={id} className="book-card">
            <img src={small_thumbnail} alt={title} className="book-img" />
            <div className="book-details">
              <Link to="/bookdetails"><h2 className="book-title text-blue-600">{title}</h2></Link>
              <p className="book-author">{authors}</p>
              <p className="book-description text-sm text-gray-700 line-clamp-3">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookCards;