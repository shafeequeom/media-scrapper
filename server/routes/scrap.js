const express = require("express");

//Controllers
const {
  scrapData,
  getTotalCount,
  getPagination,
} = require("../controllers/scrap");

//Middleware
const authorize = require("../middlewares/auth");

const router = express.Router();

router.post("/scrap", authorize, scrapData);
router.get("/scrap-total", authorize, getTotalCount);
router.get("/scraps/:page", authorize, getPagination);

module.exports = router;
