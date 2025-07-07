import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/ISA-VESIT_Logo.png';
import { Home, Calendar, Printer, Users, Info, Mail, X, BookOpen, Rocket, Star } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close menu on route change or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const navItems = [
    { label: 'HOME', to: '/', icon: <Home size={22} /> },
    { label: 'EVENTS', to: '/events', icon: <Calendar size={22} /> },
    { label: '3D PRINTER', to: '/3dprinter', icon: <Printer size={22} /> },
    {
      label: 'ABOUT US',
      icon: <Info size={22} />,
      dropdown: [
        { label: 'COUNCIL', to: '/council', icon: <Users size={20} /> },
        { label: 'CONTACT US', to: '/contactus', icon: <Mail size={20} /> },
      ],
    },
    {
      label: 'MORE',
      icon: <Star size={22} />,
      dropdown: [
        { label: 'EDITORIALS', to: '/editorials', icon: <BookOpen size={20} /> },
        { label: 'INITIATIVES', to: '/initiatives', icon: <Rocket size={20} /> },
        { label: 'BE BEYOND', to: '/bebeyond', icon: <Star size={20} /> },
      ],
    },
  ];

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

        <button
          className={`mobile-menu-btn${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>

        <div className={`nav-right${menuOpen ? ' open' : ''}`}> 
          <nav>
            <ul className="nav-menu">
              {navItems.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <li className="nav-item">
                    {item.dropdown ? (
                      <>
                        <span className="nav-link crazy-hover">
                          {item.icon}
                          <span style={{ marginLeft: 10 }}>{item.label}</span>
                        </span>
                        <ul className="dropdown">
                          {item.dropdown.map((sub, subIdx) => (
                            <li key={sub.label} className="dropdown-item">
                              <Link to={sub.to} onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit', textDecoration: 'none', width: '100%' }}>
                                {sub.icon}
                                <span>{sub.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link to={item.to} className="nav-link crazy-hover" onClick={() => setMenuOpen(false)}>
                        {item.icon}
                        <span style={{ marginLeft: 10 }}>{item.label}</span>
                      </Link>
                    )}
                  </li>
                  {idx < navItems.length - 1 && <li className="nav-divider" />}
                </React.Fragment>
              ))}
              <li className="nav-item">
                <Link to="#" className="join-btn glow-button">Join US</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {menuOpen && (
        <>
          <div
            className="mobile-nav-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="Close mobile menu overlay"
            tabIndex={-1}
            role="button"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1199 }}
          />
          <button
            className="mobile-menu-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'fixed',
              top: 18,
              right: 18,
              zIndex: 1201,
              background: 'rgba(23,29,47,0.95)',
              border: '2px solid #4A90E2',
              color: '#4A90E2',
              fontSize: '2.2rem',
              fontWeight: 700,
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(74,144,226,0.15)',
              transition: 'background 0.2s, color 0.2s',
              touchAction: 'manipulation',
            }}
          >
            <X size={32} strokeWidth={2.5} />
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
