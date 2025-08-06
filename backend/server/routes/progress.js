// server/routes/progress.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../models');
const gamification = require('../services/gamificationService');

/**
 * PUT /api/progress/:lessonId
 * Frissíti vagy létrehozza a felhasználó haladását,
 * kiszámolja a kapott pontokat és a rangot, majd frissíti a user rekordot.
 */
router.put('/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;
    const performance = req.body; 
    // performance.type = 'quiz' | 'challenge' | 'pitch'
    // performance.isFirstAttempt, performance.score, performance.completedEarly

    // 1. Pontszám kalkulálása
    const pointsToAdd = gamification.calculatePoints(performance, performance);

    // 2. Haladás rekord kezelése
    let progress = await db.UserProgress.findOne({
      where: { user_id: userId, lesson_id: lessonId }
    });

    if (progress) {
      progress = await progress.update({
        status: 'completed',
        completion_percentage: 100,
        updated_at: new Date()
      });
    } else {
      progress = await db.UserProgress.create({
        user_id: userId,
        lesson_id: lessonId,
        status: 'completed',
        completion_percentage: 100
      });
    }

    // 3. Felhasználó pontszám és rang frissítése
    const user = await db.User.findByPk(userId);
    user.total_points += pointsToAdd;
    const newRankObj = gamification.getRankForPoints(user.total_points);
    user.current_rank = newRankObj ? newRankObj.name : user.current_rank;
    await user.save();

    // 4. Válasz visszaküldése
    res.json({
      message: 'Haladás sikeresen frissítve! ✅',
      progress,
      total_points: user.total_points,
      current_rank: user.current_rank
    });
  } catch (error) {
    console.error('Haladás frissítése hiba:', error);
    res.status(500).json({
      message: 'Haladás frissítése sikertelen',
      error: error.message
    });
  }
});

/**
 * GET /api/progress
 * A felhasználó összes haladási rekordjának lekérése.
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const progress = await db.UserProgress.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'module_number']
        }
      ],
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
