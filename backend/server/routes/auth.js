// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perc
  max: 5, // max 5 próbálkozás
  message: {
    message: 'Túl sok bejelentkezési kísérlet. Próbáld újra 15 perc múlva.',
    error: 'TOO_MANY_ATTEMPTS'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 óra
  max: 3, // max 3 regisztráció
  message: {
    message: 'Túl sok regisztrációs kísérlet. Próbáld újra 1 óra múlva.',
    error: 'TOO_MANY_REGISTRATIONS'
  }
});

// Regisztráció
router.post('/register', registerLimiter, registerValidation, authController.register);

// Bejelentkezés
router.post('/login', authLimiter, loginValidation, authController.login);

// Profil lekérdezése (védett)
router.get('/profile', authenticateToken, authController.getProfile);

// Jelszó módosítás (védett)
router.put('/change-password', 
  authenticateToken,
  [
    require('express-validator').body('currentPassword').notEmpty().withMessage('Jelenlegi jelszó szükséges'),
    require('express-validator').body('newPassword').isLength({ min: 6 }).withMessage('Az új jelszó legalább 6 karakter hosszú kell legyen'),
    require('../middleware/validation').handleValidationErrors
  ],
  authController.changePassword
);

// Token érvényesség ellenőrzése (védett)
router.get('/verify', authenticateToken, authController.verifyToken);

// Kijelentkezés (kliens oldali token törlés)
router.post('/logout', (req, res) => {
  res.json({
    message: 'Sikeres kijelentkezés! Viszlát! 👋',
    success: true
  });
});

module.exports = router;
