// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

class AuthController {
  // Felhasználó regisztráció
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Ellenőrizzük, hogy létezik-e már ilyen felhasználó
      const existingUser = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { email: email },
            { username: username }
          ]
        }
      });

      if (existingUser) {
        const field = existingUser.email === email ? 'email' : 'felhasználónév';
        return res.status(409).json({
          message: `Már létezik felhasználó ezzel a ${field}del`,
          error: 'USER_EXISTS'
        });
      }

      // Jelszó titkosítása
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Új felhasználó létrehozása
      const user = await db.User.create({
        username,
        email,
        password_hash: hashedPassword,
        total_points: 0,
        current_rank: 'MI Kezdő'
      });

      // JWT token generálása
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          username: user.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Válasz jelszó nélkül
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        total_points: user.total_points,
        current_rank: user.current_rank,
        created_at: user.created_at
      };

      res.status(201).json({
        message: 'Sikeres regisztráció! Üdvözlünk az MI Szoftvertechnikus Platformon! 🚀',
        user: userResponse,
        token,
        gamification: {
          welcome_points: 50,
          starting_rank: 'MI Kezdő',
          message: 'Kezdő 50 pont hozzáadva! A tanulás megkezdődhet!'
        }
      });

    } catch (error) {
      console.error('Regisztráció hiba:', error);
      res.status(500).json({
        message: 'Regisztráció sikertelen',
        error: 'REGISTRATION_FAILED'
      });
    }
  }

  // Felhasználó bejelentkezés
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Felhasználó keresése
      const user = await db.User.findOne({
        where: { email: email }
      });

      if (!user) {
        return res.status(401).json({
          message: 'Érvénytelen bejelentkezési adatok',
          error: 'INVALID_CREDENTIALS'
        });
      }

      // Jelszó ellenőrzése
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Érvénytelen bejelentkezési adatok',
          error: 'INVALID_CREDENTIALS'
        });
      }

      // Haladás lekérdezése
      const progress = await db.UserProgress.findAll({
        where: { user_id: user.id },
        include: [{
          model: db.Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'module_number']
        }]
      });

      // JWT token generálása
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          username: user.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Válasz
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        total_points: user.total_points,
        current_rank: user.current_rank,
        created_at: user.created_at
      };

      res.json({
        message: `Üdvözlünk vissza, ${user.username}! 🎯`,
        user: userResponse,
        token,
        stats: {
          completed_lessons: progress.filter(p => p.status === 'completed').length,
          total_lessons: 19,
          current_points: user.total_points,
          current_rank: user.current_rank
        }
      });

    } catch (error) {
      console.error('Bejelentkezés hiba:', error);
      res.status(500).json({
        message: 'Bejelentkezés sikertelen',
        error: 'LOGIN_FAILED'
      });
    }
  }

  // Profil információk lekérdezése
  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      // Felhasználó részletes adatai
      const user = await db.User.findByPk(userId);
      
      // Haladás statisztikák
      const progress = await db.UserProgress.findAll({
        where: { user_id: userId },
        include: [{
          model: db.Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'module_number', 'initial_points']
        }]
      });

      // Pitch-ek száma
      const pitchCount = await db.Pitch.count({
        where: { user_id: userId }
      });

      // Statisztikák számítása
      const completedLessons = progress.filter(p => p.status === 'completed');
      const inProgressLessons = progress.filter(p => p.status === 'in_progress');
      
      const stats = {
        total_points: user.total_points,
        current_rank: user.current_rank,
        completed_lessons: completedLessons.length,
        in_progress_lessons: inProgressLessons.length,
        total_lessons: 19,
        submitted_pitches: pitchCount,
        progress_percentage: Math.round((completedLessons.length / 19) * 100)
      };

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          total_points: user.total_points,
          current_rank: user.current_rank,
          created_at: user.created_at
        },
        stats,
        recent_progress: progress.slice(-5) // Utolsó 5 lecke haladása
      });

    } catch (error) {
      console.error('Profil lekérdezés hiba:', error);
      res.status(500).json({
        message: 'Profil lekérdezés sikertelen',
        error: 'PROFILE_FETCH_FAILED'
      });
    }
  }

  // Jelszó módosítás
  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      const user = await db.User.findByPk(userId);
      
      // Jelenlegi jelszó ellenőrzése
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
      
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          message: 'A jelenlegi jelszó helytelen',
          error: 'INVALID_CURRENT_PASSWORD'
        });
      }

      // Új jelszó titkosítása
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Jelszó frissítése
      await user.update({
        password_hash: hashedNewPassword
      });

      res.json({
        message: 'Jelszó sikeresen megváltoztatva! 🔐',
        success: true
      });

    } catch (error) {
      console.error('Jelszó módosítás hiba:', error);
      res.status(500).json({
        message: 'Jelszó módosítás sikertelen',
        error: 'PASSWORD_CHANGE_FAILED'
      });
    }
  }

  // Token érvényesség ellenőrzése
  async verifyToken(req, res) {
    // Ha ide eljutunk, a token érvényes (middleware ellenőrizte)
    res.json({
      message: 'Token érvényes',
      user: req.user,
      valid: true
    });
  }
}

module.exports = new AuthController();
