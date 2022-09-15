const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobile_capacity', {
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mobiles',
        key: 'mobile_id'
      }
    },
    capacity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'capacity',
        key: 'capacity_id'
      }
    }
  }, {
    sequelize,
    tableName: 'mobile_capacity',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_id" },
          { name: "capacity_id" },
        ]
      },
      {
        name: "capacity_id_idx",
        using: "BTREE",
        fields: [
          { name: "capacity_id" },
        ]
      },
    ]
  });
};
