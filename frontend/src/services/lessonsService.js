// src/services/lessonsService.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const lessonsService = {
  // Összes lecke lekérése
  getAllLessons: async (token) => {
    const response = await fetch(`${API_BASE}/api/lessons`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Leckék betöltése sikertelen');
    }
    
    return response.json();
  },

  // Egy konkrét lecke lekérése
  getLessonById: async (id, token) => {
    const response = await fetch(`${API_BASE}/api/lessons/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Lecke betöltése sikertelen');
    }
    
    return response.json();
  },

  // Felhasználó haladásának lekérése
  getUserProgress: async (token) => {
    const response = await fetch(`${API_BASE}/api/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Haladás betöltése sikertelen');
    }
    
    return response.json();
  },

  // Haladás frissítése
  updateProgress: async (lessonId, data, token) => {
    const response = await fetch(`${API_BASE}/api/progress/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Haladás frissítése sikertelen');
    }
    
    return response.json();
  },

  // Pitch beküldése
  submitPitch: async (lessonId, pitchText, token) => {
    const response = await fetch(`${API_BASE}/api/pitches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lesson_id: lessonId,
        pitch_text: pitchText
      })
    });
    
    if (!response.ok) {
      throw new Error('Pitch beküldése sikertelen');
    }
    
    return response.json();
  }
};
