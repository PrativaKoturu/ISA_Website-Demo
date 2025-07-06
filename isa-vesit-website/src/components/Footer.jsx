import React from 'react';
import { Link } from 'react-router-dom';
import instagramLogo from '../assets/images/instagram.png';
import linkedinLogo from '../assets/images/linkedin.png';
import youtubeLogo from '../assets/images/youtube.png';
import linktreeLogo from '../assets/images/linktree.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch', gap: '3rem' }}>
          <div className="footer-section" style={{ flex: 1 }}>
            <h3>Services</h3>
            <ul>
              <li><Link to="/3dprinter">3D Printer</Link></li>
              <li><Link to="#">InnSAEi App</Link></li>
              <li><Link to="#">Hardware Inventory</Link></li>
              <li><Link to="#">Digital Library</Link></li>
            </ul>
          </div>

          {/* Vertical line between sections, shifted left */}
          <div style={{ width: '1px', background: '#2c3440', opacity: 0.4, margin: '0 2rem 0 0' }} />

          <div className="footer-section" style={{ flex: 1, margin: 0, textAlign: 'left' }}>
            <h3>Social Media</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Follow us on social media to get information about all our events and workshops
            </p>
            <div className="social-links" style={{ justifyContent: 'flex-start' }}>
              <a href="https://www.instagram.com/isa_vesit?igsh=MWprM3hxZHZobnJlcw==" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              </a>
              <a href="https://www.linkedin.com/in/isa-vesit-student-section-0931861b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              </a>
              <a href="https://www.youtube.com/@ISAVESIT" className="social-link" title="YouTube" target="_blank" rel="noopener noreferrer">
                <img src={youtubeLogo} alt="YouTube" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              </a>
              <a href="https://linktr.ee/ISA_VESIT" className="social-link" title="Linktree" target="_blank" rel="noopener noreferrer">
                <img src={linktreeLogo} alt="Linktree" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              </a>
            </div>
            <div style={{ marginTop: '1rem' }}>
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