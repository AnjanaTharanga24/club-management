import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { UserContext } from '../common/UserContext';
import { useNavigate } from 'react-router-dom';
import '../pages/ViewClub.css'; // Ensure this CSS file contains the provided styles

export default function ViewMyClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User in ViewMyClubs:', user); // Debugging log
    if (user && user.id) {
      getAllClubsByUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getAllClubsByUser = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/v1/club/${user.id}/getClubs`);
      console.log('API Response:', response.data);

      // Process the array of club objects
      const clubsArray = response.data.map((club) => ({
        id: club.clubId,
        name: club.clubName,
      }));

      setClubs(clubsArray);
      setLoading(false);
    } catch (error) {
      console.error('Error while getting clubs:', error);
      setError('Failed to fetch clubs. Please try again later.');
      setLoading(false);
    }
  };

  const viewClub = (clubId) => {
    navigate(`/rotract/?clubId=${clubId}`);
  };

  const getClubColor = (name) => {
    const colors = [
      // 'var(--dark-blue-gradient)',
      'linear-gradient(135deg, #6a11cb, #2575fc)',
      // 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      // 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
      // 'linear-gradient(135deg, #84fab0, #8fd3f4)',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  if (!user) {
    return (
      <div className="error-container">
        <h3>Please log in to view your clubs.</h3>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={getAllClubsByUser}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <div className="clubs-header">
          <div>
            <h1>My Clubs</h1>
            <p className="subtitle">Explore and manage your club memberships</p>
          </div>
          <button className="new-club-btn">
            <i className="bi bi-plus"></i>
            <span>New Club</span>
          </button>
        </div>

        {clubs.length > 0 ? (
          <div className="clubs-grid">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="club-tile"
                style={{ background: getClubColor(club.name) }}
              >
                <div className="club-content">
                  <div className="club-name">{club.name}</div>
                  <div className="club-members">
                    <i className="bi bi-people-fill"></i>
                    <span>12 members</span>
                  </div>
                  <div className="club-id">ID: {club.id}</div>
                </div>
                <div className="club-actions">
                  <button className="club-action-btn" onClick={() => viewClub(club.id)}>
                    <span>View Club</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No clubs found.</p>
        )}
      </div>
    </div>
  );
}