import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Clubadmin from '../components/Clubadmin'
import CreateClubAdminForm from './CreateClubAdminForm';
import ViewAllClubAdmin from './ViewAllClubAdmin';

export default function ClubAdminDashboard() {
     const [currentView, setCurrentView] = useState("default");

     const changeView = (view, clubId = null) => {
        console.log("Change View called with:", view, clubId);
        setCurrentView(view);
        if (clubId) {
          setSelectedClubId(clubId);
        }
      };

      const renderMainContent = () => {
        console.log("Current View:", currentView);
        switch (currentView) {
          case 'createClubAdmin':
            return <CreateClubAdminForm />;
          case 'viewAllClubAdmin':
            return <ViewAllClubAdmin/>;
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
    <div>
        <Navbar/>
        <Clubadmin changeView={changeView}/>

        <div className="main-content">
          {renderMainContent()}
        </div>
    </div>
  )
}
