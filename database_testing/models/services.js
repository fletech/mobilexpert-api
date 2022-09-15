const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
    service_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    service_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    service_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    service_specs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    service_other_info: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    service_description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    service_status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'services',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "service_id" },
        ]
      },
    ]
  });
};
