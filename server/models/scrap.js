const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const Scrap = sequelize.define("scraps", {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fileType: {
    type: DataTypes.ENUM("video", "image"),
    allowNull: false,
    defaultValue: "image",
    validate: {
      notEmpty: true,
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  parsedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Scrap;
