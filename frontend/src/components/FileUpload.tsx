import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    
    // Create form data to send to backend
    const formData = new FormData();
    formData.append('document', file);

    try {
      // Send to Flask backend
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Navigate to success page with the filename
      navigate('/success', { state: { filename: file.name } });
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload Your Document</h3>
      <p>Drag and drop your document here or browse to upload.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          name="document" 
          id="document" 
          className="file-input"
          onChange={handleFileChange}
          required 
        />
        <label htmlFor="document" className="file-label">
          {file ? file.name : 'Choose a file'}
        </label>
        <button 
          type="submit" 
          className="btn btn-secondary"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default FileUpload; 