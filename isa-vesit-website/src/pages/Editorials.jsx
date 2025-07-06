import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 
import { ExternalLink, CalendarDays, XCircle } from 'lucide-react';

const Editorials = () => {
  const [editorials, setEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState('all'); 
  const [message, setMessage] = useState('');
  const [selectedEditorial, setSelectedEditorial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const timelineColors = ['#3b82f6', '#facc15', '#ef4444', '#10b981', '#a855f7']; 

 

  const editorialsPageStyles = `
    /* Reset and Container */
    .editorials-page-container {
      color: #e2e8f0;
      padding: 2rem;
      font-family: 'Montserrat', sans-serif;
      min-height: 100vh;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .editorials-page-title {
      text-align: center;
      font-size: 2.5rem;
      color: #60a5fa;
      margin-bottom: 2rem;
      margin-top: 4rem;
    }

    /* Filter buttons */
    .editorials-filter-container {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .editorials-filter-button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #4a90e2;
      background-color: #1a202c;
      color: #60a5fa;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .editorials-filter-button.active {
      background-color: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }

    /* Timeline Container */
    .editorials-timeline-container {
      position: relative;
      max-width: 900px; /* Adjust max-width for the timeline */
      margin: 0 auto;
      padding: 20px 0;
    }

    /* Vertical Line */
    .editorials-timeline-container::after {
      content: '';
      position: absolute;
      width: 4px;
      background-color: #4a90e2; /* Blue line */
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -2px; /* Center the line */
      z-index: 0;
    }

    /* Timeline Item (each editorial) */
    .timeline-item {
      padding: 10px 0;
      position: relative;
      width: 50%;
      z-index: 1; /* Ensure items are above the line */
    }

    .timeline-item:nth-child(odd) {
      left: 0;
      padding-right: 40px; /* Space for the line and dot */
    }

    .timeline-item:nth-child(even) {
      left: 50%;
      padding-left: 40px; /* Space for the line and dot */
    }

    /* The actual card within the timeline item */
    .editorial-card {
      background: #1e293b;
      border-radius: 0.8rem; /* Slightly smaller border-radius */
      padding: 1rem 1.2rem; /* Adjusted padding */
      text-align: left; /* Align text to left or right based on side */
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid transparent; /* Base for dynamic border colors */
      cursor: pointer; /* Indicate it's clickable */
    }

    .timeline-item:nth-child(odd) .editorial-card {
        text-align: right;
    }

    .timeline-item:nth-child(even) .editorial-card {
        text-align: left;
    }


    .editorial-card:hover {
      transform: translateY(-5px); /* Lift on hover */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }

    /* Dynamic border colors */
    .editorial-card.border-blue { border-color: #3b82f6; }
    .editorial-card.border-yellow { border-color: #facc15; }
    .editorial-card.border-red { border-color: #ef4444; }
    .editorial-card.border-green { border-color: #10b981; }
    .editorial-card.border-purple { border-color: #a855f7; }

    /* Dot on the timeline */
    .timeline-item::after {
      content: '';
      position: absolute;
      width: 18px; /* Size of the dot */
      height: 18px;
      border-radius: 50%;
      background-color: #60a5fa; /* Dot color */
      border: 3px solid #0f172a; /* Border matching background to make it pop */
      top: 50%; /* Center vertically */
      transform: translateY(-50%);
      z-index: 2; /* Ensure dot is on top */
    }

    .timeline-item:nth-child(odd)::after {
      right: -9px; /* Position for left-aligned items */
    }

    .timeline-item:nth-child(even)::after {
      left: -9px; /* Position for right-aligned items */
    }

    .editorial-content-wrapper {
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .editorial-title {
      color: #fff;
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
      word-break: break-word;
      min-height: auto;
      display: block;
      text-align: inherit;
    }

    .editorial-year {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #94a3b8;
      margin-bottom: 0.8rem;
    }
    .timeline-item:nth-child(odd) .editorial-year {
        justify-content: flex-end;
    }
    .timeline-item:nth-child(even) .editorial-year {
        justify-content: flex-start;
    }

    .editorial-actions {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .timeline-item:nth-child(odd) .editorial-actions {
        justify-content: flex-end;
    }
    .timeline-item:nth-child(even) .editorial-actions {
        justify-content: flex-start;
    }


    .action-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #3b82f6;
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 0.4rem;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
      white-space: nowrap;
      font-size: 0.85rem;
      border: none;
      cursor: pointer;
    }

    .action-button:hover {
      background-color: #2563eb;
    }

    /* Message Boxes */
    .message-box {
      text-align: center;
      font-size: 1.2rem;
      color: #94a3b8;
      padding: 3rem;
      background-color: #1a202c;
      border-radius: 0.75rem;
      max-width: 600px;
      margin: 4rem auto;
      border: 1px solid #4a90e2;
    }

    .error-message {
      background-color: #ef4444;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      text-align: center;
      max-width: 600px;
      margin: 2rem auto;
    }

    /* Modal Styles (Simplified for Editorials) */
    .editorial-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      overflow-y: auto;
      padding: 20px;
    }

    .editorial-modal-content {
      background-color: #1e293b;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 600px;
      width: 95%;
      position: relative;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
      animation: fadeInScale 0.3s ease-out;
      overflow-y: auto;
      max-height: 90vh;
    }

    .editorial-modal-close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: #cbd5e1;
      font-size: 1.8rem;
      cursor: pointer;
      z-index: 1001;
      transition: color 0.2s ease;
    }

    .editorial-modal-close-button:hover {
      color: #f87171;
    }

    .modal-editorial-title {
      font-size: 2rem;
      color: #60a5fa;
      margin-bottom: 1rem;
      text-align: center;
      word-break: break-word;
    }

    .modal-editorial-year {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      color: #94a3b8;
      margin-bottom: 1.5rem;
      justify-content: center;
    }
    
    /* Animation */
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Responsive adjustments for timeline */
    @media (max-width: 768px) {
      .editorials-page-container { padding: 1rem; }
      .editorials-page-title { font-size: 2rem; }
      .editorials-filter-button { padding: 0.6rem 1.2rem; font-size: 0.9rem; }
      
      .editorials-timeline-container {
        padding: 0 10px;
      }

      .editorials-timeline-container::after {
        left: 20px;
      }

      .timeline-item {
        width: 100%;
        padding-left: 50px;
        padding-right: 10px;
      }

      .timeline-item:nth-child(odd),
      .timeline-item:nth-child(even) {
        left: 0;
        padding-right: 10px;
        text-align: left;
      }

      .timeline-item::after {
        left: 10px;
        right: auto;
      }

      .editorial-card { padding: 0.8rem; }
      .editorial-title { font-size: 1.1rem; text-align: left; }
      .editorial-year { font-size: 0.85rem; justify-content: flex-start; }
      .action-button { padding: 0.5rem 1rem; font-size: 0.8rem; }
      .editorial-modal-content { padding: 1rem; max-height: 95vh; }
      .modal-editorial-title { font-size: 1.5rem; }

      .timeline-item:nth-child(odd) .editorial-year,
      .timeline-item:nth-child(odd) .editorial-actions {
          justify-content: flex-start;
      }
    }
  `;

  const fetchEditorials = async () => {
    setLoading(true);
    setMessage('');
    try {
 
      const { data, error } = await supabase
        .from('editorials')
        .select('*')
        .order('year', { ascending: false }) 
        .order('created_at', { ascending: false }); 

      if (error) {
        throw error;
      }

      setEditorials(data || []);
    } catch (error) {
      console.error('Error fetching editorials:', error.message);
      setMessage('Failed to load editorials. Please try again later.');
 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditorials();
  }, []);

  const getFilteredEditorials = () => {
    let filtered = [...editorials];

    if (filterYear !== 'all') {
      filtered = filtered.filter(editorial => editorial.year === parseInt(filterYear));
    }


    filtered.sort((a, b) => {
        if (b.year !== a.year) {
            return b.year - a.year;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); 
    });

    return filtered;
  };

  const getAllYears = () => {
    const years = new Set(editorials.map(editorial => editorial.year));
    return ['all', ...Array.from(years).sort((a, b) => b - a)]; 
  };

  const handleViewDetails = (editorial) => {
    setSelectedEditorial(editorial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEditorial(null);
  };

  const filteredEditorials = getFilteredEditorials();

  return (
    <div className="editorials-page-container">
      <style>{editorialsPageStyles}</style>
      
      {/* Header Section - Exactly like Contact Us */}
      <section className="hero" id="editorials">
        <h1>EDITORIALS</h1>
        <p>Explore our collection of insightful editorials and articles that showcase the latest trends, innovations, and perspectives in automation and technology. Discover thought-provoking content written by our community members.</p>
      </section>

      {/* Filter Section */}
      <div className="editorials-filter-container">
        <button 
          className={`editorials-filter-button ${filterYear === 'all' ? 'active' : ''}`}
          onClick={() => setFilterYear('all')}
        >
          All Years
        </button>
        {getAllYears().map(year => (
          <button 
            key={year}
            className={`editorials-filter-button ${filterYear === year ? 'active' : ''}`}
            onClick={() => setFilterYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {message && (
        <div className={`message-box ${message.includes('Failed') ? 'error-message' : ''}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="message-box">Loading editorials...</div>
      ) : filteredEditorials.length === 0 ? (
        <div className="message-box">
          <h3>No editorials found for this category.</h3>
          <p>Try selecting a different filter.</p>
        </div>
      ) : (
        <div className="editorials-timeline-container">
          {filteredEditorials.map((editorial, index) => {
            const colorIndex = index % timelineColors.length;
            const borderColorClass = `border-${['blue', 'yellow', 'red', 'green', 'purple'][colorIndex]}`;

            return (
              <div key={editorial.id} className="timeline-item">
                <div
                  className={`editorial-card ${borderColorClass}`}
                  onClick={() => handleViewDetails(editorial)}
                >
                  <div className="editorial-content-wrapper">
                    <h3 className="editorial-title">{editorial.name}</h3>
                    <div className="editorial-year">
                      <CalendarDays size={18} />
                      <span>Year: {editorial.year}</span>
                    </div>
                    <div className="editorial-actions">
                      <a
                        href={editorial.editorial_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read Editorial <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Editorial Details Modal */}
      {isModalOpen && selectedEditorial && (
        <div className="editorial-modal-overlay">
          <div className="editorial-modal-content">
            <button className="editorial-modal-close-button" onClick={closeModal}>
              <XCircle size={28} />
            </button>
            <h2 className="modal-editorial-title">{selectedEditorial.name}</h2>
            <div className="modal-editorial-year">
              <CalendarDays size={20} />
              <span>Year: {selectedEditorial.year}</span>
            </div>
            <div className="editorial-actions">
                <a
                    href={selectedEditorial.editorial_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button"
                    style={{ margin: '0 auto' }}
                >
                    Read Editorial <ExternalLink size={16} />
                </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editorials;
