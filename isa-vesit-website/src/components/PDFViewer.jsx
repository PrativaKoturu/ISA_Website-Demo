import React from 'react';
import FlipBook from './FlipBook';

const PDFViewer = ({ isOpen, onClose, pdfUrl, title }) => {
  if (!isOpen) return null;

  return (
    <FlipBook
      isOpen={isOpen}
      onClose={onClose}
      pdfUrl={pdfUrl}
      title={title}
    />
  );
};

export default PDFViewer;