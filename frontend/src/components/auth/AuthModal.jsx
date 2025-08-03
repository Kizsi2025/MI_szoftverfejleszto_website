// src/components/auth/AuthModal.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleSuccess = (result) => {
    // Sikeres bejelentkezés/regisztráció után
    console.log('Sikeres autentikáció:', result);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        {isLogin ? (
          <LoginForm 
            onSwitchToRegister={() => setIsLogin(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={() => setIsLogin(true)}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
