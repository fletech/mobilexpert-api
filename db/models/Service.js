module.exports = (sequelize, DataTypes) => {
  const cols = {
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "service_id",
    },
    service_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "service_name",
    },
    service_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "service_type",
    },
    service_specs: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "service_specs",
    },
    service_other_info: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "service_other_info",
    },
    service_description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "service_description",
    },
  };

  const config = {
    tableName: "services",
    timestamps: false,
    comment: "",
  };

  const Service = sequelize.define("Service", cols, config);

  Service.associate = function (models) {
    Service.belongsToMany(models.Subscription, {
      as: "subscriptions",
      through: "subscription_service",
      foreignKey: "service_id",
      timestamps: false,
    });
  };

  return Service;
};
