import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Send, Check, AlertTriangle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    query: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isMouseOverBoard, setIsMouseOverBoard] = useState(false);

  const councilMembers = [
    {
      name: 'Kaustubh Natalkar',
      position: 'President',
      phone: '+91 XXXXX XXXXX',
      email: 'kaustubh@gmail.com',
      linkedin: 'https://linkedin.com/in/kaustubh-natalkar'
    },
    {
      name: 'Charchit Sahoo',
      position: 'Vice President',
      phone: '+91 XXXXX XXXXX',
      email: 'charchit@gmail.com',
      linkedin: 'https://linkedin.com/in/charchit-sahoo'
    },
    {
      name: 'Aditya Rege',
      position: 'Senior PRO',
      phone: '+91 XXXXX XXXXX',
      email: 'aditya@gmail.com',
      linkedin: 'https://linkedin.com/in/aditya-rege'
    }
  ];

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!', formData);
    
    if (!formData.email || !formData.query) {
      console.log('Validation failed: missing fields');
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      console.log('Validation failed: invalid email');
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    console.log('Form validation passed, starting submission...');
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submission completed');
      setIsSubmitting(false);
      showNotification('Your query has been submitted successfully! We will get back to you soon.', 'success');
      setFormData({ email: '', query: '' });
    }, 2000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleComponentClick = (componentName) => {
    const messages = {
      'cpu': 'Communication Hub: Processing contact requests...',
      'ram': 'Contact Database: Loading member database...',
      'email': 'Email System: Ready to receive your messages!',
      'phone': 'Phone Network: Connect via voice calls!',
      'social': 'Social Media: Follow us on LinkedIn!'
    };
    showNotification(messages[componentName], 'success');
  };

  // Mouse interaction handlers for circuit board
  const handleMouseEnter = () => {
    setIsMouseOverBoard(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOverBoard(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseOverBoard) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 10;
    const deltaY = (e.clientY - centerY) / 15;
    
    const circuitBoard = e.currentTarget.querySelector('.circuit-board');
    if (circuitBoard) {
      circuitBoard.style.transform = `rotateY(${deltaX}deg) rotateX(${5 - deltaY}deg)`;
    }
  };

  return (
    <div className="contact-us-page">
      {/* Animated Background Particles */}
      <div className="contact-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="contact-particle" style={{
            '--delay': `${i * 0.5}s`,
            '--duration': `${3 + i % 3}s`,
            '--size': `${10 + i % 20}px`
          }} />
        ))}
      </div>

      {/* Header Section */}
      <section className="hero" id="contact-us">
        <h1>CONTACT US</h1>
        <p>Connect with our council members and get involved with ISA-VESIT's mission to set standards for automation. Reach out to us for any queries, collaborations, or to learn more about our initiatives.</p>
      </section>

      {/* Council Members Section */}
      <section className="council-section">
        <div className="contact-container">
          <h2 className="council-section-title">Council Management</h2>
          <div className="council-grid">
            {councilMembers.map((member, index) => (
              <div key={index} className="member-card">
                <div className="member-card-glow" />
                <div className="member-card-content">
                  <div className="member-card-header-row">
                    <div className="member-card-icon-box">
                      <Mail size={32} />
                    </div>
                    <div className="member-card-title-group">
                      <h3 className="member-name">
                        {member.name.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < member.name.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
                      <p className="member-position">{member.position}</p>
                    </div>
                  </div>
                  <div className="contact-links">
                    <a href={`tel:${member.phone}`} className="contact-link">
                      <Phone size={20} className="contact-icon" />
                      {member.phone}
                    </a>
                    <a href={`mailto:${member.email}`} className="contact-link">
                      <Mail size={20} className="contact-icon" />
                      {member.email}
                    </a>
                    <a href={member.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} className="contact-icon" />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Banner */}
      <section className="membership-banner">
        <div className="contact-container">
          <div className="banner-content">
            <h2 className="banner-title">Join ISA-VESIT</h2>
            <p className="banner-text">Planning to join ISA-VESIT? Get all the information you need about membership!</p>
            <p className="banner-contact">Contact xyz zyz for membership details</p>
          </div>
        </div>
      </section>

      {/* Interactive 3D Circuit Board Display */}
      <section className="hologram-section">
        <div className="hologram-container">
          <div className={`circuit-board ${isMouseOverBoard ? 'interactive' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
            {/* PCB Base */}
            <div className="pcb-base"></div>

            {/* Circuit Traces */}
            <div className="circuit-trace trace-1"></div>
            <div className="circuit-trace trace-2"></div>
            <div className="circuit-trace trace-3"></div>
            <div className="circuit-trace trace-4"></div>
            <div className="circuit-trace trace-5"></div>
            <div className="circuit-trace trace-6"></div>
            <div className="circuit-trace trace-v1"></div>
            <div className="circuit-trace trace-v2"></div>
            <div className="circuit-trace trace-v3"></div>

            {/* Central Communication Hub */}
            <div 
              className="cpu-chip"
              onClick={() => handleComponentClick('cpu')}
            >
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-pin"></div>
              <div className="cpu-text">CONTACT<br/>HUB</div>
            </div>

            {/* Contact Database Modules */}
            <div 
              className="ram-module ram-1" 
              title="Member Database"
              onClick={() => handleComponentClick('ram')}
            ></div>
            <div 
              className="ram-module ram-2" 
              title="Message Storage"
              onClick={() => handleComponentClick('ram')}
            ></div>
            <div 
              className="ram-module ram-3" 
              title="Contact History"
              onClick={() => handleComponentClick('ram')}
            ></div>

            {/* Signal Amplifiers */}
            <div className="capacitor cap-1" title="Email Amplifier"></div>
            <div className="capacitor cap-2" title="Phone Signal Booster"></div>
            <div className="capacitor cap-3" title="Social Media Enhancer"></div>
            <div className="capacitor cap-4" title="Query Processor"></div>
            <div className="capacitor cap-5" title="Response Generator"></div>

            {/* Connection Filters */}
            <div className="resistor res-1" title="Message Filter"></div>
            <div className="resistor res-2" title="Spam Blocker"></div>
            <div className="resistor res-3" title="Priority Sorter"></div>
            <div className="resistor res-4" title="Auto-Reply Controller"></div>

            {/* Status Indicators */}
            <div className="led-indicator led-power" title="System Online"></div>
            <div className="led-indicator led-status" title="Processing Messages"></div>
            <div className="led-indicator led-activity" title="Sending Responses"></div>

            {/* Message Flow */}
            <div className="data-particle particle-1"></div>
            <div className="data-particle particle-2"></div>
            <div className="data-particle particle-3"></div>
            <div className="data-particle particle-4"></div>

            {/* Communication Modules */}
            <div 
              className="floating-component email-module" 
              title="Email System"
              onClick={() => handleComponentClick('email')}
            ></div>
            <div 
              className="floating-component phone-module" 
              title="Phone Network"
              onClick={() => handleComponentClick('phone')}
            ></div>
            <div 
              className="floating-component social-module" 
              title="Social Media Interface"
              onClick={() => handleComponentClick('social')}
            ></div>

            {/* Contact Information Display */}
            <div className="holo-screen">
              <div className="screen-content">
                <div className="code-line">contact.init();</div>
                <div className="code-line">members.load();</div>
                <div className="code-line">messages.monitor();</div>
                <div className="code-line">while(connected) {'{'}</div>
                <div className="code-line">  respond();</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Query Form */}
      <section className="query-section" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
        <div className="contact-container">
          <h2 className="query-section-title">Post Your Query</h2>
          <div className="form-container">
            <form className="query-form" onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 11, pointerEvents: 'auto' }}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{ position: 'relative', zIndex: 12, pointerEvents: 'auto' }}
                  />
                  <div className="input-border"></div>
                  <Mail size={20} className="input-icon" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="query" className="form-label">Your Query</label>
                <div className="textarea-wrapper">
                  <textarea
                    id="query"
                    name="query"
                    className="form-textarea"
                    rows="6"
                    placeholder="Tell us about your query, suggestions, or how you'd like to get involved..."
                    value={formData.query}
                    onChange={handleInputChange}
                    required
                    style={{ position: 'relative', zIndex: 12, pointerEvents: 'auto' }}
                  ></textarea>
                  <div className="textarea-border"></div>
                  <Send size={20} className="textarea-icon" />
                </div>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                style={{ position: 'relative', zIndex: 12, pointerEvents: 'auto' }}
              >
                <span className="btn-text">
                  {isSubmitting ? 'Sending Query...' : 'Submit Query'}
                </span>
                <div className="btn-particles"></div>
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <Send size={20} className="btn-icon" />
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? <Check size={20} /> : <AlertTriangle size={20} />}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;