module.exports = (sequelize, DataTypes) => {
  const cols = {
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "brand_id",
    },

    brand_name: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "brand_name",
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
    tableName: "brands",
    timestamps: false,
    comment: "",
  };

  const Brand = sequelize.define("Brand", cols, config);

  return Brand;
};
