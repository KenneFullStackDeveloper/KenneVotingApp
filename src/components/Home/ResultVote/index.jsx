
// Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const ResultVote = () => {
  return (
    <div className="m-32 dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, ResultVotingApp</h1>
          <p>Result  dashboard overview</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        {/* Profile Section */}
        <div className="dashboard-section profile-section">
          <h2>Profile</h2>
          <div className="profile-info">
            <div className="profile-name">Kristin Watson</div>
            <div className="profile-title">Design Manager</div>
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-title">Prioritized tasks</div>
              <div className="stat-value">83%</div>
              <div className="stat-label">Avg. Completed</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-title">Additional tasks</div>
              <div className="stat-value">56%</div>
              <div className="stat-label">Avg. Completed</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-title">Trackers connected</div>
              <div className="stat-value">3</div>
              <div className="stat-label">active connections</div>
            </div>
          </div>
        </div>
        
        {/* Focusing Section */}
        <div className="dashboard-section focusing-section">
          <h2>Focusing</h2>
          <p className="section-subtitle">Productivity analytics</p>
          
          <div className="focusing-chart">
            <div className="chart-bar" style={{ height: '40%' }}>
              <div className="bar-label">Avg.</div>
              <div className="month-label">Oct</div>
            </div>
            <div className="chart-bar" style={{ height: '70%' }}>
              <div className="bar-label">Src.</div>
              <div className="month-label">Nov</div>
            </div>
            <div className="chart-bar" style={{ height: '100%' }}>
              <div className="bar-label">Maximum of focus</div>
              <div className="month-label">Min or lack of focus</div>
            </div>
          </div>
        </div>
        
        {/* Meetings Section */}
        <div className="dashboard-section meetings-section">
          <h2>My meetings</h2>
          
          <div className="meeting-list">
            <div className="meeting-item">
              <div className="meeting-date">Tue. 11 Jul</div>
              <div className="meeting-time">08:15 am</div>
              <div className="meeting-title">Quick Daily Meeting</div>
              <div className="meeting-platform">Zoom</div>
            </div>
            
            <div className="meeting-item">
              <div className="meeting-date">Tue. 11 Jul</div>
              <div className="meeting-time">09:30 pm</div>
              <div className="meeting-title">John Onboarding</div>
              <div className="meeting-platform">Google Meet</div>
            </div>
            
            <div className="meeting-item">
              <div className="meeting-date">Tue. 12 Jul</div>
              <div className="meeting-time">02:30 pm</div>
              <div className="meeting-title">Call With a New Team</div>
              <div className="meeting-platform">Google Meet</div>
            </div>
            
            <div className="meeting-item">
              <div className="meeting-date">Tue. 15 Jul</div>
              <div className="meeting-time">04:00 pm</div>
              <div className="meeting-title">Lead Designers Event</div>
              <div className="meeting-platform">Zoom</div>
            </div>
          </div>
          
          <div className="see-all">See all meetings</div>
        </div>
        
        {/* Range Section */}
        <div className="dashboard-section range-section">
          <div className="range-header">
            <h2>Range: Last month</h2>
            <div className="week-label">Week 8</div>
          </div>
          
          <div className="range-status">Unbalanced</div>
          
          <div className="range-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '41%' }}></div>
            </div>
            <div className="progress-value">41%</div>
          </div>
          
          <div className="progress-label">Avg. Conc-Ion</div>
        </div>
        
        {/* Developed Areas Section */}
        <div className="dashboard-section areas-section">
          <h2>Developed areas</h2>
          <p className="section-subtitle">Most common areas of interests</p>
          
          <div className="skills-container">
            <div className="skill-item">
              <div className="skill-name">Sport Skills</div>
              <div className="skill-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '71%' }}></div>
                </div>
                <div className="skill-value">71%</div>
              </div>
            </div>
            
            <div className="skill-item">
              <div className="skill-name">Blogging</div>
              <div className="skill-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '92%' }}></div>
                </div>
                <div className="skill-value">92%</div>
              </div>
            </div>
            
            <div className="skill-item">
              <div className="skill-name">Leadership</div>
              <div className="skill-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '33%' }}></div>
                </div>
                <div className="skill-value">33%</div>
              </div>
            </div>
            
            <div className="skill-item">
              <div className="skill-name">Meditation</div>
              <div className="skill-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '56%' }}></div>
                </div>
                <div className="skill-value">56%</div>
              </div>
            </div>
            
            <div className="skill-item">
              <div className="skill-name">Philosophy</div>
              <div className="skill-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '79%' }}></div>
                </div>
                <div className="skill-value">79%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultVote;




