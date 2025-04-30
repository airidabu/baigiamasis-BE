const express = require("express");
const { register, login, updateUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", authMiddleware, updateUser);

module.exports = router;