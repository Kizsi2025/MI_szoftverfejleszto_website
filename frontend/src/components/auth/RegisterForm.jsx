// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const RegisterForm = ({ onSwitchToLogin, onSuccess }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Hibaüzenet törlése amikor kezd gépelni
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Jelszó egyezés ellenőrzése
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'A jelszavak nem egyeznek' });
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result.success) {
      onSuccess?.(result);
    } else {
      if (result.errors) {
        const errorObj = {};
        result.errors.forEach(error => {
          errorObj[error.field] = error.message;
        });
        setErrors(errorObj);
      } else {
        setErrors({ general: result.error });
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h2>🎯 Regisztráció</h2>
        <p>Csatlakozz az MI szoftvertechnikus platformhoz!</p>
      </div>

      {errors.general && (
        <div className="error-message">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Felhasználónév</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
            placeholder="felhasznalonev"
            required
          />
          {errors.username && <span className="field-error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email cím</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="pelda@email.com"
            required
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="••••••••"
            required
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
          <small className="field-hint">
            Legalább 6 karakter, kis- és nagybetű, szám
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Jelszó megerősítése</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="••••••••"
            required
          />
          {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
        </div>

        <button 
          type="submit" 
          className="auth-button" 
          disabled={loading}
        >
          {loading ? 'Regisztráció...' : '🚀 Regisztráció'}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Már van fiókod? 
          <button 
            type="button" 
            className="link-button" 
            onClick={onSwitchToLogin}
          >
            Jelentkezz be itt!
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
