module.exports = (sequelize, DataTypes) => {
  const cols = {
    mobile_price_subscription_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: "mobile_price_subscription_id",
    },
    mobile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "mobile_id",
    },
    subscription_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "subscription_id",
    },
    mobile_storage_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "mobile_storage_id",
    },
    mobile_price_cash_only: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_price_cash_only",
    },
    mobile_price_cash_plan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_price_cash_plan",
    },
    mobile_price_currency: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "mobile_price_currency",
    },
    mobile_finance_6: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_6",
    },
    mobile_finance_10: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_10",
    },
    mobile_finance_12: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_12",
    },
    mobile_finance_18: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_18",
    },
    mobile_finance_20: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_20",
    },
    mobile_finance_24: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_24",
    },
    mobile_finance_30: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_30",
    },
    mobile_finance_36: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_36",
    },
    mobile_finance_40: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "mobile_finance_40",
    },
  };

  const config = {
    tableName: "mobile_price_subscription",
    timestamps: false,
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const MobileSubscription = sequelize.define(
    "mobile_subscription",
    cols,
    config
  );

  MobileSubscription.associate = (models) => {
    MobileSubscription.belongsTo(models.Mobile, {
      foreignKey: "mobile_id",
      as: "mobile",
    });
    MobileSubscription.belongsTo(models.Subscription, {
      foreignKey: "subscription_id",
      as: "subscription",
    });
    MobileSubscription.belongsTo(models.mobile_storage, {
      foreignKey: "mobile_storage_id",
      as: "mobile_storage",
    });
  };

  return MobileSubscription;
};
