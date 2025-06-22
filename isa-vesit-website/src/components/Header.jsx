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
          <div className="logo-text-container">
            <span>ISA-VESIT</span>
            <span className="logo-subtitle">Maharashtra Section</span>
          </div>
        </Link>
        
        <div className="nav-right">
          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">HOME</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/events" className="nav-link">EVENTS</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/3dprinter" className="nav-link">3D PRINTER</Link>
              </li>
              
              <li className="nav-item">
                <span className="nav-link">ABOUT US</span>
                <div className="dropdown">
                  <Link to="/council" className="dropdown-item">COUNCIL</Link>
                  <Link to="/contactus" className="dropdown-item">CONTACT US</Link>
                </div>
              </li>
              
              <li className="nav-item">
                <span className="nav-link">MORE</span>
                <div className="dropdown">
                  <Link to="/editorials" className="dropdown-item">EDITORIALS</Link>
                  <Link to="/initiatives" className="dropdown-item">INITIATIVES</Link>
                  <Link to="/bebeyond" className="dropdown-item">BE BEYOND</Link>
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