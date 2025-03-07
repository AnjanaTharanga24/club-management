import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ViewAllClubs.css";

export default function ViewAllClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllClubs();
  }, []);

  const getAllClubs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7000/api/v1/club/all");
      console.log(response.data);
      setClubs(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error while getting all clubs", error);
      setLoading(false);
    }
  };

  return (
    <div className="club-container">
      <div className="club-header-section">
        <div className="container py-5">
          <h1 className="club-main-title text-center mb-5">
            <span className="club-title-highlight">Explore</span> Our Clubs
          </h1>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner-border club-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
              {clubs.map((club, index) => (
                <div key={index} className="col p-3">
                  <div className="club-card h-100">
                    <div className="club-card-header">
                      <h2 className="club-name">{club.clubName}</h2>
                      <span className="club-id">ID: {club.clubId}</span>
                    </div>
                    <div className="club-card-body">
                      <div className="club-info-item">
                        <i className="bi bi-geo-alt-fill club-icon"></i>
                        <p className="club-address">{club.clubAddress}</p>
                      </div>
                      
                      <div className="club-info-item">
                        <i className="bi bi-person-fill club-icon"></i>
                        <p className="club-adviser">
                          <span className="club-label">Senior Adviser:</span> {club.clubSeniorAdviser}
                        </p>
                      </div>
                      
                      <div className="club-info-item">
                        <i className="bi bi-megaphone-fill club-icon"></i>
                        <p className="club-producer">
                          <span className="club-label">Producer:</span> {club.clubProducer}
                        </p>
                      </div>
                      
                      <div className="club-vision-section">
                        <h3 className="club-vision-title">Our Vision</h3>
                        <p className="club-vision-text">{club.clubVision}</p>
                      </div>
                    </div>
                    <div className="club-card-footer">
                      <button className="club-btn-details">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}