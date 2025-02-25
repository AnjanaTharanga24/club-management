import React from "react";
import { FaUsers, FaPlus, FaCalendarAlt, FaNewspaper, FaCalendar } from "react-icons/fa"; // Import icons from react-icons

import './Sidebar.css'; // Make sure to create a CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><FaUsers className="icon" /> My Clubs</li>
        <li><FaPlus className="icon" /> Join New Club</li>
        <li><FaCalendarAlt className="icon" /> Events</li>
        <li><FaNewspaper className="icon" /> News</li>
        <li><FaCalendar className="icon" /> Calendar</li>
      </ul>
    </div>
  );
};

export default Sidebar;
