// src/components/lessons/LessonModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { lessonsService } from '../../services/lessonsService';
import PitchSubmission from './PitchSubmission';
import './LessonModal.css';

const LessonModal = ({ lesson, progress, onClose, onProgressUpdate }) => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const handleStartLesson = async () => {
    try {
      setLoading(true);
      await lessonsService.updateProgress(lesson.id, {
        status: 'in_progress'
      }, token);
      onProgressUpdate();
    } catch (error) {
      console.error('Lecke indítása sikertelen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteActivity = async (activityIndex, points) => {
    try {
      setLoading(true);
      await lessonsService.updateProgress(lesson.id, {
        status: 'in_progress',
        points_earned: points,
        activity_completed: activityIndex
      }, token);
      onProgressUpdate();
    } catch (error) {
      console.error('Tevékenység teljesítése sikertelen:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lesson-modal-backdrop" onClick={onClose}>
      <div className="lesson-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="lesson-info">
            <div className="module-badge">
              {lesson.module_number}. modul
            </div>
            <h2>{lesson.title}</h2>
            <p className="game-theme">🎮 {lesson.game_theme}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Áttekintés
          </button>
          <button 
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            🎯 Tevékenységek
          </button>
          <button 
            className={`tab-button ${activeTab === 'pitch' ? 'active' : ''}`}
            onClick={() => setActiveTab('pitch')}
          >
            🎤 Pitch
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="lesson-description">
                <h3>Leírás</h3>
                <p>{lesson.description}</p>
              </div>

              <div className="lesson-objectives">
                <h3>Célkitűzések</h3>
                <ul>
                  {lesson.objectives?.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="lesson-points">
                <h3>Pontrendszer</h3>
                <div className="points-info">
                  <span>Kezdő pontok: {lesson.initial_points}</span>
                  {progress?.current_points > 0 && (
                    <span>Megszerzett pontok: {progress.current_points}</span>
                  )}
                </div>
              </div>

              {!progress && (
                <button 
                  className="start-lesson-button" 
                  onClick={handleStartLesson}
                  disabled={loading}
                >
                  {loading ? 'Indítás...' : '🚀 Lecke indítása'}
                </button>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="activities-tab">
              <h3>Tevékenységek</h3>
              <div className="activities-list">
                {lesson.content?.activities?.map((activity, index) => (
                  <div key={index} className="activity-card">
                    <div className="activity-header">
                      <h4>{activity.title}</h4>
                      <span className="activity-points">
                        {activity.points} pont
                      </span>
                    </div>
                    <p>{activity.description}</p>
                    <div className="activity-actions">
                      <button 
                        className="activity-button"
                        onClick={() => handleCompleteActivity(index, activity.points)}
                        disabled={loading}
                      >
                        {activity.type === 'quiz' && '📝 Kvíz indítása'}
                        {activity.type === 'challenge' && '⚔️ Kihívás teljesítése'}
                        {activity.type === 'pitch' && '🎤 Pitch készítése'}
                        {!['quiz', 'challenge', 'pitch'].includes(activity.type) && 'Teljesítés'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pitch' && (
            <div className="pitch-tab">
              <PitchSubmission 
                lesson={lesson} 
                onSuccess={onProgressUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
