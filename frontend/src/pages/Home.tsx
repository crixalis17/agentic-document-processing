import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import FeatureAnimation from '../components/FeatureAnimation';
import heroBgImage from '../assets/csv.png';
import uploadIcon from '../assets/upload-icon.svg';
import processIcon from '../assets/process-icon.svg';
import analyzeIcon from '../assets/analyze-icon.svg';

const Home: React.FC = () => {
  const heroStyle = {
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${heroBgImage}) no-repeat center/cover`,
    padding: '80px 0',
  };

  return (
    <>
      <Header />
      <main>
        <section className="hero" style={heroStyle}>
          <div className="container">
            <div className="hero-content">
              <h1>Unlock the Power of Agentic Document Processing</h1>
              <p>Transform your document workflows with DocuMind's intelligent automation. Experience unparalleled efficiency and accuracy in document handling.</p>
              <Link to="#" className="btn btn-primary btn-large">Get Started</Link>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <h2>How DocuMind Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-icon">
                  <img src={uploadIcon} alt="Upload Icon" />
                </div>
                <h3>Upload Your Documents</h3>
                <p>Easily upload documents of any format.</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <img src={processIcon} alt="Process Icon" />
                </div>
                <h3>Intelligent Processing</h3>
                <p>Our agentic system intelligently processes and understands your documents.</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <img src={analyzeIcon} alt="Analyze Icon" />
                </div>
                <h3>Extract and Analyze</h3>
                <p>Extract key information and gain valuable insights from your documents.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>Key Features</h2>
            <div className="features-intro">
              <h3>Empowering Your Document Workflows</h3>
              <p>DocuMind offers a suite of powerful features designed to enhance your document processing capabilities.</p>
            </div>

            <div className="feature-full-width" id="feature-document-support">
              <div className="feature-content">
                <h4>Versatile Document Support</h4>
                <p>Supports a wide range of document formats including PDFs, DOCX, TXT, and more. Our system is designed to handle diverse file types, ensuring compatibility and ease of use for all your documents.</p>
              </div>
              <FeatureAnimation id="document-support-canvas" type="document-support" />
            </div>

            <div className="feature-full-width" id="feature-data-extraction">
              <div className="feature-content">
                <h4>Intelligent Data Extraction</h4>
                <p>Accurately extracts key information, metadata, and insights using advanced AI algorithms. Turn unstructured documents into structured, actionable data effortlessly.</p>
              </div>
              <FeatureAnimation id="data-extraction-canvas" type="data-extraction" />
            </div>

            <div className="feature-full-width" id="feature-integration">
              <div className="feature-content">
                <h4>Seamless Integration</h4>
                <p>Integrates smoothly with your existing systems, databases, and cloud platforms for a streamlined workflow. Connect DocuMind to your enterprise applications with ease.</p>
              </div>
              <FeatureAnimation id="integration-canvas" type="integration" />
            </div>
          </div>
        </section>

        <section className="try-it">
          <div className="container">
            <h2>Try DocuMind for Yourself</h2>
            <FileUpload />
            <p className="privacy-note">Your data is securely processed and will not be stored after processing.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home; 