// server.js (backend gyökér)
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./server/models'); // <- Ez a módosítás
require('dotenv').config();
const lessonsRoutes = require('./server/routes/lessons');
app.use('/api/lessons', lessonsRoutes);

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🔧 Szerver inicializálás...');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('✅ Middleware-ek betöltve');

// server.js - a testDatabaseConnection függvényben
async function testDatabaseConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Adatbázis kapcsolat sikeres');
    
    // Táblák szinkronizálása (fejlesztés során)
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ force: false, alter: false }); // <- Biztonságosabb
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

// server.js - add hozzá ezt a részt a route-ok szakaszhoz

// Route-ok importálása
const authRoutes = require('./server/routes/auth');

// Route-ok használata
app.use('/api/auth', authRoutes);

// Védett test endpoint
app.get('/api/protected-test', 
  require('./server/middleware/auth').authenticateToken, 
  (req, res) => {
    res.json({
      message: '🎉 Hozzáférés engedélyezve!',
      user: req.user,
      timestamp: new Date().toISOString()
    });
  }
);


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
  
  // Adatbázis kapcsolat inicializálása
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
