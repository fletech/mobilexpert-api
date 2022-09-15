const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobile_storage', {
    relation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mobiles',
        key: 'mobile_id'
      }
    },
    storage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storages',
        key: 'storage_id'
      }
    }
  }, {
    sequelize,
    tableName: 'mobile_storage',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "relation_id" },
        ]
      },
      {
        name: "relation_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "relation_id" },
        ]
      },
      {
        name: "mobile_id_storage_idx",
        using: "BTREE",
        fields: [
          { name: "mobile_id" },
        ]
      },
      {
        name: "storage_id_mobile_idx",
        using: "BTREE",
        fields: [
          { name: "storage_id" },
        ]
      },
      {
        name: "relation_id_idx",
        using: "BTREE",
        fields: [
          { name: "relation_id" },
        ]
      },
    ]
  });
};
