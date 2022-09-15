const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscriptions_type', {
    type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "type_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'subscriptions_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "type_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "type_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_name" },
        ]
      },
    ]
  });
};
