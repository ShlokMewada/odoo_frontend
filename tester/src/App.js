import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
