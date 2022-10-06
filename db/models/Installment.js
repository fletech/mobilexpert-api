module.exports = (sequelize, DataTypes) => {
  const cols = {
    installment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "installment_id",
    },
    installment_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      unique: true,
      autoIncrement: false,
      comment: null,
      field: "installment_quantity",
    },
  };
  const config = {
    tableName: "installments",
    timestamps: false,
    comment: "",
  };

  const Installment = sequelize.define("Installment", cols, config);

  Installment.associate = function (models) {
    Installment.belongsToMany(models.mobile_subscription, {
      as: "mobile_subscriptions",
      through: "mobile_price_installment",
      foreignKey: "installment_id",
      timestamps: false,
    });
    Installment.belongsToMany(models.tablet_subscription, {
      as: "tablet_subscriptions",
      through: "tablet_price_installment",
      foreignKey: "installment_id",
      timestamps: false,
    });
  };

  return Installment;
};
