// server.js - helyes verzió
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./server/models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route-ok importálása - CSAK EGYSZER!
const authRoutes = require('./server/routes/auth');
const lessonsRoutes = require('./server/routes/lessons');  // <- CSAK egyszer!
const progressRoutes = require('./server/routes/progress');
const pitchesRoutes = require('./server/routes/pitches');

// Adatbázis kapcsolat tesztelése
async function testDatabaseConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Adatbázis kapcsolat sikeres');
    
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ force: false, alter: false });
      console.log('✅ Adatbázis táblák szinkronizálva');
    }
  } catch (error) {
    console.error('❌ Adatbázis kapcsolat sikertelen:', error.message);
  }
}

// Alapvető route-ok
app.get('/', (req, res) => {
  console.log('📍 Főoldal lekérés');
  res.json({
    message: 'MI Szoftvertechnikus Platform API',
    version: '1.0.0',
    status: 'running',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  console.log('📍 Health check');
  res.json({
    status: 'OK',
    database: db.sequelize.connectionManager.pool ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Adatbázis teszt endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    const userCount = await db.User.count();
    const lessonCount = await db.Lesson.count();
    
    res.json({
      message: 'Adatbázis teszt sikeres',
      connection: 'OK',
      tables: {
        users: userCount,
        lessons: lessonCount
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Adatbázis teszt sikertelen',
      error: error.message
    });
  }
});

// Route-ok használata
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/pitches', pitchesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Hiba történt:', err);
  res.status(500).json({
    message: 'Szerver hiba',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Belső szerver hiba'
  });
});

// Server indítása
const server = app.listen(PORT, async () => {
  console.log('🚀 ========================================');
  console.log(`🚀 MI Szoftvertechnikus Platform API`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🚀 Környezet: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 URL: http://localhost:${PORT}`);
  console.log('🚀 ========================================');
  
  await testDatabaseConnection();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM signal fogadva, szerver leállítás...');
  server.close(() => {
    console.log('✅ Szerver bezárva');
    db.sequelize.close();
  });
});

module.exports = app;
