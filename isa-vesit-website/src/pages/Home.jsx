import React, { useState } from 'react';
import ThreeScene from '../components/ThreeScene';
import { Briefcase, Users, Cpu, History, ChevronLeft, ChevronRight } from 'lucide-react';
import workshopImage from '../assets/images/workshop.png';


const Home = () => {
  const workshops = [
    {
      id: 1,
      title: 'Web Animations',
      imageSrc: workshopImage,
      googleFormLink: 'https://forms.google.com/your-form-link-1'
    },
    {
      id: 2,
      title: 'ChatGPT Clone',
      imageSrc: workshopImage,
      googleFormLink: 'https://forms.google.com/your-form-link-2'
    },
    {
      id: 3,
      title: 'CTRL+ALT+DEBATE',
      imageSrc: workshopImage,
      googleFormLink: 'https://forms.google.com/your-form-link-3'
    },
    {
      id: 4,
      title: 'Digital Designing with Verilog',
      imageSrc: workshopImage,
      googleFormLink: 'https://forms.google.com/your-form-link-4'
    },
    {
      id: 5,
      title: 'Intro to Robotics',
      imageSrc: workshopImage,
      googleFormLink: 'https://forms.google.com/your-form-link-5'
    },
    {
      id: 6,
      title: '3D Printing Essentials',
      imageSrc: workshopImage,
      googleFormLink: 'https://forms.google.com/your-form-link-6'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    const nextIndex = currentIndex + itemsPerPage;
    // If next index is out of bounds, loop back to the start
    setCurrentIndex(nextIndex >= workshops.length ? 0 : nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - itemsPerPage;
    const lastPageIndex = Math.floor((workshops.length - 1) / itemsPerPage) * itemsPerPage;
    // If previous index is less than 0, go to the last page
    setCurrentIndex(prevIndex < 0 ? lastPageIndex : prevIndex);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">ISA - VESIT</div>
            <h1 className="hero-title">SETTING</h1>
            <h1 className="hero-title">STANDARD</h1>
            <h1 className="hero-title">FOR</h1>
            <h2 className="hero-subtitle">AUTOMATION<span className="trademark">™</span></h2>
            
            <div className="cta-button">
              <button className="explore-btn">
                <span>Explore ISA</span>
                <div className="btn-particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
                <div className="glitch-layers">
                  <div className="glitch-layer"></div>
                  <div className="glitch-layer"></div>
                </div>
                <div className="energy-field"></div>
                <div className="holographic-overlay"></div>
              </button>
            </div>
          </div>
          
          <div className="hero-3d">
            <ThreeScene />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-container">
          <div className="about-us-card">
            <h3 className="about-us-title">About ISA VESIT</h3>
            <p className="about-us-text">
              ISA VESIT, as the student council of Instrumentation department at VESIT, 
              dedicated to festering knowledge and innovation in automation and 
              control technologies.
            </p>
          </div>
          <div className="stats-card">
            <div className="stats-grid">
              <div className="stat-item">
                <Briefcase size={28} className="stat-icon" />
                <span className="stat-number">50+</span>
                <span className="stat-label">Workshops</span>
              </div>
              <div className="stat-item">
                <Users size={28} className="stat-icon" />
                <span className="stat-number">70+</span>
                <span className="stat-label">Council Members</span>
              </div>
              <div className="stat-item">
                <Cpu size={28} className="stat-icon" />
                <span className="stat-number">80+</span>
                <span className="stat-label">Components</span>
              </div>
              <div className="stat-item">
                <History size={28} className="stat-icon" />
                <span className="stat-number">5</span>
                <span className="stat-label">Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="workshops-section">
        <h2 className="workshops-title">Upcoming Workshops</h2>
        <div className="workshop-carousel">
          <button onClick={handlePrev} className="carousel-nav prev">
            <ChevronLeft size={48} />
          </button>
          <div className="workshops-grid">
            {workshops.slice(currentIndex, currentIndex + itemsPerPage).map(workshop => (
              <div key={workshop.id} className="workshop-card">
                <div className="workshop-image-container">
                  <img src={workshop.imageSrc} alt={workshop.title} className="workshop-image" />
                </div>
                <div className="workshop-button-container">
                  <button 
                    className="register-btn"
                    onClick={() => window.open(workshop.googleFormLink, '_blank')}
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="carousel-nav next">
            <ChevronRight size={48} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;