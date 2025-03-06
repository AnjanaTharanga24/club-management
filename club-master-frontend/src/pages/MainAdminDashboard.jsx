import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Adminsidebar from '../components/Adminsidebar';
import CreateMainAdmin from '../components/CreateMainAdmin';
import ViewAllMainAdmin from './ViewAllMainAdmin';
import '../pages/MainAdminDashboard.css'; 

export default function MainAdminDashboard() {
  const [currentView, setCurrentView] = useState("default");

  const changeView = (view) => {
    console.log("Change View called with:", view); // Debugging
    setCurrentView(view);
  };

  const renderMainContent = () => {
    console.log("Current View:", currentView); // Debugging
    switch (currentView) {
      case 'createNewAdmin':
        return <CreateMainAdmin />;
      case 'viewAllMainAdmin':
        return <ViewAllMainAdmin/>;
      default:
        return (
          <div className="welcome-container">
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Adminsidebar changeView={changeView} />
        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}