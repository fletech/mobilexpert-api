const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobile_price_subscription', {
    mobile_price_subscription_id: {
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
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subscriptions',
        key: 'subscription_id'
      }
    },
    mobile_storage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mobile_storage',
        key: 'relation_id'
      }
    },
    mobile_price_cash_only: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_price_cash_plan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_price_currency: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    mobile_finance_6: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_10: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_12: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_18: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_20: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_24: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_30: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_36: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_finance_40: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mobile_price_subscription',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_price_subscription_id" },
        ]
      },
      {
        name: "mobile_id_idx",
        using: "BTREE",
        fields: [
          { name: "mobile_id" },
        ]
      },
      {
        name: "subscription_id_idx",
        using: "BTREE",
        fields: [
          { name: "subscription_id" },
        ]
      },
      {
        name: "relation_id_idx",
        using: "BTREE",
        fields: [
          { name: "mobile_price_subscription_id" },
        ]
      },
      {
        name: "mobile_storage_id_idx",
        using: "BTREE",
        fields: [
          { name: "mobile_storage_id" },
        ]
      },
    ]
  });
};
