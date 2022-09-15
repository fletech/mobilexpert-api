module.exports = (sequelize, DataTypes) => {
  const cols = {
    mobile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "mobile_id",
    },
    mobile_name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_name",
    },
    mobile_size: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_size",
    },
    mobile_weight: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_weight",
    },
    mobile_specs: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_specs",
    },
    mobile_description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_description",
    },

    mobile_brand: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile_brand",
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
    tableName: "mobiles",
    timestamps: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
    comment: "",
  };
  const Mobile = sequelize.define("Mobile", cols, config);

  Mobile.associate = function (models) {
    Mobile.belongsToMany(models.Color, {
      as: "colors",
      through: "mobile_color",
      foreignKey: "mobile_id",
      timestamps: false,
    });

    Mobile.belongsToMany(models.Storage, {
      as: "storages",
      through: "mobile_storage",
      foreignKey: "mobile_id",
      timestamps: false,
    });

    Mobile.belongsTo(models.Brand, {
      foreignKey: "mobile_brand",
      as: "brand",
    });
  };
  return Mobile;
};
