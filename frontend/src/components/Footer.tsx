import React from 'react';
import { Link } from 'react-router-dom';
import socialIcon1 from '../assets/social-icon-1.svg';
import socialIcon2 from '../assets/social-icon-2.svg';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <Link to="#">Product</Link>
          <Link to="#">Solutions</Link>
          <Link to="#">Pricing</Link>
          <Link to="#">Resources</Link>
          <Link to="#">Contact Us</Link>
        </div>
        <div className="social-links">
          <Link to="#"><img src={socialIcon1} alt="Social Media 1" /></Link>
          <Link to="#"><img src={socialIcon2} alt="Social Media 2" /></Link>
        </div>
        <div className="copyright">
          <p>© 2024 DocuMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 