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
    other_info_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "other_info_name",
    },

    other_info_content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "other_info_content",
    },
  };

  const config = {
    tableName: "subscription_other_info",
    timestamps: false,
    comment: "",
  };

  const OtherInfoSubscription = sequelize.define(
    "OtherInfoSubscription",
    cols,
    config
  );

  return OtherInfoSubscription;
};
