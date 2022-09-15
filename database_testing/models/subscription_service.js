const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscription_service', {
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'subscriptions',
        key: 'subscription_id'
      }
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'services',
        key: 'service_id'
      }
    }
  }, {
    sequelize,
    tableName: 'subscription_service',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subscription_id" },
          { name: "service_id" },
        ]
      },
      {
        name: "fk_subscription_id_idx",
        using: "BTREE",
        fields: [
          { name: "service_id" },
        ]
      },
      {
        name: "fk_service_id_idx",
        using: "BTREE",
        fields: [
          { name: "subscription_id" },
        ]
      },
    ]
  });
};
