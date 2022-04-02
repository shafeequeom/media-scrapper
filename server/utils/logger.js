const winston = require("winston");

const options = {
  accessFile: {
    level: "info",
    filename: "./logs/access.log",
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  errorFile: {
    level: "error",
    filename: "./logs/error.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.accessFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = logger;
