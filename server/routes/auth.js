const express = require("express");

//Controllers
const { login, register } = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
