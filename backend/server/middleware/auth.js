// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const db = require('../models');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      message: 'Hozzáférési token szükséges',
      error: 'MISSING_TOKEN' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Érvénytelen token - felhasználó nem található',
        error: 'USER_NOT_FOUND' 
      });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      total_points: user.total_points,
      current_rank: user.current_rank
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token lejárt',
        error: 'TOKEN_EXPIRED' 
      });
    }
    
    return res.status(403).json({ 
      message: 'Érvénytelen token',
      error: 'INVALID_TOKEN' 
    });
  }
};

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.User.findByPk(decoded.id);
      
      if (user) {
        req.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          total_points: user.total_points,
          current_rank: user.current_rank
        };
      }
    } catch (error) {
      // Nem kötelező auth esetén csak logoljuk a hibát
      console.log('Opcionális auth hiba:', error.message);
    }
  }
  
  next();
};

module.exports = {
  authenticateToken,
  optionalAuth
};
