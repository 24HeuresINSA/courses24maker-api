/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    category_id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    category_label: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    category_description: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    category_nb_max: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    category_full: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '0'
    },
    category_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    category_nb_total: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    category_price_regular: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    category_price_student: {
      type: DataTypes.FLOAT,
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
    tableName: 'category'
  });
};
