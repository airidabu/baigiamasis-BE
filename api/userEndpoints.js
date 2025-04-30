const express = require("express");
const { register, login, updateUser, getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", authMiddleware, getAllUsers);
router.put("/update/:id", authMiddleware, updateUser);

module.exports = router;