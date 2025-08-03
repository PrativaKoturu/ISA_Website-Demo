import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 
import { CalendarDays, XCircle, BookOpen } from 'lucide-react';
import PDFViewer from '../components/PDFViewer';

const Editorials = () => {
  const [editorials, setEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState('all'); 
  const [message, setMessage] = useState('');
  const [selectedEditorial, setSelectedEditorial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [currentPdfTitle, setCurrentPdfTitle] = useState('');

  
  const timelineColors = ['#3b82f6', '#facc15', '#ef4444', '#10b981']; // Removed purple

 

  const editorialsPageStyles = `
    /* Reset and Container */
    .editorials-page-container {
      background: linear-gradient(135deg, #060A13 0%, #1A2332 50%, #0F1B2E 100%);
      color: #e2e8f0;
      padding: 2rem;
      font-family: 'Montserrat', 'Inter', 'Poppins', sans-serif;
      min-height: 100vh;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
      overflow-x: hidden;
    }

    .editorials-page-container::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    .editorials-page-container > * {
      position: relative;
      z-index: 1;
    }

    .editorials-page-title {
      text-align: center;
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa 0%, #4A90E2 50%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 3rem;
      margin-top: 4rem;
      letter-spacing: -0.02em;
      position: relative;
    }

    .editorials-page-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(90deg, #60a5fa, #4A90E2);
      border-radius: 2px;
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from { box-shadow: 0 0 10px rgba(96, 165, 250, 0.5); }
      to { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
    }

    /* Filter buttons */
    .editorials-filter-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 4rem;
      flex-wrap: wrap;
    }

    .editorials-filter-button {
      padding: 0.8rem 2rem;
      border-radius: 2rem;
      border: 2px solid transparent;
      background: linear-gradient(135deg, #1A2332, #2A3441);
      color: #cbd5e1;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .editorials-filter-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.5s;
    }

    .editorials-filter-button:hover::before {
      left: 100%;
    }

    .editorials-filter-button:hover {
      transform: translateY(-2px);
      border-color: #4A90E2;
      box-shadow: 0 10px 25px rgba(74, 144, 226, 0.3);
    }

    .editorials-filter-button.active {
      background: linear-gradient(135deg, #4A90E2, #60a5fa);
      color: #ffffff;
      border-color: #4A90E2;
      box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
      transform: translateY(-2px);
    }

    /* Timeline Container */
    .editorials-timeline-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 0;
    }

    /* Animated Vertical Line */
    .editorials-timeline-container::after {
      content: '';
      position: absolute;
      width: 4px;
      background: linear-gradient(180deg, #4a90e2, #facc15, #10b981, #4a90e2);
      background-size: 100% 400%;
      animation: gradientShift 6s ease-in-out infinite;
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -2px;
      border-radius: 2px;
      box-shadow: 0 0 15px rgba(74, 144, 226, 0.5);
      z-index: 0;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 0% 100%; }
    }

    /* Timeline Item (each editorial) */
    .timeline-item {
      padding: 20px 0;
      position: relative;
      width: 48%;
      z-index: 1;
      animation: slideInTimeline 0.8s ease-out forwards;
      opacity: 0;
      display: flex;
      justify-content: center;
    }

    .timeline-item:nth-child(odd) {
      left: 0;
      padding-right: 0;
      animation-delay: calc(var(--index) * 0.1s);
    }

    .timeline-item:nth-child(even) {
      left: 52%;
      padding-left: 0;
      animation-delay: calc(var(--index) * 0.1s);
    }

    @keyframes slideInTimeline {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* The actual card within the timeline item */
    .editorial-card {
      background: linear-gradient(135deg, rgba(26, 35, 50, 0.97), rgba(42, 52, 65, 0.97));
      backdrop-filter: blur(16px);
      border-radius: 1rem;
      padding: 1.1rem 1.3rem;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 260px;
      max-width: 350px;
      width: 100%;
      margin: 0 auto;
      box-shadow: 0 4px 24px rgba(74, 144, 226, 0.10), 0 1.5px 4px rgba(0,0,0,0.10);
      border: 1.5px solid #232e3e;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      min-height: 120px;
    }

    .editorial-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .editorial-card:hover::before {
      opacity: 1;
    }

    .timeline-item:nth-child(odd) .editorial-card {
        text-align: right;
    }

    .timeline-item:nth-child(even) .editorial-card {
        text-align: left;
    }

    .editorial-card:hover {
      transform: translateY(-6px) scale(1.015);
      box-shadow: 0 12px 32px rgba(74, 144, 226, 0.18), 0 0 0 1.5px #4A90E2;
      border-color: #4A90E2;
    }

    /* Dynamic border colors with glow */
    .editorial-card.border-blue { border-color: #4A90E2; }
    .editorial-card.border-yellow { border-color: #facc15; }
    .editorial-card.border-red { border-color: #ef4444; }
    .editorial-card.border-green { border-color: #10b981; }
    /* Removed .border-purple */

    /* Enhanced dot with pulsing animation */
    .timeline-item::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4A90E2, #facc15);
      border: 4px solid #060A13;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      animation: pulse 2s infinite;
      box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
    }

    @keyframes pulse {
      0%, 100% {
        transform: translateY(-50%) scale(1);
        box-shadow: 0 0 15px rgba(96, 165, 250, 0.6);
      }
      50% {
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 0 25px rgba(168, 85, 247, 0.8);
      }
    }

    .timeline-item:nth-child(odd)::after {
      right: -10px;
    }

    .timeline-item:nth-child(even)::after {
      left: -10px;
    }

    .editorial-content-wrapper {
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .editorial-title {
      color: #fff;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.7rem;
      word-break: break-word;
      min-height: auto;
      display: block;
      text-align: inherit;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .editorial-year {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-size: 0.95rem;
      color: #94a3b8;
      margin-bottom: 1.2rem;
      font-weight: 500;
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
      gap: 0.6rem;
      background: linear-gradient(135deg, #4A90E2, #60a5fa);
      color: #ffffff;
      padding: 0.7rem 1.3rem;
      border-radius: 2rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
      white-space: nowrap;
      font-size: 0.95rem;
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(74, 144, 226, 0.18);
    }

    .action-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .action-button:hover::before {
      left: 100%;
    }

    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(74, 144, 226, 0.25);
      background: linear-gradient(135deg, #2563eb, #4A90E2);
    }

    .no-editorial {
      color: #6b7280;
      font-style: italic;
      font-size: 0.9rem;
      padding: 0.5rem;
    }

    /* Message Boxes */
    .message-box {
      text-align: center;
      font-size: 1.2rem;
      color: #94a3b8;
      padding: 3rem;
      background: linear-gradient(135deg, rgba(26, 35, 50, 0.8), rgba(42, 52, 65, 0.8));
      backdrop-filter: blur(20px);
      border-radius: 1.5rem;
      max-width: 600px;
      margin: 4rem auto;
      border: 1px solid rgba(74, 144, 226, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .error-message {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9));
      color: white;
      padding: 1.5rem;
      border-radius: 1rem;
      text-align: center;
      max-width: 600px;
      margin: 2rem auto;
      box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
      border: 1px solid rgba(248, 113, 113, 0.3);
    }

    /* Enhanced Modal Styles */
    .editorial-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      overflow-y: auto;
      padding: 20px;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .editorial-modal-content {
      background: linear-gradient(135deg, rgba(26, 35, 50, 0.98), rgba(42, 52, 65, 0.98));
      backdrop-filter: blur(20px);
      padding: 2.5rem;
      border-radius: 1.5rem;
      max-width: 700px;
      width: 95%;
      position: relative;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
      animation: slideUpModal 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      max-height: 90vh;
      border: 1px solid rgba(96, 165, 250, 0.2);
    }

    @keyframes slideUpModal {
      from {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .editorial-modal-close-button {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: #cbd5e1;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1001;
      transition: all 0.3s ease;
    }

    .editorial-modal-close-button:hover {
      background: rgba(248, 113, 113, 0.2);
      border-color: rgba(248, 113, 113, 0.4);
      color: #f87171;
      transform: rotate(90deg);
    }

    .modal-editorial-title {
      font-size: 2.2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa 0%, #4A90E2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1.2rem;
      text-align: center;
      word-break: break-word;
      line-height: 1.2;
    }

    .modal-editorial-year {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.1rem;
      color: #94a3b8;
      margin-bottom: 2rem;
      justify-content: center;
      font-weight: 500;
    }
    
    /* Responsive adjustments for timeline */
    @media (max-width: 768px) {
      .editorials-page-container { padding: 1rem; }
      .editorials-page-title { font-size: 2.5rem; }
      .editorials-filter-button { padding: 0.7rem 1.5rem; font-size: 0.9rem; }
      
      .editorials-timeline-container { padding: 0 5px; }
      .editorials-timeline-container::after { left: 25px; }
      .timeline-item { width: 100%; padding-left: 0; padding-right: 0; justify-content: center; }
      .timeline-item:nth-child(odd), .timeline-item:nth-child(even) { left: 0; padding-right: 0; text-align: center; }
      .timeline-item::after { left: 15px; right: auto; }
      .editorial-card { padding: 1rem; min-width: 0; max-width: 95vw; }
      .editorial-title { font-size: 1.1rem; text-align: left; }
      .editorial-year { font-size: 0.9rem; justify-content: flex-start; }
      .action-button { padding: 0.7rem 1.1rem; font-size: 0.85rem; }
      .editorial-modal-content { padding: 1.5rem; max-height: 95vh; }
      .modal-editorial-title { font-size: 1.5rem; }

      .timeline-item:nth-child(odd) .editorial-year,
      .timeline-item:nth-child(odd) .editorial-actions {
          justify-content: flex-start;
      }
    }

    @media (max-width: 600px) {
      .editorials-page-title { font-size: 2rem; }
      .action-button {
        white-space: normal;
        width: 100%;
        text-align: center;
        justify-content: center;
      }
      .editorial-modal-content { padding: 1rem; }
      .modal-editorial-title { font-size: 1.2rem; }
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

  const handleReadEditorial = (e, editorialLink, editorialName) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPdfUrl(editorialLink);
    setCurrentPdfTitle(editorialName);
    setIsPDFViewerOpen(true);
  };

  const closePDFViewer = () => {
    setIsPDFViewerOpen(false);
    setCurrentPdfUrl('');
    setCurrentPdfTitle('');
  };

  const filteredEditorials = getFilteredEditorials();

  return (
    <div className="editorials-page-container">
      <style>{editorialsPageStyles}</style>

      <h1 className="editorials-page-title" style={{ marginTop: '7rem' }}>Our Editorials</h1>

      <div className="editorials-filter-container">
        {getAllYears().filter(year => year !== 'all').map(year => (
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
            const borderColorClass = `border-${['blue', 'yellow', 'red', 'green'][colorIndex]}`; // Removed purple

            return (
              <div 
                key={editorial.id} 
                className="timeline-item"
                style={{ '--index': index }}
              >
                <div
                  className={`editorial-card ${borderColorClass}`}
                  onClick={() => handleViewDetails(editorial)}
                >
                  <div className="editorial-content-wrapper">
                    <h3 className="editorial-title">{editorial.name}</h3>
                    <div className="editorial-year">
                      <CalendarDays size={20} />
                      <span>Year: {editorial.year}</span>
                    </div>
                    <div className="editorial-actions">
                      {editorial.editorial_pdf_url || editorial.editorial_link ? (
                        <button
                          className="action-button"
                          onClick={(e) => handleReadEditorial(e, editorial.editorial_pdf_url || editorial.editorial_link, editorial.name)}
                        >
                          📄 View PDF <BookOpen size={18} />
                        </button>
                      ) : (
                        <span className="no-editorial">No editorial available</span>
                      )}
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
              <XCircle size={24} />
            </button>
            <h2 className="modal-editorial-title">{selectedEditorial.name}</h2>
            <div className="modal-editorial-year">
              <CalendarDays size={22} />
              <span>Year: {selectedEditorial.year}</span>
            </div>
            <div className="editorial-actions">
              {selectedEditorial.editorial_pdf_url || selectedEditorial.editorial_link ? (
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="action-button"
                    onClick={(e) => handleReadEditorial(e, selectedEditorial.editorial_pdf_url || selectedEditorial.editorial_link, selectedEditorial.name)}
                  >
                    📄 View PDF <BookOpen size={18} />
                  </button>
                  <a
                    href={selectedEditorial.editorial_pdf_url || selectedEditorial.editorial_link}
                    download={`${selectedEditorial.name}_${selectedEditorial.year}.pdf`}
                    className="action-button"
                    style={{ textDecoration: 'none' }}
                  >
                    ⬇️ Download PDF
                  </a>
                </div>
              ) : (
                <span className="no-editorial" style={{ textAlign: 'center', display: 'block' }}>
                  No editorial available
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <PDFViewer
        isOpen={isPDFViewerOpen}
        onClose={closePDFViewer}
        pdfUrl={currentPdfUrl}
        title={currentPdfTitle}
      />
    </div>
  );
};

export default Editorials;