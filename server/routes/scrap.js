const express = require("express");

//Controllers
const {
  storeScrapUrls,
  getTotalMediaCount,
  getMediaPagination,
} = require("../controllers/scrap");

//Middleware
const authorize = require("../middlewares/auth");

const router = express.Router();

router.post("/scrap/urls", authorize, storeScrapUrls);
router.get("/scrap/media/total", authorize, getTotalMediaCount);
router.get("/scrap/medias/:page", authorize, getMediaPagination);

module.exports = router;
