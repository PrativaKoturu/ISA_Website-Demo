import React, { useState, useEffect, useRef } from 'react';
import { Globe, GraduationCap, Mic, Youtube, BookOpen, Settings, Package, Smartphone, Megaphone, Wrench, Printer, Sparkles, Zap, Target, Rocket, Users } from 'lucide-react';

const Initiatives = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    students: 0,
    workshops: 0,
    alumni: 0
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardsRef = useRef([]);

  const initiatives = [
    {
      id: 1,
      icon: <Globe size={24} />,
      title: "Website Portal",
      description: "Get access to the complete information of all events & workshops, 3D printing Portal, Editorials, Hall Of Fame, Digital Library and much more. Your one-stop destination for all ISA-VESIT resources."
    },
    {
      id: 2,
      icon: <GraduationCap size={24} />,
      title: "Alumni Hub",
      description: "Alumni hub is a platform for students to connect and interact with alumni. Students and Alumni can post on the platform and interact with each other. The alumni network helps us with an opportunity to build a foundation of support."
    },
    {
      id: 3,
      icon: <Mic size={24} />,
      title: "Be and Beyond",
      description: "A talk show where we interact with prominent VESIT alumni from all over the world working in various fields of their expertise to help you find the right career path and gain valuable insights."
    },
    {
      id: 4,
      icon: <Youtube size={24} />,
      title: "YouTube Channel",
      description: "Tune in to watch tutorials & project videos on variety of topics and get the best career guidance from alumni. Subscribe for regular updates on technical content and career advice."
    },
    {
      id: 5,
      icon: <BookOpen size={24} />,
      title: "Digital Library",
      description: "Get an easy access to all reference books, textbooks & previous year question papers of your subject and competitive exams. Study smart with our comprehensive digital collection."
    },
    {
      id: 6,
      icon: <Settings size={24} />,
      title: "Hardware Inventory",
      description: "You can now easily order any hardware component required in your project at your very own location. Streamlined procurement process for all your technical needs."
    },
    {
      id: 7,
      icon: <Package size={24} />,
      title: "Hardware Kit",
      description: "Doorstep delivery of hardware components at an affordable price! Get curated hardware kits delivered directly to your location with quality assurance and competitive pricing."
    },
    {
      id: 8,
      icon: <Smartphone size={24} />,
      title: "Lumina App",
      description: "Exclusive mobile application for ISA-VESIT members to seamlessly issue and manage hardware components. Track your orders, manage inventory, and get real-time updates on component availability."
    },
    {
      id: 9,
      icon: <Megaphone size={24} />,
      title: "Digital Notice Board",
      description: "A great initiative taken up by the ISA-VESIT council to inspire young engineers to build innovative projects. Stay updated with latest announcements, opportunities, and events."
    },
    {
      id: 10,
      icon: <Wrench size={24} />,
      title: "Project Oriented Workshops",
      description: "Get your projects certified by us and stand a chance to get featured on our YouTube channel & Hall of Fame! Hands-on learning experiences with industry-relevant projects."
    },
    {
      id: 11,
      icon: <Printer size={24} />,
      title: "3D Printer Access",
      description: "Get your designed 3D models printed on our state-of-the-art 3D Printer. Transform your innovative ideas into reality with precision printing and professional quality output."
    }
  ];

  useEffect(() => {
    // Mouse move handler for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, index * 150);
        }
      });
    }, { threshold: 0.1 });

    // Observe all cards
    cardsRef.current.forEach(card => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
      }
    });

    // Stats animation observer
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.initiatives-stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const animateStats = () => {
    const targets = { projects: 500, students: 2000, workshops: 100, alumni: 300 };
    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        projects: Math.floor(targets.projects * easeOutQuart),
        students: Math.floor(targets.students * easeOutQuart),
        workshops: Math.floor(targets.workshops * easeOutQuart),
        alumni: Math.floor(targets.alumni * easeOutQuart)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handleViewDetails = (initiative) => {
    // Add ripple effect
    console.log(`View details for ${initiative.title}`);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="initiatives-page">
      {/* Animated Background Particles */}
      <div className="initiatives-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${i * 0.5}s`,
            '--duration': `${3 + i % 3}s`,
            '--size': `${10 + i % 20}px`
          }} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="initiatives-hero-section">
        <div className="initiatives-hero-container">
          
          <h1 className="initiatives-hero-title">
            <span className="title-line">INNOVATIVE</span>
            <span className="title-line">INITIATIVES</span>
          </h1>
          <p className="initiatives-hero-subtitle">
            Empowering students through cutting-edge programs, advanced resources, and comprehensive support systems designed to foster growth, learning, and excellence in engineering.
          </p>
          <div className="hero-stats-preview">
            <div className="preview-stat">
              <Target size={20} />
              <span>11+ Programs</span>
            </div>
            <div className="preview-stat">
              <Rocket size={20} />
              <span>Innovation Hub</span>
            </div>
            <div className="preview-stat">
              <Zap size={20} />
              <span>Future Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="initiatives-container">
        <div className="initiatives-grid">
          {initiatives.map((initiative, index) => (
            <div 
              key={initiative.id} 
              className={`initiative-card ${hoveredCard === index ? 'hovered' : ''}`}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
              <div className="initiative-card-glow" />
              <div className="initiative-card-content">
                <div className="initiative-card-header">
                  <div className="initiative-card-icon">
                    {initiative.icon}
                  </div>
                  <h3 className="initiative-card-title">{initiative.title}</h3>
                </div>
                <p className="initiative-card-description">{initiative.description}</p>
                <div className="initiative-card-footer">
                  <button 
                    className="initiative-view-details-btn"
                    onClick={() => handleViewDetails(initiative)}
                  >
                    <span>View Details</span>
                    <div className="btn-ripple" />
                  </button>
                </div>
              </div>
              <div className="card-particles">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-particle" style={{
                    '--particle-delay': `${i * 0.1}s`,
                    '--particle-size': `${4 + i % 3}px`
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="initiatives-stats-section">
        <div className="stats-section-glow" />
        <div className="initiatives-stats-grid">
          <div className="initiative-stat-item">
            <div className="stat-icon-wrapper">
              <Target size={32} />
            </div>
            <span className="initiative-stat-number">{animatedStats.projects}+</span>
            <div className="initiative-stat-label">Projects Completed</div>
          </div>
          <div className="initiative-stat-item">
            <div className="stat-icon-wrapper">
              <GraduationCap size={32} />
            </div>
            <span className="initiative-stat-number">{animatedStats.students}+</span>
            <div className="initiative-stat-label">Students Impacted</div>
          </div>
          <div className="initiative-stat-item">
            <div className="stat-icon-wrapper">
              <Wrench size={32} />
            </div>
            <span className="initiative-stat-number">{animatedStats.workshops}+</span>
            <div className="initiative-stat-label">Workshops Conducted</div>
          </div>
          <div className="initiative-stat-item">
            <div className="stat-icon-wrapper">
              <Users size={32} />
            </div>
            <span className="initiative-stat-number">{animatedStats.alumni}+</span>
            <div className="initiative-stat-label">Alumni Network</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;