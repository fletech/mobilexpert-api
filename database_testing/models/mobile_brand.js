const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobile_brand', {
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mobiles',
        key: 'mobile_id'
      }
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mobiles',
        key: 'mobile_id'
      }
    }
  }, {
    sequelize,
    tableName: 'mobile_brand',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_id" },
          { name: "brand_id" },
        ]
      },
      {
        name: "brand_id_mobile_idx",
        using: "BTREE",
        fields: [
          { name: "brand_id" },
        ]
      },
    ]
  });
};
