import React, { useState, useEffect } from "react";
import "./Clubhome.css";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

const clubs = [
  {
    name: "LEO CLUB",
    logo: "/leologo.png",
    bgImages: ["/1.jpg", "/2.jpg", "/3.jpg"],
    description: `Leo Clubs are youth organizations sponsored by Lions Clubs that empower young people to make a difference. 
    Leos engage in various community service activities, develop leadership skills, and experience the joy of serving others.`,
    logoStyle: { marginLeft: "10px", marginRight: "0", width: "60px", height: "50px" },
    headerStyle: { marginLeft: "10px", marginRight: "0" },
    link: "/leologin",
  },
  {
    name: "ROTRACT CLUB",
    logo: "/rotractlogo.png",
    bgImages: ["/rotractback.jpg", "/aisecback.jpg", "/ledback.jpg"],
    description: `Rotaract Club is a global organization of young professionals dedicated to community service, leadership development, and cultural exchange, fostering positive change through impactful projects and networking opportunities worldwide.`,
    link: "/rotractlogin",
  },
  {
    name: "ISACA CLUB",
    logo: "/isaclogo.png",
    bgImages: ["/4.jpg", "/5.jpg", "/6.jpg"],
    description: `ISACA Club empowers students and professionals in IT governance, cybersecurity, and risk management through knowledge sharing, certifications, and networking. It fosters leadership and career growth in the ever-evolving field of technology.`,
    logoStyle: { marginLeft: "10px" },
    link: "/isacalogin",
  },
  
];

const ClubCard = ({ club }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % club.bgImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [club.bgImages.length]);

  return (
    <div
      className="aa-club-card"
      style={{
        backgroundImage: `url(${club.bgImages[currentImageIndex]})`,
      }}
    >
      <div className="aa-club-header">
        <img
          src={club.logo}
          alt={`${club.name} Logo`}
          className="aa-club-logo"
          style={club.logoStyle} // Separate inline style for the logo
        />
        <h2 className="aa-club-name" style={club.headerStyle}> {/* Separate inline style for the header */}
          {club.name}
        </h2>
      </div>
      <hr />
      <p className="aa-club-description">{club.description}</p>
      <a href={club.link} className="aa-register-btn"> Join Now</a>
    
       
    </div>
  );
};

const Clubhome = () => {
  return (
    <div className="aa-club-home-page">
      <Sidebar />
      <div className="aa-club-content">
      <Dashboard />
      <div className="aa-club-container">
        {clubs.map((club, index) => (
          <ClubCard key={index} club={club} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Clubhome;
