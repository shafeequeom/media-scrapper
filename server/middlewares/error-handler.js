const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  if (err && err.message.toLowerCase().endsWith("not found")) {
    // custom not found error
    return res.status(404).json({ message: err.message });
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
