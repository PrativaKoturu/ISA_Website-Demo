import React, { useState, useEffect } from 'react';
import ThreeScene from '../components/ThreeScene';
import { Briefcase, Users, Cpu, History, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient';


const Home = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vrLoading, setVrLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchWorkshops() {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('workshop')
        .select('*')
        .gte('workshop_date', today)
        .order('workshop_date', { ascending: true });
      if (!error) setWorkshops(data || []);
      setLoading(false);
    }
    fetchWorkshops();
  }, []);

  const handleNext = () => {
    const nextIndex = currentIndex + itemsPerPage;
    setCurrentIndex(nextIndex >= workshops.length ? 0 : nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - itemsPerPage;
    const lastPageIndex = Math.floor((workshops.length - 1) / itemsPerPage) * itemsPerPage;
    setCurrentIndex(prevIndex < 0 ? lastPageIndex : prevIndex);
  };

  const handleVRLoaded = () => {
    // Add a small delay to ensure the fade-out animation works properly
    setTimeout(() => {
      setVrLoading(false);
    }, 100);
  };

  return (
    <div className="home">
      {vrLoading && (
        <div className={`vr-loader-overlay ${!vrLoading ? 'fade-out' : ''}`}>
          <div className="vr-loader">
            <div className="vr-spinner"></div>
            <div className="vr-loader-text">Loading VR Experience...</div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">ISA - VESIT</div>
            <h1 className="hero-title gradient-headline">SETTING</h1>
            <h1 className="hero-title gradient-headline">STANDARD</h1>
            <h1 className="hero-title gradient-headline">FOR</h1>
            <h2 className="hero-subtitle gradient-headline">AUTOMATION<span className="trademark">™</span></h2>
            
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
            <ThreeScene onLoaded={handleVRLoaded} />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-container">
          <div className="about-us-card">
            <h3 className="about-us-title">About ISA VESIT</h3>
            <p className="about-us-text">
              ISA-VESIT is an interdisciplinary organization in which professionals from Instrumentation, Electronics, Communications, Programming, Management and Control Design fields share a platform and contribute towards better functioning of the Industry and its Automation.
              <br /><br />
              Founded in 1945, the International Society of Automation is a leading, global non-profit organization with more than 40,000 members and 400,000 customers worldwide.
              <br /><br />
              ISA-VESIT is the student section of ISA International that comes under the ISA Maharashtra section. ISA-VESIT aims to bridge the gap between student community and industry by adding to the technical and industrial aspects of students with a vision of advancing technical competence by connecting the automation community to achieve operational excellence. We conduct workshops to enlighten our students with technical knowledge and make them impart it on day-to-day life practical applications so as to make the most out of theoretical wisdom.
            </p>
          </div>
          <div className="stats-card">
            <div className="stats-grid-vertical">
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
        {loading ? (
          <div>Loading workshops...</div>
        ) : workshops.length === 0 ? (
          <div>No upcoming workshops found.</div>
        ) : (
          <div className="workshop-carousel">
            <button onClick={handlePrev} className="carousel-nav prev">
              <ChevronLeft size={48} />
            </button>
            <div className="workshops-grid">
              {workshops.slice(currentIndex, currentIndex + itemsPerPage).map(workshop => (
                <div key={workshop.id} className="workshop-card">
                  <div className="workshop-image-container">
                    <img 
                      src={workshop.feature_image_url} 
                      alt={workshop.workshop_name} 
                      className="workshop-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/1e293b/60a5fa?text=Workshop';
                      }}
                    />
                  </div>
                  <div className="workshop-content">
                    <h3 className="workshop-name">{workshop.workshop_name}</h3>
                    {workshop.description && (
                      <p className="workshop-description">
                        {workshop.description.length > 100 
                          ? `${workshop.description.substring(0, 100)}...` 
                          : workshop.description}
                      </p>
                    )}
                    <div className="workshop-date">
                      {new Date(workshop.workshop_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="workshop-button-container">
                    <button 
                      className="register-btn"
                      onClick={() => window.open(workshop.registration_link, '_blank')}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="carousel-nav next">
              <ChevronRight size={48} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;