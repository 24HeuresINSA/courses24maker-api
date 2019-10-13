/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participant', {
    participant_id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    participant_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    participant_surname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    participant_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    participant_team_id: {
      type: DataTypes.STRING(128),
      allowNull: true,
      references: {
        model: 'team',
        key: 'team_id'
      }
    },
    participant_student: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    participant_medical_certificate: {
      type: DataTypes.TEXT('medium'),
      allowNull: true
    },
    participant_medical_certificate_valid: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    participant_medical_certificate_file: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    participant_payment: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    participant_tee_shirt_size: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    participant_comment: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    participant_message: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    participant_telephone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    participant_email: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'participant'
  });
};
