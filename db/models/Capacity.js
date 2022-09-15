module.exports = (sequelize, DataTypes) => {
  const cols = {
    capacity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "capacity_id",
    },
    capacity_amount: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "capacity_amount",
    },
    capacity_unity: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "capacity_unity",
    },
  };

  const config = {
    tableName: "capacity",
    timestamps: false,
    comment: "",
  };

  const Capacity = sequelize.define("Capacity", cols, config);

  Capacity.associate = function (models) {
    Capacity.belongsToMany(models.Mobile, {
      as: "mobiles",
      through: "mobile_capacity",
      foreignKey: "capacity_id",
      timestamps: false,
    });
  };

  return Capacity;
};
