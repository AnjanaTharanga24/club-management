import React from "react";
import { FaUsers, FaPlus, FaCalendarAlt, FaNewspaper, FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        
        <li>
          <Link to="/myclub" className="sidebar-link">
            <FaUsers className="icon" /> My Clubs
          </Link>
        </li>
        <li>
          <Link to="/join-new-club" className="sidebar-link">
            <FaPlus className="icon" /> Join New Club
          </Link>
        </li>
        <li>
          <Link to="/events" className="sidebar-link">
            <FaCalendarAlt className="icon" /> Events
          </Link>
        </li>
        <li>
          <Link to="/news" className="sidebar-link">
            <FaNewspaper className="icon" /> News
          </Link>
        </li>
        <li>
          <Link to="/calendar" className="sidebar-link">
            <FaCalendar className="icon" /> Calendar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;