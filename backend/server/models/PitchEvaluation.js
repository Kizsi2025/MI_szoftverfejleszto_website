// server/models/PitchEvaluation.js
module.exports = (sequelize, DataTypes) => {
  const PitchEvaluation = sequelize.define('PitchEvaluation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pitch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pitches',
        key: 'id'
      }
    },
    ai_score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    ai_feedback: {
      type: DataTypes.TEXT
    },
    points_awarded: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    evaluation_criteria: {
      type: DataTypes.JSONB
    },
    evaluated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'pitch_evaluations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  PitchEvaluation.associate = function(models) {
    PitchEvaluation.belongsTo(models.Pitch, {
      foreignKey: 'pitch_id',
      as: 'pitch'
    });
  };

  return PitchEvaluation;
};
