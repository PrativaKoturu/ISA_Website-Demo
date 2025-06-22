import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';

const BeBeyondPage = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observerRef.current.observe(el);
    });

    // Header background on scroll
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(12, 20, 38, 0.98)';
        } else {
          header.style.background = 'rgba(12, 20, 38, 0.95)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePlayClick = (e) => {
    // Add ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      width: 100px;
      height: 100px;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0c1426 0%, #1e2a47 100%);
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero {
          padding: 120px 2rem 80px;
          text-align: center;
          background: radial-gradient(circle at center, rgba(0, 188, 212, 0.1) 0%, transparent 70%);
        }

        .hero h1 {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(45deg, #00bcd4, #2196f3, #9c27b0);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero p {
          font-size: 1.3rem;
          color: #b0bec5;
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }

        /* Featured Video Section */
        .featured-video {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .video-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 188, 212, 0.2);
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, #1e2a47, #0c1426);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e2a47 0%, #0c1426 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .play-button {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #00bcd4, #2196f3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          border: none;
        }

        .play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 188, 212, 0.4);
        }

        .play-button::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 20px solid white;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          margin-left: 4px;
        }

        .video-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .video-description {
          color: #b0bec5;
          line-height: 1.6;
        }

        /* Episodes Grid */
        .episodes-section {
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 3rem;
          color: #ffffff;
        }

        .episodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .episode-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .episode-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 188, 212, 0.15);
          border-color: rgba(0, 188, 212, 0.3);
        }

        .episode-thumbnail {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, #1e2a47, #0c1426);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .episode-thumbnail::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(0, 188, 212, 0.1) 25%, 
            transparent 50%, 
            rgba(33, 150, 243, 0.1) 75%, 
            transparent 100%);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .episode-play {
          width: 50px;
          height: 50px;
          background: rgba(0, 188, 212, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          position: relative;
          border: none;
        }

        .episode-play:hover {
          background: #00bcd4;
          transform: scale(1.1);
        }

        .episode-play::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 12px solid white;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          margin-left: 2px;
        }

        .episode-content {
          padding: 1.5rem;
        }

        .episode-number {
          color: #00bcd4;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .episode-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.8rem;
          line-height: 1.4;
        }

        .episode-guest {
          color: #b0bec5;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .episode-description {
          color: #90a4ae;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* Scroll animations */
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ripple animation */
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }

          .hero p {
            font-size: 1.1rem;
          }

          .episodes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div>
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <section className="hero" id="be-beyond">
          <h1>BE AND BEYOND</h1>
          <p>Empowering students through inspiring conversations with industry leaders, successful alumni, and innovators who have gone beyond conventional boundaries to create extraordinary impact in engineering and technology.</p>
        </section>

        {/* Featured Video Section */}
        <section className="featured-video fade-in">
          <div className="video-card">
            <a
              href="https://youtu.be/WRrK2-4uvTQ?si=vU6DK4yIhJKmskoG"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', borderRadius: '15px', overflow: 'hidden', marginBottom: '1.5rem' }}
              title="Watch on YouTube"
            >
              <div className="video-container" style={{ padding: 0, height: '400px', background: 'none' }}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/WRrK2-4uvTQ"
                  title="What is BE and BEYOND?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ borderRadius: '15px', width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </a>
            <h2 className="video-title">What is BE-BEYOND?</h2>
            <p className="video-description">
              Discover the essence of BE and BEYOND - a transformative talk series that bridges the gap between academic learning and real-world success. Watch inspiring stories from industry leaders and successful professionals who share their journey from being students to becoming industry pioneers.
            </p>
          </div>
        </section>

        {/* Episodes Grid */}
        <section className="episodes-section">
          <h2 className="section-title fade-in">Featured Episodes</h2>
          <div className="episodes-grid">
            {/* Episode 1 */}
            <div className="episode-card fade-in">
              <a
                href="https://youtu.be/HuNWd-Jzp_s?si=HU4ug9Kgs0k7lctE"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                title="Watch on YouTube"
              >
                <div className="episode-thumbnail" style={{ padding: 0, height: '200px', background: 'none' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/HuNWd-Jzp_s"
                    title="MS in Embedded Systems | Mihir Lele"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '8px', width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              </a>
              <div className="episode-content">
                <div className="episode-number">EPISODE 1</div>
                <h3 className="episode-title">MS in Embedded Systems | Multilateral Program</h3>
                <div className="episode-guest">MIHIR LELE</div>
                <div className="episode-description">MS in Embedded Systems</div>
              </div>
            </div>

            {/* Episode 2 */}
            <div className="episode-card fade-in">
              <a
                href="https://youtu.be/gOh4FLlgfGs?si=0RwVbNu3dsg8hX_i"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                title="Watch on YouTube"
              >
                <div className="episode-thumbnail" style={{ padding: 0, height: '200px', background: 'none' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/gOh4FLlgfGs"
                    title="Entrepreneurship | Dhairya Pulara"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '8px', width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              </a>
              <div className="episode-content">
                <div className="episode-number">EPISODE 2</div>
                <h3 className="episode-title">Entrepreneurship | Complex Problem Solving</h3>
                <div className="episode-guest">DHAIRYA PULARA</div>
                <div className="episode-description">Founder, CEO - Vecmocon</div>
              </div>
            </div>

            {/* Episode 3 */}
            <div className="episode-card fade-in">
              <a
                href="https://youtu.be/-7SI9rolfBw?si=g33-0p-4EY71xfL9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                title="Watch on YouTube"
              >
                <div className="episode-thumbnail" style={{ padding: 0, height: '200px', background: 'none' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/-7SI9rolfBw"
                    title="Aviation | Web development | Navin Sridhar"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '8px', width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              </a>
              <div className="episode-content">
                <div className="episode-number">EPISODE 3</div>
                <h3 className="episode-title">Aviation | Web development</h3>
                <div className="episode-guest">NAVIN SRIDHAR</div>
                <div className="episode-description">BE & Beyond</div>
              </div>
            </div>

            {/* Episode 5 */}
            <div className="episode-card fade-in">
              <a
                href="https://youtu.be/seQ4V0SYiVM?si=ONmXFNZiXp977iqQ"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                title="Watch on YouTube"
              >
                <div className="episode-thumbnail" style={{ padding: 0, height: '200px', background: 'none' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/seQ4V0SYiVM"
                    title="MBA, IIM Calcutta"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '8px', width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              </a>
              <div className="episode-content">
                <div className="episode-number">EPISODE 5</div>
                <h3 className="episode-title">BE & Beyond</h3>
                <div className="episode-guest">YASH TECKCHANDANI</div>
                <div className="episode-description">MBA, IIM Calcutta</div>
              </div>
            </div>

            {/* Episode 6 */}
            <div className="episode-card fade-in">
              <a
                href="https://youtu.be/VJYxn1s7eP0?si=BCjNmrf20Ni8NDVN"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                title="Watch on YouTube"
              >
                <div className="episode-thumbnail" style={{ padding: 0, height: '200px', background: 'none' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/VJYxn1s7eP0"
                    title="GATE | IIT Delhi | Aditya Shahane | BE & Beyond"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '8px', width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              </a>
              <div className="episode-content">
                <div className="episode-number">EPISODE 6</div>
                <h3 className="episode-title">GATE | IIT Delhi | Aditya Shahane | BE & Beyond</h3>
                <div className="episode-guest">ADITYA SHAHANE</div>
                <div className="episode-description">AIR 390, GATE 2021 (CE), IIT DELHI</div>
              </div>
            </div>

            {/* Episode 7 */}
            <div className="episode-card fade-in">
              <a
                href="https://youtu.be/H50RJjP5LRI?si=iKMOC6XMEg86qyAZ"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                title="Watch on YouTube"
              >
                <div className="episode-thumbnail" style={{ padding: 0, height: '200px', background: 'none' }}>
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/H50RJjP5LRI"
                    title="MS in Computer Science | University of Buffalo | Shubhangi Balasubramanian"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '8px', width: '100%', height: '100%' }}
                  ></iframe>
                </div>
              </a>
              <div className="episode-content">
                <div className="episode-number">EPISODE 7</div>
                <h3 className="episode-title">MS in Computer Science | University of Buffalo | Shubhangi Balasubramanian</h3>
                <div className="episode-guest">SHUBHANGI BALASUBRAMANIAN</div>
                <div className="episode-description">MS in Computer Science, University of Buffalo</div>
              </div>
            </div>

            {/* Additional Episodes */}
            <div className="episode-card fade-in">
              <div className="episode-thumbnail">
                <button className="episode-play" onClick={handlePlayClick}></button>
              </div>
              <div className="episode-content">
                <div className="episode-number">EPISODE 8</div>
                <h3 className="episode-title">Startup Journey | From Idea to Implementation</h3>
                <div className="episode-guest">RAJESH KUMAR</div>
                <div className="episode-description">Founder & CEO, TechVenture Solutions</div>
              </div>
            </div>

            <div className="episode-card fade-in">
              <div className="episode-thumbnail">
                <button className="episode-play" onClick={handlePlayClick}></button>
              </div>
              <div className="episode-content">
                <div className="episode-number">EPISODE 9</div>
                <h3 className="episode-title">Breaking into Tech Giants | Career Strategies</h3>
                <div className="episode-guest">PRIYA SHARMA</div>
                <div className="episode-description">Senior Software Engineer, Google</div>
              </div>
            </div>

            <div className="episode-card fade-in">
              <div className="episode-thumbnail">
                <button className="episode-play" onClick={handlePlayClick}></button>
              </div>
              <div className="episode-content">
                <div className="episode-number">EPISODE 10</div>
                <h3 className="episode-title">Research & Innovation | Academic Excellence</h3>
                <div className="episode-guest">DR. AMIT PATEL</div>
                <div className="episode-description">Research Scientist, MIT</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BeBeyondPage;        