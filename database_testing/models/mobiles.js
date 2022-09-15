const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobiles', {
    mobile_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mobile_name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      unique: "mobile_name_UNIQUE"
    },
    mobile_size: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    mobile_weight: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    mobile_specs: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    mobile_description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    mobile_brand: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'brand_id'
      }
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'mobiles',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_id" },
        ]
      },
      {
        name: "mobile_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_name" },
        ]
      },
      {
        name: "brand_id",
        using: "BTREE",
        fields: [
          { name: "mobile_brand" },
        ]
      },
    ]
  });
};
