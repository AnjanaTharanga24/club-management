import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Adminsidebar from '../components/Adminsidebar';
import '../admin/MainAdminDashboard.css'; 
import'./CreateMainAdmin'
import CreateMainAdmin from './CreateMainAdmin';
import ViewAllMainAdmin from './ViewAllMainAdmin';
import ClubRegistrationForm from './NewClub';

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
      case 'createClub':
        return <ClubRegistrationForm/>
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