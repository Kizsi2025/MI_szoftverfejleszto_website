// src/components/dashboard/Leaderboard.jsx
import React from 'react';
import './Dashboard.css';

export default function Leaderboard({ leaderboard }) {
  return (
    <div className="dashboard-section">
      <h2>🏆 Ranglista</h2>
      <ol className="leaderboard-list">
        {leaderboard.map((u, i) => (
          <li key={u.id} className={u.currentUser ? 'current-user' : ''}>
            {i + 1}. {u.username} — {u.total_points} TIP
          </li>
        ))}
      </ol>
    </div>
  );
}
