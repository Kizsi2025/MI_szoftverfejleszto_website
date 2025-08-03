// src/components/lessons/LessonsList.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { lessonsService } from '../../services/lessonsService';
import LessonCard from './LessonCard';
import LessonModal from './LessonModal';
import './LessonsList.css';

const LessonsList = () => {
  const { user, token } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    loadData();
  }, [token]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [lessonsData, progressData] = await Promise.all([
        lessonsService.getAllLessons(token),
        lessonsService.getUserProgress(token)
      ]);

      setLessons(lessonsData.lessons || []);
      setProgress(progressData.progress || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isLessonLocked = (lesson) => {
    if (!lesson.unlock_requirements || lesson.unlock_requirements.length === 0) {
      return false;
    }

    const completedLessons = progress
      .filter(p => p.status === 'completed')
      .map(p => p.lesson_id);

    return !lesson.unlock_requirements.every(reqId => 
      completedLessons.includes(reqId)
    );
  };

  const getLessonProgress = (lessonId) => {
    return progress.find(p => p.lesson_id === lessonId);
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  };

  const handleProgressUpdate = () => {
    loadData(); // Újratöltjük az adatokat
  };

  if (loading) {
    return (
      <div className="lessons-loading">
        <div className="spinner"></div>
        <p>Leckék betöltése...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lessons-error">
        <h3>❌ Hiba történt</h3>
        <p>{error}</p>
        <button onClick={loadData} className="retry-button">
          Újrapróbálás
        </button>
      </div>
    );
  }

  const completedCount = progress.filter(p => p.status === 'completed').length;
  const totalPoints = progress.reduce((sum, p) => sum + (p.current_points || 0), 0);

  return (
    <div className="lessons-container">
      <div className="lessons-header">
        <h1>🧠 MI Szoftvertechnikus Tananyag</h1>
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">/ 19 lecke</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalPoints}</span>
            <span className="stat-label">pont</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user?.current_rank}</span>
            <span className="stat-label">rang</span>
          </div>
        </div>
      </div>

      <div className="lessons-grid">
        {lessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            progress={getLessonProgress(lesson.id)}
            isLocked={isLessonLocked(lesson)}
            onLessonClick={handleLessonClick}
          />
        ))}
      </div>

      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          progress={getLessonProgress(selectedLesson.id)}
          onClose={handleCloseModal}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
    </div>
  );
};

export default LessonsList;
