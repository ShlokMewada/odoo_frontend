import { GoogleOAuthProvider } from '@react-oauth/google';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import AboutUs from './components/AboutUs';
import BookDetails from './components/BookDetails';
import BorrowingHistory from './components/BorrowingHistory';
import Error from "./components/Error";
import Forbidden from './components/Forbidden';
import Home from './components/Home';
import Login from "./components/Login";
import Signup from './components/Signup';
import { UserProvider } from './components/UserContext';
import UserProfile from './components/UserProfile';
import "./index.css";
import "./main.css";

const clientId = '443652869740-1df41cf4e6ikli26qdtg784qcefdf1lu.apps.googleusercontent.com'; // Replace with your actual client ID

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error />,
    children:[
      {
        index: true, // This makes Home the default route
        element: <Home />
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/borrowing-history", // Add this route
        element: <BorrowingHistory />,
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
  },
  {
    path: "/about",
    element: <AboutUs/>
  },
  {
    path: "/bookdetails",
    element: <BookDetails/>
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
