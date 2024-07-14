import React from "react";
import { useEffect, useState } from "react";
import BookCards from "./BookCards";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      const response = await fetch(
        "https://odoo.detrace.systems/api/lib/books",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result)

      // Sort data by id in ascending order
    //   const sortedData = result.sort((a, b) => a.id - b.id);
    //   setData(sortedData);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search millions of books, publishers, authors......"
        />
        <button className="search-button">Search</button>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
            <h1>New Arrivals</h1>
            <BookCards bookData={data}/>
        </div>
        <div className="flex flex-col">
            <h1>Trending</h1>
            <BookCards/>
        </div>
      </div>
    </div>
  );
};

export default Home;
