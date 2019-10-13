/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('team', {
    team_id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    team_manager_id: {
      type: DataTypes.STRING(128),
      allowNull: true,
      references: {
        model: 'participant',
        key: 'participant_id',
        as: 'dd'
      }
    },
    team_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    team_password: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    team_category_id: {
      type: DataTypes.STRING(128),
      allowNull: true,
      references: {
        model: 'category',
        key: 'category_id'
      }
    },
    team_valid: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    team_salt: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'team'
  });
};
