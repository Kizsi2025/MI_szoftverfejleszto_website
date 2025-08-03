// server/routes/pitches.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../models');

// Pitch beküldése
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { lesson_id, pitch_text } = req.body;
    const user_id = req.user.id;

    // Új pitch létrehozása
    const pitch = await db.Pitch.create({
      user_id,
      lesson_id,
      pitch_text,
      evaluation_status: 'pending'
    });

    res.status(201).json({
      message: 'Pitch sikeresen beküldve! 🚀',
      pitch: {
        id: pitch.id,
        lesson_id: pitch.lesson_id,
        pitch_text: pitch.pitch_text,
        evaluation_status: pitch.evaluation_status,
        submission_date: pitch.submission_date
      }
    });
  } catch (error) {
    console.error('Pitch beküldése hiba:', error);
    res.status(500).json({
      message: 'Pitch beküldése sikertelen',
      error: error.message
    });
  }
});

// Felhasználó pitch-einek lekérése
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pitches = await db.Pitch.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: db.Lesson,
        as: 'lesson',
        attributes: ['id', 'title', 'module_number']
      }, {
        model: db.PitchEvaluation,
        as: 'evaluation',
        required: false
      }],
      order: [['submission_date', 'DESC']]
    });

    res.json({
      message: 'Pitch-ek sikeresen betöltve',
      pitches
    });
  } catch (error) {
    console.error('Pitch-ek lekérése hiba:', error);
    res.status(500).json({
      message: 'Pitch-ek betöltése sikertelen',
      error: error.message
    });
  }
});

module.exports = router;
