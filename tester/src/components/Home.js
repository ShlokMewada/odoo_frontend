import React, { useEffect, useState } from "react";
import BookCards from "./BookCards";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://odoo.detrace.systems/api/lib/books", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(JSON.stringify(result, null, 2)); // Log the entire result

      // Sort data by id in ascending order
      const sortedData = result.sort((a, b) => a.id - b.id);
      setData(sortedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="search-bar mb-8">
        <input
          type="text"
          className="search-input w-full p-2 border rounded"
          placeholder="Search millions of books, publishers, authors......"
        />
        <button className="search-button mt-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="book-list">
          <BookCards data={data} />
        </div>
      )}
    </div>
  );
};

export default Home;