import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Github, Instagram, Mail, ExternalLink } from 'lucide-react';

const Council = () => {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedSection, setSelectedSection] = useState('BE');

  const academicYears = ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26'];
  const sections = ['BE', 'TE', 'SE'];

  // Council data structure - you can replace placeholders with actual data
  const councilData = {
    '2024-25': {
      BE: [
        {
          id: 1,
          name: 'Shreyas Kale',
          position: 'President',
          image: '/assets/images/council/2024-25/BE/shreyas_kale.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/shreyas-kale',
            github: 'https://github.com/shreyas-kale',
            instagram: 'https://instagram.com/shreyas_kale',
            email: 'shreyas.kale@example.com'
          }
        },
        {
          id: 2,
          name: 'Aastha Jajoo',
          position: 'Vice President',
          image: '/assets/images/council/2024-25/BE/aastha_jajoo.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/aastha-jajoo',
            instagram: 'https://instagram.com/aastha_jajoo',
            email: 'aastha.jajoo@example.com'
          }
        },
        {
          id: 3,
          name: 'Atishkar Singh',
          position: 'Sr. Treasurer',
          image: '/assets/images/council/2024-25/BE/atishkar_singh.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/atishkar-singh',
            github: 'https://github.com/atishkar-singh',
            email: 'atishkar.singh@example.com'
          }
        },
        {
          id: 4,
          name: 'Shobhit Rajguru',
          position: 'Chief Executive Officer',
          image: '/assets/images/council/2024-25/BE/shobhit_rajguru.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/shobhit-rajguru',
            instagram: 'https://instagram.com/shobhit_rajguru',
            email: 'shobhit.rajguru@example.com'
          }
        },
        {
          id: 5,
          name: 'Krishang Ukey',
          position: 'Chief Executive Officer',
          image: '/assets/images/council/2024-25/BE/krishang_ukey.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/krishang-ukey',
            github: 'https://github.com/krishang-ukey',
            email: 'krishang.ukey@example.com'
          }
        },
        {
          id: 6,
          name: 'Khushi Purohit',
          position: 'Chief Operations Officer',
          image: '/assets/images/council/2024-25/BE/khushi_purohit.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/khushi-purohit',
            instagram: 'https://instagram.com/khushi_purohit',
            email: 'khushi.purohit@example.com'
          }
        },
        {
          id: 7,
          name: 'Vishakha Singh',
          position: 'Chief Technical Officer',
          image: '/assets/images/council/2024-25/BE/vishakha_singh.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/vishakha-singh',
            github: 'https://github.com/vishakha-singh',
            email: 'vishakha.singh@example.com'
          }
        },
        {
          id: 8,
          name: 'Rashid Sarang',
          position: 'Chief Technical Officer',
          image: '/assets/images/council/2024-25/BE/rashid_sarang.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/rashid-sarang',
            github: 'https://github.com/rashid-sarang',
            email: 'rashid.sarang@example.com'
          }
        }
      ],
      TE: [
        {
          id: 1,
          name: 'Charchit Sahoo',
          position: 'Secretary',
          image: '/assets/images/council/2024-25/TE/charchit_sahoo.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/charchit-sahoo',
            github: 'https://github.com/charchit-sahoo',
            email: 'charchit.sahoo@example.com'
          }
        },
        {
          id: 2,
          name: 'Himesh Pathai',
          position: 'Operations Officer',
          image: '/assets/images/council/2024-25/TE/himesh_pathai.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/himesh-pathai',
            instagram: 'https://instagram.com/himesh_pathai',
            email: 'himesh.pathai@example.com'
          }
        },
        {
          id: 3,
          name: 'Himakshi Sargiya',
          position: 'Executive Officer',
          image: '/assets/images/council/2024-25/TE/himakshi_sargiya.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/himakshi-sargiya',
            instagram: 'https://instagram.com/himakshi_sargiya',
            email: 'himakshi.sargiya@example.com'
          }
        },
        {
          id: 4,
          name: 'Dnyanesh Avhad',
          position: 'Executive Officer',
          image: '/assets/images/council/2024-25/TE/dnyanesh_avhad.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/dnyanesh-avhad',
            github: 'https://github.com/dnyanesh-avhad',
            email: 'dnyanesh.avhad@example.com'
          }
        }
      ],
      SE: [
        {
          id: 1,
          name: 'Akshay Nambiar',
          position: 'Logistics Coordinator',
          image: '/assets/images/council/2024-25/SE/akshay_nambiar.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/akshay-nambiar',
            instagram: 'https://instagram.com/akshay_nambiar',
            email: 'akshay.nambiar@example.com'
          }
        },
        {
          id: 2,
          name: 'Ronit Ghugwani',
          position: 'Logistics Coordinator',
          image: '/assets/images/council/2024-25/SE/ronit_ghugwani.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/ronit-.ghugwani',
            github: 'https://github.com/ronit-ghugwani',
            email: 'ronit.ghugwani@example.com'
          }
        },
        {
          id: 3,
          name: 'Paayal Kapoor',
          position: 'Logistics Coordinator',
          image: '/assets/images/council/2024-25/SE/paayal_kapoor.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/paayal-kapoor',
            instagram: 'https://instagram.com/paayal_kapoor',
            email: 'paayal.kapoor@example.com'
          }
        }
      ]
    },
    '2023-24': {
      BE: [
        {
          id: 1,
          name: 'Previous President',
          position: 'President',
          image: '/assets/images/council/2023-24/BE/president.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/prev-president',
            email: 'prev.president@example.com'
          }
        },
        {
          id: 2,
          name: 'Previous VP',
          position: 'Vice President',
          image: '/assets/images/council/2023-24/BE/vp.jpg',
          socials: {
            linkedin: 'https://linkedin.com/in/prev-vp',
            email: 'prev.vp@example.com'
          }
        }
      ],
      TE: [],
      SE: []
    },
    '2022-23': {
      BE: [],
      TE: [],
      SE: []
    },
    '2021-22': {
      BE: [],
      TE: [],
      SE: []
    },
    '2025-26': {
      BE: [],
      TE: [],
      SE: []
    }
  };

  const currentCouncilMembers = councilData[selectedYear]?.[selectedSection] || [];

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

      {/* Faculty Advisor Section */}
      <section className="faculty-section">
        <div className="faculty-container">
          <h2 className="faculty-title">Faculty Advisor</h2>
          <div className="faculty-card">
            <div className="faculty-image-container">
              <img 
                src="/assets/images/council/faculty/gopala_krishnan.jpg" 
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
              <span className="count-badge">{currentCouncilMembers.length}</span> Members
            </div>
          </div>
          {currentCouncilMembers.length > 0 ? (
            <div className="members-grid">
              {currentCouncilMembers.map((member) => (
                <div key={member.id} className="member-card">
                  <div className="member-image-container">
                    <img src={member.image} alt={member.name} className="member-image" />
                    <div className="member-overlay">
                      <div className="social-links">
                        {member.socials.linkedin && (
                          <button onClick={() => handleSocialClick(member.socials.linkedin)} className="social-btn">
                            <Linkedin size={20} />
                          </button>
                        )}
                        {member.socials.github && (
                          <button onClick={() => handleSocialClick(member.socials.github)} className="social-btn">
                            <Github size={20} />
                          </button>
                        )}
                        {member.socials.instagram && (
                          <button onClick={() => handleSocialClick(member.socials.instagram)} className="social-btn">
                            <Instagram size={20} />
                          </button>
                        )}
                        {member.socials.email && (
                          <button onClick={() => handleEmailClick(member.socials.email)} className="social-btn">
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