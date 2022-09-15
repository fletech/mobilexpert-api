const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscriptions', {
    subscription_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subscription_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subscriptions_type',
        key: 'type_id'
      }
    },
    subscription_company: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'company_id'
      }
    },
    subscription_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "subscription_name_UNIQUE"
    },
    subscription_people: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subscription_minimum_monthly_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subscription_monthly_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subscription_price_per_person: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    subscription_currency: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subscription_data_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subscription_data_unity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subscription_specs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subscription_minutes: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subscription_sms: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subscription_5G: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    subscription_roaming: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    subscription_other_info: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subscription_status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'subscriptions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subscription_id" },
        ]
      },
      {
        name: "subscription_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subscription_name" },
        ]
      },
      {
        name: "fk_subscriptions_companies1_idx",
        using: "BTREE",
        fields: [
          { name: "subscription_company" },
        ]
      },
      {
        name: "fk_subscription_type_idx",
        using: "BTREE",
        fields: [
          { name: "subscription_type" },
        ]
      },
    ]
  });
};
