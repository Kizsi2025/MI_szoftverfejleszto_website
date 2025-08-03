// server/models/UserProgress.js
module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define('UserProgress', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lessons',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(20), // <- Egyszerűsített megoldás: STRING használata
      defaultValue: 'not_started',
      validate: {
        isIn: [['not_started', 'in_progress', 'completed']] // Validáció
      }
    },
    current_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    completion_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'user_progress',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'lesson_id']
      }
    ]
  });

  UserProgress.associate = function(models) {
    UserProgress.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    UserProgress.belongsTo(models.Lesson, {
      foreignKey: 'lesson_id',
      as: 'lesson'
    });
  };

  return UserProgress;
};
