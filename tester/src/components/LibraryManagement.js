import React, { useEffect, useState } from 'react';

const LibraryManagement = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://your-backend-api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBooks(data); // Assuming data is an array of books
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterBooks = (book) => {
    const { title, author, genre, year } = filters;
    return (
      book.title.toLowerCase().includes(title.toLowerCase()) &&
      book.author.toLowerCase().includes(author.toLowerCase()) &&
      (genre === '' || book.genre.toLowerCase() === genre.toLowerCase()) &&
      (year === '' || book.year.toString() === year)
    );
  };

  const filteredBooks = books.filter(filterBooks);

  return (
    <div>
      <h2>Library Management System</h2>
      <div>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          placeholder="Search by Title"
        />
        <input
          type="text"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          placeholder="Search by Author"
        />
        <select name="genre" value={filters.genre} onChange={handleFilterChange}>
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
          {/* Add more genre options */}
        </select>
        <input
          type="text"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          placeholder="Search by Year"
        />
      </div>
      <ul>
        {filteredBooks.map((book) => (
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
