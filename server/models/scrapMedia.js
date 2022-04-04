const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const ScrapMedia = sequelize.define("scrap_medias", {
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
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = ScrapMedia;
