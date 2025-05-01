const express = require("express");
const { updateBookStatus } = require("../controllers/statusController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.patch("/:bookId", authMiddleware, roleMiddleware(["admin"]), updateBookStatus);

module.exports = router;