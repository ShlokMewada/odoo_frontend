import React from "react";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      const response = await fetch("https://odoo.detrace.systems/api/users/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      const result = await response.json();

      // Sort data by id in ascending order
      const sortedData = result.sort((a, b) => a.id - b.id);
      setData(sortedData);
    };

    fetchData();
  }, []);
  return <div></div>;
};

export default Home;
