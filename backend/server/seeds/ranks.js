// server/seeds/ranks.js
const db = require('../models');

const ranksSeedData = [
  {
    rank_name: 'MI Kezdő',
    min_points: 0,
    badge_icon: 'beginner.svg',
    description: 'Az első lépések a MI világában'
  },
  {
    rank_name: 'Adatelemző gyakornok',
    min_points: 150,
    badge_icon: 'apprentice.svg',
    description: 'Alapvető adatkezelési készségek elsajátítása'
  },
  {
    rank_name: 'Python kódmágus',
    min_points: 300,
    badge_icon: 'python-wizard.svg',
    description: 'Pandas és Matplotlib mester'
  },
  {
    rank_name: 'Modellépítő szakértő',
    min_points: 500,
    badge_icon: 'model-builder.svg',
    description: 'Scikit-learn és gépi tanulás ismerője'
  },
  {
    rank_name: 'DevOps automatizátor',
    min_points: 750,
    badge_icon: 'devops-master.svg',
    description: 'CI/CD és MLOps gyakorlatok mestere'
  },
  {
    rank_name: 'Szoftverfejlesztői MI szakértő',
    min_points: 1000,
    badge_icon: 'ai-expert.svg',
    description: 'Teljes körű MI integráció a fejlesztésben'
  },
  {
    rank_name: 'Agilis MI-innovátor',
    min_points: 1300,
    badge_icon: 'agile-innovator.svg',
    description: 'Agilis folyamatok és MI összehangolása'
  },
  {
    rank_name: 'Digitális védelmező',
    min_points: 1600,
    badge_icon: 'security-guardian.svg',
    description: 'MI-alapú kiberbiztonsági megoldások'
  },
  {
    rank_name: 'Felhőépítész',
    min_points: 2000,
    badge_icon: 'cloud-architect.svg',
    description: 'Felhőalapú MI platformok tervezője'
  },
  {
    rank_name: 'MI algoritmus-építő mester',
    min_points: 2400,
    badge_icon: 'algorithm-master.svg',
    description: 'Komplex MI algoritmusok fejlesztője'
  },
  {
    rank_name: 'Az év MI innovátorai',
    min_points: 3000,
    badge_icon: 'champion.svg',
    description: 'A legmagasabb szintű MI szakértelem'
  }
];

async function seedRanks() {
  try {
    console.log('🏆 Ranks seed adatok betöltése...');
    
    const existingRanks = await db.Rank.count();
    if (existingRanks > 0) {
      console.log('⚠️ Már vannak rangok az adatbázisban. Kihagyás...');
      return;
    }

    for (const rankData of ranksSeedData) {
      await db.Rank.create(rankData);
      console.log(`🎖️ Rang hozzáadva: ${rankData.rank_name}`);
    }

    console.log('🎉 Minden rang sikeresen betöltve!');
  } catch (error) {
    console.error('❌ Hiba a ranks seed során:', error);
    throw error;
  }
}

module.exports = { seedRanks, ranksSeedData };
