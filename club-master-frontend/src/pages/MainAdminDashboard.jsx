import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Adminsidebar from '../components/Adminsidebar';
import CreateMainAdmin from '../components/CreateMainAdmin';

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
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <Adminsidebar changeView={changeView} />
      <div className="main-content">
        {renderMainContent()}
      </div>
    </div>
  );
}