import { GoogleOAuthProvider } from '@react-oauth/google';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./components/Login";
import { UserProvider } from './components/UserContext';
import "./index.css";
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import App from './App';
import "./main.css";
import Forbidden from './components/Forbidden';

const clientId = '443652869740-1df41cf4e6ikli26qdtg784qcefdf1lu.apps.googleusercontent.com'; // Replace with your actual client ID

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        path: "/userprofile",
        element: <UserProfile />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forbidden",
    element: <Forbidden/>
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <UserProvider>
      <RouterProvider router={appRouter} />
    </UserProvider>
  </GoogleOAuthProvider>
);
