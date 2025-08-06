// src/components/dashboard/Achievements.jsx
import React from 'react';
import './Dashboard.css';

export default function Achievements({ achievements }) {
  return (
    <div className="dashboard-section">
      <h2>🎖️ Eddigi eredményeid</h2>
      {achievements.length === 0 ? (
        <p>Még nincs elért eredményed.</p>
      ) : (
        <ul className="achievement-list">
          {achievements.map((a, i) => (
            <li key={i} className="achievement-item">
              <strong>{a.title}</strong> — {a.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
