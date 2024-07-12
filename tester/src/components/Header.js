// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Login from "./Login";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [message, setMessage] = useState();

//   const [statusCode, setStatusCode] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await fetch("http://localhost:8000/pilot/users/protected/", {
//       method: "GET",
//       headers: {

//         "Content-Type": "application/json",
//         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//       },
//     });

//     const json = await data.json();

//     setMessage(json.message);

//     setStatusCode(json.status);

//     console.log(json);
//   };

//   if (statusCode === 401) {
//     navigate("/Login");
//   }
//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate()

  const [message, setMessage] = useState();

  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("https://odoo.detrace.systems/users/protected/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      })
      
    } catch (error) {
      navigate("/login")
      
    }
    
    
    // const json = await data.json();
    // console.log(json)

    // setMessage(json.message);

    // setStatusCode(json.status);

    // console.log(json);
  };

  console.log(statusCode)

  if (statusCode === 401) {
    navigate("/Login");
  }
  return (
    <div>
    <button onClick={()=>navigate("/login")}>ABC</button>
      <h1>{message}</h1>
    </div>
  );
};

export default Header;
