const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specs_subscription', {
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spec_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    spec_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    spec_info: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'specs_subscription',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subscription_id" },
        ]
      },
    ]
  });
};
