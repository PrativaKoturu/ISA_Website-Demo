import React, { useState, useEffect } from 'react';
import ThreeScene from '../components/ThreeScene';
import ModelViewer from '../blocks/Components/ModelViewer/ModelViewer';
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
            <ModelViewer
              url="/vr_headset.glb"
              width={1000}
              height={600}
              enableManualRotation={true}
              enableMouseParallax={true}
              enableHoverRotation={true}
              enableManualZoom={true}
              autoRotate={false}
              fadeIn={true}
              showScreenshotButton={false}
              environmentPreset="forest"
              ambientIntensity={0.6}
              keyLightIntensity={1.2}
              defaultZoom={10.0}
              minZoomDistance={0.8}
              maxZoomDistance={15}
              autoFrame={true}
              onModelLoaded={handleVRLoaded}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-container" style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div className="about-us-card" style={{ flex: 2 }}>
            <h3 className="about-us-title">About ISA VESIT</h3>
            <p className="about-us-text">
              ISA-VESIT is an interdisciplinary organization in which professionals from Instrumentation, Electronics, Communications, Programming, Management and Control Design fields share a platform and contribute towards better functioning of the Industry and its Automation.<br /><br />
              Founded in 1945, the International Society of Automation is a leading, global non-profit organization with more than 40,000 members and 400,000 customers worldwide.<br /><br />
              ISA-VESIT is the student section of ISA International that comes under the ISA Maharashtra section. ISA-VESIT aims to bridge the gap between student community and industry by adding to the technical and industrial aspects of students with a vision of advancing technical competence by connecting the automation community to achieve operational excellence. We conduct workshops to enlighten our students with technical knowledge and make them impart it on day-to-day life practical applications so as to make the most out of theoretical wisdom.
            </p>
          </div>
          <div className="stats-card" style={{ flex: 1 }}>
            <div className="stats-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <div className="stat-item" style={{ width: '220px', height: '135px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={28} className="stat-icon" />
                <span className="stat-number">50+</span>
                <span className="stat-label">Workshops</span>
              </div>
              <div className="stat-item" style={{ width: '220px', height: '135px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={28} className="stat-icon" />
                <span className="stat-number">70+</span>
                <span className="stat-label">Council Members</span>
              </div>
              <div className="stat-item" style={{ width: '220px', height: '135px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={28} className="stat-icon" />
                <span className="stat-number">80+</span>
                <span className="stat-label">Components</span>
              </div>
              <div className="stat-item" style={{ width: '220px', height: '135px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '250px', width: '100%' }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: '#b8c5d1', letterSpacing: '0.5px', textShadow: '0 2px 16px #0006' }}>
              No Upcoming Workshops Found
            </span>
            <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8a9ba8', fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: 400 }}>
              Please check back later for new events!
            </span>
          </div>
        ) : (
          <div className="workshop-carousel">
            <button onClick={handlePrev} className="carousel-nav prev">
              <ChevronLeft size={48} />
            </button>
            <div className="workshops-grid">
              {workshops.slice(currentIndex, currentIndex + itemsPerPage).map(workshop => (
                <div key={workshop.id} className="workshop-card">
                  <div className="workshop-image-container">
                    <img src={workshop.image_url} alt={workshop.workshop_name} className="workshop-image" />
                  </div>
                  <div className="workshop-button-container">
                    <button 
                      className="register-btn"
                      onClick={() => window.open(workshop.registration_link, '_blank')}
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
        )}
      </section>
    </div>
  );
};

export default Home;