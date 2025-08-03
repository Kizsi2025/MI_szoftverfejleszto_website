// server/routes/lessons.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../models');

// Összes lecke lekérése
router.get('/', authenticateToken, async (req, res) => {
  try {
    const lessons = await db.Lesson.findAll({
      order: [['module_number', 'ASC']]
    });

    res.json({
      message: 'Leckék sikeresen betöltve',
      lessons
    });
  } catch (error) {
    console.error('Leckék lekérése hiba:', error);
    res.status(500).json({
      message: 'Leckék betöltése sikertelen',
      error: error.message
    });
  }
});

// Haladás lekérése
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const progress = await db.UserProgress.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: db.Lesson,
        as: 'lesson',
        attributes: ['id', 'title', 'module_number']
      }]
    });

    res.json({
      message: 'Haladás sikeresen betöltve',
      progress
    });
  } catch (error) {
    console.error('Haladás lekérése hiba:', error);
    res.status(500).json({
      message: 'Haladás betöltése sikertelen',
      error: error.message
    });
  }
});

module.exports = router;
