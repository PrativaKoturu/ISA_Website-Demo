import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/3dprinter">3D Printer</Link></li>
              <li><Link to="#">InnSAEi App</Link></li>
              <li><Link to="#">Hardware Inventory</Link></li>
              <li><Link to="#">Digital Library</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Our Sponsors</h3>
            <div className="sponsor-logos">
              <div className="sponsor-logo">mac-net</div>
              <div className="sponsor-logo">AM Study Abroad</div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Social Media</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Follow us on social media to get information about all our events and workshops
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/isa_vesit?igsh=MWprM3hxZHZobnJlcw==" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">
                {/* Instagram SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#E1306C"/>
                  <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8A4.8 4.8 0 1 0 12 7.2Z" stroke="white" strokeWidth="2"/>
                  <circle cx="17.2" cy="6.8" r="1.2" fill="white"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/isa-vesit-student-section-0931861b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                {/* LinkedIn SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#0077B5"/>
                  <path d="M7.5 9.5V16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="7.5" cy="7.5" r="1.5" fill="white"/>
                  <path d="M10.5 12.5V16.5M10.5 12.5C10.5 11.3954 11.3954 10.5 12.5 10.5C13.6046 10.5 14.5 11.3954 14.5 12.5V16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ISAVESIT" className="social-link" title="YouTube" target="_blank" rel="noopener noreferrer">
                {/* YouTube SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#FF0000"/>
                  <polygon points="10,8 16,12 10,16" fill="white"/>
                </svg>
              </a>
              <a href="https://linktr.ee/ISA_VESIT" className="social-link" title="Linktree" target="_blank" rel="noopener noreferrer">
                {/* Linktree SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#39E09B"/>
                  <path d="M12 6L12 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 10L12 6L16 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 14L12 18L16 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>📱 InnSAEi</p>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>✉️ isa.vesit@ves.ac.in</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© ISA-VESIT Maharashtra Section | Designed by Web Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;