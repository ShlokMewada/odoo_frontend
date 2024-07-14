import React from 'react';
import { Link } from 'react-router-dom';
import BorrowButton from './BorrowButton';

const BookCards = ({ data }) => {
  // Ensure data is an array
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="books-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((book) => {
        const { id, title, authors, description, small_thumbnail } = book;
        return (
          <div key={id} className="book-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={small_thumbnail} alt={title} className="w-full h-48 object-cover" />
            <div className="book-details p-4">
              <Link to={`/bookdetails/${id}`} className="block mb-2">
                <h2 className="book-title text-xl font-semibold text-blue-600 hover:text-blue-800">{title}</h2>
              </Link>
              <p className="book-author text-sm text-gray-600 mb-2">{authors}</p>
              <p className="book-description text-sm text-gray-700 mb-4 line-clamp-3">
                {description}
              </p>
              <BorrowButton bookId={id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookCards;