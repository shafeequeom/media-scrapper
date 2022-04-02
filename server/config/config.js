module.exports = {
  HOST: process.env.MYSQL_HOST_IP,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
  PORT: process.env.MYSQL_PORT || 3306,
  DIALECT: "mysql",
};
