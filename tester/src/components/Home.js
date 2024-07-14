import React, { useEffect, useState } from "react";
import BookCards from "./BookCards";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchTerm, data]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://odoo.detrace.systems/api/lib/books", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const sortedData = result.sort((a, b) => a.id - b.id);
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((book) => {
        const searchValue = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(searchValue) ||
          book.authors.toLowerCase().includes(searchValue) ||
          book.categories.toLowerCase().includes(searchValue)
        );
      });
      setFilteredData(filtered);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Title, Author, or Category"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h1 className="all">All Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="book-list">
          <BookCards data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default Home;
