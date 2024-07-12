import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import Error from "./components/Error";
import LogoutHandler from "./components/LogoutHandler"
import Header from "./components/Header";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Login />,
    //   },
    // ],
    errorElement: <Error />,
  },{
    path: "/login",
    element:<Login/>
  },{
    path: "/logout",
    element: <LogoutHandler/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
