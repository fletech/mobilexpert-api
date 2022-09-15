module.exports = (sequelize, DataTypes) => {
  const cols = {
    storage_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "storage_id",
    },
    storage_amount: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "storage_amount",
    },
    storage_unity: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "storage_unity",
    },
  };

  const config = {
    tableName: "storages",
    timestamps: false,
    comment: "",
  };

  const Storage = sequelize.define("Storage", cols, config);

  Storage.associate = function (models) {
    // Storage.belongsToMany(models.Mobile, {
    //   as: "mobiles",
    //   through: "mobile_storage",
    //   foreignKey: "storage_id",
    //   timestamps: false,
    // });

    Storage.belongsToMany(models.Mobile, {
      as: "mobiles",
      through: "mobile_storage",
      foreignKey: "storage_id",
      timestamps: false,
    });
  };

  return Storage;
};
