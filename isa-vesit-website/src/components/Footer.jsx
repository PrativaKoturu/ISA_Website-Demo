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
              <a href="#" className="social-link" title="Instagram">📱</a>
              <a href="#" className="social-link" title="Email">✉️</a>
              <a href="#" className="social-link" title="Facebook">📘</a>
              <a href="#" className="social-link" title="Instagram">📷</a>
              <a href="#" className="social-link" title="YouTube">📺</a>
              <a href="#" className="social-link" title="LinkedIn">💼</a>
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