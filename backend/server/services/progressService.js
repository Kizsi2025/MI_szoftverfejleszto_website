// backend/server/services/progressService.js
const db = require('../models');
const gamification = require('./gamificationService');

class ProgressService {
  /**
   * Frissíti vagy létrehozza a felhasználó haladását,
   * kiszámolja az új pontokat és rangot.
   *
   * @param {number} userId
   * @param {number} lessonId
   * @param {Object} performance – { type:'quiz'|'challenge'|'pitch', isFirstAttempt, score, completedEarly }
   * @returns {Promise<Object>} – { progress, newTotalPoints, newRank }
   */
  async updateProgress(userId, lessonId, performance) {
    // 1. Pontszám kalkulálása
    const pointsToAdd = gamification.calculatePoints(performance, performance);

    // 2. Haladás rekord frissítése vagy létrehozása
    let progress = await db.UserProgress.findOne({ where:{ user_id:userId, lesson_id:lessonId }});
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

    // 3. Felhasználó pontszámának és rangjának frissítése
    const user = await db.User.findByPk(userId);
    user.total_points += pointsToAdd;
    const newRank = gamification.getRankForPoints(user.total_points);
    user.current_rank = newRank ? newRank.name : user.current_rank;
    await user.save();

    return {
      progress,
      newTotalPoints: user.total_points,
      newRank: user.current_rank
    };
  }
}

module.exports = new ProgressService();
