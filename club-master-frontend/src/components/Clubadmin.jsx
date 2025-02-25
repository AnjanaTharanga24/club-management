import React from "react";
import { FaUsers, FaPlus, FaCalendarAlt, FaNewspaper, FaCalendar, FaEdit, FaCog } from "react-icons/fa";

import './Clubadmin.css'; // Ensure the CSS file matches the new name and structure

const Clubadmin = () => {
  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar-list">
        <li className="admin-sidebar-item"><FaUsers className="admin-icon" /> Manage Clubs</li>
        <li className="admin-sidebar-item"><FaPlus className="admin-icon" /> Add Club</li>
        <li className="admin-sidebar-item"><FaCalendarAlt className="admin-icon" /> Events</li>
        <li className="admin-sidebar-item"><FaEdit className="admin-icon" /> Manage Posts</li>
        <li className="admin-sidebar-item"><FaNewspaper className="admin-icon" /> News</li>
        <li className="admin-sidebar-item"><FaCalendar className="admin-icon" /> Calendar</li>
        <li className="admin-sidebar-item"><FaCog className="admin-icon" /> Settings</li>
      </ul>
    </div>
  );
};

export default Clubadmin;