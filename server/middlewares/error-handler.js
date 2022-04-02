const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom not found error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  } else {
    // custom application error
    const errorMessage = "Error:- " + err.message;
    const { method, url, body } = req;
    const details = JSON.stringify(err, Object.getOwnPropertyNames(err));
    logger.error(errorMessage, {
      details,
      timestamp: new Date().toString(),
      method,
      url,
      body,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
