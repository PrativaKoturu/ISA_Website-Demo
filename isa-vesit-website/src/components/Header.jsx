import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/ISA-VESIT_Logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logoImage} alt="ISA-VESIT Logo" className="logo-img" />
        </Link>
        
        <div className="nav-right">
          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/events" className="nav-link">Events</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/3dprinter" className="nav-link">3DPrinter</Link>
              </li>
              
              <li className="nav-item">
                <span className="nav-link">About US</span>
                <div className="dropdown">
                  <Link to="/council" className="dropdown-item">Council</Link>
                  <Link to="/contactus" className="dropdown-item">Contact Us</Link>
                </div>
              </li>
              
              <li className="nav-item">
                <span className="nav-link">More</span>
                <div className="dropdown">
                  <Link to="/editorials" className="dropdown-item">Editorials</Link>
                  <Link to="/initiatives" className="dropdown-item">Initiatives</Link>
                  <Link to="/bebeyond" className="dropdown-item">Be-Beyond</Link>
                </div>
              </li>
            </ul>
          </nav>
          
          <Link to="#" className="join-btn">Join US</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;