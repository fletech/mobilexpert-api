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
    spec_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "spec_name",
    },
    spec_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "spec_type",
    },

    spec_info: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "spec_info",
    },
  };

  const config = {
    tableName: "specs_subscription",
    timestamps: false,
    comment: "",
  };

  const SpecSubscription = sequelize.define("SpecSubscription", cols, config);

  return SpecSubscription;
};
