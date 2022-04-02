const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const fs = require("fs");
const httpLogger = require("./middlewares/log-handler");
require("dotenv").config();

//app
const app = express();

// setup the logger
app.use(httpLogger);

app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//API Middleware
fs.readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//Error handler and logging
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
