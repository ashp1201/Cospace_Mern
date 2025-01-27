import React, { useEffect, useRef, useState } from "react";
import "./AdminDashboard.css";
import UserInfo from './UserInfo';

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";


function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <div className="admin">
      <AdminNavbar toggleSidebar={toggleSidebar} dropdownRe={dropdownRef} />

      <Paper className={`${isSidebarVisible ? "visible" : "invisible"}`}>
        <MenuList className="sidebar-menulist">
          <MenuItem
            onClick={() => {
              navigate('/admin/dashboard');
            }}
            className="menucontent"
          >
            View User Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/admin/dashboard/viewlocation");
            }}
            className="menucontent"
          >
            View location and Prices
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/admin/dashboard/addlocation");
            }}
            className="menucontent"
          >
            Add Location
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}

export default AdminDashboard;
