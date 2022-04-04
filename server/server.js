const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const fs = require("fs");
const { Server } = require("socket.io");
const http = require("http");
const httpLogger = require("./middlewares/log-handler");
require("dotenv").config();
const { scrapData } = require("./controllers/scrap");

//app
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

const server = http.createServer(app);

const io = new Server(server, {
  transports: ["polling", "websocket"],
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data);
  });

  socket.on("scrap", async (data) => {
    let urls = data.data;
    urls.forEach((element) => {
      scrapData(element, io, socket);
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  socket.on("test", (data) => {
    io.to(socket.id).emit("test", data);
  });
});

//API Middleware
fs.readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// setup the logger
app.use(httpLogger);

// Error handler and logging
app.use(errorHandler);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
