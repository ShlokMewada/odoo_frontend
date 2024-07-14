import React from 'react';

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
              <h2 className="book-title">{title}</h2>
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