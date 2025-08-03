// src/components/lessons/LessonCard.jsx
import React from 'react';
import './LessonCard.css';

const LessonCard = ({ lesson, progress, isLocked, onLessonClick }) => {
  const getStatusColor = () => {
    if (isLocked) return 'locked';
    if (!progress) return 'not-started';
    return progress.status;
  };

  const getStatusText = () => {
    if (isLocked) return 'Zárolt';
    if (!progress) return 'Nem kezdett';
    
    switch (progress.status) {
      case 'in_progress': return 'Folyamatban';
      case 'completed': return 'Befejezett';
      default: return 'Nem kezdett';
    }
  };

  return (
    <div 
      className={`lesson-card ${getStatusColor()} ${isLocked ? 'disabled' : ''}`}
      onClick={() => !isLocked && onLessonClick(lesson)}
    >
      <div className="lesson-header">
        <div className="lesson-module">
          <span className="module-number">{lesson.module_number}.</span>
          <span className="game-theme">{lesson.game_theme}</span>
        </div>
        <div className={`status-badge ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      </div>

      <div className="lesson-content">
        <h3 className="lesson-title">{lesson.title}</h3>
        <p className="lesson-description">{lesson.description}</p>
        
        <div className="lesson-objectives">
          <h4>Célkitűzések:</h4>
          <ul>
            {lesson.objectives?.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lesson-footer">
        <div className="points-info">
          <span className="initial-points">
            🎯 {lesson.initial_points} pont
          </span>
          {progress?.current_points > 0 && (
            <span className="earned-points">
              ✅ {progress.current_points} megszerzett
            </span>
          )}
        </div>

        <div className="activities-count">
          {lesson.content?.activities?.length || 0} tevékenység
        </div>
      </div>

      {isLocked && (
        <div className="lock-overlay">
          <div className="lock-icon">🔒</div>
          <p>Teljesítsd az előző leckéket!</p>
        </div>
      )}
    </div>
  );
};

export default LessonCard;
