// server/models/Pitch.js
module.exports = (sequelize, DataTypes) => {
  const Pitch = sequelize.define('Pitch', {
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
    pitch_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    submission_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    evaluation_status: {
      type: DataTypes.STRING(20), // <- STRING használata ENUM helyett
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'evaluating', 'completed']] // Validáció
      }
    }
  }, {
    tableName: 'pitches',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Pitch.associate = function(models) {
    Pitch.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Pitch.belongsTo(models.Lesson, {
      foreignKey: 'lesson_id',
      as: 'lesson'
    });
    Pitch.hasOne(models.PitchEvaluation, {
      foreignKey: 'pitch_id',
      as: 'evaluation'
    });
  };

  return Pitch;
};
