import React, { useState, useRef, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker - use local worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const FlipBook = ({ isOpen, onClose, pdfUrl, title }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loadedPages, setLoadedPages] = useState(new Set());
  const flipBookRef = useRef();

  const loadPDF = useCallback(async () => {
    setLoading(true);
    setError('');
    setPages([]);
    setLoadedPages(new Set());

    try {
      // Configure PDF.js with optimized settings for faster loading
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
        enableXfa: false, // Disable XFA for faster loading
        disableAutoFetch: true, // Disable auto-fetch for faster initial load
        disableStream: true, // Disable streaming for better compatibility
        disableFontFace: false,
        useSystemFonts: true
      });

      const pdf = await loadingTask.promise;
      setTotalPages(pdf.numPages);
      
      // Initialize pages array with placeholders for faster initial render
      const initialPages = Array.from({ length: pdf.numPages }, (_, index) => ({
        pageNumber: index + 1,
        canvas: null,
        width: 400,
        height: 600,
        loading: true
      }));
      
      setPages(initialPages);
      
      // Load first few pages immediately for better UX
      const initialPagesToLoad = Math.min(4, pdf.numPages);
      for (let i = 1; i <= initialPagesToLoad; i++) {
        renderPageLazy(pdf, i);
      }
      
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Failed to load PDF. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [pdfUrl]);

  useEffect(() => {
    if (isOpen && pdfUrl) {
      loadPDF();
    }
  }, [isOpen, pdfUrl, loadPDF]);

  const renderPageLazy = useCallback(async (pdf, pageNumber) => {
    // Check if page is already loaded using functional update
    setLoadedPages(prevLoaded => {
      if (prevLoaded.has(pageNumber)) return prevLoaded;
      
      // Start loading the page
      (async () => {
        try {
          const page = await pdf.getPage(pageNumber);
          // Use lower scale for faster rendering, can be increased with zoom
          const viewport = page.getViewport({ scale: 1.2 });
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;

          const pageData = {
            pageNumber,
            canvas: canvas.toDataURL('image/jpeg', 0.8), // Use JPEG with compression for smaller size
            width: viewport.width,
            height: viewport.height,
            loading: false
          };

          setPages(prevPages => 
            prevPages.map(p => 
              p.pageNumber === pageNumber ? pageData : p
            )
          );
          
          setLoadedPages(prev => new Set([...prev, pageNumber]));
        } catch (err) {
          console.error(`Error rendering page ${pageNumber}:`, err);
        }
      })();
      
      return new Set([...prevLoaded, pageNumber]);
    });
  }, []);

  const handlePageFlip = useCallback((e) => {
    const newPage = e.data;
    setCurrentPage(newPage);
    
    // Lazy load nearby pages when user flips
    const pdf = pdfjsLib.getDocument(pdfUrl).promise;
    pdf.then(pdfDoc => {
      // Load current page and next 2 pages
      for (let i = newPage + 1; i <= Math.min(newPage + 3, totalPages); i++) {
        if (!loadedPages.has(i)) {
          // Inline the page rendering to avoid circular dependency
          pdfDoc.getPage(i).then(page => {
            const viewport = page.getViewport({ scale: 1.2 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            page.render({
              canvasContext: context,
              viewport: viewport
            }).promise.then(() => {
              const pageData = {
                pageNumber: i,
                canvas: canvas.toDataURL('image/jpeg', 0.8),
                width: viewport.width,
                height: viewport.height,
                loading: false
              };

              setPages(prevPages => 
                prevPages.map(p => 
                  p.pageNumber === i ? pageData : p
                )
              );
              
              setLoadedPages(prev => new Set([...prev, i]));
            }).catch(err => {
              console.error(`Error rendering page ${i}:`, err);
            });
          });
        }
      }
    });
  }, [pdfUrl, totalPages, loadedPages]);

  const goToNextPage = () => {
    if (flipBookRef.current && currentPage < totalPages - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  if (!isOpen) return null;

  return (
    <div className="flipbook-overlay">
      <div className="flipbook-container">
        {/* Header */}
        <div className="flipbook-header">
          <h2 className="flipbook-title">{title}</h2>
          <div className="flipbook-controls">
            <button onClick={handleZoomOut} className="control-btn" title="Zoom Out">
              <ZoomOut size={20} />
            </button>
            <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="control-btn" title="Zoom In">
              <ZoomIn size={20} />
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="control-btn external-btn"
              title="Open in New Tab"
            >
              <ExternalLink size={20} />
              Open
            </a>
            <button onClick={onClose} className="control-btn close-btn" title="Close">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flipbook-content">
          {loading && (
            <div className="flipbook-loading">
              <div className="loading-spinner"></div>
              <p>Loading PDF...</p>
            </div>
          )}

          {error && (
            <div className="flipbook-error">
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={loadPDF} className="retry-btn">Retry</button>
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="external-link-btn"
                >
                  Open in New Tab <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )}

          {!loading && !error && pages.length > 0 && (
            <div className="flipbook-viewer" style={{ transform: `scale(${zoom})` }}>
              <HTMLFlipBook
                ref={flipBookRef}
                width={400}
                height={600}
                size="stretch"
                minWidth={300}
                maxWidth={800}
                minHeight={400}
                maxHeight={1000}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={handlePageFlip}
                className="flipbook"
              >
                {pages.map((page, index) => (
                  <div key={index} className="page">
                    {page.loading ? (
                      <div className="page-loading">
                        <div className="page-spinner"></div>
                        <p>Loading page {page.pageNumber}...</p>
                      </div>
                    ) : page.canvas ? (
                      <img 
                        src={page.canvas} 
                        alt={`Page ${page.pageNumber}`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="page-placeholder">
                        <p>Page {page.pageNumber}</p>
                      </div>
                    )}
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!loading && !error && pages.length > 0 && (
          <div className="flipbook-footer">
            <button 
              onClick={goToPrevPage} 
              disabled={currentPage === 0}
              className="nav-btn"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            <span className="page-indicator">
              Page {currentPage + 1} of {totalPages}
            </span>
            
            <button 
              onClick={goToNextPage} 
              disabled={currentPage >= totalPages - 1}
              className="nav-btn"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .flipbook-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .flipbook-container {
          width: 95vw;
          height: 95vh;
          background: linear-gradient(135deg, #1a2332, #2a3441);
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(74, 144, 226, 0.3);
        }

        .flipbook-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #4A90E2, #60a5fa);
          color: white;
        }

        .flipbook-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          flex: 1;
        }

        .flipbook-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .close-btn:hover {
          background: rgba(239, 68, 68, 0.8);
        }

        .zoom-indicator {
          color: white;
          font-weight: 600;
          min-width: 50px;
          text-align: center;
        }

        .flipbook-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          overflow: hidden;
        }

        .flipbook-loading, .flipbook-error {
          text-align: center;
          color: #cbd5e1;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(74, 144, 226, 0.3);
          border-top: 4px solid #4A90E2;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .retry-btn, .external-link-btn {
          background: #4A90E2;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .external-link-btn {
          background: #10b981;
        }

        .retry-btn:hover, .external-link-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .flipbook-viewer {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.3s ease;
          transform-origin: center;
        }

        .page {
          background: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .page-loading, .page-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #6b7280;
        }

        .page-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(74, 144, 226, 0.3);
          border-top: 3px solid #4A90E2;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 0.5rem;
        }

        .external-btn {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .external-btn:hover {
          background: rgba(16, 185, 129, 0.8);
        }

        .flipbook-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(26, 35, 50, 0.9);
          border-top: 1px solid rgba(74, 144, 226, 0.3);
        }

        .nav-btn {
          background: linear-gradient(135deg, #4A90E2, #60a5fa);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-indicator {
          color: #cbd5e1;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .flipbook-container {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }

          .flipbook-title {
            font-size: 1.2rem;
          }

          .flipbook-controls {
            gap: 0.5rem;
          }

          .nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FlipBook;