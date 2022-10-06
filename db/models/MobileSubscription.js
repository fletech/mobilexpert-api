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
    mobile_price_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "mobile_price_name",
    },
    mobile_price_campaign: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_price_campaign",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status",
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
    MobileSubscription.belongsToMany(models.Installment, {
      as: "installments",
      through: "mobile_price_installment",
      foreignKey: "mobile_price_subscription_id",
      timestamps: false,
    });

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

// 'SELECT
//  `mobile_prices`.`mobile_price_id` AS `mobile_prices.mobile_price_id`,
//  `mobile_prices`.`installment_id` AS `mobile_prices.installment_id`,
//  `mobile_prices`.`mobilePriceInstallmentMobilePriceId` AS `mobile_prices.mobilePriceInstallmentMobilePriceId`,
//  `mobile_prices`.`mobile_price_subscription_id` AS `mobile_prices.mobile_price_subscription_id`,
//  `mobile_prices->mobile_price_installment`.`mobile_price_id` AS `mobile_prices.mobile_price_installment.mobile_price_id`,
//  `mobile_prices->mobile_price_installment`.`installment_id` AS `mobile_prices.mobile_price_installment.installment_id`,
//  `mobile_prices->mobile_price_installment`.`mobilePriceInstallmentMobilePriceId` AS `mobile_prices.mobile_price_installment.mobilePriceInstallmentMobilePriceId`,
//  `mobile_prices->mobile_price_installment`.`mobile_price_subscription_id` AS `mobile_prices.mobile_price_installment.mobile_price_subscription_id`
//  FROM `mobile_price_subscription` AS `mobile_subscription`
//  LEFT OUTER JOIN `mobiles` AS `mobile` ON `mobile_subscription`.`mobile_id` = `mobile`.`mobile_id`
//  LEFT OUTER JOIN `subscriptions` AS `subscription` ON `mobile_subscription`.`subscription_id` = `subscription`.`subscription_id`
//  LEFT OUTER JOIN `mobile_storage` AS `mobile_storage` ON `mobile_subscription`.`mobile_storage_id` = `mobile_storage`.`relation_id`
//  LEFT OUTER JOIN ( `mobile_installments` AS `mobile_prices->mobile_price_installment`
//  INNER JOIN `mobile_installments` AS `mobile_prices`
//  ON `mobile_prices`.`mobile_price_id` = `mobile_prices->mobile_price_installment`.`mobilePriceInstallmentMobilePriceId`)
//  ON `mobile_subscription`.`mobile_price_subscription_id` = `mobile_prices->mobile_price_installment`.`mobile_price_id`;',

// 'SELECT
//  `installments`.`mobile_price_id` AS `installments.mobile_price_id`,
//  `installments`.`installment_id` AS `installments.installment_id`,
//  `installments`.`mobilePriceInstallmentMobilePriceId` AS `installments.mobilePriceInstallmentMobilePriceId`,
//  `installments`.`mobile_price_subscription_id` AS `installments.mobile_price_subscription_id`,
//  `installments->mobile_price_installment`.`mobile_price_id` AS `installments.mobile_price_installment.mobile_price_id`,
//  `installments->mobile_price_installment`.`installment_id` AS `installments.mobile_price_installment.installment_id`,
//  `installments->mobile_price_installment`.`mobilePriceInstallmentMobilePriceId` AS `installments.mobile_price_installment.mobilePriceInstallmentMobilePriceId`,
//  `installments->mobile_price_installment`.`mobile_price_subscription_id` AS `installments.mobile_price_installment.mobile_price_subscription_id` FROM `mobile_price_subscription` AS `mobile_subscription` LEFT OUTER JOIN `mobiles` AS `mobile` ON `mobile_subscription`.`mobile_id` = `mobile`.`mobile_id` LEFT OUTER JOIN `subscriptions` AS `subscription` ON `mobile_subscription`.`subscription_id` = `subscription`.`subscription_id` LEFT OUTER JOIN `mobile_storage` AS `mobile_storage` ON `mobile_subscription`.`mobile_storage_id` = `mobile_storage`.`relation_id` LEFT OUTER JOIN ( `mobile_installments` AS `installments->mobile_price_installment` INNER JOIN `mobile_installments` AS `installments` ON `installments`.`mobile_price_id` = `installments->mobile_price_installment`.`mobilePriceInstallmentMobilePriceId`) ON `mobile_subscription`.`mobile_price_subscription_id` = `installments->mobile_price_installment`.`mobile_price_id`;',
