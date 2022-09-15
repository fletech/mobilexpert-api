module.exports = (sequelize, DataTypes) => {
  const cols = {
    subscription_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "subscription_id",
    },
    subscription_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_name",
    },
    subscription_people: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_people",
    },
    subscription_minimum_monthly_price: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_minimum_monthly_price",
    },
    subscription_monthly_price: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_monthly_price",
    },
    subscription_price_per_person: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_price_per_person",
    },
    subscription_currency: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_currency",
    },
    subscription_data_amount: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_data_amount",
    },
    subscription_data_unity: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_data_unity",
    },
    subscription_specs: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_specs",
    },
    subscription_minutes: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_minutes",
    },
    subscription_sms: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_sms",
    },

    subscription_5G: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_5G",
    },
    subscription_roaming: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_roaming",
    },
    subscription_other_info: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_other_info",
    },
    subscription_company: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_company",
    },

    subscription_sms: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_sms",
    },
    subscription_sms: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_sms",
    },

    subscription_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_status",
    },
  };
  const config = {
    tableName: "subscriptions",
    timestamps: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };
  const Subscription = sequelize.define("Subscription", cols, config);

  Subscription.associate = function (models) {
    Subscription.belongsToMany(models.Service, {
      as: "services",
      through: "subscription_service",
      foreignKey: "subscription_id",
      timestamps: false,
    });

    Subscription.belongsTo(models.Company, {
      foreignKey: "subscription_company",
      as: "company",
    });
    Subscription.belongsTo(models.SpecSubscription, {
      foreignKey: "subscription_specs",
      as: "specs",
    });
    Subscription.belongsTo(models.Binding, {
      foreignKey: "subscription_id",
      as: "binding",
    });
    Subscription.belongsTo(models.Type, {
      foreignKey: "subscription_type",
      as: "type",
    });
  };

  return Subscription;
};
