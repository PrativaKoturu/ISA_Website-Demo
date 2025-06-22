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
    <header className={`header ${scrolled ? 'scrolled animate-header' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo logo-bounce">
          <img src={logoImage} alt="ISA-VESIT Logo" className="logo-img" />
          <div className="logo-text-container">
            <span className="logo-title">ISA-VESIT</span>
            <span className="logo-subtitle">Maharashtra Section</span>
          </div>
        </Link>

        <div className="nav-right">
          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link crazy-hover">HOME</Link>
              </li>

              <li className="nav-item">
                <Link to="/events" className="nav-link crazy-hover">EVENTS</Link>
              </li>

              <li className="nav-item">
                <Link to="/3dprinter" className="nav-link crazy-hover">3D PRINTER</Link>
              </li>
              
              <li className="nav-item has-dropdown">
                <span className="nav-link crazy-hover">ABOUT US</span>
                <div className="dropdown">
                  <Link to="/council" className="dropdown-item">COUNCIL</Link>
                  <Link to="/contactus" className="dropdown-item">CONTACT US</Link>
                </div>
              </li>

              <li className="nav-item has-dropdown">
                <span className="nav-link crazy-hover">MORE</span>
                <div className="dropdown">
                  <Link to="/editorials" className="dropdown-item">EDITORIALS</Link>
                  <Link to="/initiatives" className="dropdown-item">INITIATIVES</Link>
                  <Link to="/bebeyond" className="dropdown-item">BE BEYOND</Link>
                </div>
              </li>
            </ul>
          </nav>

          <Link to="#" className="join-btn glow-button">Join US</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
