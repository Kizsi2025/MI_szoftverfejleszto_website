// models/Lesson.js
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    module_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 19
      }
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    game_theme: {
      type: DataTypes.STRING(255)
    },
    initial_points: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      validate: {
        min: 0
      }
    },
    unlock_requirements: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    objectives: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    content: {
      type: DataTypes.JSONB
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'lessons',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Lesson.associate = function(models) {
    Lesson.hasMany(models.UserProgress, {
      foreignKey: 'lesson_id',
      as: 'progress'
    });
    Lesson.hasMany(models.Pitch, {
      foreignKey: 'lesson_id',
      as: 'pitches'
    });
  };

  return Lesson;
};
