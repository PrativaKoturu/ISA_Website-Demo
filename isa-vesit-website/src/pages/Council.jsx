import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Council = () => {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedSection, setSelectedSection] = useState('BE');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const academicYears = ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26'];
  const sections = ['BE', 'TE', 'SE'];

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      const { data, error } = await supabase
        .from('council_members')
        .select('*');
      if (!error) setMembers(data || []);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(
    m => m.academic_year === selectedYear && m.council_type === selectedSection
  );

  const handleSocialClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmailClick = (email) => {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="council-page">
      {/* Header Section - Exactly like Contact Us */}
      <section className="hero" id="council">
        <h1>COUNCIL</h1>
        <p>Meet our dedicated council members who lead ISA-VESIT's mission to set standards for automation. Discover the passionate individuals driving innovation and excellence in our community.</p>
      </section>

      {/* Faculty Advisor Section */}
      <section className="faculty-section">
        <div className="faculty-container">
          <h2 className="faculty-title">Faculty Advisor</h2>
          <div className="faculty-card">
            <div className="faculty-image-container">
              <img 
                src={require('../assets/images/facultyadvisor.png')} 
                alt="Mr. Gopala Krishnan N"
                className="faculty-image"
                onError={(e) => {
                  e.target.src = '/assets/images/placeholder-avatar.jpg';
                }}
              />
            </div>
            <div className="faculty-info">
              <h3 className="faculty-name">Mr. Gopala Krishnan N</h3>
              <p className="faculty-designation">Faculty Advisor</p>
              <p className="faculty-department">Department of Instrumentation Engineering</p>
            </div>
             </div>
        </div>
      </section>

      <div className="council-filters">
        <div className="filter-group">
          <h3 className="filter-title">Academic Year</h3>
          <div className="segmented-control">
            {academicYears.map(year => (
              <button
                key={year}
                className={`control-btn ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                <span>{year}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <h3 className="filter-title">Year Section</h3>
          <div className="segmented-control">
            {sections.map(section => (
              <button
                key={section}
                className={`control-btn ${selectedSection === section ? 'active' : ''}`}
                onClick={() => setSelectedSection(section)}
              >
                <span>{section}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Council Members Grid */}
      <section className="council-members-section">
        <div className="council-members-container">
          <div className="section-header">
            <h2 className="section-title">
              {selectedSection} Council <span className="year-tag">({selectedYear})</span>
            </h2>
            <div className="member-count">
              <span className="count-badge">{filteredMembers.length}</span> Members
            </div>
          </div>
          {loading ? (
            <div>Loading council members...</div>
          ) : filteredMembers.length > 0 ? (
            <div className="members-grid">
              {filteredMembers.map((member) => (
                <div key={member.id} className="member-card">
                  <div className="member-image-container">
                    <img src={member.photo_url} alt={member.name} className="member-image" onError={e => {e.target.src = '/assets/images/placeholder-avatar.jpg';}} />
                    <div className="member-overlay">
                      <div className="social-links">
                        {member.linkedin_url && (
                          <button onClick={() => handleSocialClick(member.linkedin_url)} className="social-btn">
                            <Linkedin size={20} />
                          </button>
                        )}
                        {member.github_url && (
                          <button onClick={() => handleSocialClick(member.github_url)} className="social-btn">
                            <Github size={20} />
                          </button>
                        )}
                        {member.instagram_url && (
                          <button onClick={() => handleSocialClick(member.instagram_url)} className="social-btn">
                            <Instagram size={20} />
                          </button>
                        )}
                        {member.email && (
                          <button onClick={() => handleEmailClick(member.email)} className="social-btn">
                            <Mail size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-members">
              <div className="no-members-content">
                <h3>No council members found</h3>
                <p>Please select a different year or section.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Council;