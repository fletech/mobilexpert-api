module.exports = (sequelize, DataTypes) => {
  const cols = {
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "type_id",
      unique: true,
    },

    type_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      unique: true,
      field: "type_name",
    },
  };

  const config = {
    tableName: "subscriptions_type",
    timestamps: false,
    comment: "",
  };

  const Type = sequelize.define("Type", cols, config);

  return Type;
};
