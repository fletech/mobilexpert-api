module.exports = (sequelize, DataTypes) => {
  const cols = {
    tablet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "tablet_id",
    },
    tablet_name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_name",
    },
    tablet_size: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_size",
    },
    tablet_weight: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_weight",
    },
    tablet_specs: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_specs",
    },
    tablet_description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_description",
    },

    tablet_brand: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tablet_brand",
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
    tableName: "tablets",
    timestamps: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };
  const Tablet = sequelize.define("Tablet", cols, config);

  Tablet.associate = function (models) {
    Tablet.belongsToMany(models.Color, {
      as: "colors",
      through: "tablet_color",
      foreignKey: "tablet_id",
      timestamps: false,
    });

    Tablet.belongsToMany(models.Storage, {
      as: "storages",
      through: "tablet_storage",
      foreignKey: "tablet_id",
      timestamps: false,
    });

    Tablet.belongsTo(models.Brand, {
      foreignKey: "tablet_brand",
      as: "brand",
    });
  };
  return Tablet;
};
