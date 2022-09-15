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
    mobile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: "Mobile",
        key: "mobile_id",
      },
      field: "mobile_id",

      //  unique: "unique-mobile-per-subscription",
    },
    storage_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: "Storage",
        key: "storage_id",
      },
      field: "storage_id",

      //  unique: "unique-subscription-per-mobile",
    },
  };
  const config = {
    tableName: "mobile_storage",
    timestamps: false,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };

  const MobileStorage = sequelize.define("mobile_storage", cols, config);

  MobileStorage.associate = (models) => {
    MobileStorage.belongsTo(models.Mobile, {
      foreignKey: "mobile_id",
      as: "Mobiles",
    });
    MobileStorage.belongsTo(models.Storage, {
      foreignKey: "storage_id",
      as: "Storages",
    });
  };

  return MobileStorage;
};
