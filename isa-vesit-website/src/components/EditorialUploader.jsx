import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Upload, FileText, CheckCircle, XCircle, Loader } from 'lucide-react';

const EditorialUploader = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [editorialData, setEditorialData] = useState({
    name: '',
    year: new Date().getFullYear(),
    file: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setEditorialData(prev => ({ ...prev, file }));
      setUploadStatus('');
    } else {
      setUploadStatus('Please select a valid PDF file');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditorialData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const uploadEditorial = async () => {
    if (!editorialData.file || !editorialData.name) {
      setUploadStatus('Please fill in all fields and select a PDF file');
      return;
    }

    setUploading(true);
    setUploadStatus('Uploading...');

    try {
      // Generate unique filename
      const fileExt = 'pdf';
      const fileName = `${Date.now()}-${editorialData.name.replace(/[^a-zA-Z0-9]/g, '-')}.${fileExt}`;
      const filePath = `editorials/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('editorials')
        .upload(filePath, editorialData.file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('editorials')
        .getPublicUrl(filePath);

      // Insert editorial record into database
      const { data: insertData, error: insertError } = await supabase
        .from('editorials')
        .insert([
          {
            name: editorialData.name,
            year: editorialData.year,
            editorial_pdf_url: publicUrl,
            editorial_pdf_path: filePath
          }
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      setUploadStatus('Editorial uploaded successfully!');
      setEditorialData({ name: '', year: new Date().getFullYear(), file: null });
      
      // Reset file input
      const fileInput = document.getElementById('pdf-file-input');
      if (fileInput) fileInput.value = '';

      if (onUploadComplete) {
        onUploadComplete(insertData[0]);
      }

    } catch (error) {
      console.error('Error uploading editorial:', error);
      setUploadStatus(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="editorial-uploader">
      <div className="uploader-container">
        <h3 className="uploader-title">
          <Upload size={24} />
          Upload New Editorial
        </h3>

        <div className="form-group">
          <label htmlFor="editorial-name">Editorial Name</label>
          <input
            id="editorial-name"
            type="text"
            name="name"
            value={editorialData.name}
            onChange={handleInputChange}
            placeholder="Enter editorial name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="editorial-year">Year</label>
          <input
            id="editorial-year"
            type="number"
            name="year"
            value={editorialData.year}
            onChange={handleInputChange}
            min="2000"
            max="2030"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pdf-file-input">PDF File</label>
          <div className="file-input-wrapper">
            <input
              id="pdf-file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="file-input-display">
              <FileText size={20} />
              {editorialData.file ? editorialData.file.name : 'Choose PDF file'}
            </div>
          </div>
        </div>

        <button
          onClick={uploadEditorial}
          disabled={uploading || !editorialData.file || !editorialData.name}
          className="upload-button"
        >
          {uploading ? (
            <>
              <Loader size={20} className="spinning" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={20} />
              Upload Editorial
            </>
          )}
        </button>

        {uploadStatus && (
          <div className={`status-message ${uploadStatus.includes('success') ? 'success' : uploadStatus.includes('failed') ? 'error' : 'info'}`}>
            {uploadStatus.includes('success') && <CheckCircle size={20} />}
            {uploadStatus.includes('failed') && <XCircle size={20} />}
            {uploadStatus}
          </div>
        )}
      </div>

      <style>{`
        .editorial-uploader {
          margin: 2rem 0;
          display: flex;
          justify-content: center;
        }

        .uploader-container {
          background: linear-gradient(135deg, rgba(26, 35, 50, 0.97), rgba(42, 52, 65, 0.97));
          backdrop-filter: blur(16px);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          border: 1px solid rgba(74, 144, 226, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .uploader-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #60a5fa;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          justify-content: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: #cbd5e1;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          background: rgba(15, 27, 46, 0.8);
          border: 1px solid rgba(74, 144, 226, 0.3);
          border-radius: 0.5rem;
          color: #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #4A90E2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        .file-input-wrapper {
          position: relative;
        }

        .file-input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-input-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(15, 27, 46, 0.8);
          border: 1px solid rgba(74, 144, 226, 0.3);
          border-radius: 0.5rem;
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-input-display:hover {
          border-color: #4A90E2;
          background: rgba(74, 144, 226, 0.1);
        }

        .upload-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #4A90E2, #60a5fa);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .upload-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
        }

        .upload-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .status-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
        }

        .status-message.success {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-message.error {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .status-message.info {
          background: rgba(74, 144, 226, 0.2);
          color: #4A90E2;
          border: 1px solid rgba(74, 144, 226, 0.3);
        }

        @media (max-width: 768px) {
          .uploader-container {
            padding: 1.5rem;
            margin: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorialUploader;