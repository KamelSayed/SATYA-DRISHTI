import React from 'react';
import './HomeContent.css';

function HomeContent() {
  return (
    <div className="home-content">
      {/* Core Capabilities Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Comprehensive AI-Driven Content Intelligence Framework</h2>
          <p>Multi-layered Deep Learning Architecture with 12 Specialized Neural Network Models</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card primary">
            <div className="feature-icon shield">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Advanced Threat Detection</h3>
              <p>State-of-the-art AI algorithms for identifying harmful content, hate speech, and malicious material with precision-engineered detection capabilities</p>
            </div>
          </div>

          <div className="feature-card secondary">
            <div className="feature-icon brain">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Cognitive Sentiment Intelligence</h3>
              <p>Advanced Natural Language Processing with 95% accuracy in emotional tone analysis using transformer-based deep learning models</p>
            </div>
          </div>

          <div className="feature-card tertiary">
            <div className="feature-icon lightning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Real-Time Processing Engine</h3>
              <p>High-performance computational framework delivering comprehensive risk assessment and threat analysis within 10-15 seconds</p>
            </div>
          </div>

          <div className="feature-card quaternary">
            <div className="feature-icon globe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Universal Platform Integration</h3>
              <p>Seamless compatibility across major social media ecosystems including Reddit, Twitter, YouTube, Instagram with unified API architecture</p>
            </div>
          </div>

          <div className="feature-card quinary">
            <div className="feature-icon chart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Quantitative Risk Assessment</h3>
              <p>Comprehensive 0-100 scale threat scoring methodology with multi-dimensional risk factor analysis and probabilistic threat modeling</p>
            </div>
          </div>

          <div className="feature-card senary">
            <div className="feature-icon search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <div className="feature-content">
              <h3>Deep Analytical Intelligence</h3>
              <p>Comprehensive forensic analysis encompassing toxicity patterns, hate speech classification, and behavioral threat assessment with explainable AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Workflow */}
      <div className="process-section">
        <div className="process-header">
          <h2>Streamlined Three-Phase Operational Protocol</h2>
          <p>Efficient content intelligence pipeline delivering comprehensive threat assessment within seconds</p>
        </div>
        
        <div className="process-flow">
          <div className="process-step">
            <div className="step-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <h4>Content Ingestion</h4>
            <p>Secure input of digital content URLs from social media platforms and web sources</p>
          </div>

          <div className="process-connector"></div>

          <div className="process-step">
            <div className="step-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
            <h4>AI Processing Matrix</h4>
            <p>Parallel execution of 12 specialized neural networks for comprehensive threat analysis</p>
          </div>

          <div className="process-connector"></div>

          <div className="process-step">
            <div className="step-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h4>Intelligence Report</h4>
            <p>Detailed threat assessment with actionable recommendations and compliance documentation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;