import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ResultCard from './components/ResultCard.jsx';
import HomeContent from './components/HomeContent.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import GovernanceDashboard from './components/GovernanceDashboard.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Lottie from 'lottie-react';
import securityAnimation from './Security.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [flash, setFlash] = useState({ show: false, message: '', type: '' });

  const showFlash = (message, type) => {
    setFlash({ show: true, message, type });
    setTimeout(() => setFlash({ show: false, message: '', type: '' }), 4000);
  };

  const analyzeUrl = async () => {
    if (!url.trim()) {
      showFlash('Please enter a URL', 'error');
      return;
    }

    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    if (!urlPattern.test(url)) {
      showFlash('Error - Link not Working', 'error');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/analyze/`, {
        url: url,
        deep_analysis: false
      });

      if (response.data.status === 'error') {
        showFlash('Error - Link not Working', 'error');
      } else {
        setResult(response.data);
        showFlash('Analysis completed successfully!', 'success');
      }
    } catch (err) {
      showFlash('Error - Link not Working', 'error');
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async () => {
    if (!imageUrl.trim()) {
      showFlash('Please enter an image URL', 'error');
      return;
    }

    setImageLoading(true);
    setImageResult(null);

    try {
      const response = await axios.post(`${API_URL}/analyze-image/`, {
        image_url: imageUrl
      });

      if (response.data.status === 'error') {
        showFlash('Error analyzing image', 'error');
      } else {
        console.log('Image Analysis Response:', response.data);
        setImageResult(response.data);
        showFlash('Image analysis completed!', 'success');
      }
    } catch (err) {
      showFlash('Error analyzing image', 'error');
    } finally {
      setImageLoading(false);
    }
  };

  const renderContent = () => {
    switch(currentSection) {
      case 'about':
        return <About />;
      case 'governance':
        return <GovernanceDashboard />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <header className="header">
              <h1 className="header-title">
                <span className="title-text">Intelligent Content Moderation</span>
              </h1>
              <p className="header-subtitle">Protecting Digital India with AI-Powered Safety Analysis</p>
              <div className="header-stats">
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">AI Models</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">87%</span>
                  <span className="stat-label">Accuracy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10s</span>
                  <span className="stat-label">Analysis</span>
                </div>
              </div>
            </header>

            <div className="input-section">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeUrl()}
                placeholder="Enter any URL to analyze content safety..."
                className="url-input"
              />
              <button onClick={analyzeUrl} disabled={loading} className="analyze-btn">
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>

            {loading && (
              <div className="loading">
                <div className="loading-content">
                  <div className="lottie-container">
                    <Lottie animationData={securityAnimation} loop={true} style={{ width: 240, height: 240 }} />
                  </div>
                  <div className="loading-text">
                    <h3>Analyzing Content</h3>
                    <p>AI-Powered Security Analysis in Progress</p>
                    <div className="loading-stats">
                      <div className="loading-stat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        <span>7 Text Analysis Models</span>
                      </div>
                      <div className="loading-stat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>5 Image Detection Models</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result && <ResultCard data={result} />}

            {!result && !loading && !error && (
              <>
                <div className="analysis-tabs">
                  <button className="tab-btn active">URL Analysis</button>
                  <button className="tab-btn" onClick={() => document.getElementById('image-section').scrollIntoView({ behavior: 'smooth' })}>Image Analysis</button>
                </div>
                <HomeContent />
                <div id="image-section" className="image-analysis-section-home">
                  <h2>Direct Image Analysis</h2>
                  <p className="section-desc">Analyze any public image URL for harmful content</p>
                  <div className="input-section">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && analyzeImage()}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)..."
                      className="url-input"
                    />
                    <button onClick={analyzeImage} disabled={imageLoading} className="analyze-btn">
                      {imageLoading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                  </div>

                  {imageLoading && (
                    <div className="loading">
                      <div className="loading-content">
                        <div className="lottie-container">
                          <Lottie animationData={securityAnimation} loop={true} style={{ width: 240, height: 240 }} />
                        </div>
                        <div className="loading-text">
                          <h3>Analyzing Image</h3>
                          <p>Processing with 5 AI models</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {imageResult && (
                    <div className="image-only-result">
                      <div className="image-comparison">
                        <div className="image-preview-section">
                          <h4>Original Image</h4>
                          <img src={imageUrl} alt="Original" className="analyzed-img" referrerPolicy="no-referrer" />
                        </div>
                        {imageResult.marked_image && (
                          <div className="image-preview-section">
                            <h4>Marked Analysis</h4>
                            <img src={imageResult.marked_image} alt="Marked" className="analyzed-img" />
                          </div>
                        )}
                      </div>
                      <div className="image-analysis-details">
                        <h3>Analysis Results</h3>
                        
                        {imageResult.categorization && (
                          <div className="categorization-section">
                            <div className="primary-category">
                              <span className="category-label">Primary Category:</span>
                              <span className="category-value">{imageResult.categorization.primary_category.toUpperCase().replace(/_/g, ' ')}</span>
                            </div>
                            {imageResult.categorization.all_categories.length > 0 && (
                              <div className="all-categories">
                                <span className="category-label">All Categories:</span>
                                <div className="category-badges">
                                  {imageResult.categorization.all_categories.map((cat, idx) => (
                                    <span key={idx} className="cat-badge">{cat.replace(/_/g, ' ')}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="risk-score-display">
                          <div className="score-circle" style={{ borderColor: imageResult.risk_score > 70 ? '#dc2626' : imageResult.risk_score > 50 ? '#ef4444' : imageResult.risk_score > 30 ? '#f59e0b' : '#10b981' }}>
                            <span className="score-num">{imageResult.risk_score || 0}</span>
                            <span className="score-max">/100</span>
                          </div>
                          <div className="risk-level-text" style={{ color: imageResult.risk_score > 70 ? '#dc2626' : imageResult.risk_score > 50 ? '#ef4444' : imageResult.risk_score > 30 ? '#f59e0b' : '#10b981' }}>
                            {imageResult.risk_score > 70 ? 'CRITICAL' : imageResult.risk_score > 50 ? 'HIGH' : imageResult.risk_score > 30 ? 'MEDIUM' : imageResult.risk_score > 15 ? 'LOW' : 'SAFE'}
                          </div>
                        </div>
                        <div className="detection-results">
                          <div className="detection-item">
                            <span className="detection-label">NSFW:</span>
                            <span className="detection-value" style={{ color: imageResult.nsfw?.is_nsfw ? '#ef4444' : '#10b981' }}>
                              {imageResult.nsfw?.is_explicit ? 'Explicit' : imageResult.nsfw?.is_sexual ? 'Sexual' : imageResult.nsfw?.is_nsfw ? 'Yes' : 'No'} ({(imageResult.nsfw?.confidence * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="detection-item">
                            <span className="detection-label">Violence:</span>
                            <span className="detection-value" style={{ color: imageResult.violence?.is_violent ? '#ef4444' : '#10b981' }}>
                              {imageResult.violence?.is_violent ? 'Yes' : 'No'} ({((imageResult.violence?.violence_score || 0) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="detection-item">
                            <span className="detection-label">Hateful Visual:</span>
                            <span className="detection-value" style={{ color: imageResult.violence?.is_hateful_visual ? '#ef4444' : '#10b981' }}>
                              {imageResult.violence?.is_hateful_visual ? 'Yes' : 'No'} ({((imageResult.violence?.hate_score || 0) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="detection-item">
                            <span className="detection-label">Spam:</span>
                            <span className="detection-value" style={{ color: imageResult.violence?.is_spam ? '#f59e0b' : '#10b981' }}>
                              {imageResult.violence?.is_spam ? 'Yes' : 'No'} ({((imageResult.violence?.spam_score || 0) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          {imageResult.religious_hate && (
                            <div className="detection-item">
                              <span className="detection-label">Religious Hate:</span>
                              <span className="detection-value" style={{ color: imageResult.religious_hate?.is_religious_hate ? '#ef4444' : '#10b981' }}>
                                {imageResult.religious_hate?.is_religious_hate ? 'Detected' : 'None'}
                              </span>
                            </div>
                          )}
                          <div className="detection-item ocr-item">
                            <span className="detection-label">OCR Text:</span>
                            <span className="detection-value">{imageResult.ocr?.text || 'No text detected'}</span>
                          </div>
                        </div>
                        
                        {imageResult.report && (
                          <div className="analysis-report">
                            <h4>📋 Detailed Report</h4>
                            <div className="report-summary">{imageResult.report.summary}</div>
                            
                            <div className="report-section">
                              <h5>⚠️ Detected Issues:</h5>
                              <ul className="report-list">
                                {imageResult.report.detected_issues.map((issue, idx) => (
                                  <li key={idx}>{issue}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="report-section">
                              <h5>💡 Recommendations:</h5>
                              <ul className="report-list">
                                {imageResult.report.recommendations.map((rec, idx) => (
                                  <li key={idx}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        );
    }
  };

  return (
    <div className="app">
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
      {!showLoading && (
        <>
          {flash.show && (
            <div className={`flash-message ${flash.type}`}>
              {flash.type === 'error' ? 'Error' : 'Success'} {flash.message}
            </div>
          )}
          <Navbar onSectionChange={setCurrentSection} currentSection={currentSection} />
          <div className="container">
            {renderContent()}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
