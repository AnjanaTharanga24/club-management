import React, { useState, useEffect } from "react";
import "./Clubhome.css";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

// Map club names to specific background images
const clubBackgroundImages = {
  // social: ["/social1.jpg", "/social2.jpg", "/social3.jpg"],
  // pmat: ["/pmat1.jpg", "/pmat2.jpg", "/pmat3.jpg"],
  // stat: ["/stat1.jpg", "/stat2.jpg", "/stat3.jpg"],
  // anima: ["/anima1.jpg", "/anima2.jpg", "/anima3.jpg"],
  // cloud: ["/cloud1.jpg", "/cloud2.jpg", "/cloud3.jpg"]
};

const defaultBgImages = ["/1.jpg", "/2.jpg", "/3.jpg"];

const clubLogos = {
  // social: "/leologo.png",
  // pmat: "/rotractlogo.png",
  // stat: "/isaclogo.png",
  // anima: "/leologo.png",
  // cloud: "/leologo.png",
  default: "/leologo.png" 
};

const ClubCard = ({ club }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const clubName = club.clubName.toLowerCase();
  const bgImages = clubBackgroundImages[clubName] || defaultBgImages;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const logo = clubLogos[clubName] || clubLogos.default;

  return (
    <div
      className="aa-club-card"
      style={{
        backgroundImage: `url(${bgImages[currentImageIndex]})`,
      }}
    >
      <div className="aa-club-header">
        <img
          src={logo}
          alt={`${club.clubName} Logo`}
          className="aa-club-logo"
          style={{ width: "60px", height: "50px", marginLeft: "10px" }}
        />
        <h2 className="aa-club-name" style={{ marginLeft: "10px" }}>
          {club.clubName.toUpperCase()} CLUB
        </h2>
      </div>
      <hr />
      <p className="aa-club-description mb-4">{club.clubVision}</p>
      <span className="club-key bg-dark text-white p-2 shadow">enrollment key : {club.clubId}</span>
      <div className="aa-club-actions mt-4">
        <a href={`/rotractlogin?clubId=${club.clubId}`} className="aa-register-btn">Join Now</a>
      </div>
    </div>
  );
};

const Clubhome = () => {
  const [clubs, setClubs] = useState([]);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enrollmentKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    getAllClubs();
  }, []);

  const getAllClubs = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1/club/all");
      console.log('Clubs data:', response.data);

      const filteredClubs = response.data.filter(club => 
      
        club.clubName.length > 1
      );
      
      setClubs(filteredClubs);
    } catch (error) {
      console.error('Error while getting all clubs', error);
    }
  };

  return (
    <div className="aa-club-home-page">
      <div>
        <Navbar />
      </div>
      <Sidebar />
      <div className="aa-club-content">
        
        <div className="aa-club-container " style={{marginTop:"40px"}}>
          {clubs.map((club) => (
            <ClubCard key={club.clubId} club={club} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubhome;