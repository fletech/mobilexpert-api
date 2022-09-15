const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobile_color', {
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mobiles',
        key: 'mobile_id'
      }
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'colors',
        key: 'color_id'
      }
    }
  }, {
    sequelize,
    tableName: 'mobile_color',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_id" },
          { name: "color_id" },
        ]
      },
      {
        name: "color_id_idx",
        using: "BTREE",
        fields: [
          { name: "color_id" },
        ]
      },
    ]
  });
};
