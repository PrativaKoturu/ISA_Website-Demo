import React from 'react';
import ThreeScene from '../components/ThreeScene';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">ISA - VESIT</div>
            <h1 className="hero-title">SETTING STANDARD</h1>
            <h2 className="hero-subtitle">FOR AUTOMATION</h2>
            
            <div className="about-card">
              <h3 className="about-title">About US</h3>
              <p className="about-text">
                ISA-VESIT is an interdisciplinary organization in which professionals from Instrumentation, 
                Electronics, Communications, Programming, Management and Control Design fields share a 
                platform and contribute towards better functioning of the Industry and its Automation.
              </p>
            </div>
          </div>
          
          <div className="hero-3d">
            <ThreeScene />
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="workshops-section">
        <div className="workshops-container">
          <div className="workshops-header">
            <h2 className="workshops-title">UPCOMING WORKSHOP</h2>
          </div>
          
          <div className="workshops-grid">
            <div className="workshop-card">
              <div className="workshop-image">
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>WEB ANIMATIONS</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>WITH CSS & JS</p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    background: 'rgba(59, 130, 246, 0.1)', 
                    borderRadius: '0.5rem',
                    fontSize: '0.8rem'
                  }}>
                    Workshop Details:<br/>
                    Date: 27th July 2024<br/>
                    Time: 10 AM onwards<br/>
                    QR Code for Registration
                  </div>
                </div>
              </div>
              <div className="workshop-content">
                <button className="workshop-btn">View Details</button>
              </div>
            </div>

            <div className="workshop-card">
              <div className="workshop-image">
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>ChatGPT</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Clone using Django</p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    background: 'rgba(245, 158, 11, 0.1)', 
                    borderRadius: '0.5rem',
                    fontSize: '0.8rem'
                  }}>
                    Register Now<br/>
                    Limited Seats<br/>
                    Contact: +91 XXXXX<br/>
                    QR Code Available
                  </div>
                </div>
              </div>
              <div className="workshop-content">
                <button className="workshop-btn">View Details</button>
              </div>
            </div>

            <div className="workshop-card">
              <div className="workshop-image">
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>CTRL + ALT + DEBATE</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Technical Debate Competition</p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    borderRadius: '0.5rem',
                    fontSize: '0.8rem'
                  }}>
                    Explore opportunities in<br/>
                    Technical Discussions<br/>
                    Register Now<br/>
                    QR Code for Details
                  </div>
                </div>
              </div>
              <div className="workshop-content">
                <button className="workshop-btn">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;