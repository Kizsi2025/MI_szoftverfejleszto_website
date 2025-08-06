// src/components/dashboard/Progress.jsx
import React from 'react';
import './Dashboard.css';

export default function Progress({ progress }) {
  return (
    <div className="dashboard-section">
      <h2>📈 Haladásod</h2>
      <ul className="progress-list">
        {progress.map((p) => (
          <li key={p.lessonId} className="progress-item">
            <span>{p.lessonTitle}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${p.completionPercentage}%` }}
              />
            </div>
            <span>{p.completionPercentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
