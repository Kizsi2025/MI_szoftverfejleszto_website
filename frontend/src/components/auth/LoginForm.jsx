// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const LoginForm = ({ onSwitchToRegister, onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    const result = await login(formData.email, formData.password);

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
        <h2>🔐 Bejelentkezés</h2>
        <p>Üdvözöl vissza a MI Szoftvertechnikus Platformon!</p>
      </div>

      {errors.general && (
        <div className="error-message">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
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
        </div>

        <button 
          type="submit" 
          className="auth-button" 
          disabled={loading}
        >
          {loading ? 'Bejelentkezés...' : '🚀 Bejelentkezés'}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Még nincs fiókod? 
          <button 
            type="button" 
            className="link-button" 
            onClick={onSwitchToRegister}
          >
            Regisztrálj itt!
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
