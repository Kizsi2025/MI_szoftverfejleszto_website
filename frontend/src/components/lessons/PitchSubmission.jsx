// src/components/lessons/PitchSubmission.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { lessonsService } from '../../services/lessonsService';

const PitchSubmission = ({ lesson, onSuccess }) => {
  const { token } = useAuth();
  const [pitchText, setPitchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pitchText.trim()) return;

    try {
      setLoading(true);
      await lessonsService.submitPitch(lesson.id, pitchText, token);
      setSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error('Pitch beküldése sikertelen:', error);
      alert('Hiba történt a pitch beküldése során!');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pitch-success">
        <h3>✅ Pitch sikeresen beküldve!</h3>
        <p>A prezentációd kiértékelés alatt áll. Az MI-alapú visszajelzést hamarosan megkapod.</p>
      </div>
    );
  }

  return (
    <div className="pitch-submission">
      <h3>🎤 Pitch Prezentáció</h3>
      <p>Készítsd el a prezentációdat a lecke témájához kapcsolódóan:</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={pitchText}
          onChange={(e) => setPitchText(e.target.value)}
          placeholder="Írd le itt a prezentációdat..."
          rows="10"
          className="pitch-textarea"
          required
        />
        
        <div className="pitch-actions">
          <div className="word-count">
            {pitchText.length} karakter
          </div>
          <button 
            type="submit" 
            className="submit-pitch-button"
            disabled={loading || !pitchText.trim()}
          >
            {loading ? 'Beküldés...' : '🚀 Pitch beküldése'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PitchSubmission;
