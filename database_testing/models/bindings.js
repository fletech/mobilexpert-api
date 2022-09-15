const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bindings', {
    binding_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subscriptions',
        key: 'subscription_id'
      },
      unique: "fk_binding_id"
    },
    binding_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    binding_minimum: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    binding_end: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bindings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "binding_id" },
        ]
      },
      {
        name: "subscription_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subscription_id" },
        ]
      },
    ]
  });
};
