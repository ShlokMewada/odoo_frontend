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
          <div key={id} className="book-card flex bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <div className="thumbnail-container w-1/3">
              <img src={small_thumbnail} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="book-details w-2/3 p-4">
              <h2 className="book-title text-xl font-semibold mb-2">{title}</h2>
              <p className="book-author text-sm text-gray-600 mb-2">{authors}</p>
              <p className="book-description text-sm text-gray-700 line-clamp-3">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookCards;