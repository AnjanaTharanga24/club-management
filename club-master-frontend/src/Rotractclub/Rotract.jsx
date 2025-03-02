import React, { useState, useEffect } from "react";
import "./Rotract.css";
import { Typewriter } from "react-simple-typewriter";
import Rotractnav from "../components/Rotractnav";
import Rotractfooter from "../components/Rotractfooter";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const Rotract = () => {
  const images = ["/r100.jpg", "/r101.jpg", "/r102.jpg", "/r103.jpg"];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [alternateImage, setAlternateImage] = useState("revent2.jpg");
  const [isImpactVisible, setIsImpactVisible] = useState(false);
  const [counts, setCounts] = useState({ members: 0, projects: 0, awards: 0 });

  const [searchParams] = useSearchParams();
  const clubId = searchParams.get('clubId');
  const [club, setClub] = useState({});

  useEffect(() => {
    if (clubId) {
      getClub();
    }
  }, [clubId]);

  const getClub = async () =>{
    try {
      const response = await axios.get(`http://localhost:7000/api/v1/club/findClub/${clubId}`);
      console.log(response.data);
      setClub(response.data);
    } catch (error) {
      console.log('Error while getting club', error);
    }

  }

  useEffect(() => {
    // Image carousel effect
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Alternate image toggling
    const alternateInterval = setInterval(() => {
      setAlternateImage((prevImage) =>
        prevImage === "revent2.jpg" ? "revent1.jpg" : "revent2.jpg"
      );
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearInterval(alternateInterval);
    };
  }, [images.length]);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Observer for the "Our Impact" section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImpactVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const impactSection = document.querySelector(".impact-container");
    if (impactSection) {
      observer.observe(impactSection);
    }

    return () => {
      if (impactSection) observer.unobserve(impactSection);
    };
  }, []);

  useEffect(() => {
    if (isImpactVisible) {
      const targetCounts = { members: 500, projects: 100, awards: 20 };
      const duration = 2000; // Animation duration in milliseconds
      const interval = 20; // Interval time in milliseconds

      Object.keys(targetCounts).forEach((key) => {
        const increment = targetCounts[key] / (duration / interval);

        let currentValue = 0;
        const intervalId = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetCounts[key]) {
            currentValue = targetCounts[key];
            clearInterval(intervalId);
          }
          setCounts((prev) => ({ ...prev, [key]: Math.floor(currentValue) }));
        }, interval);
      });
    }
  }, [isImpactVisible]);
  const avenues = [
    {
      title: "Club Service",
      description:
        "We work together to strengthen fellowship among our members through continuous and coordinated teamwork.",
      icon: "/rr1.png", // Replace with your actual icon path
    },
    {
      title: "Community Service",
      description:
        "Our primary intention is to spread the essence of true community service through every step we take and every project we do.",
      icon: "/rr2.png",
    },
    {
      title: "Professional Development",
      description:
        "Our main purpose is to encourage our members and fellow Rotaractors to serve the community through their skills, to share them with others and learn through fellowship.",
      icon: "/rr3.png",
    },
    {
      title: "International Service",
      description:
        "Our aim is to build up fellowships with Rotaractors around the world but also to promote our culture and heritage and promote humanitarian work around the world.",
      icon: "/rr4.png",
    },
    {
      title: "Sports and Recreational Activities",
      description:
        "Our main aim is to encourage positive development in the sportsmanship of the club members & their enthusiasm regarding sports.",
      icon: "/rr5.png",
    },
  ];
  const members = [
    {
      role: 'President',
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: '/tt1.jpg',
    },
    {
      role: 'Vice President',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      image: '/tt1.jpg',
    },
    {
      role: 'Secretary',
      name: 'Mike Brown',
      email: 'mike.brown@example.com',
      image: '/tt1.jpg',
    },
    {
      role: 'Treasurer',
      name: 'Sara Davis',
      email: 'sara.davis@example.com',
      image: '/tt1.jpg',
    },
  ];
  const projects = [
    {
      title: "Project Kids First",
      date: "Jul 22, 2022",
      description:
        "Kids First is a project empowering school students to recognize, prevent, and combat sexual harassment through safe, age-appropriate, and interactive sessions. It fosters awareness of boundaries, respect, and consent while building confidence to report and stand against harassment, ensuring the safety and well-being of the next generation.",
      image: "pr100.jpg",
    },
    {
      title: "Project Akura",
      date: "Jul 22, 2022",
      description:
        "For seven years, Akura has supplied rural schools with books, essential supplies, and support, nurturing a love for learning and bridging educational gaps. This enduring initiative has transformed schools into hubs of opportunity, empowering students to dream big and ensuring every child can access quality education.",
      image: "pr101.jpg",
    },
    {
      title: "Beach Cleanup",
      date: "Sep 15, 2023",
      description:
        "Our recent beach outing blended relaxation with purpose through a cleanup initiative. Club members of all ages worked together to remove litter, leaving the beach pristine. This fulfilling experience proved sustainability and enjoyment can coexist, reminding us that small efforts preserve our natural treasures for future enjoyment.",
      image: "pr102.jpg",
    },
  ];
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0);

  const awards = [
    {
      image: "/rocaward1.jpg",
      title: "Best Innovation Award 2024",
      description: "Recognition for groundbreaking technological advancement"
    },
    {
      image: "/rocaward2.png",
      title: "Excellence in Design 2024",
      description: "Outstanding achievement in product design"
    },
    {
      image: "/rocaward3.jpg",
      title: "Customer Choice Award",
      description: "Voted best by our valued customers"
    },
    {
      image: "/rocaward4.png",
      title: "Sustainability Champion",
      description: "Leading environmental responsibility initiatives"
    },
    {
      image: "/rocaward5.png",
      title: "Industry Leadership Award",
      description: "Setting standards in industry excellence"
    }
  ];

  // Add this useEffect for awards carousel
  useEffect(() => {
    const awardTimer = setInterval(() => {
      setCurrentAwardIndex((prevIndex) => 
        prevIndex === awards.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(awardTimer);
  }, []);

  

  return (
    <div>
      <Rotractnav />

      {/* Background Section */}
      <div
        className="background-container"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className="text-overlay">
          <h1>
            {club.clubVision}
            
            <div className="typewriter-text2">
              <Typewriter
                words={["urgent problems.", "critical issues.", "global crises."]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={200}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
          </h1>
        </div>
      </div>

      {/* Interface Below the Background */}
      <div className="interface-container">
        <header className="interface-header animate-on-scroll">
          <h1>Welcome to {club.clubName} Club of University of Kelaniya</h1>
          <p>Making a Positive Impact on the Society since 2010</p>
        </header>

        <div className="interface-content">
          <div className="intro animate-on-scroll">
            <p>
            {club.clubName} is a club for young people focused on community service, leadership development, and networking. It is part of Rotary International and aims to create positive change through various local and international projects.
            </p>
          </div>

          <div className="images animate-on-scroll">
            <img src="/roci1.jpg" alt="Group 1" className="image" />
            <img src="/roci2.jpg" alt="Group 2" className="image" />
            <img src="/nnn.jpg" alt="Group 3" className="image" />
            <img src="/roci3.jpg" alt="Group 3" className="image" />
            
          </div>

          <div className="video-section animate-on-scroll">
            <p>Take a look at Project 'Mathru'</p>
            <div className="video-placeholder">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1wDJICF5C7Y?si=uF4pE1V5ikm653kX"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
       {/* Main Avenues Interface */}
       <div className="avenues-container">
        <h2>Main Avenues</h2>
        <div className="avenues">
          {avenues.map((avenue, index) => (
            <div
              key={index}
              className="avenue-card animate-on-scroll"
            >
              <img
                src={avenue.icon}
                alt={`${avenue.title} Icon`}
                className="avenue-icon"
              />
              <h3>{avenue.title}</h3>
              <p>{avenue.description}</p>
            </div>
          ))}
        </div>
      </div>
       {/* project interface*/}

       <div className="latest-projects animate-on-scroll">
      <h2>Latest Projects</h2>
      <div className="project-cards-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-card-image" />
            <div className="project-card-content">
              <p className="project-card-date">{project.date}</p>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    

      {/* report interface*/}
      <div className="report-container animate-on-scroll">
        {/* Left section with text */}
        <div className="report-left-section">
          <h1>Stay Updated with the Latest <span className="red-text">NEWS!</span></h1>
          <p>
            Stay updated with the latest happenings in Rotaract! Discover inspiring stories, impactful projects, and global initiatives led by Rotaractors worldwide. 
          </p>
          <p>Explore how young leaders are driving positive change, fostering connections, and making a difference in communities across the globe.</p>
          {/* <button className="report-button" onClick={() => window.location.href = 'link-to-your-report.pdf'}>Click here</button> */}


          <a href={`/rotractnews?clubId=${club.clubId}`}  className=" report-button">Click here</a>

 
        </div>
  
        {/* Right section with image */}
        <div className="report-right-section">
          <img src="Annualrotract.jpg" alt="Annual Report" />
        </div>
      </div>
       {/* rotract events */}
  
      <div className="revent-container animate-on-scroll">
        {/* Left Side: Text Content */}
        <div className="revent-text-section">
        <h1>See what's new on the RACUOK <span className="red-text">EVENTS!</span></h1>
  
          <p>
            Explore our dynamic content showcasing the impact of passionate individuals 
            and their journey towards positive transformation.
          </p>
          <p>
            Discover how we’re making a difference in society while unlocking personal 
            growth. Visit us today and be part of the story – where service, friendship, 
            and empowerment unite!
          </p>
          <a href="/rotractevent" className="revent-action-button">Click Here</a>
        </div>
  
        {/* Right Side: Images */}
        <div className="revent-image-section">
          
          <img src={alternateImage} alt="Alternate Event" className="revent-image" />
          
          
         
        </div>
      </div>
      <div className="awards-section animate-on-scroll">
        <h2>Our Awards & Recognition</h2>
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentAwardIndex * 100}%)`,
            }}
          >
            {awards.map((award, index) => (
              <div key={index} className="award-slide">
                <div className="award-card">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="award-image"
                  />
                  <div className="award-content">
                    <h3 className="award-heading">{award.title}</h3>
                    <p className="award-description">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="navigation-dots">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAwardIndex(index)}
                className={`nav-dot ${currentAwardIndex === index ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Executive bord */}
      <div className="executive-board animate-on-scroll">
      <h1>Executive Board</h1>
      <div className="members">
        {members.map((member, index) => (
          <div className="member" key={index}>
            <img src={member.image} alt={`${member.role} - ${member.name}`} />
            <h2>{member.role}</h2>
            <p>{member.name}</p>
            <p>{member.email}</p>
          </div>
        ))}
      </div>
    </div>

      {/* Our Impact Section */}
      <div className="impact-container animate-on-scroll">
        <h2 className="impact-heading">Our Impact in Figures</h2>
        <div className="impact-box">
          <div className="impact-item">
            <p className="impact-number">{counts.members}+</p>
            <p className="impact-label">Members</p>
          </div>
          <div className="impact-item">
            <p className="impact-number">{counts.projects}+</p>
            <p className="impact-label">Projects</p>
          </div>
          <div className="impact-item">
            <p className="impact-number">{counts.awards}+</p>
            <p className="impact-label">Awards</p>
          </div>
        </div>
      </div>
      <Rotractfooter />
      
    </div>
  );
};

export default Rotract;
