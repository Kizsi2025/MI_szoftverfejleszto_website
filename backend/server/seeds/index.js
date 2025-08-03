// server/seeds/index.js
const { seedLessons } = require('./lessons');
const { seedRanks } = require('./ranks');

async function runAllSeeds() {
  try {
    console.log('🚀 Seed folyamat indítása...');
    
    await seedRanks();
    await seedLessons();
    
    console.log('🎯 Összes seed adat sikeresen betöltve!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Seed hiba:', error);
    process.exit(1);
  }
}

// Ha közvetlenül futtatjuk
if (require.main === module) {
  runAllSeeds();
}

module.exports = { runAllSeeds };
