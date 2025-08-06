// server/routes/progress.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../models');

// Haladás frissítése - ez hiányzott!
router.put('/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;
    const { status = 'completed', completion_percentage = 100 } = req.body;

    // Ellenőrizzük, hogy létezik-e már haladás
    let progress = await db.UserProgress.findOne({
      where: { 
        user_id: userId, 
        lesson_id: lessonId 
      }
    });

    if (progress) {
      // Frissítsük a meglévő haladást
      progress = await progress.update({
        status,
        completion_percentage,
        updated_at: new Date()
      });
    } else {
      // Hozzunk létre új haladást
      progress = await db.UserProgress.create({
        user_id: userId,
        lesson_id: lessonId,
        status,
        completion_percentage
      });
    }

    res.json({
      message: 'Haladás sikeresen frissítve! ✅',
      progress
    });

  } catch (error) {
    console.error('Haladás frissítése hiba:', error);
    res.status(500).json({
      message: 'Haladás frissítése sikertelen',
      error: error.message
    });
  }
});

// Felhasználó haladásának lekérése
router.get('/', authenticateToken, async (req, res) => {
  try {
    const progress = await db.UserProgress.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: db.Lesson,
        as: 'lesson',
        attributes: ['id', 'title', 'module_number']
      }],
      order: [['updated_at', 'DESC']]
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
