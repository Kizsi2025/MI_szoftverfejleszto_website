// server/models/Rank.js
module.exports = (sequelize, DataTypes) => {
  const Rank = sequelize.define('Rank', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rank_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    min_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    badge_icon: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'ranks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Rank;
};
