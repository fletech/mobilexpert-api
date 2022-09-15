module.exports = (sequelize, DataTypes) => {
  const cols = {
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "color_id",
    },
    color_name: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "color_name",
    },
  };
  const config = {
    tableName: "colors",
    timestamps: false,
    comment: "",
  };

  const Color = sequelize.define("Color", cols, config);

  Color.associate = function (models) {
    Color.belongsToMany(models.Mobile, {
      as: "mobiles",
      through: "mobile_color",
      foreignKey: "color_id",
      timestamps: false,
    });
  };

  return Color;
};
