import React from "react";
import ReactDOM from "react-dom/client";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./components/Login";
import LogoutHandler from "./components/LogoutHandler";
import "./index.css";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const clientId = '443652869740-1df41cf4e6ikli26qdtg784qcefdf1lu.apps.googleusercontent.com'; // Replace with your actual client ID

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <LogoutHandler />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <RouterProvider router={appRouter} />
  </GoogleOAuthProvider>
);
