import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GovernanceDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

function GovernanceDashboard() {
  const [stats, setStats] = useState({
    daily_analysis: {
      total_content_analyzed: 0,
      high_risk_detected: 0,
      reports_generated: 0,
      false_positives: 0
    },
    threat_categories: {},
    language_distribution: {},
    timestamp: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/governance/stats/dashboard`);
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="governance-dashboard">
      <div className="dashboard-header">
        <h1>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '15px'}}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Governance Dashboard
        </h1>
        <p className="subtitle">Real-time Content Moderation Analytics for Law Enforcement</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <svg className="stat-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <line x1="12" y1="20" x2="12" y2="10"/>
            <line x1="18" y1="20" x2="18" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="16"/>
          </svg>
          <div className="stat-content">
            <div className="stat-value">{stats?.daily_analysis?.total_content_analyzed || 0}</div>
            <div className="stat-label">Total Content Analyzed</div>
          </div>
        </div>

        <div className="stat-card danger">
          <svg className="stat-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div className="stat-content">
            <div className="stat-value">{stats?.daily_analysis?.high_risk_detected || 0}</div>
            <div className="stat-label">High Risk Detected</div>
          </div>
        </div>

        <div className="stat-card success">
          <svg className="stat-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <div className="stat-content">
            <div className="stat-value">{stats?.daily_analysis?.reports_generated || 0}</div>
            <div className="stat-label">Reports Generated</div>
          </div>
        </div>

        <div className="stat-card info">
          <svg className="stat-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div className="stat-content">
            <div className="stat-value">{stats?.daily_analysis?.false_positives || 0}</div>
            <div className="stat-label">False Positives</div>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '10px'}}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Threat Categories
          </h3>
          <div className="category-list">
            {stats?.threat_categories && Object.keys(stats.threat_categories).length > 0 ? (
              Object.entries(stats.threat_categories).map(([category, count]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category.replace(/_/g, ' ')}</span>
                  <span className="category-count">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No threats detected yet</p>
            )}
          </div>
        </div>

        <div className="section">
          <h3>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '10px'}}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Language Distribution
          </h3>
          <div className="language-list">
            {stats?.language_distribution && Object.keys(stats.language_distribution).length > 0 ? (
              Object.entries(stats.language_distribution).map(([lang, count]) => (
                <div key={lang} className="language-item">
                  <span className="language-code">{lang.toUpperCase()}</span>
                  <div className="language-bar">
                    <div 
                      className="language-fill" 
                      style={{ width: `${(count / stats.daily_analysis.total_content_analyzed) * 100}%` }}
                    ></div>
                  </div>
                  <span className="language-count">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No language data yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="features-section">
        <h3>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '10px'}}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Active Features
        </h3>
        <div className="features-grid">
          <div className="feature-card">
            <svg className="feature-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div className="feature-name">Source Verification</div>
            <div className="feature-status active">Active</div>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div className="feature-name">Multilingual Support</div>
            <div className="feature-status active">Active</div>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div className="feature-name">Cybercell Reports</div>
            <div className="feature-status active">Active</div>
          </div>
          <div className="feature-card">
            <svg className="feature-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div className="feature-name">Legal Compliance</div>
            <div className="feature-status active">Active</div>
          </div>
        </div>
      </div>

      <div className="timestamp">
        Last updated: {stats?.timestamp ? new Date(stats.timestamp).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
}

export default GovernanceDashboard;
