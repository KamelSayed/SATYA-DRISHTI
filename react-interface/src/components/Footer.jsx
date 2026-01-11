import React from 'react';
import './Footer.css';
import favicon from '../favicon.svg';

function Footer({ onSectionChange, currentSection }) {
  const handleNavClick = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={favicon} alt="SATYA-DRISHTI" width="36" height="36" />
              <h2>SATYA-DRISHTI</h2>
            </div>
            <p className="footer-tagline">
              Comprehensive AI-powered content moderation platform designed for Digital India's cybersecurity framework. 
              Employs 12 specialized machine learning models to identify, analyze, and report harmful digital content 
              with court-admissible evidence generation for law enforcement agencies.
            </p>
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">AI Models</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">87%</span>
                <span className="stat-label">Accuracy</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">9</span>
                <span className="stat-label">Languages</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8+</span>
                <span className="stat-label">Platforms</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Navigation</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleNavClick('home')} className={`footer-nav-btn ${currentSection === 'home' ? 'active' : ''}`}>Home</button></li>
              <li><button onClick={() => handleNavClick('how-it-works')} className={`footer-nav-btn ${currentSection === 'how-it-works' ? 'active' : ''}`}>How It Works</button></li>
              <li><button onClick={() => handleNavClick('about')} className={`footer-nav-btn ${currentSection === 'about' ? 'active' : ''}`}>About</button></li>
              <li><button onClick={() => handleNavClick('governance')} className={`footer-nav-btn ${currentSection === 'governance' ? 'active' : ''}`}>Governance</button></li>
              <li><button onClick={() => handleNavClick('contact')} className={`footer-nav-btn ${currentSection === 'contact' ? 'active' : ''}`}>Contact</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Core Capabilities</h3>
            <ul className="footer-links">
              <li><span className="footer-static-text">Vishwaas Credibility Score</span></li>
              <li><span className="footer-static-text">Indian Language Processing</span></li>
              <li><span className="footer-static-text">IPC & IT Act Mapping</span></li>
              <li><span className="footer-static-text">Live Threat Detection</span></li>
              <li><span className="footer-static-text">Cybercell Evidence Reports</span></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-left">
            <div className="copyright">
              © 2026 SATYA-DRISHTI Project. All Rights Reserved.
            </div>
            <div className="government-badge">
              NITI Aayog Initiative | Government of India
            </div>
          </div>
          <div className="footer-right">
            <div className="team-section">
              <div className="team-info">Team Code Catalyst | Lead Developer: Abhishek Giri</div>
              <div className="social-links">
                <a href="https://github.com/abhishekgiri04/" target="_blank" rel="noopener noreferrer" className="social-link github" title="Project Repository">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" className="social-link linkedin" title="Developer Profile">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://t.me/AbhishekGiri7" target="_blank" rel="noopener noreferrer" className="social-link telegram" title="Technical Support">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="tech-badges">
              <span className="badge">AI Powered</span>
              <span className="badge">Real-time</span>
              <span className="badge">Multi-Platform</span>
              <span className="badge">Court Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
