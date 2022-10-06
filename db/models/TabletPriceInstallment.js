module.exports = (sequelize, DataTypes) => {
  const cols = {
    tablet_price_subscription_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "tablet_subscription",
        key: "tablet_price_subscription_id",
      },
      field: "tablet_price_subscription_id",
    },
    installment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Installment",
        key: "installment_id",
      },
      field: "installment_id",
    },
    installment_price: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      field: "installment_price",
    },
  };
  const config = {
    tableName: "tablet_installments",
    timestamps: false,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const TabletPriceInstallment = sequelize.define(
    "tablet_price_installment",
    cols,
    config
  );

  TabletPriceInstallment.associate = (models) => {
    TabletPriceInstallment.belongsTo(models.tablet_subscription, {
      foreignKey: "tablet_price_subscription_id",
      as: "Tablets",
    });
    TabletPriceInstallment.belongsTo(models.Installment, {
      foreignKey: "installment_id",
      as: "Installments",
    });
  };

  return TabletPriceInstallment;
};
