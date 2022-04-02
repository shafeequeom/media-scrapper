const express = require("express");

//Controllers
const { scrapData } = require("../controllers/scrap");

//Middleware
const authorize = require("../middlewares/auth");

const router = express.Router();

router.get("/scrap", authorize, scrapData);

module.exports = router;
