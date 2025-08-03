// server/middleware/validation.js
const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Érvényesítési hibák',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('A felhasználónév 3-50 karakter között kell legyen')
    .matches(/^[a-zA-Z0-9_áéíóöőúüű]+$/)
    .withMessage('A felhasználónév csak betűket, számokat és aláhúzást tartalmazhat'),
  
  body('email')
    .isEmail()
    .withMessage('Érvényes email cím szükséges')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('A jelszó legalább 6 karakter hosszú kell legyen')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('A jelszónak tartalmaznia kell kis- és nagybetűt, valamint számot'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('A jelszavak nem egyeznek');
      }
      return true;
    }),
  
  handleValidationErrors
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Érvényes email cím szükséges')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Jelszó megadása kötelező'),
  
  handleValidationErrors
];

module.exports = {
  registerValidation,
  loginValidation,
  handleValidationErrors
};
