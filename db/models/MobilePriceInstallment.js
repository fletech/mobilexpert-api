module.exports = (sequelize, DataTypes) => {
  const cols = {
    mobile_price_subscription_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "mobile_subscription",
        key: "mobile_price_subscription_id",
      },
      field: "mobile_price_subscription_id",
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
    tableName: "mobile_installments",
    timestamps: false,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const MobilePriceInstallment = sequelize.define(
    "mobile_price_installment",
    cols,
    config
  );

  MobilePriceInstallment.associate = (models) => {
    MobilePriceInstallment.belongsTo(models.mobile_subscription, {
      foreignKey: "mobile_price_subscription_id",
      as: "Mobiles",
    });
    MobilePriceInstallment.belongsTo(models.Installment, {
      foreignKey: "installment_id",
      as: "Installments",
    });
  };

  return MobilePriceInstallment;
};
