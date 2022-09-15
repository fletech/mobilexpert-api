module.exports = (sequelize, DataTypes) => {
  const cols = {
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "company_id",
    },

    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      unique: true,
      field: "company_name",
    },
  };

  const config = {
    tableName: "companies",
    timestamps: false,
    comment: "",
  };

  const Company = sequelize.define("Company", cols, config);

  return Company;
};
