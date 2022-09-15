const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companies', {
    company_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "company_name_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'companies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
      {
        name: "company_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "company_name" },
        ]
      },
    ]
  });
};
