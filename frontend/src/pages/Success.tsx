import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LocationState {
  filename?: string;
}

const Success: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const filename = state?.filename || 'your document';

  return (
    <>
      <Header />
      <main>
        <section className="success-section">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#0D80F2" fillOpacity="0.1"/>
                  <path d="M44 24L28 40L20 32" stroke="#0D80F2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Upload Successful!</h2>
              <p>Your file <strong>{filename}</strong> has been uploaded successfully.</p>
              <p>Our agentic system is now processing your document. This typically takes a few moments.</p>
              <div className="processing-animation">
                <div className="spinner"></div>
              </div>
              <div className="action-buttons">
                <Link to="/" className="btn btn-secondary">Upload Another Document</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Success; 