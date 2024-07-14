import React from "react";

const LibraryManagement = ({ books }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Year: {book.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryManagement;
