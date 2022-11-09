const express = require("express");
const { loginValidation } = require("../validators/auth");
const { login } = require("../controllers/auth");

const router = express.Router();

router.post("/login", loginValidation, login);

module.exports = router;
