module.exports = {
  HOST: process.env.MYSQL_HOST_IP,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
};
