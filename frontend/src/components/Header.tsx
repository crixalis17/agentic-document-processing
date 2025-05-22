import React from 'react';
import { Link } from 'react-router-dom';
import logoPart1 from '../assets/logo-part-1.svg';
import logoPart2 from '../assets/logo-part-2.svg';

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <img src={logoPart1} alt="DocuMind Logo Part 1" />
              <img src={logoPart2} alt="DocuMind Logo Part 2" />
            </div>
            <span>DocuMind</span>
          </div>
          <nav>
            <ul>
              <li><Link to="#">Product</Link></li>
              <li><Link to="#">Solutions</Link></li>
              <li><Link to="#">Pricing</Link></li>
              <li><Link to="#">Resources</Link></li>
            </ul>
          </nav>
          <div className="header-buttons">
            <Link to="#" className="btn btn-primary">Try for free</Link>
            <Link to="#" className="btn btn-secondary">Contact Sales</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 