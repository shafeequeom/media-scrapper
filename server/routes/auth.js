const express = require("express");

//Controllers
const { login, register, currentUser } = require("../controllers/auth");

//Middleware
const authorize = require("../middlewares/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/user", authorize, currentUser);

module.exports = router;
