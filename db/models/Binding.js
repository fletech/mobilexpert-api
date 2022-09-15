module.exports = (sequelize, DataTypes) => {
  const cols = {
    binding_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "binding_id",
    },
    subscription_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subscription_id",
    },
    binding_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "binding_type",
    },
    binding_minimum: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "binding_minimum",
    },
    binding_end: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "binding_end",
    },
  };

  const config = {
    tableName: "bindings",
    timestamps: false,
    comment: "",
  };

  const Binding = sequelize.define("Binding", cols, config);

  return Binding;
};
