import React from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ControlAccess = (user_role, method) => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  if (method === "check") {
    if (user.role === user_role) {
      return true;
    } else {
      return false;
    }
  }
  if (method === "navigate") {
    // if (user.role === "None") {
    //   navigate("/purpose");
    // }

    if (user.role !== user_role) {
      navigate("/forbidden");
    }
  }
  return <div></div>;
};

export default ControlAccess;
