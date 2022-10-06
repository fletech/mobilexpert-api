module.exports = (sequelize, DataTypes) => {
  const cols = {
    tablet_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Tablet",
        key: "tablet_id",
      },
      field: "tablet_id",
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
    tableName: "tablet_color",
    timestamps: false,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const TabletColor = sequelize.define("tablet_color", cols, config);

  TabletColor.associate = (models) => {
    TabletColor.belongsTo(models.Tablet, {
      foreignKey: "tablet_id",
      as: "Tablets",
    });
    TabletColor.belongsTo(models.Color, {
      foreignKey: "color_id",
      as: "Colors",
    });
  };

  return TabletColor;
};
