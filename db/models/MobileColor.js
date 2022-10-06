module.exports = (sequelize, DataTypes) => {
  const cols = {
    mobile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Mobile",
        key: "mobile_id",
      },
      field: "mobile_id",
    },
    color_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Color",
        key: "color_id",
      },
      field: "color_id",
    },
  };
  const config = {
    tableName: "mobile_color",
    timestamps: false,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const MobileColor = sequelize.define("mobile_color", cols, config);

  MobileColor.associate = (models) => {
    MobileColor.belongsTo(models.Mobile, {
      foreignKey: "mobile_id",
      as: "Mobiles",
    });
    MobileColor.belongsTo(models.Color, {
      foreignKey: "color_id",
      as: "Colors",
    });
  };

  return MobileColor;
};
