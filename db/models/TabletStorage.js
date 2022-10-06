module.exports = (sequelize, DataTypes) => {
  const cols = {
    relation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "relation_id",
    },
    tablet_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: "Tablet",
        key: "tablet_id",
      },
      field: "tablet_id",

      //  unique: "unique-tablet-per-subscription",
    },
    storage_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: "Storage",
        key: "storage_id",
      },
      field: "storage_id",

      //  unique: "unique-subscription-per-tablet",
    },
  };
  const config = {
    tableName: "tablet_storage",
    timestamps: false,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const TabletStorage = sequelize.define("tablet_storage", cols, config);

  TabletStorage.associate = (models) => {
    TabletStorage.belongsTo(models.Tablet, {
      foreignKey: "tablet_id",
      as: "Tablets",
    });
    TabletStorage.belongsTo(models.Storage, {
      foreignKey: "storage_id",
      as: "Storages",
    });
  };

  return TabletStorage;
};
