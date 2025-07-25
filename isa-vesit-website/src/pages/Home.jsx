import React, { useState, useEffect } from 'react';
import ThreeScene from '../components/ThreeScene';
import { Briefcase, Users, Cpu, History, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import PixelCard from '../blocks/Components/PixelCard/PixelCard';


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
            <div className="vr-loader-text">Loading ISA-VESIT Website</div>
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

      <div className="about-vesit-image-container" style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0 }}>
        <PixelCard>
          <img src={require("../assets/images/vesitcampus.jpg")} alt="VESIT Campus" className="about-vesit-image" />
        </PixelCard>
      </div>

      {/* About VESIT Section */}
      <section className="about-vesit-section">
        <div className="about-vesit-container">
          <div className="about-vesit-card about-vesit-desc-card">
            <h3 className="about-vesit-title">About VESIT</h3>
            <p className="about-vesit-text">
              Vivekanand Education Society was founded in 1959 by Shri. Hashu Advani, along with ten other members, who shared the dream of providing qualitative education to the youth of our country. In the beginning, Vivekanand Education Society had a very modest launch, with just 256 students and six classrooms, in the humble barracks of Chembur Camp. But today, it proudly boast of having 3, 75, 000 sq. ft. land, housing 12 buildings and 28 Institutions, ranging from a crèche to Ph.D. Centers. It has over 2000 teaching and non-teaching staff, and more than 18,000 students who pass through its hallowed portals each year.

Vivekanand Education Society’s Institute of Technology (VESIT) was established in 1984, with the aim of providing professional education in the field of Engineering. This institute is affiliated to the University of Mumbai and follows the rules and regulations laid down by government, AICTE, and University for admission; 51% reserved for Sindhi Linguistic minority and 49% through CAP test. The management quota has been surrendered to DTE to make admission centralized.
            </p>
          </div>
          <div className="about-vesit-card about-vesit-info-card">
            <h4 className="about-vesit-subtitle">Departments:</h4>
            <div className="departments-pill-list">
              {[
                "AI and Data Science",
                "Electronics Engineering",
                "Computer Engineering",
                "Instrumentation Engineering",
                "Electronics and Telecommunication Engineering",
                "Information Technology",
                "Masters of Computer Applications"
              ].map((dept) => (
                <div className="department-pill" key={dept}>{dept}</div>
              ))}
            </div>
            <h4 className="about-vesit-subtitle">Address:</h4>
            <p className="about-vesit-info">Hashu Advani Memorial Complex, Collector's Colony, Chembur, Mumbai – 400 074. India</p>
            <h4 className="about-vesit-subtitle">Phone:</h4>
            <p className="about-vesit-info">+91-22-61532510 / 27 (Admission)</p>
            <h4 className="about-vesit-subtitle">Email:</h4>
            <p className="about-vesit-info"><a href="mailto:vesit@ves.ac.in" className="about-vesit-link">vesit@ves.ac.in</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;