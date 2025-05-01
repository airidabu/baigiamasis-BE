const express = require("express");
const { getAllBooks, getBookById, getPendingBooks, createBook, updateBook, deleteBook } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/pending", authMiddleware, roleMiddleware(["admin"]), getPendingBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleware, roleMiddleware(["author", "admin"]), createBook);
router.put("/:id", authMiddleware, roleMiddleware(["author", "admin"]), updateBook);
router.delete("/:id", authMiddleware, roleMiddleware(["author", "admin"]), deleteBook);

module.exports = router;