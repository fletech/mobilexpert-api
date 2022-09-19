module.exports = (sequelize, DataTypes) => {
  const cols = {
    service_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      field: "service_id",
    },
    subscription_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      field: "subscription_id",
    },
  };

  const config = {
    tableName: "subscription_service",
    timestamps: false,
    underscored: true,
    comment: "",
  };

  const SubscriptionService = sequelize.define(
    "SubscriptionService",
    cols,
    config
  );

  SubscriptionService.associate = (models) => {
    SubscriptionService.belongsTo(models.Subscription, {
      foreignKey: "subscription_id",
      as: "subscription",
    });
    SubscriptionService.belongsTo(models.Service, {
      foreignKey: "service_id",
      as: "service",
    });
  };

  return SubscriptionService;
};
