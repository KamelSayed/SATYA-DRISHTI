import React from 'react';
import './Footer.css';
import favicon from '../favicon.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <div className="footer-brand">
            <img src={favicon} alt="SATYA-DRISHTI" className="footer-logo" />
            <div>
              <h3>SATYA-DRISHTI</h3>
              <p className="footer-subtitle">Digital Suraksha Framework</p>
            </div>
          </div>
          <p className="footer-desc">
            An AI-powered content moderation system developed for Digital India initiative. 
            Utilizing 12 advanced AI models to detect harmful content, misinformation, and 
            ensure online safety across social media platforms with 87% accuracy.
          </p>
          <p className="tagline">Empowering Digital India through AI-driven Content Safety</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-menu">
            <li><a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#governance">Governance</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Key Capabilities</h4>
          <ul className="feature-list">
            <li>Source Verification (Vishwaas Score)</li>
            <li>9 Indian Languages Support</li>
            <li>IPC & IT Act Compliance</li>
            <li>Cybercell Ready Reports</li>
            <li>Real-time Threat Detection</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Development Team</h4>
          <p className="team-name"><strong>Team Code Catalyst</strong></p>
          <p className="lead-dev">Lead Developer: Abhishek Giri</p>
          <div className="footer-social">
            <a href="https://github.com/abhishekgiri04" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://t.me/AbhishekGiri7" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-left">
            <p className="copyright">© 2025 SATYA-DRISHTI. All Rights Reserved.</p>
            <p className="govt-initiative">A Digital India Initiative | Government of India</p>
          </div>
          <div className="footer-right">
            <p className="footer-credits">Developed by Team Code Catalyst</p>
            <p className="tech-info">12 AI Models • 87% Accuracy • 8 Platforms • 9 Languages • Real-time Analysis</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
