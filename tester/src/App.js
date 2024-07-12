import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Header />
            </PrivateRoute>
          }
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;