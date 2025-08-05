import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Make sure this path is correct
import { CalendarDays, ExternalLink, XCircle } from 'lucide-react';

const Events = () => {
 
  const [workshops, setWorkshops] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [filterType, setFilterType] = useState('upcoming');
  const [message, setMessage] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const borderColors = ['#3b82f6', '#facc15', '#ef4444']; 


  const workshopPageStyles = `
    /* Basic reset (consider if you have a global reset) */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Page container styles */
    .workshop-page-container {
      background-color: #060A13;
      color: #e2e8f0;
      padding: 2rem;
      font-family: 'Montserrat', sans-serif; /* Or your preferred font */
      min-height: 100vh;
      width: 100%;
      max-width: 1400px; /* Adjusted from 1200px to 1400px */
      margin: 0 auto;
      /* Remove any background - let it inherit from body */
    }

    .workshop-page-title {
      text-align: center;
      font-size: 2.5rem;
      color: #60a5fa;
      margin-bottom: 2rem;
      margin-top: 4rem;
    }

    /* Filter buttons (adapted from Council and Events) */
    .workshop-filter-container {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .workshop-filter-button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #4a90e2;
      background-color: #1a202c;
      color: #60a5fa;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .workshop-filter-button.active {
      background-color: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }

    /* --- Image and Box CSS from Events.js --- */
    .split-image-container {
      position: relative;
      width: 100%;
      padding-bottom: 75%; /* Aspect ratio (e.g., 75% for 4:3, 56.25% for 16:9) */
      overflow: hidden;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .quadrant {
      position: absolute;
      width: 50%;
      height: 50%;
      background-size: 200% 200%; /* Crucial for the split effect */
      transition: transform 0.3s ease;
      background-repeat: no-repeat;
      background-position: center; /* Ensures the image section is centered */
    }

    .quadrant-1 { top: 0; left: 0; background-position: 0% 0%; }
    .quadrant-2 { top: 0; right: 0; background-position: 100% 0%; }
    .quadrant-3 { bottom: 0; left: 0; background-position: 0% 100%; }
    .quadrant-4 { bottom: 0; right: 0; background-position: 100% 100%; }

    .split-image-container:hover .quadrant-1 { transform: translate(-10px, -10px); }
    .split-image-container:hover .quadrant-2 { transform: translate(10px, -10px); }
    .split-image-container:hover .quadrant-3 { transform: translate(-10px, 10px); }
    .split-image-container:hover .quadrant-4 { transform: translate(10px, 10px); }

    /* Styles for individual workshop cards */
    .workshop-card {
      background: #1e293b; /* Darker background for the card */
      border-radius: 1rem;
      padding: 1rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%; /* Ensures cards in a grid have consistent height */
      justify-content: space-between;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      /* Default border is removed here, as it will be set dynamically */
    }

    .workshop-card:hover {
      transform: scale(1.03); /* Slight scale up on hover */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
    }

    /* Dynamic border colors */
    .workshop-card.border-blue {
        border: 2px solid #3b82f6; /* Blue */
    }
    .workshop-card.border-yellow {
        border: 2px solid #facc15; /* Yellow */
    }
    .workshop-card.border-red {
        border: 2px solid #ef4444; /* Red */
    }


    /* General grid for workshops */
    .workshops-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1300px; /* Keep grid within 1200px or adjust if needed for wider content */
      margin: 0 auto;
    }

    /* Individual card content styles */
    .workshop-title {
      color: #fff;
      font-size: 1.25rem;
      margin-bottom: 0.8rem;
      word-break: break-word;
    }

    .workshop-description {
      font-size: 0.95rem;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 1rem;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* Limit to 3 lines */
      -webkit-box-orient: vertical;
    }

    .workshop-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #94a3b8;
      margin-bottom: 1rem;
      justify-content: center; /* Center date with icon */
    }

    .workshop-actions {
      margin-top: auto; /* Pushes buttons to bottom of card */
      display: flex;
      justify-content: center; /* Center the single button */
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-button { /* Unified button style */
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #3b82f6; /* Blue theme */
      color: #ffffff;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
      white-space: nowrap; /* Prevent text wrapping */
      font-size: 0.9rem;
      border: none; /* Ensure no default button border */
      cursor: pointer;
    }

    .action-button:hover {
      background-color: #2563eb;
    }

    /* Modal styles */
    .workshop-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 1rem;
    }

    .workshop-modal-content {
      background-color: #1e293b;
      border-radius: 1rem;
      padding: 2rem;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      color: #e2e8f0;
    }

    .workshop-modal-close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: color 0.2s ease;
    }

    .workshop-modal-close-button:hover {
      color: #ef4444;
    }

    .modal-workshop-title {
      color: #60a5fa;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .modal-main-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .modal-workshop-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      margin-bottom: 1rem;
      justify-content: center;
    }

    .modal-workshop-description {
      color: #cbd5e1;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .modal-event-images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .modal-event-image {
      width: 100%;
      height: 100px;
      object-fit: cover;
      border-radius: 0.5rem;
      transition: transform 0.2s ease;
    }

    .modal-event-image:hover {
      transform: scale(1.05);
    }

    .message-box {
      text-align: center;
      padding: 2rem;
      background-color: #1e293b;
      border-radius: 0.5rem;
      margin: 2rem auto;
      max-width: 600px;
    }

    .error-message {
      background-color: #7f1d1d;
      color: #fecaca;
    }

    .image-count-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      background-color: #4a90e2;
      color: #fff;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: bold;
      margin-left: auto; /* Push to the right */
    }

    /* No workshops/loading messages */
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

    /* --- Modal/Compartment Styles --- */
    .workshop-modal-overlay {
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
      overflow-y: auto; /* Allow scrolling for long content */
      padding: 20px;
    }

    .workshop-modal-content {
      background: linear-gradient(145deg, #1e293b 0%, #0f172a 50%, #1e293b 100%);
      padding: 3rem;
      border-radius: 2rem;
      max-width: 1000px;
      width: 95%;
      position: relative;
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(96, 165, 250, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      animation: fadeInScale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      overflow-y: auto;
      max-height: 90vh;
      backdrop-filter: blur(10px);
    }

    .workshop-modal-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(96, 165, 250, 0.02) 50%, transparent 70%);
      border-radius: 1.5rem;
      pointer-events: none;
    }

    .workshop-modal-close-button {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #f87171;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 1001;
      transition: all 0.3s ease;
      padding: 0.75rem;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }

    .workshop-modal-close-button:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.4);
      color: #ef4444;
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }

    .modal-workshop-title {
      font-size: 2.5rem;
      color: #ffffff;
      margin-bottom: 2rem;
      text-align: center;
      word-break: break-word;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      position: relative;
      line-height: 1.2;
    }

    .modal-workshop-title::before {
      content: '';
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa);
      border-radius: 2px;
      opacity: 0.8;
    }

    .modal-workshop-title::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #60a5fa, transparent);
      border-radius: 1px;
    }

    .modal-main-image {
      width: 100%;
      height: auto;
      max-height: 600px;
      object-fit: contain;
      border-radius: 1.5rem;
      margin-bottom: 3rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(96, 165, 250, 0.15);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%);
      padding: 1rem;
    }

    .modal-main-image:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
    }

    .modal-workshop-date {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.2rem;
      color: #e2e8f0;
      margin-bottom: 3rem;
      justify-content: center;
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
      padding: 1rem 2rem;
      border-radius: 3rem;
      border: 1px solid rgba(96, 165, 250, 0.2);
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(96, 165, 250, 0.1);
      backdrop-filter: blur(10px);
    }

    .modal-workshop-date svg {
      color: #60a5fa;
    }

    .modal-workshop-description {
      font-size: 1.1rem;
      color: #e2e8f0;
      line-height: 1.9;
      margin-bottom: 3rem;
      text-align: left;
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%);
      padding: 2rem;
      border-radius: 1.5rem;
      border-left: 5px solid #60a5fa;
      position: relative;
      box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    }

    .modal-workshop-description::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(96, 165, 250, 0.03) 50%, transparent 70%);
      border-radius: 0.75rem;
      pointer-events: none;
    }

    .modal-event-images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%);
      border-radius: 1.5rem;
      border: 1px solid rgba(96, 165, 250, 0.15);
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    }

    .modal-event-image {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 1rem;
      cursor: zoom-in;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      border: 2px solid transparent;
      box-shadow: 
        0 8px 20px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(96, 165, 250, 0.1);
      filter: brightness(0.9);
    }

    .modal-event-image:hover {
      transform: scale(1.05) translateY(-5px);
      border-color: #60a5fa;
      box-shadow: 
        0 15px 35px rgba(96, 165, 250, 0.4),
        0 0 0 2px rgba(96, 165, 250, 0.2);
      filter: brightness(1.1);
    }

    /* Animations */
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .workshop-page-container {
        padding: 1rem;
      }
      .workshop-page-title {
        font-size: 2rem;
      }
      .workshop-filter-button {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
      .workshops-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
      .workshop-card {
        padding: 0.8rem;
      }
      .workshop-title {
        font-size: 1.1rem;
      }
      .workshop-description, .workshop-date {
        font-size: 0.85rem;
      }
      .action-button {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
      .workshop-modal-content {
        padding: 1rem;
        max-height: 95vh;
      }
      .modal-workshop-title {
        font-size: 1.5rem;
      }
      .modal-main-image {
        max-height: 250px;
      }
      .modal-workshop-description {
        font-size: 0.9rem;
      }
      .modal-event-images-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
      .modal-event-image {
        height: 80px;
      }
    }

    @media (max-width: 600px) {
      .action-button {
        white-space: normal;
        width: 100%;
        text-align: center;
      }
    }
  `;

  const fetchWorkshops = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase
        .from('workshop')
        .select('*')
        .order('workshop_date', { ascending: true });

      if (error) {
        throw error;
      }

      setWorkshops(data || []);
    } catch (error) {
      console.error('Error fetching workshops:', error.message);
      setMessage('Failed to load workshops. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []); 

  const getFilteredWorkshops = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let sortedAndFiltered = [...workshops].filter(workshop => {
      const workshopDate = new Date(workshop.workshop_date);
      workshopDate.setHours(0, 0, 0, 0);

      if (filterType === 'upcoming') {
        return workshopDate >= today;
      } else if (filterType === 'past') {
        return workshopDate < today;
      }
      return true;
    });

    sortedAndFiltered.sort((a, b) => {
      const dateA = new Date(a.workshop_date);
      const dateB = new Date(b.workshop_date);
      if (filterType === 'upcoming') {
        return dateA.getTime() - dateB.getTime();
      } else if (filterType === 'past') {
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    return sortedAndFiltered;
  };

  const handleViewDetails = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

  // Function to clean and format workshop description
  const formatWorkshopDescription = (description) => {
    if (!description) return '';
    
    // Remove emojis and special characters
    let cleaned = description
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/[^\w\s.,!?;:()[\]{}'"`~@#$%^&*+=<>/\\|-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Split into sentences and format
    const sentences = cleaned.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    return sentences.map(sentence => sentence.trim()).join('. ');
  };

  const filteredWorkshops = getFilteredWorkshops();

  const isWorkshopUpcoming = (workshopDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const workshopDate = new Date(workshopDateStr);
    workshopDate.setHours(0, 0, 0, 0);
    return workshopDate >= today;
  };

  return (
    <div className="workshop-page-container">
      <style>{workshopPageStyles}</style>

      <h1 className="workshop-page-title" style={{ marginTop: '7rem' }}>Our Workshops</h1>

      <div className="workshop-filter-container">
        {['upcoming', 'past', 'all'].map(type => (
          <button
            key={type}
            className={`workshop-filter-button ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Workshops
          </button>
        ))}
      </div>

      {message && (
        <div className={`message-box ${message.includes('Failed') ? 'error-message' : ''}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="message-box">Loading workshops...</div>
      ) : filteredWorkshops.length === 0 ? (
        <div className="message-box">
          <h3>No workshops found for this category.</h3>
          <p>Try selecting a different filter.</p>
        </div>
      ) : (
        <div className="workshops-grid">
          {filteredWorkshops.map((workshop, index) => {
            const upcoming = isWorkshopUpcoming(workshop.workshop_date);
            const borderColorClass = `border-${['blue', 'yellow', 'red'][index % borderColors.length]}`;

            return (
              <div key={workshop.id} className={`workshop-card ${borderColorClass}`}>
                <div className="split-image-container">
                    <div className="quadrant quadrant-1" style={{ backgroundImage: `url(${workshop.feature_image_url})` }}></div>
                    <div className="quadrant quadrant-2" style={{ backgroundImage: `url(${workshop.feature_image_url})` }}></div>
                    <div className="quadrant quadrant-3" style={{ backgroundImage: `url(${workshop.feature_image_url})` }}></div>
                    <div className="quadrant quadrant-4" style={{ backgroundImage: `url(${workshop.feature_image_url})` }}></div>
                </div>
                <div style={{ padding: '0.5rem 0.5rem 1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
                  <h3 className="workshop-title">{workshop.workshop_name}</h3>
                  {workshop.description && (
                    <p className="workshop-description">{formatWorkshopDescription(workshop.description)}</p>
                  )}
                  <div className="workshop-date">
                    <CalendarDays size={18} />
                    <span>{new Date(workshop.workshop_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                                     <div className="workshop-actions">
                     {/* Card-level button logic: */}
                     {upcoming && workshop.registration_link ? (
                       <a
                         href={workshop.registration_link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="action-button"
                       >
                         Register Now <ExternalLink size={16} />
                       </a>
                     ) : (
                       <button
                         onClick={() => handleViewDetails(workshop)}
                         className="action-button"
                       >
                         View Details
                       </button>
                     )}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Workshop Details Modal/Compartment */}
      {isModalOpen && selectedWorkshop && (
        <div className="workshop-modal-overlay">
          <div className="workshop-modal-content">
            <button className="workshop-modal-close-button" onClick={closeModal}>
              <XCircle size={28} />
            </button>
            <h2 className="modal-workshop-title">{selectedWorkshop.workshop_name}</h2>

            {selectedWorkshop.feature_image_url && (
              <img
                src={selectedWorkshop.feature_image_url}
                alt={selectedWorkshop.workshop_name}
                className="modal-main-image"
              />
            )}

            <div className="modal-workshop-date">
              <CalendarDays size={20} />
              <span>
                {new Date(selectedWorkshop.workshop_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {selectedWorkshop.time ? ` at ${selectedWorkshop.time}` : ''}
              </span>
            </div>

            {selectedWorkshop.description && (
              <p className="modal-workshop-description">
                {formatWorkshopDescription(selectedWorkshop.description)}
              </p>
            )}

            {selectedWorkshop.event_images && selectedWorkshop.event_images.length > 0 && (
              <>
                <div style={{ 
                  textAlign: 'center', 
                  marginBottom: '2rem',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%)',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(96, 165, 250, 0.25)',
                  boxShadow: '0 8px 25px rgba(96, 165, 250, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h3 style={{ 
                    color: '#ffffff', 
                    marginBottom: '0.75rem', 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    letterSpacing: '-0.01em'
                  }}>
                    Event Gallery
                  </h3>
                  <p style={{ 
                    color: '#cbd5e1', 
                    fontSize: '1rem',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {selectedWorkshop.event_images.length} photo{selectedWorkshop.event_images.length !== 1 ? 's' : ''} from this workshop
                  </p>
                </div>
                <div className="modal-event-images-grid">
                  {selectedWorkshop.event_images.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`${selectedWorkshop.workshop_name} - Event ${index + 1}`}
                      className="modal-event-image"
                    />
                  ))}
                </div>
              </>
            )}

                         {selectedWorkshop.registration_link && isWorkshopUpcoming(selectedWorkshop.workshop_date) && (
               <div style={{ 
                 textAlign: 'center', 
                 marginTop: '3rem',
                 padding: '2.5rem',
                 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
                 borderRadius: '2rem',
                 border: '1px solid rgba(59, 130, 246, 0.25)',
                 boxShadow: '0 15px 35px rgba(59, 130, 246, 0.15)',
                 backdropFilter: 'blur(10px)'
               }}>
                 <a
                   href={selectedWorkshop.registration_link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="action-button"
                   style={{ 
                     display: 'inline-flex', 
                     alignItems: 'center', 
                     gap: '1rem',
                     fontSize: '1.2rem',
                     padding: '1rem 3rem',
                     borderRadius: '1rem',
                     boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                     transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                     fontWeight: '700',
                     letterSpacing: '0.02em'
                   }}
                 >
                   Register Now <ExternalLink size={20} />
                 </a>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
