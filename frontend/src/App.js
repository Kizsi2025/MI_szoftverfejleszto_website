// src/App.js
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/auth/AuthModal';
import LessonsList from './components/lessons/LessonsList';
import Modal from './components/Modal';
import Quiz from './components/Quiz';
import './App.css';
import Achievements from './components/dashboard/Achievements';
import Leaderboard from './components/dashboard/Leaderboard';
import Progress from './components/dashboard/Progress';

const AppContent = () => {
  const { user, logout, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="loading">
            <div className="spinner"></div>
            <p>Betöltés...</p>
          </div>
        </header>
      </div>
    );
  }

  const openModuleOverview = () => setIsModuleModalOpen(true);
  const closeModuleModal = () => setIsModuleModalOpen(false);

  return (
    <div className="App">
      {user ? (
        <div className="authenticated-app">
          <nav className="app-navigation">
            <div className="nav-brand">
              <h2>🧠 MI platform</h2>
            </div>
            <div className="nav-menu">
              <button
                className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                🏠 Dashboard
              </button>
              <button
                className={`nav-item ${currentView === 'lessons' ? 'active' : ''}`}
                onClick={() => setCurrentView('lessons')}
              >
                📚 Leckék
              </button>
              <button
                className={`nav-item ${currentView === 'quiz' ? 'active' : ''}`}
                onClick={() => setCurrentView('quiz')}
              >
                📝 Villámkvíz
              </button>
            </div>
            <div className="nav-user">
              
            </div>
          </nav>

          <main className="app-main">
            {currentView === 'dashboard' && (
              <div className="dashboard">
                <div className="user-welcome">
                  <h1>🎯 Üdvözlünk, {user.username}!</h1>
                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-value">{user.total_points}</span>
                      <span className="stat-label">Pont</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{user.current_rank}</span>
                      <span className="stat-label">Rang</span>
                    </div>
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    className="primary-button"
                    onClick={() => setCurrentView('lessons')}
                  >
                    📚 Leckék
                  </button>
                  <button
                    className="primary-button"
                    onClick={openModuleOverview}
                  >
                    📖 Első modul áttekintés
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => setCurrentView('quiz')}
                  >
                    📝 Villámkvíz
                  </button>
                  <button
                    className="secondary-button"
                    onClick={logout}
                  >
                    🚪 Kijelentkezés
                  </button>
                </div>
              </div>
            )}
            {currentView === 'lessons' && <LessonsList />}
            {currentView === 'quiz' && (
              <Quiz onPassed={() => setCurrentView('lessons')} />
            )}
          </main>
        </div>
      ) : (
        <header className="App-header">
          <div className="guest-view">
            <div className="platform-header">
              <h1 className="platform-title">
                🧠 MI Szoftvertechnikus platform
              </h1>
              <div className="platform-subtitle">
                Gamifikált tanulási élmény szoftverfejlesztőknek
              </div>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🎮 Gamifikáció</h3>
                <p>Pontgyűjtés, rangok és kihívások</p>
              </div>
              <div className="feature-card">
                <h3>🤖 MI Kiértékelés</h3>
                <p>Perplexity API alapú pitch értékelés</p>
              </div>
              <div className="feature-card">
                <h3>📚 19 Modul</h3>
                <p>Teljes MI tananyag szoftverfejlesztőknek</p>
              </div>
            </div>
            <div className="auth-actions">
              <button
                className="primary-button"
                onClick={() => setAuthModalOpen(true)}
              >
                🚀 Kezdés
              </button>
            </div>
          </div>
        </header>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <Modal
        isOpen={isModuleModalOpen}
        onClose={closeModuleModal}
        title="Az MI körülvesz minket – Kiképzés I"
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <button
            className="primary-button"
            onClick={() =>
              window.open(
                'https://gemini.google.com/share/ade75c86924d',
                '_blank'
              )
            }
          >
            Gemini oktatóanyag megnyitása
          </button>
        </div>
      </Modal>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
