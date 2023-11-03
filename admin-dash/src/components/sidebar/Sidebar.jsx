import React from "react";
import "./sidebar.scss";
import PersonIcon from "@mui/icons-material/Person";

import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();

    navigate("/"); // Replace '/login' with your actual login route
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SCAN ME</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN OPTIONS</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>PRODUCTS</span>
            </li>
          </Link>
          <Link to="/itemnote" style={{ textDecoration: "none" }}>
            <li>
              <EventNoteIcon className="icon" />
              <span>PRODUCTS NOTES</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>LOGOUT</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
