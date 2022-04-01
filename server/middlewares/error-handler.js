const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom not found error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  } else {
    // custom application error
    return res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;
