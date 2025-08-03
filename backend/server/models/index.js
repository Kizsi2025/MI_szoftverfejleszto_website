// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/database.js')[process.env.NODE_ENV || 'development']; // 

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging
  }
);

const db = {};

// Modellek importálása
db.User = require('./User')(sequelize, DataTypes);
db.Lesson = require('./Lesson')(sequelize, DataTypes);
db.UserProgress = require('./UserProgress')(sequelize, DataTypes);
db.Pitch = require('./Pitch')(sequelize, DataTypes);
db.PitchEvaluation = require('./PitchEvaluation')(sequelize, DataTypes);
db.Rank = require('./Rank')(sequelize, DataTypes);

// Kapcsolatok definiálása
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
