const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const ScrapUrl = sequelize.define("scrap_urls", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = ScrapUrl;
