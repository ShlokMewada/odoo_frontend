import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div>
      <h1>You are not Authorized , please go to home page and try again.</h1>
      <h1>403 Forbidden Page</h1>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

export default Forbidden;
