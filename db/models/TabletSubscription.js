module.exports = (sequelize, DataTypes) => {
  const cols = {
    tablet_price_subscription_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: "tablet_price_subscription_id",
    },
    tablet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "tablet_id",
    },
    subscription_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "subscription_id",
    },
    tablet_storage_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: "tablet_storage_id",
    },
    tablet_price_cash_only: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "tablet_price_cash_only",
    },
    tablet_price_cash_plan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "tablet_price_cash_plan",
    },
    tablet_price_currency: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "tablet_price_currency",
    },
    tablet_price_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "tablet_price_name",
    },
    tablet_price_campaign: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_price_campaign",
    },
  };

  const config = {
    tableName: "tablet_price_subscription",
    timestamps: false,
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const TabletSubscription = sequelize.define(
    "tablet_subscription",
    cols,
    config
  );

  TabletSubscription.associate = (models) => {
    TabletSubscription.belongsToMany(models.Installment, {
      as: "installments",
      through: "tablet_price_installment",
      foreignKey: "tablet_price_subscription_id",
      timestamps: false,
    });

    TabletSubscription.belongsTo(models.Tablet, {
      foreignKey: "tablet_id",
      as: "tablet",
    });
    TabletSubscription.belongsTo(models.Subscription, {
      foreignKey: "subscription_id",
      as: "subscription",
    });

    TabletSubscription.belongsTo(models.tablet_storage, {
      foreignKey: "tablet_storage_id",
      as: "tablet_storage",
    });
  };

  return TabletSubscription;
};

// 'SELECT
//  `tablet_prices`.`tablet_price_id` AS `tablet_prices.tablet_price_id`,
//  `tablet_prices`.`installment_id` AS `tablet_prices.installment_id`,
//  `tablet_prices`.`tabletPriceInstallmentTabletPriceId` AS `tablet_prices.tabletPriceInstallmentTabletPriceId`,
//  `tablet_prices`.`tablet_price_subscription_id` AS `tablet_prices.tablet_price_subscription_id`,
//  `tablet_prices->tablet_price_installment`.`tablet_price_id` AS `tablet_prices.tablet_price_installment.tablet_price_id`,
//  `tablet_prices->tablet_price_installment`.`installment_id` AS `tablet_prices.tablet_price_installment.installment_id`,
//  `tablet_prices->tablet_price_installment`.`tabletPriceInstallmentTabletPriceId` AS `tablet_prices.tablet_price_installment.tabletPriceInstallmentTabletPriceId`,
//  `tablet_prices->tablet_price_installment`.`tablet_price_subscription_id` AS `tablet_prices.tablet_price_installment.tablet_price_subscription_id`
//  FROM `tablet_price_subscription` AS `tablet_subscription`
//  LEFT OUTER JOIN `tablets` AS `tablet` ON `tablet_subscription`.`tablet_id` = `tablet`.`tablet_id`
//  LEFT OUTER JOIN `subscriptions` AS `subscription` ON `tablet_subscription`.`subscription_id` = `subscription`.`subscription_id`
//  LEFT OUTER JOIN `tablet_storage` AS `tablet_storage` ON `tablet_subscription`.`tablet_storage_id` = `tablet_storage`.`relation_id`
//  LEFT OUTER JOIN ( `tablet_installments` AS `tablet_prices->tablet_price_installment`
//  INNER JOIN `tablet_installments` AS `tablet_prices`
//  ON `tablet_prices`.`tablet_price_id` = `tablet_prices->tablet_price_installment`.`tabletPriceInstallmentTabletPriceId`)
//  ON `tablet_subscription`.`tablet_price_subscription_id` = `tablet_prices->tablet_price_installment`.`tablet_price_id`;',

// 'SELECT
//  `installments`.`tablet_price_id` AS `installments.tablet_price_id`,
//  `installments`.`installment_id` AS `installments.installment_id`,
//  `installments`.`tabletPriceInstallmentTabletPriceId` AS `installments.tabletPriceInstallmentTabletPriceId`,
//  `installments`.`tablet_price_subscription_id` AS `installments.tablet_price_subscription_id`,
//  `installments->tablet_price_installment`.`tablet_price_id` AS `installments.tablet_price_installment.tablet_price_id`,
//  `installments->tablet_price_installment`.`installment_id` AS `installments.tablet_price_installment.installment_id`,
//  `installments->tablet_price_installment`.`tabletPriceInstallmentTabletPriceId` AS `installments.tablet_price_installment.tabletPriceInstallmentTabletPriceId`,
//  `installments->tablet_price_installment`.`tablet_price_subscription_id` AS `installments.tablet_price_installment.tablet_price_subscription_id` FROM `tablet_price_subscription` AS `tablet_subscription` LEFT OUTER JOIN `tablets` AS `tablet` ON `tablet_subscription`.`tablet_id` = `tablet`.`tablet_id` LEFT OUTER JOIN `subscriptions` AS `subscription` ON `tablet_subscription`.`subscription_id` = `subscription`.`subscription_id` LEFT OUTER JOIN `tablet_storage` AS `tablet_storage` ON `tablet_subscription`.`tablet_storage_id` = `tablet_storage`.`relation_id` LEFT OUTER JOIN ( `tablet_installments` AS `installments->tablet_price_installment` INNER JOIN `tablet_installments` AS `installments` ON `installments`.`tablet_price_id` = `installments->tablet_price_installment`.`tabletPriceInstallmentTabletPriceId`) ON `tablet_subscription`.`tablet_price_subscription_id` = `installments->tablet_price_installment`.`tablet_price_id`;',
