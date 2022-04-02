const express = require("express");

//Controllers
const { login, register, users } = require("../controllers/auth");

//Middleware
const authorize = require("../middlewares/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
